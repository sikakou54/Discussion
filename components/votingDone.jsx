import { useEffect } from "react";

export default function votingDone() {

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
            <h2>投票終了</h2>
            <div>結果をお待ち下さい</div>
        </div>
    );
}
