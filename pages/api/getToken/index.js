import { getToken } from "../../../api/utils";

export default function handler(req, res) {
    const token = getToken();
    console.log('getToken', token);
    res.status(200).json({ token });
}
