import { getDiscussion } from "../../../../api/discussion";

export default async function handler(req, res) {
    const { postId } = req.query;
    const discussion = await getDiscussion(Number(postId));
    res.status(200).json({ discussion });
}