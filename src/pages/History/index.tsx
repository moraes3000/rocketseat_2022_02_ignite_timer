import { useContext } from "react";
import { CyclesContext } from "../../context/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <pre>
        {JSON.stringify(cycles, null, 2)}
      </pre>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tarefa</td>
              <td>20 minutos</td>
              <td>ha 2 meses</td>
              <td> <Status statusColor="green">Concluído</Status></td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutos</td>
              <td>ha 2 meses</td>
              <td> <Status statusColor="red">Concluído</Status></td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutos</td>
              <td>ha 2 meses</td>
              <td> <Status statusColor='red'>Concluído</Status></td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutos</td>
              <td>ha 2 meses</td>
              <td> <Status statusColor="yellow">Concluído</Status></td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
