import { Box } from '@mui/material'
import './App.css'
import NavBar from './components/navbar/NavBar'
import ConsoleForm from './features/forms/ConsoleForm'
import GameForm from './features/forms/GameForm'
import ConsoleTable from './features/tables/ConsoleTable'
import GameTable from './features/tables/GameTable'

function App() {
  return (
    <>
      <NavBar />
      <Box>
        <ConsoleForm />
        <GameForm />
      </Box>
      <Box>
        <ConsoleTable />
      </Box>
      <Box>
        <GameTable />
      </Box>
    </>
  )
}

export default App
