import clsx from "clsx"
import { FC, HTMLAttributes, ReactNode } from "react"

const Button: FC<
  { children: ReactNode; clasName?: string } & HTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { clasName, ...otherProps } = props

  return (
    <button
      className={clsx("bg-slate-900 text-yellow-400 rounded-lg p-4", clasName)}
      {...otherProps}
    />
  )
}

export default Button
