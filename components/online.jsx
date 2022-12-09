import { useEffect } from "react";

export default function Online({ finishTime, currentTime }) {

    useEffect(() => {

        window.onbeforeunload = (event) => {
            event.preventDefault();
            event.returnValue = 'このページを離れますか？'; // Google Chrome
            return 'このページを離れますか？'; // Google Chrome以外
        }

        return () => {
            window.onbeforeunload = null;
        };

    }, []);

    return (
        <div>
            <h2>オンライン</h2>
            <div>time:{Math.floor((finishTime - currentTime) / 1000)}</div>
        </div>
    );
}
