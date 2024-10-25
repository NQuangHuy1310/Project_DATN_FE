import React, { useState, useEffect } from 'react'

interface CountdownProps {
    hours: number
    minutes: number
    seconds: number
}

const CountdownTime: React.FC<CountdownProps> = ({ hours, minutes, seconds }) => {
    const [time, setTime] = useState({ hours, minutes, seconds })

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                const { hours, minutes, seconds } = prevTime

                if (seconds > 0) {
                    return { hours, minutes, seconds: seconds - 1 }
                }
                if (minutes > 0) {
                    return { hours, minutes: minutes - 1, seconds: 59 }
                }
                if (hours > 0) {
                    return { hours: hours - 1, minutes: 59, seconds: 59 }
                }
                clearInterval(interval) // Stop the countdown when time is up
                return prevTime
            })
        }, 1000)

        return () => clearInterval(interval) // Cleanup interval on component unmount
    }, [])

    // Helper function to format numbers
    const formatNumber = (num: number) => (num < 10 ? `0${num}` : num)

    return (
        <div className="flex gap-2">
            <div className="rounded-lg bg-black p-2 text-center text-white">
                <span>{formatNumber(time.hours)}</span>
            </div>
            <div className="rounded-lg bg-black p-2 text-center text-white">
                <span>{formatNumber(time.minutes)}</span>
            </div>
            <div className="rounded-lg bg-black p-2 text-center text-white">
                <span>{formatNumber(time.seconds)}</span>
            </div>
        </div>
    )
}

export default CountdownTime
