import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ConsoleModel from '../models/ConsoleModel.ts';
import GameModel from '../models/GameModel.ts';
import PurchaseModel from '../models/PurchaseModel.ts';
import {getConsolesFromDbAll} from '../api/ConsoleApi.ts';
import {getGamesFromDbAll} from '../api/GameApi.ts';
import {createNewPurchase} from '../api/PurchaseApi.ts';
import SelectConsoleMenu from './SelectConsoleMenu.tsx';
import SelectGameMenu from './SelectGameMenu.tsx';

interface NewPurchaseFormProps {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  dbPurchases: PurchaseModel[];
  setDbPurchases: Dispatch<SetStateAction<PurchaseModel[]>>;
}

export default function NewPurchaseForm(props: Readonly<NewPurchaseFormProps>) {
  const {openForm, setOpenForm, dbPurchases, setDbPurchases} = props;

  const [consoleChoices, setConsoleChoices] = useState<ConsoleModel[]>([]);
  const [gameChoices, setGameChoices] = useState<GameModel[]>([]);

  const inputProps = {
    min: 0,
    step: 0.01,
  }

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    getConsolesFromDbAll()
      .then((data) => {
        setConsoleChoices(data);
      });

    getGamesFromDbAll()
      .then((data) => {
        setGameChoices(data);
      });
  }, []);

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
          if (formJson.consoleId === '') {
            formJson.consoleId = undefined;
          }
          createNewPurchase(formJson as PurchaseModel).then((data) => {
            setDbPurchases([data, ...dbPurchases]);
          });
          handleCloseForm();
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
        <SelectConsoleMenu
          dbConsoles={consoleChoices}
          setDbConsoles={setConsoleChoices}
          selectedConsoleId={undefined}
        />
        <SelectGameMenu
          dbGames={gameChoices}
          setDbGames={setGameChoices}
          selectedGameId={undefined}
          dbConsoles={consoleChoices}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForm}>Cancel</Button>
        <Button type={'submit'} variant={'contained'}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}