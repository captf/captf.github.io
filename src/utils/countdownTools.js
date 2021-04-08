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
    const obj = {
        text: '',
        state: null
    }

    if (mins < 30) {
        obj.text = `${formatNumber(mins)}:${formatNumber(secs)}`
        obj.state = MessageState.COUNTING
    } else if (mins < 55) {
        obj.text = 'Lost track of time...'
        obj.state = MessageState.EXCESS
    } else {
        obj.text = 'Incoming!'
        obj.state = MessageState.REACHED
    }

    return obj

}

export const MessageState = {
    COUNTING: 'counting',
    REACHED: 'reached',
    EXCESS: 'excess'
}

export const formatNumber = (digits) => {
    return digits >= 10 ? `${digits}` : `0${digits}`
}
