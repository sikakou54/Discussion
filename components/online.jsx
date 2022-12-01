export default function Online({ finishTime, currentTime }) {
    return (
        <div>
            <h2>オンライン</h2>
            <div>time:{Math.floor((finishTime - currentTime) / 1000)}</div>
        </div>
    );
}
