import { pushInfomation } from "../../../api/infomation";

export default async function handler(req, res) {
    const { country, name, mail, detail } = JSON.parse(req.body);
    const response = await pushInfomation(country, name, mail, detail);
    res.status(200).json({ response });
}
