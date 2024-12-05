import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import ConsoleModel from '../models/ConsoleModel.ts';

interface SelectConsoleMenuProps {
  dbConsoles: ConsoleModel[];
  selectedConsoleId: string | undefined;
}

export default function SelectConsoleMenu(props: Readonly<SelectConsoleMenuProps>) {
  const {dbConsoles, selectedConsoleId} = props;

  const getConsoleName = () => {
    if (selectedConsoleId) {
      const consoleIds = dbConsoles.map((dbConsole) => dbConsole.id);
      const indConsoleId = consoleIds.indexOf(selectedConsoleId);
      if (indConsoleId !== -1) {
        return consoleIds[indConsoleId];
      }
    }
    return '';
  };

  return (
    <FormControl fullWidth>
      <InputLabel className={'drop-down'} id={'consoleId'}>Console</InputLabel>
      <Select
        className={'drop-down'}
        sx={{marginTop: '0.5em', marginBottom: '0.5em'}}
        id={'consoleId'}
        name={'consoleId'}
        labelId={'consoleId'}
        defaultValue={getConsoleName}
      >
        <MenuItem value={''}>None</MenuItem>
        {dbConsoles.map((item) => (
          <MenuItem
            value={item.id}
            key={item.id}
          >
            {item.manufacturer} {item.name} ({item.region})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}