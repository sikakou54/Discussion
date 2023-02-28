import { setDiscussion } from "../../../api/discussion";

export default async function handler(req, res) {
    const { country, postId, userId, title, detail, positiveText, negativeText } = JSON.parse(req.body);
    const response = await setDiscussion(country, Number(postId), userId, title, detail, positiveText, negativeText);
    res.status(200).json({ response });
}






