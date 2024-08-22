import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import { addConsoles } from '../../api/ConsoleApi';

export default function ConsoleForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Console
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            addConsoles(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>New Console</DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={"15px"}>
            Enter in console information:
          </DialogContentText>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <TextField
              autoFocus
              required
              helperText="Manufacturer*"
              id="console_manufacturer_field"
              name="manufacturer"
              type="text"
            />
            <TextField
              autoFocus
              required
              helperText="Name*"
              id="console_name_field"
              name="name"
              type="text"
            />
            <TextField
              autoFocus
              required
              helperText="Release Date*"
              id="console_release_date_field"
              name="release_date"
              type="date"
            />
            <TextField
              autoFocus
              helperText="Description"
              id="console_description_field"
              name="description"
              type="text"
              multiline
              rows={4}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}