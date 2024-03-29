import AWS from 'aws-sdk';
AWS.config.credentials = new AWS.Credentials('AKIAZM7CB6TBRTQFX45K', 'ScElcNk7urEGak0unfLutQAG6Mvf2a5G/w4/1+oB', null);
import { sleep } from './utils.js';
const apiGateway = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: 'vx92a3mpjf.execute-api.ap-northeast-1.amazonaws.com/production'
});

export async function notifys(_dests, _data) {

    let users = [];

    for (let i = 0; i < _dests.length; i++) {
        users.push(new Promise(async (resolve) => {
            await notify(_dests[i].socketId, _data);
            resolve(true);
        }));
    }

    if (0 < users.length) {
        await Promise.all(users);
    }
}

export async function notify(_socketId, _data) {

    let retry = 0;

    while (true) {

        try {

            // コネクション確認
            const connection = await apiGateway.getConnection({
                ConnectionId: _socketId
            }).promise();

            // コネクションがあれば通知する
            if (null !== connection) {
                await apiGateway.postToConnection({
                    Data: JSON.stringify(_data),
                    ConnectionId: _socketId
                }).promise();
            }
            break;

        } catch (e) {

            console.error('notify', _socketId, _data, JSON.stringify(e));

            if (429 === e.statusCode ||
                400 === e.statusCode && 'ThrottlingException' === e.code ||
                503 === e.statusCode && 'ServiceUnavailable' === e.code) {

                // 待機する( リトライ回数 * 10msec )
                await sleep(retry * 10);

            } else {
                break;
            }
        }

        // リトライ回数をインクリメントする
        retry++;
    }

}
