import React, {useEffect, useState} from 'react'
import {textToShow, timeRemaining} from "../utils/countdownTools";

const Countdown = ({minute = 0}) => {
    
    const TICK = 1000;

	const [end] = useState(minute * 60)
    const [cd, setCd] = useState({mins:0, secs:0})
	// will also want a "if we later go to 0" check
	
	useEffect(() => {
			const updateTime = () => {
				setCd(timeRemaining(end))
			}

			const timerId = setTimeout(() => {
				updateTime()
			}, TICK)
			return () => clearTimeout(timerId);
	}, [TICK, end, cd])

	const content = textToShow(cd)
	return (
		<div className="countdown">
			<div className={`counter ${content.state}`}>
				{content.text}
			</div>
		</div>
	)
}

export default Countdown