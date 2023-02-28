import { setUser } from "../../../api/discussion";

export default async function handler(req, res) {
    const { userId, userName } = JSON.parse(req.body);
    const response = await setUser(userId, userName);
    res.status(200).json({ response });
}
