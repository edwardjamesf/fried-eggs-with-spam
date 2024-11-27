import {Dispatch, FormEvent, SetStateAction} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import {createVgConsole, getVgConsolesAll} from '../api/ConsoleApi.ts';
import VgConsole from '../models/VgConsole.ts';

interface NewVgConsoleFormProps {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}

export default function NewVgConsoleForm(props: Readonly<NewVgConsoleFormProps>) {
  const {openForm, setOpenForm} = props;

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Dialog
      open={openForm}
      onClose={() => setOpenForm(false)}
      PaperProps={{
        component: 'form',
        onSubmit: (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          console.log(formJson);
          createVgConsole(formJson as VgConsole).then((data) => {
            console.log(data);
          });
          getVgConsolesAll().then((data) => {
            console.log(data)
          });
          handleCloseForm();
        }
      }}
    >
      <DialogTitle>Update Console Data</DialogTitle>
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
        <TextField
          margin={'dense'}
          id={'imageId'}
          name={'imageId'}
          label={'Image (Under Construction)'}
          type={'text'}
          fullWidth
          defaultValue={undefined}
          disabled={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForm}>Cancel</Button>
        <Button type={'submit'} variant={'contained'}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}