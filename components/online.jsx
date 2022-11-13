export default function Online({ finishTime, currentTime }) {
    return (
        <div>
            <div>time:{finishTime - currentTime}</div>
            <div>オンライン</div>
        </div>
    );
}
