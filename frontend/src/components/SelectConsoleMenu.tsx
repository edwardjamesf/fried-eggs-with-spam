import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import ConsoleModel, {defaultConsoleModel} from '../models/ConsoleModel.ts';
import {Dispatch, SetStateAction} from 'react';

interface SelectConsoleMenuProps {
  dbConsoles: ConsoleModel[];
  selectedConsole: ConsoleModel;
  setSelectedConsole: Dispatch<SetStateAction<ConsoleModel>>;
}

export default function SelectConsoleMenu(props: Readonly<SelectConsoleMenuProps>) {
  const {dbConsoles, selectedConsole, setSelectedConsole} = props;

  const handleChange = (event: SelectChangeEvent) => {
    const chosenConsole = dbConsoles.find((dbConsole) => dbConsole.id === event.target.value);
    if (chosenConsole) {
      setSelectedConsole(chosenConsole);
    } else {
      setSelectedConsole(defaultConsoleModel);
    }
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
        value={selectedConsole.id}
        onChange={handleChange}
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