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
import UserStautsView from './sideView';
import { getTimeStamp } from '../api/utils';
import { actions, discusionStatus, discussionErrorCode, websocketStatus } from '../define/define';
import {
    useMeetingManager,
    useMeetingEvent,
    DeviceLabels
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import styles from '../styles/Discussion.module.css';

const reducer = (state, action) => {

    switch (action.type) {

        case actions.state.select:
            return {
                ...state,
                state: process.env.userState.select
            };

        case actions.state.join:
            return {
                ...state,
                state: process.env.userState.join,
                joinType: action.payload.joinType
            };

        case actions.state.standby:
            return {
                ...state,
                state: process.env.userState.standby,
                isStarted: false,
                isVote: false,
                isTimerEnable: false,
                currentTime: 0,
                limitTime: 0
            };

        case actions.state.ready:
            return {
                ...state,
                state: process.env.userState.ready,
                meetingSessionConfiguration: {
                    Meeting: action.payload.config.Meeting,
                    Attendee: action.payload.config.Attendee,
                }
            };

        case actions.state.online:
            return {
                ...state,
                state: process.env.userState.online
            };

        case actions.state.finish:
            return {
                ...state,
                state: process.env.userState.finish,
                isStarted: false,
                isTimerEnable: false
            };

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

        case actions.state.votingDone:
            return {
                ...state,
                state: process.env.userState.votingDone,
                isVote: false,
                isTimerEnable: false,
            };

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

        case actions.changeCurrentTime:
            return {
                ...state,
                currentTime: action.payload.currentTime
            };

        case actions.changeSocketId:
            return {
                ...state,
                socketId: action.payload.socketId
            };

        case actions.start:
            return {
                ...state,
                isStarted: true,
                isTimerEnable: true,
                isTimeout: false,
                limitTime: action.payload.limitTime,
                currentTime: getTimeStamp()
            };

        case actions.timeout:
            return {
                ...state,
                isTimeout: true
            };

        case actions.vote:
            return {
                ...state,
                judge: action.payload.judge
            };

        case actions.attendees:
            return {
                ...state,
                attendees: {
                    positive: action.payload.attendees.positive,
                    negative: action.payload.attendees.negative,
                    watchers: action.payload.attendees.watchers
                }
            };

        case actions.changeMeetingEventName:
            return {
                ...state,
                meetingEventName: action.payload.meetingEventName
            };

        case actions.changeWebsocketStatus:
            return {
                ...state,
                websocketStatus: action.payload.websocketStatus
            };

        case actions.changeDiscusionStatus:
            return {
                ...state,
                discusionStatus: action.payload.discusionStatus
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
        state: undefined,
        userId: userId,
        postId: discussion.postId,
        country: discussion.country,
        attendees: {
            positive: discussion.positive,
            negative: discussion.negative,
            watchers: discussion.watchers
        },
        joinType: 0,
        socketId: undefined,
        meetingSessionConfiguration: {},
        isVote: false,
        isStarted: false,
        isTimeout: false,
        isTimerEnable: false,
        limitTime: 0,
        currentTime: 0,
        judge: undefined,
        result: {
            win: undefined,
            positive: 0,
            negative: 0
        },
        meetingEventName: undefined,
        message: null,
        discusionStatus: undefined,
        websocketStatus: undefined
    });
    const meetingManager = useMeetingManager();
    const meetingEvent = useMeetingEvent();

    async function sendMessage(action, data) {

        if (socket.current && socket.current.readyState === 1) {
            socket.current.send(JSON.stringify({ action, data }));
        } else {
            changeDiscussionStatus(discusionStatus.websocketDisconnect);
        }
    }

    async function webSocketOpen(event) {

        console.log('webSocketOpen', event);

        dispatch({
            type: actions.changeWebsocketStatus,
            payload: {
                websocketStatus: websocketStatus.open
            }
        });
    }

    function webSocketClose(event) {

        console.log('webSocketClose', event);

        dispatch({
            type: actions.changeWebsocketStatus,
            payload: {
                websocketStatus: websocketStatus.close
            }
        });
    }

    function webSocketError(event) {

        console.error('error', event);

        changeDiscussionStatus(discusionStatus.websocketError);
    }

    function webSocketMessage(event) {

        console.log('webSocketMessage', event);

        const { notify, data } = JSON.parse(event.data);

        switch (notify) {

            case 'notifySocketIdResponse':
                dispatch({
                    type: actions.changeSocketId,
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
                changeDiscussionStatus(discusionStatus.discussionJoinFailed);
                break;

            default:
                break;
        }
    }

    function setupWebSocket() {
        socket.current = new WebSocket(process.env.awsApiGatewayWebSocketApiEndPoint);
        socket.current.onopen = webSocketOpen;
        socket.current.onclose = webSocketClose;
        socket.current.onmessage = webSocketMessage;
        socket.current.onerror = webSocketError;
    }

    function cleanUpWebSocket() {
        if (null !== socket.current) {
            socket.current.onopen = null;
            socket.current.onclose = null;
            socket.current.onmessage = null;
            socket.current.onerror = null;
            socket.current.close();
            socket.current = null;
        }
    }

    async function joinDiscussion(_type, _country, _postId, _socketId, _userId) {

        let action = undefined;

        if (_type === 1) action = 'joinDiscussionPositive';
        if (_type === 2) action = 'joinDiscussionNegative';
        if (_type === 3) action = 'joinDiscussionWatcher';

        await sendMessage(action, {
            country: _country,
            postId: _postId,
            joinType: _type,
            userId: _userId,
            socketId: _socketId
        });
    }

    async function setDiscussionState(_type, _country, _postId, _socketId, _userId, _state) {

        let action = undefined;

        if (_type === 1) action = 'setDiscussionPositive';
        if (_type === 2) action = 'setDiscussionNegative';
        if (_type === 3) action = 'setDiscussionWatcher';

        await sendMessage(action, {
            country: _country,
            postId: _postId,
            userId: _userId,
            socketId: _socketId,
            state: _state
        });
    }

    async function setVote(_country, _postId, _socketId, _userId, _judge) {
        await sendMessage('setVote', {
            country: _country,
            postId: _postId,
            socketId: _socketId,
            userId: _userId,
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
    }

    async function changedStateJoin() {
        setupWebSocket();
    }

    async function changedStateStandby() {
        await meetingManager.leave();
        await setDiscussionState(data.joinType, data.country, data.postId, data.socketId, data.userId, process.env.userState.standby);
    }

    async function changedStateReady() {
        await startMeeting(data.joinType);
    }

    async function changedStateOnline() {
        await setDiscussionState(data.joinType, data.country, data.postId, data.socketId, data.userId, process.env.userState.online);
    }

    async function changedStateFinish() {
        await meetingManager.leave();
    }

    async function changedStateVote() { }

    async function changedStateVotingDone() {
        if (3 === data.joinType) {
            await setDiscussionState(data.joinType, data.country, data.postId, data.socketId, data.userId, process.env.userState.votingDone);
        }
    }

    async function changedStateResult() {
        changeDiscussionStatus(discusionStatus.discussionResultShow);
    }

    function discussionTimer() {
        dispatch({
            type: actions.changeCurrentTime,
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

    function changedMeetingEventName(meetingEventName) {
        dispatch({
            type: actions.changeMeetingEventName,
            payload: {
                meetingEventName: meetingEventName
            }
        });
    }

    function changeDiscussionStatus(status) {
        dispatch({
            type: actions.changeDiscusionStatus,
            payload: {
                discusionStatus: status
            }
        });
    }

    useEffect(() => {

        return () => {
            window.onbeforeunload = null;
            cleanUpWebSocket();
        };

    }, []);

    useEffect(() => {

        if (undefined !== data.socketId) {
            joinDiscussion(data.joinType, data.country, data.postId, data.socketId, data.userId);
        }

    }, [data.socketId]);

    useEffect(() => {

        console.log(data.state);

        switch (data.state) {

            case undefined:
                dispatch({
                    type: actions.state.select
                });
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
                dispatch({ type: actions.timeout });
            } else {
                setTimeout(discussionTimer, 250);
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

        if (data.isStarted || data.isVote) {
            setTimeout(discussionTimer, 250);
        }

    }, [data.isStarted, data.isVote]);

    useEffect(() => {

        if (undefined !== data.judge) {
            setVote(data.country, data.postId, data.socketId, data.userId, data.judge);
        }

    }, [data.judge]);

    useEffect(() => {

        if (undefined !== meetingEvent) {
            changedMeetingEventName(meetingEvent.name);
        }

    }, [meetingEvent]);

    useEffect(() => {

        if (process.env.userState.ready === data.state) {
            if ('meetingStartSucceeded' === data.meetingEventName) {
                dispatch({ type: actions.state.online });
            } else if ('meetingStartFailed' === data.meetingEventName) {
                changeDiscussionStatus(discusionStatus.discussionStartFailed);
            }
        } else if (process.env.userState.finish === data.state && 'meetingEnded' === data.meetingEventName) {
            setDiscussionState(data.joinType, data.country, data.postId, data.socketId, data.userId, process.env.userState.finish);
        }

        if ('meetingFailed' === data.meetingEventName) {
            changeDiscussionStatus(discusionStatus.discussionFailed);
        }

    }, [data.meetingEventName]);

    useEffect(() => {

        if (undefined !== data.discusionStatus) {

            // ???????????????????????????
            if (socket.current && socket.current.readyState === 1) {
                socket.current.close();
            }
        }

    }, [data.discusionStatus]);

    useEffect(() => {

        if (undefined !== data.websocketStatus) {

            // ?????????????????????
            if (websocketStatus.close == data.websocketStatus) {

                if (discusionStatus.discussionStartFailed === data.discusionStatus) {

                    Router.push({
                        pathname: 'error',
                        query: {
                            code: discussionErrorCode.discussionStartFailed
                        }
                    });

                } else if (discusionStatus.discussionFailed === data.discusionStatus) {

                    Router.push({
                        pathname: 'error',
                        query: {
                            code: discussionErrorCode.discussionFailed
                        }
                    });

                } else if (discusionStatus.discussionJoinFailed === data.discusionStatus) {

                    Router.push({
                        pathname: 'error',
                        query: {
                            code: discussionErrorCode.discussionJoinFailed
                        }
                    });

                } else if (discusionStatus.websocketDisconnect === data.discusionStatus || discusionStatus.websocketError === data.discusionStatus) {

                    Router.push({
                        pathname: 'error',
                        query: {
                            code: discussionErrorCode.websocketDisconnect
                        }
                    });

                } else if (discusionStatus.discussionResultShow === data.discusionStatus) {

                    // ????????????
                    Router.push({
                        pathname: 'result',
                        query: {
                            win: data.result.win,
                            positive: data.result.positive,
                            negative: data.result.negative
                        }
                    });

                } else {

                    // ???????????????????????????????????????????????????????????????????????????
                    Router.push({
                        pathname: 'error',
                        query: {
                            code: discussionErrorCode.websocketDisconnect
                        }
                    });
                }

                // ?????????????????????
            } else if (websocketStatus.open == data.websocketStatus) {

                // ????????????ID?????????
                sendMessage('getSocketId', null);
            }

            changeDiscussionStatus(undefined);
        }

    }, [data.websocketStatus]);

    if (undefined !== data.state) {

        return (
            <div className={styles.page}>
                <div className={styles.titleField}>
                    <h1>{discussion.title}</h1>
                    {/* <div>{discussion.detail}</div> */}
                    {/* <div>{data.attendees.positive.userId}/{data.attendees.negative.userId}/{data.attendees.watchers.length}</div>*/}
                </div>
                <div className={styles.main}>
                    {data.state === process.env.userState.select ? <Select onJoin={onJoin} attendees={data.attendees} /> : null}
                    {data.state === process.env.userState.join ? < Join /> : null}
                    {data.state === process.env.userState.standby ? <Standby /> : null}
                    {data.state === process.env.userState.ready ? <Ready /> : null}
                    {data.state === process.env.userState.online ? < Online finishTime={data.limitTime} currentTime={data.currentTime} /> : null}
                    {data.state === process.env.userState.finish ? <Finish /> : null}
                    {data.state === process.env.userState.vote ? <Vote type={data.joinType} setVotindDone={setVotindDone} limitTime={data.limitTime} currentTime={data.currentTime} /> : null}
                    {data.state === process.env.userState.votingDone ? <VotingDone /> : null}
                </div>
                {/* <div>{data.message}</div>*/}
            </div>
        );

    } else {
        return null;
    }
}
