"use client"

import Editor from "@/components/Editor"
import Timer from "@/components/Timer"
import { faker } from "@faker-js/faker"
import deepmerge from "deepmerge"
import { useCallback, useState } from "react"

const initializeState = () => ({
  hasStarted: false,
  hasEnded: false,
  tokens: [] as { original: string[]; typed: string[] }[],
  currentTokenIndex: 0,
})
export type State = ReturnType<typeof initializeState>
const Page = () => {
  const [{ hasStarted, hasEnded, tokens }, setState] =
    useState<State>(initializeState)
  const update = (patch: (previousState: State) => Partial<State>) => {
    setState((previousState: State) =>
      deepmerge(previousState, patch(previousState), {
        arrayMerge: (_, source: unknown[]) => source,
      }),
    )
  }
  const start = useCallback(() => {
    update(() => ({
      hasStarted: true,
      tokens: faker.word
        .words(100)
        .split(/\s+/u)
        .map((word) => ({
          original: word.split(""),
          typed: [] as string[],
        })),
    }))
  }, [])
  const stop = useCallback(() => {
    update(() => ({ hasEnded: true }))
  }, [])
  const restart = useCallback(() => {
    // TODO
  }, [])

  return (
    <div className="h-screen bg-slate-800 flex flex-col p-4 gap-4">
      <Timer
        stop={stop}
        restart={restart}
        hasStarted={hasStarted}
        hasEnded={hasEnded}
      />
      <Editor
        start={start}
        restart={restart}
        tokens={tokens}
        update={update}
        hasStarted={hasStarted}
        hasEnded={hasEnded}
      />
    </div>
  )
}

export default Page
