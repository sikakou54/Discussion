// server.js
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { getDiscussions } from '../api/discussion.js'
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// ミドルウェアを利用する場合、 `hostname` と `port` を以下のように提供する必要があります。
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

let discussions = null
let flg = false;

setInterval(async () => {
    //console.log('setInterval', flg);
    if (!flg) {
        flg = !flg;
        discussions = await getDiscussions('jpn', null);
        flg = !flg;
    }
}, 1000);

app.prepare().then(() => {

    createServer(async (req, res) => {

        try {
            // `url.parse` の2番目の引数として必ず `true` を渡してください。
            // これは、URLのクエリ部分を解析するように指示します。
            const parsedUrl = parse(req.url, true);
            const { pathname } = parsedUrl;

            if (pathname === '/api/getDiscussions') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(discussions));
            } else {
                await handle(req, res, parsedUrl);
            }
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }

    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://${hostname}:${port}`);
    })
})