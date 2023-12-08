import { State } from "@/app/page"
import Button from "@/components/Button"
import Token from "@/components/Token"
import clsx from "clsx"
import { FC, HTMLAttributes, KeyboardEvent } from "react"

const Editor: FC<
  {
    start: () => void
    restart: () => void
    className?: string
    hasStarted: boolean
    hasEnded: boolean
    tokens: State["tokens"]
    update: (patch: (previousState: State) => Partial<State>) => void
  } & HTMLAttributes<HTMLDivElement>
  // eslint-disable-next-line max-lines-per-function
> = (props) => {
  const {
    className,
    tokens,
    update,
    start,
    restart,
    hasStarted,
    hasEnded,
    ...otherProps
  } = props
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (hasEnded) {
      return
    }

    const { key } = event

    event.preventDefault()

    if (key === "Backspace") {
      update(
        ({
          currentTokenIndex,
          tokens: { [currentTokenIndex]: currentToken },
          tokens: currentTokens,
        }) => {
          if (!currentToken.typed.length && currentTokenIndex > 0) {
            return { currentTokenIndex: currentTokenIndex - 1 }
          }

          return {
            tokens: currentTokens.with(currentTokenIndex, {
              original: currentToken.original,
              typed: currentToken.typed.slice(0, -1),
            }),
          }
        },
      )

      return
    }

    if (key === " ") {
      update(({ currentTokenIndex }) => ({
        currentTokenIndex: currentTokenIndex + 1,
      }))

      return
    }

    if (!key.match(/^[a-z-]$/iu)) {
      return
    }

    update(
      ({
        currentTokenIndex,
        tokens: { [currentTokenIndex]: currentToken },
        tokens: currentTokens,
      }) => ({
        tokens: currentTokens.with(currentTokenIndex, {
          original: currentToken.original,
          typed: [...currentToken.typed, key],
        }),
      }),
    )
  }

  return (
    <div
      className={clsx(
        "relative min-h-[10rem] flex items-center justify-center",
        className,
      )}
      {...otherProps}
    >
      {!hasStarted && (
        <Button onClick={start} clasName="relative z-40">
          START
        </Button>
      )}
      {hasEnded && (
        <Button onClick={restart} clasName="relative z-40">
          RESTART
        </Button>
      )}
      {hasStarted && !hasEnded && (
        <>
          <div className="relative z-10 select-none flex flex-wrap gap-2">
            {tokens.map((token, index) => (
              <Token token={token} key={index} />
            ))}
          </div>
          <textarea
            autoFocus
            className="absolute inset-0 z-20 select-none bg-transparent outline-none text-transparent opacity-0 cursor-default"
            onKeyDown={handleKeyDown}
          />
        </>
      )}
    </div>
  )
}

export default Editor
