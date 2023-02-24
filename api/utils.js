export async function apiFetchPost(url, params) {

    console.log(params);

    return new Promise(async (resolve) => {

        let res = null;
        let obj = {
            result: false,
            data: null,
            statusCode: 400
        };

        while (true) {

            try {
                // POSTリクエスト
                res = await fetch(url, { method: 'POST', body: JSON.stringify(params) });

                // レスポンスが正常の場合
                if (res.ok) {

                    // 戻り値を設定する
                    obj = {
                        result: true,
                        data: res.body,
                        statusCode: res.status
                    };

                    break;

                    //503以外の場合はエラーとしリトライしない
                } else if (503 !== res.status) {

                    console.error('apiFetchPost', res.status, res.statusText, url, params);

                    // 戻り値を設定する
                    obj = {
                        result: false,
                        data: res.statusText,
                        statusCode: res.status
                    };

                    break;

                } else {

                    //503の場合はエラーとしリトライする
                    console.log('apiFetchPost', 'retry', res.status, res.statusText, url, params);
                }

            } catch (e) {

                console.error('apiFetchPost', e, url, params);

                // 戻り値を設定する
                obj = {
                    result: false,
                    data: e,
                    statusCode: 400
                };

                break;
            }
        }

        // 返却する
        resolve(obj);
    });
}

export async function apiFetchGet(url, params) {

    return new Promise(async (resolve) => {

        let res = null;
        let json = null;
        let obj = {
            result: false,
            data: null,
            statusCode: 400
        };

        while (true) {

            try {

                // GETリクエスト
                res = await fetch(url, { method: 'GET', body: JSON.stringify(params) });

                // レスポンスが正常の場合
                if (res.ok) {

                    // jsonを取得する
                    json = await res.json();

                    // 戻り値を設定する
                    obj = {
                        result: true,
                        data: json,
                        statusCode: res.status
                    };

                    break;

                    //503以外の場合はエラーとしリトライしない
                } else if (503 !== res.status) {

                    console.error('apiFetchGet', res.status, res.statusText, url);

                    // 戻り値を設定する
                    obj = {
                        result: false,
                        data: res.statusText,
                        statusCode: res.status
                    };

                    break;

                } else {

                    //503の場合はエラーとしリトライする
                    console.log('apiFetchGet', 'retry', res.status, res.statusText, url);
                }

            } catch (e) {

                console.error('apiFetchGet', e, url);

                // 戻り値を設定する
                obj = {
                    result: false,
                    data: e,
                    statusCode: 400
                };

                break;
            }
        }

        // 返却する
        resolve(obj);
    });
}

export function getTimeStamp(offset = 0) {
    return (new Date()).getTime() + offset;
}

export function getTimeStampToLocaleString(utcTime) {
    return (new Date(utcTime + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000))).toLocaleString();
}