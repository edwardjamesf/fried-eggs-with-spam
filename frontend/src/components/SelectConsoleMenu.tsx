import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import ConsoleModel from '../models/ConsoleModel.ts';
import {Dispatch, SetStateAction, useState} from 'react';
import NewConsoleForm from './NewConsoleForm.tsx';

interface SelectConsoleMenuProps {
  dbConsoles: ConsoleModel[];
  setDbConsoles: Dispatch<SetStateAction<ConsoleModel[]>>;
  selectedConsoleId: string | undefined;
}

export default function SelectConsoleMenu(props: Readonly<SelectConsoleMenuProps>) {
  const {dbConsoles, setDbConsoles, selectedConsoleId} = props;

  const [openNewConsoleForm, setOpenNewConsoleForm] = useState<boolean>(false);

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
    <>
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
          <MenuItem value={''} onClick={() => {setOpenNewConsoleForm(true)}}><i>Add Console</i></MenuItem>
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
      <NewConsoleForm
        openForm={openNewConsoleForm}
        setOpenForm={setOpenNewConsoleForm}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
      />
    </>
  );
}