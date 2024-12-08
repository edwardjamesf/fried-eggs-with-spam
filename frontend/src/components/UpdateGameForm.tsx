import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react';
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
import dayjs from 'dayjs';
import GameModel from '../models/GameModel.ts';
import {deleteGameFromDb, updateGameInDb} from '../api/GameApi.ts';
import SelectConsoleMenu from './SelectConsoleMenu.tsx';
import ConsoleModel, {defaultConsoleModel} from '../models/ConsoleModel.ts';
import NewConsoleForm from './NewConsoleForm.tsx';

interface UpdateGameFormProps {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  dbConsoles: ConsoleModel[];
  setDbConsoles: Dispatch<SetStateAction<ConsoleModel[]>>;
  selectedGame: GameModel;
  dbGames: GameModel[];
  setDbGames: Dispatch<SetStateAction<GameModel[]>>;
  selectedConsole: ConsoleModel;
  setSelectedConsole: Dispatch<SetStateAction<ConsoleModel>>;
}

export default function UpdateGameForm(props: Readonly<UpdateGameFormProps>) {
  const {
    openForm,
    setOpenForm,
    dbConsoles,
    setDbConsoles,
    selectedGame,
    dbGames,
    setDbGames,
    selectedConsole,
    setSelectedConsole
  } = props;

  const [openNewConsoleForm, setOpenNewConsoleForm] = useState(false);

  const handleDeleteGame = () => {
    deleteGameFromDb(selectedGame).then((data) => {
      const temp = [...dbGames];
      const dbGameIds = temp.map(dbGame => dbGame.id);
      const indRemove = dbGameIds.indexOf(data.id);
      if (indRemove > -1) {
        temp.splice(indRemove, 1);
      }
      setDbGames([...temp]);
      setOpenForm(false);
    });
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    const chosenConsole = dbConsoles.find((dbConsole) => dbConsole.id === selectedGame?.consoleId);
    if (chosenConsole) {
      setSelectedConsole(chosenConsole);
    } else {
      setSelectedConsole(defaultConsoleModel);
    }
  }, [selectedGame]);

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
            updateGameInDb(formJson as GameModel).then((data) => {
              const temp = [...dbGames];
              const dbGameIds = temp.map(dbGame => dbGame.id);
              const indRemove = dbGameIds.indexOf(data.id);
              if (indRemove > -1) {
                temp.splice(indRemove, 1);
              }
              setDbGames([data, ...temp]);
            });
            handleCloseForm();
          }
        }}
      >
        <DialogTitle title={'Update Game Data'}>Update Game Data</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{paddingBottom: '1em'}}>
            Update information for {selectedGame?.name} here.
          </DialogContentText>
          <TextField
            margin={'dense'}
            id={'id'}
            name={'id'}
            label={'ID (read-only)'}
            type={'text'}
            fullWidth
            value={selectedGame?.id}
          />
          <TextField
            autoFocus
            required
            margin={'dense'}
            id={'name'}
            name={'name'}
            label={'Name'}
            type={'text'}
            fullWidth
            defaultValue={selectedGame?.name}
          />
          <TextField
            margin={'dense'}
            id={'publisher'}
            name={'publisher'}
            label={'Publisher'}
            type={'text'}
            fullWidth
            defaultValue={selectedGame?.publisher}
          />
          <TextField
            margin={'dense'}
            id={'developer'}
            name={'developer'}
            label={'Developer'}
            type={'text'}
            fullWidth
            defaultValue={selectedGame?.developer}
          />
          <TextField
            margin={'dense'}
            id={'region'}
            name={'region'}
            label={'Region'}
            type={'text'}
            fullWidth
            defaultValue={selectedGame?.region}
          />
          <DatePicker
            sx={{marginTop: '1em', marginBottom: '1em', width: '100%'}}
            label={'Release Date'}
            name={'releaseDate'}
            defaultValue={dayjs(selectedGame?.releaseDate)}
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
            defaultValue={selectedGame?.description}
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button variant={'contained'} color={'error'} onClick={handleDeleteGame}>Delete</Button>
          <Button type={'submit'} variant={'contained'}>Update</Button>
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