import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  FormControl,
} from '@mui/material';
import { addPurchases } from '../../api/PurchaseApi';
import { useEffect, useState } from 'react';
import { getConsoleData } from '../../api/ConsoleApi';

interface AddPurchaseForm {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function AddPurchaseForm(props: AddPurchaseForm) {
  const [consoleData, setConsoleData] = useState<Console[]>([]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSelectConsole = (event: SelectChangeEvent) => {
    setThisConsole(event.target.value);
  }

  useEffect(() => {
    const allConsolesData = getConsoleData();
    setConsoleData([...allConsolesData]);
  }, []);

  return (
    <Dialog
      autoFocus
      open={props.open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          console.log(formJson);
          addPurchases(formJson);
          handleClose();
        },
      }}
    >
      <DialogTitle>New Purchase Form</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={'15px'}>
          Enter in purchase information:
        </DialogContentText>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Stack direction={'row'} spacing={1}>
            <FormControl>
              <InputLabel id='select-label-console'>Console</InputLabel>
              <Select
                labelId='select-label-console'
                id='select-console'
                value='console'
                label='Console'
                onChange={handleSelectConsole}
              >
                
              </Select>
            </FormControl>
            <Button variant='text'>Add new console</Button>
          </Stack>
          <TextField
            required
            helperText='Place of purchase*'
            id='place_of_purchase_field'
            name='placeOfPurchase'
            type='text'
          />
          <TextField
            helperText='Name*'
            id='console_manufacturer_field'
            name='manufacturer'
            type='text'
          />
          <TextField
            helperText='Release Date'
            id='console_release_date_field'
            name='release_date'
            type='date'
          />
          <TextField
            helperText='Description'
            id='console_description_field'
            name='description'
            type='text'
            multiline
            rows={4}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit'>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
