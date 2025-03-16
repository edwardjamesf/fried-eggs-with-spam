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
import ConsoleModel, {defaultConsoleModel} from '../models/ConsoleModel.ts';
import GameModel, {defaultGameModel} from '../models/GameModel.ts';
import PurchaseModel from '../models/PurchaseModel.ts';
import {deletePurchaseFromDb, updatePurchaseInDb} from '../api/PurchaseApi.ts';
import SelectConsoleMenu from './SelectConsoleMenu.tsx';
import SelectGameMenu from './SelectGameMenu.tsx';
import NewConsoleForm from './NewConsoleForm.tsx';
import NewGameForm from './NewGameForm.tsx';

interface UpdatePurchaseFormProps {
  openUpdatePurchaseForm: boolean;
  setOpenUpdatePurchaseForm: Dispatch<SetStateAction<boolean>>;
  dbConsoles: ConsoleModel[];
  setDbConsoles: Dispatch<SetStateAction<ConsoleModel[]>>;
  dbGames: GameModel[];
  setDbGames: Dispatch<SetStateAction<GameModel[]>>;
  selectedPurchase: PurchaseModel;
  dbPurchases: PurchaseModel[];
  setDbPurchases: Dispatch<SetStateAction<PurchaseModel[]>>;
  selectedConsole: ConsoleModel;
  setSelectedConsole: Dispatch<SetStateAction<ConsoleModel>>;
  selectedGame: GameModel;
  setSelectedGame: Dispatch<SetStateAction<GameModel>>;
}

export default function UpdatePurchaseForm(props: Readonly<UpdatePurchaseFormProps>) {
  const {
    openUpdatePurchaseForm,
    setOpenUpdatePurchaseForm,
    dbConsoles,
    setDbConsoles,
    dbGames,
    setDbGames,
    selectedPurchase,
    dbPurchases,
    setDbPurchases,
    selectedConsole,
    setSelectedConsole,
    selectedGame,
    setSelectedGame,
  } = props;

  const [openNewConsoleForm, setOpenNewConsoleForm] = useState(false);
  const [openNewGameForm, setOpenNewGameForm] = useState(false);
  const inputProps = {
    min: 0,
    step: 0.01,
  };

  const handleCloseUpdateForm = () => {
    setOpenUpdatePurchaseForm(false);
  };

  const handleDeletePurchase = () => {
    deletePurchaseFromDb(selectedPurchase).then((data) => {
      const temp = [...dbPurchases];
      const dbPurchaseIds = temp.map(dbPurchase => dbPurchase.id);
      const indRemove = dbPurchaseIds.indexOf(data.id);
      if (indRemove > -1) {
        temp.splice(indRemove, 1);
      }
      setDbPurchases([...temp]);
      setOpenUpdatePurchaseForm(false);
    });
  };

  useEffect(() => {
    const chosenConsole = dbConsoles.find((dbConsole) => dbConsole.id === selectedPurchase?.consoleId);
    if (chosenConsole) {
      setSelectedConsole(chosenConsole);
    } else {
      setSelectedConsole(defaultConsoleModel);
    }

    const chosenGame = dbGames.find((dbGame) => dbGame.id === selectedPurchase?.gameId);
    if (chosenGame) {
      setSelectedGame(chosenGame);
    } else {
      setSelectedGame(defaultGameModel);
    }
  }, [selectedPurchase]);

  return (
    <>
      <Dialog
        open={openUpdatePurchaseForm}
        onClose={handleCloseUpdateForm}
        PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            updatePurchaseInDb(formJson as PurchaseModel).then((data) => {
              const temp = [...dbPurchases];
              const dbPurchaseIds = temp.map(dbPurchase => dbPurchase.id);
              const indRemove = dbPurchaseIds.indexOf(data.id);
              if (indRemove > -1) {
                temp.splice(indRemove, 1);
              }
              setDbPurchases([data, ...temp]);
            });
            handleCloseUpdateForm();
          }
        }}
      >
        <DialogTitle title={'Update Purchase Data'}>Update Purchase Data</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{paddingBottom: '1em'}}>
            Update information for purchase "{selectedPurchase?.name}" here.
          </DialogContentText>
          <TextField
            margin={'dense'}
            id={'id'}
            name={'id'}
            label={'ID (read-only)'}
            type={'text'}
            fullWidth
            value={selectedPurchase?.id}
          />
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Button
              sx={{marginRight: '1em', width: '40%'}}
              variant={'contained'}
              onClick={() => {
                setOpenNewGameForm(true);
              }}
            >
              New Game
            </Button>
            <SelectGameMenu
              dbGames={dbGames}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
            />
          </Box>
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
            defaultValue={selectedPurchase?.name}
          />
          <DatePicker
            sx={{marginTop: '1em', marginBottom: '1em', width: '100%'}}
            label={'Purchase Date'}
            name={'purchaseDate'}
            defaultValue={dayjs(selectedPurchase?.purchaseDate)}
          />
          <TextField
            margin={'dense'}
            id={'purchaseFrom'}
            name={'purchaseFrom'}
            label={'Purchased From'}
            type={'text'}
            fullWidth
            defaultValue={selectedPurchase?.purchaseFrom}
          />
          <TextField
            margin={'dense'}
            id={'costBase'}
            name={'costBase'}
            label={'Base Cost'}
            type={'number'}
            inputProps={inputProps}
            fullWidth
            defaultValue={selectedPurchase?.costBase}
          />
          <TextField
            margin={'dense'}
            id={'costTax'}
            name={'costTax'}
            label={'Tax'}
            type={'number'}
            inputProps={inputProps}
            fullWidth
            defaultValue={selectedPurchase?.costTax}
          />
          <TextField
            margin={'dense'}
            id={'costShipping'}
            name={'costShipping'}
            label={'Shipping'}
            type={'number'}
            inputProps={inputProps}
            fullWidth
            defaultValue={selectedPurchase?.costShipping}
          />
          <TextField
            margin={'dense'}
            id={'costOther'}
            name={'costOther'}
            label={'Misc. Fees / Other Costs'}
            type={'number'}
            inputProps={inputProps}
            fullWidth
            defaultValue={selectedPurchase?.costOther}
          />
          <TextField
            margin={'dense'}
            id={'notes'}
            name={'notes'}
            label={'Notes'}
            type={'text'}
            multiline={true}
            rows={4}
            fullWidth
            defaultValue={selectedPurchase?.notes}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateForm}>Cancel</Button>
          <Button variant={'contained'} color={'error'} onClick={handleDeletePurchase}>Delete</Button>
          <Button type={'submit'} variant={'contained'}>Update</Button>
        </DialogActions>
      </Dialog>

      <NewGameForm
        openForm={openNewGameForm}
        setOpenForm={setOpenNewGameForm}
        dbConsoles={dbConsoles}
        dbGames={dbGames}
        setDbConsoles={setDbConsoles}
        setDbGames={setDbGames}
        selectedConsole={selectedConsole}
        setSelectedConsole={setSelectedConsole}
        setSelectedGame={setSelectedGame}
      />

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