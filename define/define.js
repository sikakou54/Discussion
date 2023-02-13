export const actions = {
    state: {
        select: 1,
        join: 2,
        standby: 3,
        ready: 4,
        online: 5,
        finish: 6,
        vote: 7,
        votingDone: 8,
        result: 9
    },
    changeCurrentTime: 10,
    changeSocketId: 11,
    attendees: 12,
    start: 13,
    timeout: 14,
    vote: 15,
    changeMeetingEventName: 16,
    changeWebsocketStatus: 17,
    changeDiscusionStatus: 18,
    keepalive: 19
};

export const discusionStatus = {
    websocketDisconnect: 1,
    discussionJoinFailed: 2,
    discussionFailed: 3,
    discussionStartFailed: 4,
    discussionResultShow: 5,
    returnPosts: 6,
    websocketError: 7,
};

export const websocketStatus = {
    open: 1,
    close: 2
};

export const discussionErrorMsg = {
    websocketDisconnect: '通信が切断されました',
    discussionJoinFailed: '討論の参加に失敗しました',
    discussionFailed: '討論が異常終了しました',
    discussionStartFailed: '討論の参加に失敗しました',
    websocketError: '通信エラーが発生しました',
}

export const discussionErrorCode = {
    websocketDisconnect: 1,
    discussionJoinFailed: 2,
    discussionFailed: 3,
    discussionStartFailed: 4,
    websocketError: 5,
}
