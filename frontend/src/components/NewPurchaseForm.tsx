import {Dispatch, FormEvent, SetStateAction, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ConsoleModel, {defaultConsoleModel} from '../models/ConsoleModel.ts';
import GameModel, {defaultGameModel} from '../models/GameModel.ts';
import PurchaseModel from '../models/PurchaseModel.ts';
import {createNewPurchase} from '../api/PurchaseApi.ts';
import SelectConsoleMenu from './SelectConsoleMenu.tsx';
import SelectGameMenu from './SelectGameMenu.tsx';
import NewConsoleForm from './NewConsoleForm.tsx';
import NewGameForm from './NewGameForm.tsx';

interface NewPurchaseFormProps {
  openNewPurchaseForm: boolean;
  setOpenNewPurchaseForm: Dispatch<SetStateAction<boolean>>;
  dbConsoles: ConsoleModel[];
  setDbConsoles: Dispatch<SetStateAction<ConsoleModel[]>>;
  dbGames: GameModel[];
  setDbGames: Dispatch<SetStateAction<GameModel[]>>;
  dbPurchases: PurchaseModel[];
  setDbPurchases: Dispatch<SetStateAction<PurchaseModel[]>>;
  selectedConsole: ConsoleModel;
  setSelectedConsole: Dispatch<SetStateAction<ConsoleModel>>;
  selectedGame: GameModel;
  setSelectedGame: Dispatch<SetStateAction<GameModel>>;
}

export default function NewPurchaseForm(props: Readonly<NewPurchaseFormProps>) {
  const {
    openNewPurchaseForm,
    setOpenNewPurchaseForm,
    dbConsoles,
    setDbConsoles,
    dbGames,
    setDbGames,
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

  const handleCloseNewPurchaseForm = () => {
    setOpenNewPurchaseForm(false);
  };

  return (
    <>
      <Dialog
        open={openNewPurchaseForm}
        onClose={handleCloseNewPurchaseForm}
        PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            if (formJson.consoleId === '') {
              formJson.consoleId = undefined;
            }
            createNewPurchase(formJson as PurchaseModel).then((data) => {
              setDbPurchases([data, ...dbPurchases]);
              setSelectedConsole(defaultConsoleModel);
              setSelectedGame(defaultGameModel);
            });
            handleCloseNewPurchaseForm();
          }
        }}
      >
        <DialogTitle title={'New Purchase Data'}>New Purchase Data</DialogTitle>
        <DialogContent>
          <DialogContent sx={{paddingBottom: '1em'}}>
            Define information for the new purchase here.
          </DialogContent>
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
          <DatePicker
            sx={{marginTop: '1em', marginBottom: '1em', width: '100%'}}
            label={'Purchase Date'}
            name={'purchaseDate'}
            defaultValue={dayjs()}
          />
          <TextField
            margin={'dense'}
            id={'purchaseFrom'}
            name={'purchaseFrom'}
            label={'Purchased From'}
            type={'text'}
            fullWidth
          />
          <TextField
            margin={'dense'}
            id={'costBase'}
            name={'costBase'}
            label={'Base Cost'}
            type={'number'}
            inputProps={inputProps}
            fullWidth
            defaultValue={0.00}
          />
          <TextField
            margin={'dense'}
            id={'costTax'}
            name={'costTax'}
            label={'Tax'}
            type={'number'}
            inputProps={inputProps}
            fullWidth
            defaultValue={0.00}
          />
          <TextField
            margin={'dense'}
            id={'costShipping'}
            name={'costShipping'}
            label={'Shipping'}
            type={'number'}
            inputProps={inputProps}
            fullWidth
            defaultValue={0.00}
          />
          <TextField
            margin={'dense'}
            id={'costOther'}
            name={'costOther'}
            label={'Misc. Fees / Other Costs'}
            type={'number'}
            inputProps={inputProps}
            fullWidth
            defaultValue={0.00}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewPurchaseForm}>Cancel</Button>
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

      <NewGameForm
        openForm={openNewGameForm}
        setOpenForm={setOpenNewGameForm}
        dbConsoles={dbConsoles}
        dbGames={dbGames}
        setDbConsoles={setDbConsoles}
        setDbGames={setDbGames}
        selectedConsole={selectedConsole}
        setSelectedConsole={setSelectedConsole}
      />
    </>
  );
}