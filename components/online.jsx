export default function Online({ finishTime, currentTime }) {
    return (
        <div>
            <div>time:{finishTime - currentTime}</div>
            <div>Online</div>
        </div>
    );
}
