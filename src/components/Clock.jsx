import React, {useEffect, useState} from 'react'

import './components.css'

const Clock = () => {
    const TICK = 1000;

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const updateTime = () => {
            setDate(new Date())
        }

        const timerId = setTimeout(() => {
            updateTime()
        }, TICK)
        return () => clearTimeout(timerId);
    }, [TICK, date])


    return (
        <div className="clock">
            {`${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`}
        </div>
    );
};

const formatNumber = (digits) => {
    return digits >= 10 ? digits : `0${digits}`

}


export default Clock;