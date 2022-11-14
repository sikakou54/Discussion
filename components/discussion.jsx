import { useEffect, useRef, useReducer } from 'react';
import Router from 'next/router';
import Select from './select';
import Online from './online';
import Join from './join';
import Standby from './standby';
import Ready from './ready';
import Finish from './finish';
import Vote from './vote';
import VotingDone from './votingDone';

import {
    useMeetingManager,
    DeviceLabels
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';

const actions = {
    changeState: {
        select: 0x00,
        join: 0x01,
        standby: 0x02,
        ready: 0x03,
        online: 0x04,
        finish: 0x05,
        vote: 0x06,
        votingDone: 0x07,
        result: 0x08
    },
    changeCurrentTime: {
        init: 0x10,
        update: 0x11
    },
    changeSocketId: {
        init: 0x20,
        update: 0x21
    },
    changeDiscussionMember: 0x31,
    start: 0x41,
    timer: {
        timeout: 0x51,
        reset: 0x52
    },
    vote: 0x61
};

function getTimeStamp(offset = 0) {
    return (new Date()).getTime() + offset;
}

const reducer = (state, action) => {

    switch (action.type) {

        /******************************
         * changeState
         ******************************/

        // select
        case actions.changeState.select:
            return {
                ...state,
                state: process.env.userState.select,
                post: {
                    ...(action.payload.post)
                },
                message: action.payload.message
            };

        // join
        case actions.changeState.join:
            return {
                ...state,
                state: process.env.userState.join,
                joinType: action.payload.joinType
            };

        // standby
        case actions.changeState.standby:
            return {
                ...state,
                state: process.env.userState.standby,
                isStarted: false,
                isVote: false,
                isTimerEnable: false,
            };

        // ready
        case actions.changeState.ready:
            return {
                ...state,
                state: process.env.userState.ready,
                meetingSessionConfiguration: {
                    Meeting: action.payload.config.Meeting,
                    Attendee: action.payload.config.Attendee,
                }
            };

        // online
        case actions.changeState.online:
            return {
                ...state,
                state: process.env.userState.online
            };

        // finish
        case actions.changeState.finish:
            return {
                ...state,
                state: process.env.userState.finish,
                isStarted: false,
                isTimerEnable: false
            };

        // vote
        case actions.changeState.vote:
            return {
                ...state,
                state: process.env.userState.vote,
                isVote: true,
                isTimerEnable: true,
                isTimeout: false,
                limitTime: action.payload.limitTime,
                currentTime: getTimeStamp()
            };

        // votingDone
        case actions.changeState.votingDone:
            return {
                ...state,
                state: process.env.userState.votingDone,
                isVote: false,
                isTimerEnable: false,
            };

        // result
        case actions.changeState.result:
            return {
                ...state,
                state: process.env.userState.result,
                result: {
                    win: action.payload.result.win,
                    positive: action.payload.result.positive,
                    negative: action.payload.result.negative
                }
            };

        /******************************
         * changeCurrentTime
         ******************************/

        // update
        case actions.changeCurrentTime.update:
            return {
                ...state,
                currentTime: action.payload.currentTime
            };

        // init
        case actions.changeCurrentTime.init:
            return {
                ...state,
                currentTime: 0
            };

        /******************************
         * changeSocketId
         ******************************/

        // update
        case actions.changeSocketId.update:
            return {
                ...state,
                socketId: action.payload.socketId
            };

        /******************************
         * start
         ******************************/
        case actions.start:
            return {
                ...state,
                isStarted: true,
                isTimerEnable: true,
                isTimeout: false,
                limitTime: action.payload.limitTime,
                currentTime: getTimeStamp()
            };

        /******************************
         * changeDiscussionMember
         ******************************/
        case actions.changeDiscussionMember:
            return {
                ...state,
                post: action.payload.post
            };

        /******************************
         * timeout
         ******************************/
        case actions.timer.timeout:
            return {
                ...state,
                isTimeout: true
            };

        case actions.timer.reset:
            return {
                ...state,
                isTimeout: false
            };

        /******************************
         * vote
         ******************************/
        case actions.vote:
            return {
                ...state,
                judge: action.payload.judge
            };

        default:
            return {
                ...state
            };
    }
};

async function apiFetchGet(url) {

    return new Promise(async (resolve) => {

        let res = null;
        let retry = true;
        let json = null;

        while (retry) {
            try {
                res = await fetch(url, { method: 'GET' });
                if (res.ok) {
                    json = await res.json();
                    resolve({
                        status: true,
                        data: json
                    });
                } else {
                    if (503 !== res.status) {
                        resolve({
                            status: false,
                            data: res.statusText
                        });
                    } else {
                        console.log('apiFetchGet', 'retry');
                    }
                }

            } catch (e) {
                console.error('apiFetchGet', e);
                resolve({
                    status: false,
                    data: null
                });
            }
        }

    });
}

async function apiFetchPost(url, params) {

    return new Promise(async (resolve) => {

        let res = null;
        let retry = true;

        while (retry) {
            try {
                res = await fetch(url, { method: 'POST', ...params });
                if (res.ok) {
                    resolve({
                        status: true,
                        data: null
                    });
                } else if (503 !== res.status) {
                    retry = false;
                } else {
                    console.log('apiFetchPost', 'retry');
                }
            } catch (e) {
                console.error('apiFetchPost', e);
                resolve({
                    status: false,
                    data: e
                });
            }
        }

    });
}

export default function Discussion({ postId, userId }) {

    const socket = useRef(null);
    const [data, dispatch] = useReducer(reducer, {
        state: process.env.userState.none,
        userId: userId,
        postId: postId,
        post: null,
        joinType: 0,
        socketId: 'none',
        meetingSessionConfiguration: {},
        attendees: {
            positive: 0,
            negative: 0,
            watchers: 0
        },
        isVote: false,
        isStarted: false,
        isTimeout: false,
        isTimerEnable: false,
        limitTime: 0,
        currentTime: 0,
        judge: 'draw',
        result: {
            win: 'none',
            positive: 0,
            negative: 0
        },
        message: null
    });
    const meetingManager = useMeetingManager();

    async function webSocketOpen(event) {
        console.log('open', event);
        socket.current.send(JSON.stringify({ action: 'getSocketId', data: '-' }));
    }

    async function webSocketClose(event) {
        console.log('close', event);
    }

    async function webSocketMessage(event) {

        const { notify, data } = JSON.parse(event.data);

        console.log('message', notify, data);

        switch (notify) {

            case 'notifySocketIdResponse':
                dispatch({
                    type: actions.changeSocketId.update,
                    payload: {
                        socketId: data.socketId
                    }
                });
                break;

            case 'notifyStandbyRequest':
                dispatch({ type: actions.changeState.standby });
                break;

            case 'notifyReadyRequest':
                dispatch({
                    type: actions.changeState.ready,
                    payload: {
                        config: data.config
                    }
                });
                break;

            case 'notifyVoteRequest':
                dispatch({
                    type: actions.changeState.vote,
                    payload: {
                        limitTime: data.limitTime
                    }
                });
                break;

            case 'notifyResultRequest':
                dispatch({
                    type: actions.changeState.result,
                    payload: {
                        result: {
                            win: data.result.win,
                            positive: data.result.positive,
                            negative: data.result.negative
                        }
                    }
                });
                break;

            case 'notifyStartRequest':
                dispatch({
                    type: actions.start,
                    payload: {
                        limitTime: data.limitTime
                    }
                });
                break;

            case 'notifyDiscussionStatus':

                apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + "/getDiscussion/" + 'jpn' + '/' + data.postId)
                    .then((res) => {
                        if (res.status) {
                            dispatch({
                                type: actions.changeDiscussionMember,
                                payload: {
                                    post: res.data
                                }
                            });
                        }
                    });
                break;

            default:
                break;
        }
    }

    function setupWebSocket() {

        // websocket
        socket.current = new WebSocket(process.env.awsApiGatewayWebSocketApiEndPoint);

        // open
        socket.current.addEventListener('open', webSocketOpen);

        // close
        socket.current.addEventListener('close', webSocketClose);

        // message
        socket.current.addEventListener('message', webSocketMessage);
    }

    async function joinDiscussion(_type, _postId, _socketId, _userId) {

        let api = '';
        let result = true;
        let res = null;

        if (_type === 1) api = 'joinDiscussionPositive';
        if (_type === 2) api = 'joinDiscussionNegative';
        if (_type === 3) api = 'joinDiscussionWatcher';

        if ('' !== api) {

            res = await apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + '/' + api + '/' + _postId, {
                body: JSON.stringify({
                    joinType: _type,
                    userId: _userId,
                    socketId: _socketId
                })
            });

            if (!res.status) {
                result = false;
                console.error(res.data);
            }
        }

        return result;
    }

    async function setDiscussionState(_type, _postId, _socketId, _state) {

        let api = '';
        let res = null;

        if (_type === 1) api = 'setDiscussionPositiveState';
        if (_type === 2) api = 'setDiscussionNegativeState';
        if (_type === 3) api = 'setDiscussionWatcherState';

        if ('' !== api) {

            res = await apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + '/' + api + '/' + _postId, {
                body: JSON.stringify({
                    state: _state,
                    socketId: _socketId
                })
            });

            if (!res.status) {
                console.error(res.data);
            }
        }
    }

    async function setVote(_postId, _socketId, _judge) {

        let res = await apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + '/setVote/' + _postId, {
            body: JSON.stringify({
                socketId: _socketId,
                judge: _judge
            })
        });

        if (!res.status) {
            console.error(res.data);
        }
    }

    function onJoin(type) {
        dispatch({
            type: actions.changeState.join,
            payload: {
                joinType: type
            }
        });
    }

    function onCancel() {
        Router.push({
            pathname: 'posts',
            query: {
                userId: userId
            }
        });
    }

    async function startMeeting(type) {

        let labels = DeviceLabels.Audio;
        if (3 === type) {
            labels = DeviceLabels.None;
        }

        const meetingSessionConfiguration = new MeetingSessionConfiguration(data.meetingSessionConfiguration.Meeting, data.meetingSessionConfiguration.Attendee);
        await meetingManager.join(meetingSessionConfiguration, {
            deviceLabels: labels
        });
        await meetingManager.start();

        dispatch({ type: actions.changeState.online });
    }

    async function changedStateJoin() {
        setupWebSocket();
    }

    async function changedStateStandby() {
        await meetingManager.leave();
        await setDiscussionState(data.joinType, data.postId, data.socketId, process.env.userState.standby);
    }

    async function changedStateReady() {
        await setDiscussionState(data.joinType, data.postId, data.socketId, process.env.userState.ready);
        await startMeeting(data.joinType);
    }

    async function changedStateOnline() {
        await setDiscussionState(data.joinType, data.postId, data.socketId, process.env.userState.online);
    }

    async function changedStateFinish() {
        await meetingManager.leave();
        await setDiscussionState(data.joinType, data.postId, data.socketId, process.env.userState.finish);
    }

    async function changedStateVote() {
        await setDiscussionState(data.joinType, data.postId, data.socketId, process.env.userState.vote);
    }

    async function changedStateVotingDone() {
        await setVote(data.postId, data.socketId, data.judge);
        await setDiscussionState(data.joinType, data.postId, data.socketId, process.env.userState.votingDone);
    }

    async function changedStateResult() {
        Router.push({
            pathname: 'result',
            query: {
                userId: data.userId,
                win: data.result.win,
                positive: data.result.positive,
                negative: data.result.negative
            }
        });
    }

    function discussionTimer() {
        dispatch({
            type: actions.changeCurrentTime.update,
            payload: {
                currentTime: getTimeStamp()
            }
        });
    }

    function setVotindDone(judge) {
        dispatch({
            type: actions.vote,
            payload: {
                judge: judge
            }
        });
    }

    async function updateSelect(message) {

        const res = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + "/getDiscussion/" + 'jpn' + '/' + data.postId);
        if (res.status) {
            dispatch({
                type: actions.changeState.select,
                payload: {
                    post: res.data,
                    message: message
                }
            });
        } else {
            Router.push({
                pathname: "posts",
                query: {
                    userId: data.userId
                }
            });
        }
    }

    useEffect(() => {

        return () => {
            if (socket.current && socket.current.readyState === 1) {
                socket.current.close();
                socket.current = null;
            }
        };

    }, []);

    useEffect(() => {

        if (data.isTimerEnable) {
            if (data.limitTime <= data.currentTime) {
                dispatch({ type: actions.timer.timeout });
            } else {
                setTimeout(discussionTimer, 500);
            }
        }

    }, [data.currentTime]);

    useEffect(() => {

        if (!data.isTimeout) {
            return;
        }

        if (data.isTimerEnable) {
            if (data.state === process.env.userState.online) {
                dispatch({ type: actions.changeState.finish });
            }

            if (data.state === process.env.userState.vote && 3 === data.joinType) {
                dispatch({ type: actions.changeState.votingDone });
            }
        }

    }, [data.isTimeout]);

    useEffect(() => {

        async function changeSocketId() {

            let result = false;

            if ('none' !== data.socketId) {

                result = await joinDiscussion(data.joinType, data.postId, data.socketId, data.userId);

                if (false === result) {
                    if (socket.current && socket.current.readyState === 1) {
                        socket.current.close();
                    }
                    await updateSelect('参加できませんでした。＿|￣|○');
                }
            }
        }
        changeSocketId();

    }, [data.socketId]);

    useEffect(() => {

        switch (data.state) {

            case process.env.userState.none:
                updateSelect('');
                break;

            case process.env.userState.join:
                changedStateJoin();
                break;

            case process.env.userState.standby:
                changedStateStandby();
                break;

            case process.env.userState.ready:
                changedStateReady();
                break;

            case process.env.userState.online:
                changedStateOnline();
                break;

            case process.env.userState.finish:
                changedStateFinish();
                break;

            case process.env.userState.vote:
                changedStateVote();
                break;

            case process.env.userState.votingDone:
                changedStateVotingDone();
                break;

            case process.env.userState.result:
                changedStateResult();
                break;

            default:
                break;
        }

    }, [data.state]);

    useEffect(() => {
        if (true === data.isStarted) {
            setTimeout(discussionTimer, 500);
        }
    }, [data.isStarted]);

    useEffect(() => {
        if (true === data.isVote) {
            setTimeout(discussionTimer, 500);
        }
    }, [data.isVote]);

    return (
        <div>
            {null !== data.post ? <div>{data.post.positive.userId}/{data.post.negative.userId}/{data.post.watchers.length}</div> : null}
            {data.state === process.env.userState.select ? <Select title={data.post.title} detail={data.post.detail} onJoin={onJoin} onCancel={onCancel} message={data.message} /> : null}
            {data.state === process.env.userState.join ? < Join /> : null}
            {data.state === process.env.userState.standby ? <Standby /> : null}
            {data.state === process.env.userState.ready ? <Ready /> : null}
            {data.state === process.env.userState.online ? < Online finishTime={data.limitTime} currentTime={data.currentTime} /> : null}
            {data.state === process.env.userState.finish ? <Finish /> : null}
            {data.state === process.env.userState.vote ? <Vote type={data.joinType} setVotindDone={setVotindDone} limitTime={data.limitTime} currentTime={data.currentTime} /> : null}
            {data.state === process.env.userState.votingDone ? <VotingDone /> : null}
        </div>
    );
}
