// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { putRecored } from "../../../api/kinesis"

export default async function handler(req, res) {
    const data = await putRecored();
    res.status(200).json({ result: data });
}
