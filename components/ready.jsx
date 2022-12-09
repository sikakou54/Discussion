import { useEffect } from "react";

export default function Ready() {

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
            <h2>接続しています</h2>
            <div>スピーカの方はマイクを’オン’にして下さい</div>
        </div>
    );
}
