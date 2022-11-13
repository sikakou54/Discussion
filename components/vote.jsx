export default function Vote({ type, setVotindDone }) {

    if (3 === type) {
        return (
            <div>
                <div>投票お願いします</div>
                <button onClick={() => setVotindDone('positive')}>positive</button>
                <button onClick={() => setVotindDone('negative')}>negative</button>
            </div>
        );
    } else {
        return (
            <div>投票しています</div>
        );
    }

}
