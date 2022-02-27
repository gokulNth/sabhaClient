import React, { useEffect, useState } from 'react';
import { canNavigate } from '../Utils/Constant';

function VoteCount() {
    const [data, setData] = useState([]);
    useEffect(() => {
        canNavigate('/votecount') ? setData(["RECORDS"]) : setData('Can\'t Access this Page')
    }, [])
    return (
        typeof data === 'object'
            ? <div>{data[0]}</div>
            : <div className='p-2 m-2 text-center text-bold text-large text-uppercase text-error' >{data}</div>
    )
}

export default VoteCount;