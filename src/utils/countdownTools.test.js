import {set} from 'mockdate'
import {
    elapsedSecondsInHour,
    formatNumber,
    secondsToMins,
    secondsUntil,
    textToShow,
    timeRemaining
} from "./countdownTools";

describe('elapsedSecondsInHour calculates number of second elapsed in hour', () => {
        it('on the hour', () => {
            set('2021-03-25T21:00:00')
            const result = elapsedSecondsInHour()
            expect(result).toBe(0)
        })
        it('at the half hour', () => {
            set('2021-03-26T18:30:00')
            const result = elapsedSecondsInHour()
            expect(result).toBe(1800)
        })
        // can assume the rest will be fine
    }
)

describe('secondsUntil calculates as expected', () => {
    it('when end is 0 minutes on the hour', () => {
        set('2021-03-25T21:00:00')
        expect(secondsUntil(0)).toBe(0)
    })
    it('to the hour at a weird time', () => {
        set('2021-03-25T21:53:23')
        expect(secondsUntil(0)).toBe((6*60) + 37)
    })

    it('to quarter past on the hour', () => {
        set('2021-03-25T21:00:00')
        expect(secondsUntil(15*60)).toBe(15*60)
    })
    it('to quarter past at a weird time, over the hour boundary', () => {
        set('2021-03-25T21:53:23')
        expect(secondsUntil(15*60)).toBe((21*60) + 37)
    })
})

describe('secondsToMins converts as expected', () => {
    it('handles low seconds', () => {
        const actual = secondsToMins(23)
        expect(actual.mins).toBe(0)
        expect(actual.secs).toBe(23)
    })
    it('handles with minutes and seconds', () => {
        const actual = secondsToMins(2324)
        expect(actual.mins).toBe(38)
        expect(actual.secs).toBe(44)
    })
})

describe('formatNumber formats as expected', () => {
    it('when the number is less than 10', () => {
        expect(formatNumber(8)).toBe('08')
    })
    it('when the number is greater than 9', () => {
        expect(formatNumber(45)).toBe('45')
    })
})

describe('textToShow gives the expected text', () => {
    it('gives the time when under 30 minutes', () => {
        expect(textToShow({mins: 12, secs: 34})).toBe('12:34')
    })
    it('gives the 00:00 at zero time', () => {
        expect(textToShow({mins: 0, secs: 0})).toBe('00:00')
    })

    it('gives "incoming" when over 55 minutes', () => {
        expect(textToShow({mins: 56, secs: 4})).toBe('Incoming!')
    })
    it('gives "Lost track of time..." when over 40 minutes', () => {
        expect(textToShow({mins: 43, secs: 45})).toBe('Lost track of time...')
    })
})