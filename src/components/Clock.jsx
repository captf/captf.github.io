import React, {useEffect, useState} from 'react'

import './components.css'
import {useMeasure} from "react-use";

const Clock = () => {
    const TICK = 1000;
    const [ref, dims] = useMeasure()

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
        <div className="clock" ref={ref}>
            {`${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`}
            {refDetails(ref, dims)}
        </div>
    );
};

const refDetails = (ref, { x, y, width, height, top, right, bottom, left }) => {
    //console.log(width, height)
}

const formatNumber = (digits) => {
    return digits >= 10 ? digits : `0${digits}`

}


export default Clock;