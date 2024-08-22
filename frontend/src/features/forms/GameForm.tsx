import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';

export default function GameForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{margin:"10px"}}>
        Add New Game
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
            handleClose();
          },
        }}
      >
        <DialogTitle>New Game</DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={"15px"}>
            Enter in game information:
          </DialogContentText>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <TextField
              autoFocus
              required
              helperText="Name*"
              id="game_name_field"
              name="name"
              type="text"
            />
            <TextField
              autoFocus
              required
              helperText="Publisher*"
              id="game_publisher_field"
              name="publisher"
              type="text"
            />
            <TextField
              autoFocus
              required
              helperText="Developer*"
              id="game_developer_field"
              name="developer"
              type="text"
            />
            <TextField
              autoFocus
              required
              helperText="Release Date*"
              id="game_release_date_field"
              name="release_date"
              type="date"
            />
            <TextField
              autoFocus
              helperText="Description"
              id="game_description_field"
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