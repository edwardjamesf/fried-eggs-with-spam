import {Dispatch, FormEvent, SetStateAction} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import ConsoleModel from '../models/ConsoleModel.ts';
import {createNewConsole} from '../api/ConsoleApi.ts';

interface NewConsoleFormProps {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  dbConsoles: ConsoleModel[];
  setDbConsoles: Dispatch<SetStateAction<ConsoleModel[]>>;
}

export default function NewConsoleForm(props: Readonly<NewConsoleFormProps>) {
  const {openForm, setOpenForm, dbConsoles, setDbConsoles} = props;

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
          createNewConsole(formJson as ConsoleModel).then((data) => {
            setDbConsoles([data, ...dbConsoles]);
          });
          handleCloseForm();
        }
      }}
    >
      <DialogTitle title={'New Console Data'}>New Console Data</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{paddingBottom: '1em'}}>
          Define information for the new console here.
        </DialogContentText>
        <TextField
          autoFocus
          margin={'dense'}
          id={'manufacturer'}
          name={'manufacturer'}
          label={'Manufacturer'}
          type={'text'}
          fullWidth
        />
        <TextField
          required
          margin={'dense'}
          id={'name'}
          name={'name'}
          label={'Name'}
          type={'text'}
          fullWidth
        />
        <TextField
          margin={'dense'}
          id={'region'}
          name={'region'}
          label={'Region'}
          type={'text'}
          fullWidth
        />
        <DatePicker
          sx={{marginTop: '1em', marginBottom: '1em', width: '100%'}}
          label={'Release Date'}
          name={'releaseDate'}
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForm}>Cancel</Button>
        <Button type={'submit'} variant={'contained'}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}