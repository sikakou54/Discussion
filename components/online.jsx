export default function Online({ finishTime, currentTime }) {
    return (
        <div>
            <div>time:{Math.floor((finishTime - currentTime) / 1000)}</div>
            <div>オンライン</div>
        </div>
    );
}
