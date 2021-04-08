export const elapsedSecondsInHour = () => {
    const midnight = new Date()
    midnight.setHours(0, 0, 0, 0)
    return Math.round(((Date.now() - midnight.getTime()) / 1000)) % (3600)
}

export const timeRemaining = end => secondsToMins(secondsUntil(end))

export const secondsUntil = end => (end + 3600 - elapsedSecondsInHour()) % 3600

export const secondsToMins = secs => {
    return {
        mins: Math.floor(secs / 60),
        secs: secs % 60
    }
}

export const textToShow = ({mins, secs}) => {
    let text
    if (mins < 30) {
        text = `${formatNumber(mins)}:${formatNumber(secs)}`
    } else if (mins < 55) {
        text = 'Lost track of time...'
    } else {
        text = 'Incoming!'
    }

    return text

}

export const formatNumber = (digits) => {
    return digits >= 10 ? `${digits}` : `0${digits}`
}
