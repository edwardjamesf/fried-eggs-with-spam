import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import GameModel, {defaultGameModel} from '../models/GameModel.ts';
import {Dispatch, SetStateAction} from 'react';

interface SelectGameMenuProps {
  dbGames: GameModel[];
  selectedGame: GameModel;
  setSelectedGame: Dispatch<SetStateAction<GameModel>>;
}

export default function SelectGameMenu(props: Readonly<SelectGameMenuProps>) {
  const {dbGames, selectedGame, setSelectedGame} = props;

  const handleChange = (event: SelectChangeEvent) => {
    const chosenGame = dbGames.find((dbGame) => dbGame.id === event.target.value);
    if (chosenGame) {
      setSelectedGame(chosenGame);
    } else {
      setSelectedGame(defaultGameModel);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel className={'drop-down'} id={'gameId'}>Game</InputLabel>
      <Select
        className={'drop-down'}
        sx={{marginTop: '0.5em', marginBottom: '0.5em'}}
        id={'gameId'}
        name={'gameId'}
        labelId={'gameId'}
        value={selectedGame.id}
        onChange={handleChange}
      >
        <MenuItem value={''}>None</MenuItem>
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
  );
}