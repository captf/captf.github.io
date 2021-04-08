import React, {useEffect, useState} from 'react'
import {textToShow, timeRemaining} from "../utils/countdownTools";

// countdown to a specific minute within an hour, with a 5 min buffer afterwards
const Countdown = ({minute= 0}) => {
    
    const TICK = 1000;

	const [end, setEnd] = useState(0)
    const [cd, setCd] = useState({mins:0, secs:0})
	// will also want a "if we later go to 0" check
	
	useEffect(() => {
		if (minute === 0) {
			setEnd(3600)
		} else {
			setEnd(minute * 60)
		}

	},[minute])

	useEffect(() => {
			const updateTime = () => {
				setCd(timeRemaining(end))
			}

			const timerId = setTimeout(() => {
				updateTime()
			}, TICK)
			return () => clearTimeout(timerId);
	}, [TICK, end, cd])

	let content = textToShow(cd)
	return (
		<div className="countdown">
			<div className={`counter ${content.state}`}>
				{content.text}
			</div>
		</div>
	)
}

export default Countdown