import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react";
import { date } from "zod";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O valor precisa ser no mínimo 5 minutos')
    .max(60, 'O valor precisa ser no máximo 60 minutos'),
})

// interface NewCreateNewCycle {
//   task: string;
//   minutesAmount: number;
// }

type NewCreateNewCycle = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)


  const { register, handleSubmit, watch, formState, reset } = useForm<NewCreateNewCycle>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCreateNewCycle) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles(state => [...state, newCycle])
    setActiveCycleId(id)

    reset()

  }
  // console.log(formState.errors)

  const activeCycle = cycles.find(cycles => cycles.id == activeCycleId)
  console.log(activeCycle)
  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
              type="text"
              list='task-sugestion'
              id="task"
              placeholder="Dê um nome para o seu projeto"
              {...register('task')}
            />

            <datalist id='task-sugestion'>
              <option value='projeto 1' />
              <option value='projeto 2' />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
              type="number"
              id="minutesAmount"
              placeholder="00"
              step={5}
              min={0}

              {...register('minutesAmount', { valueAsNumber: true })}
            />
            <span>Minutos</span>
          </FormContainer>

          <CountdownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
          </CountdownContainer>

          <StartCountdownButton type="submit" id="" disabled={isSubmitDisabled}>
            <Play size={24} /> Começar
          </StartCountdownButton>
        </form>
      </HomeContainer>
    </>
  )
}
