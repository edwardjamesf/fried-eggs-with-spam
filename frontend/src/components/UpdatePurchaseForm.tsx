import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ConsoleModel from '../models/ConsoleModel.ts';
import GameModel from '../models/GameModel.ts';
import PurchaseModel from '../models/PurchaseModel.ts';
import {getConsolesFromDbAll} from '../api/ConsoleApi.ts';
import {getGamesFromDbAll} from '../api/GameApi.ts';
import {deletePurchaseFromDb, updatePurchaseInDb} from '../api/PurchaseApi.ts';
import SelectConsoleMenu from './SelectConsoleMenu.tsx';
import SelectGameMenu from './SelectGameMenu.tsx';

interface UpdatePurchaseFormProps {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  selectedPurchase: PurchaseModel;
  dbPurchases: PurchaseModel[];
  setDbPurchases: Dispatch<SetStateAction<PurchaseModel[]>>;
}

export default function UpdatePurchaseForm(props: Readonly<UpdatePurchaseFormProps>) {
  const {openForm, setOpenForm, selectedPurchase, dbPurchases, setDbPurchases} = props;

  const [consoleChoices, setConsoleChoices] = useState<ConsoleModel[]>([]);
  const [gameChoices, setGameChoices] = useState<GameModel[]>([]);

  const handleDeletePurchase = () => {
    deletePurchaseFromDb(selectedPurchase).then((data) => {
      const temp = [...dbPurchases];
      const dbPurchaseIds = temp.map(dbPurchase => dbPurchase.id);
      const indRemove = dbPurchaseIds.indexOf(data.id);
      if (indRemove > -1) {
        temp.splice(indRemove, 1);
      }
      setDbPurchases([...temp]);
      setOpenForm(false);
    });
  };

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
          updatePurchaseInDb(formJson as PurchaseModel).then((data) => {
            const temp = [...dbPurchases];
            const dbPurchaseIds = temp.map(dbPurchase => dbPurchase.id);
            const indRemove = dbPurchaseIds.indexOf(data.id);
            if (indRemove > -1) {
              temp.splice(indRemove, 1);
            }
            setDbPurchases([data, ...temp]);
          });
          handleCloseForm();
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
          fullWidth
          defaultValue={selectedPurchase?.costBase}
        />
        <TextField
          margin={'dense'}
          id={'costTax'}
          name={'costTax'}
          label={'Tax'}
          type={'number'}
          fullWidth
          defaultValue={selectedPurchase?.costTax}
        />
        <TextField
          margin={'dense'}
          id={'costShipping'}
          name={'costShipping'}
          label={'Shipping'}
          type={'number'}
          fullWidth
          defaultValue={selectedPurchase?.costShipping}
        />
        <TextField
          margin={'dense'}
          id={'costOther'}
          name={'costOther'}
          label={'Misc. Fees / Other Costs'}
          type={'number'}
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
        <SelectConsoleMenu dbConsoles={consoleChoices} selectedConsoleId={selectedPurchase?.consoleId}/>
        <SelectGameMenu dbGames={gameChoices} selectedGameId={selectedPurchase?.gameId}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForm}>Cancel</Button>
        <Button variant={'contained'} color={'error'} onClick={handleDeletePurchase}>Delete</Button>
        <Button type={'submit'} variant={'contained'}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}