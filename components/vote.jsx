import { useEffect, useState } from 'react';

export default function Vote({ type, setVotindDone, limitTime, currentTime }) {

    const [vote, setVote] = useState('none');

    useEffect(() => {
        if ('none' !== vote) {
            setVotindDone(vote);
        }
    }, [vote]);

    if (3 === type) {
        return (
            <div>
                <div>time:{Math.floor((limitTime - currentTime) / 1000)}</div>
                {vote === 'none' ? <h2>投票お願いします</h2> : <h2>{vote}</h2>}
                <button onClick={() => setVote('positive')}>positive</button>
                <button onClick={() => setVote('negative')}>negative</button>
            </div>
        );
    } else {
        return (
            <div>
                <h2>投票しています</h2>
                <div>time:{Math.floor((limitTime - currentTime) / 1000)}</div>
            </div>
        );
    }

}
