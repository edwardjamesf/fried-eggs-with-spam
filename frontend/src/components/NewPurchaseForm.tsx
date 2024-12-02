import {Dispatch, FormEvent, SetStateAction} from 'react';
import PurchaseModel from '../models/PurchaseModel.ts';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {createNewPurchase} from '../api/PurchaseApi.ts';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface NewPurchaseFormProps {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  dbPurchases: PurchaseModel[];
  setDbPurchases: Dispatch<SetStateAction<PurchaseModel[]>>;
}

export default function NewPurchaseForm(props: Readonly<NewPurchaseFormProps>) {
  const {openForm, setOpenForm, dbPurchases, setDbPurchases} = props;

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
          createNewPurchase(formJson as PurchaseModel).then((data) => {
            setDbPurchases([data, ...dbPurchases]);
          });
          handleCloseForm();
        }
      }}
    >
      <DialogTitle title={'New Purchase Data'}/>
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
          fullWidth
          defaultValue={0.00}
        />
        <TextField
          margin={'dense'}
          id={'costTax'}
          name={'costTax'}
          label={'Tax'}
          type={'number'}
          fullWidth
          defaultValue={0.00}
        />
        <TextField
          margin={'dense'}
          id={'costShipping'}
          name={'costShipping'}
          label={'Shipping'}
          type={'number'}
          fullWidth
          defaultValue={0.00}
        />
        <TextField
          margin={'dense'}
          id={'costOther'}
          name={'costOther'}
          label={'Misc. Fees / Other Costs'}
          type={'number'}
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
        <TextField
          margin={'dense'}
          id={'consoleId'}
          name={'consoleId'}
          label={'Console (Under Construction)'}
          type={'text'}
          fullWidth
          defaultValue={undefined}
          disabled={true}
        />
        <TextField
          margin={'dense'}
          id={'gameId'}
          name={'gameId'}
          label={'Game (Under Construction)'}
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