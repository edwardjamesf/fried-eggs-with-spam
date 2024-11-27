import VgConsole from '../models/VgConsole.ts';
import {Dispatch, FormEvent, SetStateAction} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {deleteVgConsole, getVgConsolesAll, updateVgConsole} from '../api/ConsoleApi.ts';

interface UpdateVgConsoleFormProps {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  vgConsole: VgConsole;
}

export default function UpdateVgConsoleForm(props: Readonly<UpdateVgConsoleFormProps>) {
  const {openForm, setOpenForm, vgConsole} = props;

  const handleDeleteVgConsole = () => {
    deleteVgConsole(vgConsole).then((data) => {
      console.log(data);
      setOpenForm(false);
    });
  };

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
          updateVgConsole(formJson as VgConsole).then((data) => {
            console.log(data);
          });
          getVgConsolesAll().then((data) => {
            console.log(data);
          });
          handleCloseForm();
        }
      }}
    >
      <DialogTitle>Update Console Data</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{paddingBottom: '1em'}}>
          Update information for the {vgConsole?.manufacturer} {vgConsole?.name} here.
        </DialogContentText>
        <TextField
          margin={'dense'}
          id={'id'}
          name={'id'}
          label={'ID'}
          type={'text'}
          fullWidth
          value={vgConsole?.id}
        />
        <TextField
          autoFocus
          margin={'dense'}
          id={'manufacturer'}
          name={'manufacturer'}
          label={'Manufacturer'}
          type={'text'}
          fullWidth
          defaultValue={vgConsole?.manufacturer}
        />
        <TextField
          required
          margin={'dense'}
          id={'name'}
          name={'name'}
          label={'Name'}
          type={'text'}
          fullWidth
          defaultValue={vgConsole?.name}
        />
        <DatePicker
          sx={{marginTop: '1em', marginBottom: '1em', width: '100%'}}
          label={'Release Date'}
          name={'releaseDate'}
          defaultValue={dayjs(vgConsole?.releaseDate)}
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
          defaultValue={vgConsole?.description}
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
        <Button variant={'contained'} color={'error'} onClick={handleDeleteVgConsole}>Delete</Button>
        <Button type={'submit'} variant={'contained'}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}