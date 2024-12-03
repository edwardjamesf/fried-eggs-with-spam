import {useEffect, useState} from 'react';
import {Button, Paper} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ConsoleModel from '../models/ConsoleModel.ts';
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
  const [selectedGame, setSelectedGame] = useState<GameModel>(dbGames[0]);
  const [openNewGameForm, setOpenNewGameForm] = useState<boolean>(false);
  const [openUpdateGameForm, setOpenUpdateGameForm] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getConsolesFromDbAll()
      .then((data) => {
        setDbConsoles(data);
      });

    getGamesFromDbAll().then((data) => {
      setDbGames(data);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className={'main-table'}>
      <Button
        sx={{margin: '1em'}}
        variant={'contained'}
        onClick={() => {
          setOpenNewGameForm(true);
        }}
      >
        Add Game
      </Button>
      <Paper>
        {isLoaded &&
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
                  setOpenUpdateGameForm(true);
                }}
            />
        }
      </Paper>
      <UpdateGameForm
        openForm={openUpdateGameForm}
        setOpenForm={setOpenUpdateGameForm}
        selectedGame={selectedGame}
        dbGames={dbGames}
        setDbGames={setDbGames}
      />
      <NewGameForm
        openForm={openNewGameForm}
        setOpenForm={setOpenNewGameForm}
        dbGames={dbGames}
        setDbGames={setDbGames}
        dbConsoles={dbConsoles}
      />
    </div>
  );
}