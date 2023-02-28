import { getDiscussions } from '../../../../../api/discussion';

export default async function handler(req, res) {

    const { country, postId } = req.query;
    let discussions = {};

    if ('none' !== postId) {
        discussions = await getDiscussions(country, {
            country,
            postId: Number(postId)
        });
    } else {
        discussions = await getDiscussions(country, null);
    }

    res.status(200).json(discussions);
}