import {Dispatch, FormEvent, SetStateAction} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ConsoleModel from '../models/ConsoleModel.ts';
import {deleteConsoleFromDb, updateConsoleInDb} from '../api/ConsoleApi.ts';

interface UpdateConsoleFormProps {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  selectedConsole: ConsoleModel;
  dbConsoles: ConsoleModel[];
  setDbConsoles: Dispatch<SetStateAction<ConsoleModel[]>>;
  setSelectedConsole: Dispatch<SetStateAction<ConsoleModel>>;
}

export default function UpdateConsoleForm(props: Readonly<UpdateConsoleFormProps>) {
  const {openForm, setOpenForm, selectedConsole, dbConsoles, setDbConsoles} = props;

  const handleDeleteConsole = () => {
    deleteConsoleFromDb(selectedConsole).then((data) => {
      const temp = [...dbConsoles];
      const dbConsoleIds = temp.map(dbConsole => dbConsole.id);
      const indRemove = dbConsoleIds.indexOf(data.id);
      if (indRemove > -1) {
        temp.splice(indRemove, 1);
      }
      setDbConsoles([...temp]);
      setOpenForm(false);
    });
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Dialog
      open={openForm}
      onClose={handleCloseForm}
      PaperProps={{
        component: 'form',
        onSubmit: (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          updateConsoleInDb(formJson as ConsoleModel).then((data) => {
            const temp = [...dbConsoles];
            const dbConsoleIds = temp.map(dbConsole => dbConsole.id);
            const indRemove = dbConsoleIds.indexOf(data.id);
            if (indRemove > -1) {
              temp.splice(indRemove, 1);
            }
            setDbConsoles([data, ...temp]);
          });
          handleCloseForm();
        }
      }}
    >
      <DialogTitle title={'Update Console Data'}>Update Console Data</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{paddingBottom: '1em'}}>
          Update information for the {selectedConsole?.manufacturer} {selectedConsole?.name} here.
        </DialogContentText>
        <TextField
          margin={'dense'}
          id={'id'}
          name={'id'}
          label={'ID (read-only)'}
          type={'text'}
          fullWidth
          value={selectedConsole?.id}
        />
        <TextField
          autoFocus
          margin={'dense'}
          id={'manufacturer'}
          name={'manufacturer'}
          label={'Manufacturer'}
          type={'text'}
          fullWidth
          defaultValue={selectedConsole?.manufacturer}
        />
        <TextField
          required
          margin={'dense'}
          id={'name'}
          name={'name'}
          label={'Name'}
          type={'text'}
          fullWidth
          defaultValue={selectedConsole?.name}
        />
        <TextField
          margin={'dense'}
          id={'region'}
          name={'region'}
          label={'Region'}
          type={'text'}
          fullWidth
          defaultValue={selectedConsole?.region}
        />
        <DatePicker
          sx={{marginTop: '1em', marginBottom: '1em', width: '100%'}}
          label={'Release Date'}
          name={'releaseDate'}
          defaultValue={dayjs(selectedConsole?.releaseDate)}
        />
        <TextField
          margin={'dense'}
          id={'description'}
          name={'description'}
          label={'Description'}
          type={'text'}
          multiline={true}
          rows={4}
          fullWidth
          defaultValue={selectedConsole?.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForm}>Cancel</Button>
        <Button variant={'contained'} color={'error'} onClick={handleDeleteConsole}>Delete</Button>
        <Button type={'submit'} variant={'contained'}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}