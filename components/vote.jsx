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
                {vote === 'none' ? <div>投票お願いします</div> : <div>{vote}</div>}
                <button onClick={() => setVote('positive')}>positive</button>
                <button onClick={() => setVote('negative')}>negative</button>
            </div>
        );
    } else {
        return (
            <div>
                <div>time:{Math.floor((limitTime - currentTime) / 1000)}</div>
                <div>投票しています</div>
            </div>
        );
    }

}
