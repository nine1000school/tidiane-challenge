import clsx from "clsx"
import { FC } from "react"

const Token: FC<{
  token: {
    original: string[]
    typed: string[]
  }
}> = (props) => {
  const {
    token: { original, typed },
  } = props
  const longer = original.length > typed.length ? original : typed

  return (
    <span>
      {longer.map((char, index) => (
        <span
          key={index}
          className={clsx({
            "text-white": typed[index] === original[index],
            "text-red-500/70":
              typed[index] !== original[index] && index <= typed.length,
            "text-red-600": index >= original.length,
            "text-slate-500": index >= typed.length,
          })}
        >
          {original[index] || typed[index]}
        </span>
      ))}
    </span>
  )
}

export default Token
