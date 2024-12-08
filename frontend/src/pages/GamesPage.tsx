import {useEffect, useState} from 'react';
import {Button, Paper, Typography} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ConsoleModel, {defaultConsoleModel} from '../models/ConsoleModel.ts';
import GameModel from '../models/GameModel.ts';
import {getConsolesFromDbAll} from '../api/ConsoleApi.ts';
import {getGamesFromDbAll} from '../api/GameApi.ts';
import NewGameForm from '../components/NewGameForm.tsx';
import UpdateGameForm from '../components/UpdateGameForm.tsx';

const gameColumns: GridColDef[] = [
  {field: 'name', headerName: 'Game Name'},
  {field: 'region', headerName: 'Region'},
  {field: 'releaseDate', headerName: 'Release Date'},
  {field: 'consoleId', headerName: 'Console ID'},
  {field: 'description', headerName: 'Description', flex: 1},
];

const paginationModel = {page: 0, pageSize: 10};

export default function GamesPage() {
  const [dbConsoles, setDbConsoles] = useState<ConsoleModel[]>([]);
  const [dbGames, setDbGames] = useState<GameModel[]>([]);
  const [selectedConsole, setSelectedConsole] = useState<ConsoleModel>(defaultConsoleModel);
  const [selectedGame, setSelectedGame] = useState<GameModel>(dbGames[0]);
  const [openNewGameForm, setOpenNewGameForm] = useState<boolean>(false);
  const [openUpdateGameForm, setOpenUpdateGameForm] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const setSelectedConsoleFromGame = () => {
    const purchaseConsole = dbConsoles.find((dbConsole) => dbConsole.id === selectedGame?.consoleId);
    if (purchaseConsole) {
      setSelectedConsole(purchaseConsole);
    } else {
      setSelectedConsole(defaultConsoleModel);
    }
  };

  useEffect(() => {
    const getDbData = () => {
      getConsolesFromDbAll()
        .then((data) => {
          setDbConsoles(data);
        });

      getGamesFromDbAll().then((data) => {
        setDbGames(data);
        setIsLoaded(true);
      });

      console.log(new Date() + ': Retrieved game data from DB');
    };
    getDbData();
    const intervalId = setInterval(() => {
      getDbData();
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={'main-table'}>
      {/*Click the button to open up the new game form*/}
      <Button
        sx={{margin: '1em'}}
        variant={'contained'}
        onClick={() => {
          setSelectedConsole(defaultConsoleModel);
          setOpenNewGameForm(true);
        }}
      >
        Add Game
      </Button>

      {/*If database games have been retrieved from DB, then load the table*/}
      <Paper>
        {isLoaded ?
          <DataGrid
            rows={dbGames}
            columns={gameColumns}
            initialState={{pagination: {paginationModel}}}
            pageSizeOptions={[10, 20, 50]}
            checkboxSelection={false}
            autosizeOnMount={true}
            density={'compact'}
            onCellClick={(params) => {
              setSelectedGame(params.row);
              setSelectedConsoleFromGame();
              setOpenUpdateGameForm(true);
            }}
          />
          :
          <Typography>Loading Games from DB...</Typography>
        }
      </Paper>

      {/*This form adds new games to the database*/}
      <UpdateGameForm
        openForm={openUpdateGameForm}
        setOpenForm={setOpenUpdateGameForm}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
        selectedGame={selectedGame}
        dbGames={dbGames}
        setDbGames={setDbGames}
        selectedConsole={selectedConsole}
        setSelectedConsole={setSelectedConsole}
      />

      {/*This form updates existing game data in the database*/}
      <NewGameForm
        openForm={openNewGameForm}
        setOpenForm={setOpenNewGameForm}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
        dbGames={dbGames}
        setDbGames={setDbGames}
        selectedConsole={selectedConsole}
        setSelectedConsole={setSelectedConsole}
      />
    </div>
  );
}