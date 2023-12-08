import { FC, useEffect, useState } from "react"

export const DURATION = 30
const Timer: FC<{
  stop: () => void
  restart: () => void
  hasStarted: boolean
  hasEnded: boolean
}> = (props) => {
  const { stop, hasStarted, hasEnded } = props
  const [time, setTime] = useState(DURATION)

  useEffect(() => {
    if (!hasStarted) {
      return () => null
    }

    const timerId = setInterval((): void => {
      if (hasEnded) {
        clearInterval(timerId)

        return
      }

      setTime((currentTime: number) => {
        if (currentTime <= 0) {
          clearInterval(timerId)

          return 0
        }

        return currentTime - 1
      })
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [hasStarted, hasEnded])

  useEffect(() => {
    if (time > 0) {
      return
    }

    stop()
  }, [stop, time])

  return <div className="text-yellow-500 text-xl font-bold">{time}</div>
}

export default Timer
