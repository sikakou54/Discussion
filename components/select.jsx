import { useState } from "react";

export default function Select({ onJoin, onCancel, message }) {

    const [type, setType] = useState(0);

    function onJoinClick() {
        if (0 !== type) {
            onJoin(type);
        }
    }

    function onCancelClick() {
        onCancel();
    }

    return (
        <div>
            <div>
                <input onClick={() => { setType(1) }} type="button" value={"肯定"} />
                <input onClick={() => { setType(2) }} type="button" value={"否定"} />
                <input onClick={() => { setType(3) }} type="button" value={"視聴"} />
                <input type="button" onClick={onJoinClick} value={"参加する"} />
                <input type="button" onClick={onCancelClick} value={"キャンセル"} />
            </div>
            <div>{message}</div>
        </div>
    );
}
