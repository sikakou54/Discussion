import { getToken } from "../../../api/utils";

export default function handler(req, res) {
    const token = getToken();
    res.status(200).json({ token });
}