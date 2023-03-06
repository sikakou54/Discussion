import AWS from 'aws-sdk';
AWS.config.apiVersions = {
    kinesis: '2013-12-02',
    // other service API versions
};
AWS.config.credentials = new AWS.Credentials('AKIAZM7CB6TBRTQFX45K', 'ScElcNk7urEGak0unfLutQAG6Mvf2a5G/w4/1+oB', null);
const kinesis = new AWS.Kinesis({ region: 'ap-northeast-1' });
import { getToken } from './utils';

export async function putRecored(_cmd, _params) {

    let result = null;
    const uid = getToken();
    const params = {
        Data: Buffer.from(JSON.stringify({
            cmd: _cmd,
            data: { ..._params }
        })) || uid/* Strings will be Base-64 encoded on your behalf */, /* required */
        PartitionKey: 'sample', /* required */
        StreamARN: 'arn:aws:kinesis:ap-northeast-1:646329791683:stream/sample',
        StreamName: 'sample'
    };

    try {
        result = await kinesis.putRecord(params).promise();
    } catch (error) {
        result = error
    }

    return result;
}