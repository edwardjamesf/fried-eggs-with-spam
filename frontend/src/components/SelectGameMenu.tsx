import {Dispatch, SetStateAction, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import GameModel from '../models/GameModel.ts';
import NewGameForm from './NewGameForm.tsx';
import ConsoleModel from '../models/ConsoleModel.ts';

interface SelectGameMenuProps {
  dbGames: GameModel[];
  setDbGames: Dispatch<SetStateAction<GameModel[]>>;
  selectedGameId: string | undefined;
  dbConsoles: ConsoleModel[];
}

export default function SelectGameMenu(props: Readonly<SelectGameMenuProps>) {
  const {dbGames, setDbGames, selectedGameId, dbConsoles} = props;

  const [openNewGameForm, setOpenNewGameForm] = useState<boolean>(false);

  const getGameName = () => {
    if (selectedGameId) {
      const gameIds = dbGames.map((dbGame) => dbGame.id);
      const indGameId = gameIds.indexOf(selectedGameId);
      if (indGameId !== -1) {
        return gameIds[indGameId];
      }
    }
    return '';
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel className={'drop-down'} id={'gameId'}>Game</InputLabel>
        <Select
          className={'drop-down'}
          sx={{marginTop: '0.5em', marginBottom: '0.5em'}}
          id={'gameId'}
          name={'gameId'}
          labelId={'gameId'}
          defaultValue={getGameName}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={''} onClick={() => {setOpenNewGameForm(true)}}><i>Add Game</i></MenuItem>
          {dbGames.map((item) => (
            <MenuItem
              value={item.id}
              key={item.id}
            >
              {item.name} ({item.region})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <NewGameForm
        openForm={openNewGameForm}
        setOpenForm={setOpenNewGameForm}
        dbGames={dbGames}
        setDbGames={setDbGames}
        dbConsoles={dbConsoles}
      />
    </>

  );
}