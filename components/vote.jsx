export default function Vote({ type, setVotindDone }) {

    if (3 === type) {
        return (
            <div>
                <button onClick={() => setVotindDone('positive')}>positive</button>
                <button onClick={() => setVotindDone('negative')}>negative</button>
            </div>
        );
    } else {
        return (
            <div>
                Vote
            </div>
        );
    }

}
