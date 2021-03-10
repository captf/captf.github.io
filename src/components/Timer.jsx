import React, {useEffect, useState} from 'react'

const Timer = ({time='170000'}) => {
    
    const TICK = 1000;

	const [end, setEnd] = useState(null)
    const [diff, setDiff] = useState(0)
	// will also want a "if we later go to 0" check
	
	useEffect(() => {
		   // eventually do better maths and error handling for times
		const goal = new Date()
		goal.setHours(time.substr(0, 2), time.substr(3, 2), time.substr(5, 2))
		const start = new Date()
		if (goal < start) {
		   goal.setTime(goal.getTime() + (24 * 60 * 60 * 1000))
		}
		setEnd(goal)
	},[time])

    useEffect(() => {
		if (end) {
			const updateTime = () => {
				setDiff((end - new Date())/1000)
			}

			const timerId = setTimeout(() => {
				updateTime()
			}, TICK)
			return () => clearTimeout(timerId);
		}
    }, [TICK, end, diff])
   
  let hrs = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
  let mins = Math.floor((diff % (60 * 60)) / 60);
  let secs = Math.floor(diff % 60);

	if (diff > 0) {
		if (diff < 30 * 60 * 60) {
			return (
				<div>
					{`${formatNumber(hrs)}:${formatNumber(mins)}:${formatNumber(secs)}`}
				</div>
			)
		}
		return <div>Incoming!</div>
	}
	
	return <>Nothing</>
}

const formatNumber = (digits) => {
    return digits >= 10 ? digits : `0${digits}`

}

export default Timer