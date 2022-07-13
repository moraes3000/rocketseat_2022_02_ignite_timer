import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TastInput } from "./styles";

export function Home() {
  return (
    <>
      <HomeContainer>
        <form>
          <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TastInput type="text" list='task-sugestion' id="task" placeholder="Dê um nome para o seu projeto" />

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
              max={60}
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

          <StartCountdownButton type="submit" id="">
            <Play size={24} /> Começar
          </StartCountdownButton>
        </form>
      </HomeContainer>
    </>
  )
}
