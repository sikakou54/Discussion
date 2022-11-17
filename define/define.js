export const actions = {
    state: {
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