export const progress = {
    none: 'none',
    standby: 'standby',
    ready: 'ready',
    discussion: 'discussion',
    vote: 'vote',
    result: 'result'
};

export const userState = {
    none: 'none',
    join: 'join',
    standby: 'standby',
    ready: 'ready',
    online: 'online',
    finish: 'finish',
    vote: 'vote',
    votingDone: 'votingDone'
};

export const userJoinType = {
    positive: 'positive',
    negative: 'negative',
    watcher: 'watcher',
};

export const userResultType = {
    win: 0,
    lose: 1,
    draw: 2
};

export const userNorify = {
    notifyStandbyRequest: 'notifyStandbyRequest',
    notifyReadyRequest: 'notifyReadyRequest',
    notifyStartRequest: 'notifyStartRequest',
    notifyVoteRequest: 'notifyVoteRequest',
    notifyResultRequest: 'notifyResultRequest',
    notifyJoinImpossibleRequest: 'notifyJoinImpossibleRequest',
    notifyDiscussionStatus: 'notifyDiscussionStatus'
};
