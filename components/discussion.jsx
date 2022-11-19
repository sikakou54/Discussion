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
import { apiFetchPost, getTimeStamp } from '../api/api';
import { actions } from '../define/define';
import {
    useMeetingManager,
    DeviceLabels
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';

const reducer = (state, action) => {

    switch (action.type) {

        // select
        case actions.state.select:
            return {
                ...state,
                state: process.env.userState.select,
                message: action.payload.message
            };

        // join
        case actions.state.join:
            return {
                ...state,
                state: process.env.userState.join,
                joinType: action.payload.joinType
            };

        // standby
        case actions.state.standby:
            return {
                ...state,
                state: process.env.userState.standby,
                isStarted: false,
                isVote: false,
                isTimerEnable: false,
                currentTime: 0
            };

        // ready
        case actions.state.ready:
            return {
                ...state,
                state: process.env.userState.ready,
                meetingSessionConfiguration: {
                    Meeting: action.payload.config.Meeting,
                    Attendee: action.payload.config.Attendee,
                }
            };

        // online
        case actions.state.online:
            return {
                ...state,
                state: process.env.userState.online
            };

        // finish
        case actions.state.finish:
            return {
                ...state,
                state: process.env.userState.finish,
                isStarted: false,
                isTimerEnable: false
            };

        // vote
        case actions.state.vote:
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
        case actions.state.votingDone:
            return {
                ...state,
                state: process.env.userState.votingDone,
                isVote: false,
                isTimerEnable: false,
            };

        // result
        case actions.state.result:
            return {
                ...state,
                state: process.env.userState.result,
                result: {
                    win: action.payload.result.win,
                    positive: action.payload.result.positive,
                    negative: action.payload.result.negative
                }
            };

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

        // update
        case actions.changeSocketId.update:
            return {
                ...state,
                socketId: action.payload.socketId
            };

        // start
        case actions.start:
            return {
                ...state,
                isStarted: true,
                isTimerEnable: true,
                isTimeout: false,
                limitTime: action.payload.limitTime,
                currentTime: getTimeStamp()
            };

        // timer.timeout
        case actions.timer.timeout:
            return {
                ...state,
                isTimeout: true
            };

        // vote
        case actions.vote:
            return {
                ...state,
                judge: action.payload.judge
            };

        // attendees
        case actions.attendees:
            return {
                ...state,
                attendees: {
                    positive: action.payload.attendees.positive,
                    negative: action.payload.attendees.negative,
                    watchers: action.payload.attendees.watchers
                }
            };

        default:
            return {
                ...state
            };
    }
};

export default function Discussion({ discussion, userId }) {

    const socket = useRef(null);
    const [data, dispatch] = useReducer(reducer, {
        state: process.env.userState.none,
        userId: userId,
        postId: discussion.postId,
        country: discussion.country,
        attendees: {
            positive: discussion.positive,
            negative: discussion.negative,
            watchers: discussion.watchers
        },
        joinType: 0,
        socketId: 'none',
        meetingSessionConfiguration: {},
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

    async function sendMessage(action, data) {
        if (socket.current && socket.current.readyState === 1) {
            socket.current.send(JSON.stringify({ action, data }));
        } else {
            console.error('socket error', socket.current);
        }
    }

    async function webSocketOpen(event) {
        console.log('open', event);
        await sendMessage('getSocketId', null);
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
                dispatch({
                    type: actions.state.standby,
                    payload: null
                });
                break;

            case 'notifyReadyRequest':
                dispatch({
                    type: actions.state.ready,
                    payload: {
                        config: data.config
                    }
                });
                break;

            case 'notifyVoteRequest':
                dispatch({
                    type: actions.state.vote,
                    payload: {
                        limitTime: data.limitTime
                    }
                });
                break;

            case 'notifyResultRequest':
                dispatch({
                    type: actions.state.result,
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
                dispatch({
                    type: actions.attendees,
                    payload: {
                        attendees: data.attendees
                    }
                });
                break;

            case 'notifyJoinImpossibleRequest':
                await updateSelect('参加できません＿|￣|○');
                break;

            default:
                break;
        }
    }

    async function webSocketError(event) {
        console.error('error', event);
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

        // error
        socket.current.addEventListener('error', webSocketError);
    }

    async function joinDiscussion(_type, _country, _postId, _socketId, _userId) {

        let action = '';

        if (_type === 1) action = 'joinDiscussionPositive';
        if (_type === 2) action = 'joinDiscussionNegative';
        if (_type === 3) action = 'joinDiscussionWatcher';

        // 参加を通知する
        await sendMessage(action, {
            country: _country,
            postId: _postId,
            joinType: _type,
            userId: _userId,
            socketId: _socketId
        });
    }

    async function setDiscussionState(_type, _country, _postId, _socketId, _state) {

        let action = '';

        if (_type === 1) action = 'setDiscussionPositive';
        if (_type === 2) action = 'setDiscussionNegative';
        if (_type === 3) action = 'setDiscussionWatcher';

        // ユーザー状態を通知する
        await sendMessage(action, {
            country: _country,
            postId: _postId,
            socketId: _socketId,
            state: _state
        });
    }

    async function setVote(_country, _postId, _socketId, _judge) {

        // 投票結果を通知する
        await sendMessage('setVote', {
            country: _country,
            postId: _postId,
            socketId: _socketId,
            judge: _judge
        });
    }

    function onJoin(type) {
        dispatch({
            type: actions.state.join,
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

        dispatch({ type: actions.state.online });
    }

    async function changedStateJoin() {
        setupWebSocket();
    }

    async function changedStateStandby() {
        await meetingManager.leave();
        await setDiscussionState(data.joinType, data.country, data.postId, data.socketId, process.env.userState.standby);
    }

    async function changedStateReady() {
        await setDiscussionState(data.joinType, data.country, data.postId, data.socketId, process.env.userState.ready);
        await startMeeting(data.joinType);
    }

    async function changedStateOnline() {
        await setDiscussionState(data.joinType, data.country, data.postId, data.socketId, process.env.userState.online);
    }

    async function changedStateFinish() {
        await meetingManager.leave();
        await setDiscussionState(data.joinType, data.country, data.postId, data.socketId, process.env.userState.finish);
    }

    async function changedStateVote() {
        await setDiscussionState(data.joinType, data.country, data.postId, data.socketId, process.env.userState.vote);
    }

    async function changedStateVotingDone() {
        if (3 === data.joinType) {
            await setVote(data.country, data.postId, data.socketId, data.judge);
            await setDiscussionState(data.joinType, data.country, data.postId, data.socketId, process.env.userState.votingDone);
        }
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

        // ソケットを切断する
        if (socket.current && socket.current.readyState === 1) {
            socket.current.close();
        }

        // 選択画面に遷移する
        dispatch({
            type: actions.state.select,
            payload: {
                message: message
            }
        });
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

        async function changeSocketId() {

            //let result = false;

            if ('none' !== data.socketId) {

                await joinDiscussion(data.joinType, data.country, data.postId, data.socketId, data.userId);
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
                dispatch({ type: actions.state.finish });
            }
            if (data.state === process.env.userState.vote) {
                dispatch({ type: actions.state.votingDone });
            }
        }

    }, [data.isTimeout]);

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
            <h1>{discussion.title}</h1>
            <p>{discussion.detail}</p>
            <div>{data.attendees.positive ? data.attendees.positive.userId : 'none'}/{data.attendees.negative ? data.attendees.negative.userId : 'none'}/{data.attendees.watchers.length}</div>
            {data.state === process.env.userState.select ? <Select onJoin={onJoin} onCancel={onCancel} message={data.message} /> : null}
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
