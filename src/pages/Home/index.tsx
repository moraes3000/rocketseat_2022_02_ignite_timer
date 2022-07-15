import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";


import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../context/CyclesContext";

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O valor precisa ser no mínimo 5 minutos')
    .max(60, 'O valor precisa ser no máximo 60 minutos'),
})

type NewCreateNewCycle = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

  const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCreateNewCycle>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCreateNewCycle) {
    createNewCycle(data)
    reset()
  }



  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
          {
            activeCycle ? (
              <StopCountdownButton type="button" id="" onClick={interruptCurrentCycle}>
                <HandPalm size={24} /> Interromper
              </StopCountdownButton>
            ) : (
              <StartCountdownButton type="submit" id="" disabled={isSubmitDisabled}
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
