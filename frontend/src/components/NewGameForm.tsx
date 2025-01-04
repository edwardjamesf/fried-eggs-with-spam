import {Dispatch, FormEvent, SetStateAction, useState} from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import ConsoleModel from '../models/ConsoleModel.ts';
import GameModel from '../models/GameModel.ts';
import {createNewGame} from '../api/GameApi.ts';
import SelectConsoleMenu from './SelectConsoleMenu.tsx';
import NewConsoleForm from './NewConsoleForm.tsx';

interface NewGameFormProps {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  dbConsoles: ConsoleModel[];
  dbGames: GameModel[];
  setDbConsoles: Dispatch<SetStateAction<ConsoleModel[]>>;
  setDbGames: Dispatch<SetStateAction<GameModel[]>>;
  selectedConsole: ConsoleModel;
  setSelectedConsole: Dispatch<SetStateAction<ConsoleModel>>;
  setSelectedGame: Dispatch<SetStateAction<GameModel>>;
}

export default function NewGameForm(props: Readonly<NewGameFormProps>) {
  const {
    openForm,
    setOpenForm,
    dbConsoles,
    dbGames,
    setDbConsoles,
    setDbGames,
    selectedConsole,
    setSelectedConsole,
    setSelectedGame,
  } = props;

  const [openNewConsoleForm, setOpenNewConsoleForm] = useState(false);

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <>
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            createNewGame(formJson as GameModel).then((data) => {
              setDbGames([data, ...dbGames]);
              setSelectedGame(data);
            });
            handleCloseForm();
          }
        }}
      >
        <DialogTitle title={'New Game Data'}>New Game Data</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{paddingBottom: '1em'}}>
            Define information for the new game here.
          </DialogContentText>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Button
              sx={{marginRight: '1em', width: '40%'}}
              variant={'contained'}
              onClick={() => {
                setOpenNewConsoleForm(true);
              }}
            >
              New Console
            </Button>
            <SelectConsoleMenu
              dbConsoles={dbConsoles}
              selectedConsole={selectedConsole}
              setSelectedConsole={setSelectedConsole}
            />
          </Box>
          <TextField
            autoFocus
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
            id={'publisher'}
            name={'publisher'}
            label={'Publisher'}
            type={'text'}
            fullWidth
          />
          <TextField
            margin={'dense'}
            id={'developer'}
            name={'developer'}
            label={'Developer'}
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

      <NewConsoleForm
        openForm={openNewConsoleForm}
        setOpenForm={setOpenNewConsoleForm}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
        setSelectedConsole={setSelectedConsole}
      />
    </>
  );
}