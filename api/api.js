export async function apiFetchPost(url, params) {

    return new Promise(async (resolve) => {

        let res = null;
        let retry = true;
        let obj = {
            status: false,
            data: null
        };

        while (retry) {

            try {

                // POSTリクエスト
                res = await fetch(url, { method: 'POST', ...params });

                // レスポンスが正常の場合
                if (res.ok) {

                    // 戻り値を設定する
                    obj = {
                        status: true,
                        data: res.body,
                        statusCode: res.status
                    }

                    // リトライしない
                    retry = false;

                    //503以外の場合はエラーとしリトライしない
                } else if (503 !== res.status) {

                    // 戻り値を設定する
                    obj = {
                        status: false,
                        data: res.statusText,
                        statusCode: res.status
                    }

                    // リトライしない
                    retry = false;

                    console.error('apiFetchPost', res.status, res.statusText, url, params);

                } else {
                    //503の場合はエラーとしリトライする
                    console.log('apiFetchPost', 'retry', res.status, res.statusText, url, params);
                }

            } catch (e) {

                // 戻り値を設定する
                obj = {
                    status: false,
                    data: e,
                    statusCode: 400
                }

                // リトライしない
                retry = false;

                console.error('apiFetchPost', e, url, params);
            }
        }

        // 返却する
        resolve({ ...obj });
    });
}

export async function apiFetchGet(url, params) {

    return new Promise(async (resolve) => {

        let res = null;
        let retry = true;
        let json = null;
        let obj = {};

        while (retry) {

            try {

                // GETリクエスト
                res = await fetch(url, { method: 'GET', ...params });

                // レスポンスが正常の場合
                if (res.ok) {

                    // jsonを取得する
                    json = await res.json();

                    // 戻り値を設定する
                    obj = {
                        status: true,
                        data: json,
                        statusCode: res.status
                    };

                    // リトライしない
                    retry = false;

                    //503以外の場合はエラーとしリトライしない
                } else if (503 !== res.status) {

                    // 戻り値を設定する
                    obj = {
                        status: false,
                        data: res.statusText,
                        statusCode: res.status
                    };

                    // リトライしない
                    retry = false;

                    console.error('apiFetchGet', res.status, res.statusText, url);

                } else {
                    //503の場合はエラーとしリトライする
                    console.log('apiFetchGet', 'retry', res.status, res.statusText, url);
                }

            } catch (e) {

                // 戻り値を設定する
                obj = {
                    status: false,
                    data: e,
                    statusCode: 400
                };

                // リトライしない
                retry = false;

                console.error('apiFetchGet', e, url);
            }
        }

        // 返却する
        resolve({ ...obj });
    });
}

export function getTimeStamp(offset = 0) {
    return (new Date()).getTime() + offset;
}