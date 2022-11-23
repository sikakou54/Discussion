import { useState } from "react";

export default function Select({ onJoin, message }) {

    return (
        <div>
            <div>
                <input onClick={() => { onJoin(1) }} type="button" value={"肯定"} />
                <input onClick={() => { onJoin(2) }} type="button" value={"否定"} />
                <input onClick={() => { onJoin(3) }} type="button" value={"視聴"} />
            </div>
            <div>{message}</div>
        </div>
    );
}
