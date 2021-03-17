import React, {useEffect, useState} from 'react'

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
		if (end) {
			const updateTime = () => {
				// todo 5 min buffer & hour boundaries
				const sec = getCurrSecondsInHour()
				const diff = end - sec
				const mins = Math.floor(diff / 60)
				const secs = diff % 60
				setCd({
					mins,
					secs
				})
			}

			const timerId = setTimeout(() => {
				updateTime()
			}, TICK)
			return () => clearTimeout(timerId);
		}
    }, [TICK, end, cd])

	const {mins, secs} = cd
	let content
	if (mins >= 0 || secs >= 0) {
		content = `${formatNumber(mins)}:${formatNumber(secs)}`
	} else {
		content = '!00:00!'
	}
	return (
		<div className="countdown">
			{content}
		</div>
	)
}

const formatNumber = (digits) => {
    return digits >= 10 ? digits : `0${digits}`

}

const getCurrSecondsInHour = () => {
	const midnight = new Date()
	midnight.setHours(0, 0, 0, 0)
	return Math.round(((Date.now() - midnight.getTime()) / 1000)) % (3600)
}

export default Countdown