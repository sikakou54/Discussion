import AWS from 'aws-sdk';
AWS.config.apiVersions = {
    chime: '2018-05-01',
    // other service API versions
};
AWS.config.credentials = new AWS.Credentials('AKIAZM7CB6TBRTQFX45K', 'ScElcNk7urEGak0unfLutQAG6Mvf2a5G/w4/1+oB', null);
const chime = new AWS.Chime({ region: 'us-east-1' });
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');
import { sleep } from './utils.js';

function isChimeRetry(statusCode, code) {

    let result = false;

    if (429 === statusCode && 'ThrottlingException' === code ||
        400 === statusCode && 'LimitExceededException' === code ||
        500 === statusCode && 'ServiceFailureException' === code ||
        503 === statusCode && 'ServiceUnavailableException') {
        result = true;
    }

    return result;
}

export async function createMeeting(_postId) {

    let retry = 0;
    let meeting = null;

    while (true) {

        try {

            meeting = await chime.createMeeting({
                ClientRequestToken: _postId,
                ExternalMeetingId: _postId,
                MediaRegion: 'us-east-1'
            }).promise();
            break;

        } catch (e) {
            console.error('createMeeting', JSON.stringify(e));
            if (isChimeRetry(e.statusCode, e.code)) {
                await sleep(retry * 10);
            } else {
                break;
            }
        }

        retry++;
    }

    return meeting;
}

export async function createAttendee(_meetingId, _externalUserId) {

    let retry = 0;
    let attendee = null;

    while (true) {

        try {

            attendee = await chime.createAttendee({
                MeetingId: _meetingId,
                ExternalUserId: _externalUserId,
            }).promise();
            break;

        } catch (e) {
            console.error('createAttendee', JSON.stringify(e));
            if (isChimeRetry(e.statusCode, e.code)) {
                await sleep(retry * 10);
            } else {
                break;
            }
        }

        retry++;
    }

    return attendee;
}

export async function deleteMeeting(_meetingId) {

    let retry = 0;

    while (true) {

        try {

            await chime.deleteMeeting({
                MeetingId: _meetingId
            }).promise();
            break;

        } catch (e) {
            console.error('deleteMeeting', JSON.stringify(e));
            if (isChimeRetry(e.statusCode, e.code)) {
                await sleep(retry * 10);
            } else {
                break;
            }
        }

        retry++;
    }

}
