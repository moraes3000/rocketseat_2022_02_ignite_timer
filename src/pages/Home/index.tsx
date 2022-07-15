import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";


import { createContext, useEffect, useState } from "react";

import { differenceInSeconds } from "date-fns";
import { cy } from "date-fns/locale";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";


interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)


  const activeCycle = cycles.find(cycles => cycles.id == activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }


  // const task = watch('task')
  // const isSubmitDisabled = !task

  // function handleCreateNewCycle(data: NewCreateNewCycle) {
  //   const id = String(new Date().getTime());

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date()
  //   }

  //   setCycles(state => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)

  //   reset()

  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }
  console.log(cycles)
  return (
    <>
      <HomeContainer>
        <form
        // onSubmit={handleSubmit(handleCreateNewCycle)}
        >
          <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
            {/* <NewCycleForm /> */}
            <Countdown />
          </CyclesContext.Provider>
          {activeCycle ? (
            <StopCountdownButton type="button" id="" onClick={handleInterruptCycle}>
              <HandPalm size={24} /> Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton type="submit" id=""
            // disabled={isSubmitDisabled}
            >
              <Play size={24} /> Começar
            </StartCountdownButton>
          )
          }


        </form>
      </HomeContainer>
    </>
  )
}
