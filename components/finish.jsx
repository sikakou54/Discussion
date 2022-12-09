import { useEffect } from "react";

export default function Finish() {

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
            <h2>討論終了</h2>
            <div>投票の準備をしています</div>
        </div>
    );
}
