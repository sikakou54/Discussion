import { Put } from './dynamoDb';
import { getToken, getUtcMsec } from './utils';

export async function pushInfomation(_name, _mail, _detail) {

    const token = getToken();

    return await Put({
        TableName: 'TABLE_INFOMATION',
        Item: {
            infoId: token,
            createAt: getUtcMsec(),
            name: _name,
            mail: _mail,
            detail: _detail
        }
    });
}
