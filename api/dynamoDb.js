import AWS from 'aws-sdk';
AWS.config.update({ region: 'ap-northeast-1' });
AWS.config.credentials = new AWS.Credentials('AKIAZM7CB6TBRTQFX45K', 'ScElcNk7urEGak0unfLutQAG6Mvf2a5G/w4/1+oB', null);
const dynamo = new AWS.DynamoDB.DocumentClient();
import { sleep } from './utils';
const type = {
    put: 0,
    update: 1,
    delete: 2,
    query: 3,
    get: 4,
    transWrite: 5,
    transGet: 6
};

function isDynamoDbRetry(statusCode, code) {

    let result = false;

    // 400系エラーの場合
    if (400 === statusCode) {

        // スループット系スロットリング系のエラーの場合はスリープ後にリトライする
        if ('ProvisionedThroughputExceeded' === code ||
            'ProvisionedThroughputExceededException' === code ||
            'RequestLimitExceeded' === code ||
            'ThrottlingException' === code) {
            result = true;
        }

        // 503系エラーの場合
    } else if (503 === statusCode) {
        result = true;
    } else {
        result = false;
    }

    return result;
}

async function dynamoDbWrapper(_type, _params) {

    let data = null;

    switch (_type) {

        case type.put:
            data = await dynamo.put(_params).promise();
            break;

        case type.update:
            data = await dynamo.update(_params).promise();
            break;

        case type.delete:
            data = await dynamo.delete(_params).promise();
            break;

        case type.query:
            data = await dynamo.query(_params).promise();
            break;

        case type.get:
            data = await dynamo.get(_params).promise();
            break;

        case type.transWrite:
            data = await dynamo.transactWrite({ TransactItems: _params }).promise();
            break;

        case type.transGet:
            data = await dynamo.transactGet({ TransactItems: _params }).promise();
            break;

        default:
            break;
    }

    return data;
}

async function dynamoHandler(_type, _params) {

    let retry = 0;
    let obj = {
        result: false,
        data: null,
        error: null
    };

    while (true) {

        try {

            // update
            const data = await dynamoDbWrapper(_type, _params);

            // 戻り値を設定する
            obj.result = true;
            obj.data = data;
            obj.error = null;
            break;

        } catch (e) {

            console.error('dynamoHandler', _type, _params, JSON.stringify(e));

            obj.result = false;
            obj.data = null;
            obj.error = e;

            if (isDynamoDbRetry(e.statusCode, e.code)) {
                await sleep(retry * 10);
            } else {
                break;
            }

        }

        retry++;
    }

    return obj;
}

export async function Put(_params) {
    return await dynamoHandler(type.put, _params);
}

export async function Delete(_params) {
    return await dynamoHandler(type.delete, _params);
}

export async function Update(_params) {
    return await dynamoHandler(type.update, _params);
}

export async function Query(_params) {
    return await dynamoHandler(type.query, _params);
}

export async function Get(_params) {
    return await dynamoHandler(type.get, _params);
}

export async function TransWrite(_params) {
    return await dynamoHandler(type.transWrite, _params);
}

export async function TransGet(_params) {
    return await dynamoHandler(type.transGet, _params);
}
