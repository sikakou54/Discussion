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
        update: 0x11
    },
    changeSocketId: {
        update: 0x21
    },
    attendees: 0x31,
    start: 0x41,
    timer: {
        timeout: 0x51
    },
    vote: 0x61,
    changeMeetingEventName: 0x71
};