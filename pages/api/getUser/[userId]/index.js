import { getUser } from "../../../../api/discussion";

export default async function handler(req, res) {
    const { userId } = req.query;
    const user = await getUser(userId);
    res.status(200).json({ user });
}

