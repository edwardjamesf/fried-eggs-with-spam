import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import GameModel from '../models/GameModel.ts';

interface SelectGameMenuProps {
  dbGames: GameModel[];
  selectedGameId: string | undefined;
}

export default function SelectGameMenu(props: Readonly<SelectGameMenuProps>) {
  const {dbGames, selectedGameId} = props;

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