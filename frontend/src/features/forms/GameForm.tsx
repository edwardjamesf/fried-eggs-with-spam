import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormHelperText, InputLabel, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useState } from 'react';

export default function GameForm() {
  const [open, setOpen] = useState(false);
  const [consoleName, setConsoleName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConsoleSelect = (event: SelectChangeEvent) => {
    setConsoleName(event.target.value)
  }

  return (
    <>
      <Button variant='contained' onClick={handleClickOpen} sx={{margin:'10px'}}>
        Add New Game
      </Button>
      <Dialog
        autoFocus
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
          <DialogContentText marginBottom={'15px'}>
            Enter in game information:
          </DialogContentText>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <TextField
              required
              helperText='Name*'
              id='game_name_field'
              name='name'
              type='text'
            />
            <FormControl>
              <InputLabel id='game_console_name_field'></InputLabel>
              <Select
                labelId='game_console_name_field_label'
                id='game_console_name_field'
                value={consoleName}
                label='Console'
                onChange={handleConsoleSelect}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                
              </Select>
              <FormHelperText>Console</FormHelperText>
            </FormControl>
            <TextField
              helperText='Publisher'
              id='game_publisher_field'
              name='publisher'
              type='text'
            />
            <TextField
              helperText='Developer'
              id='game_developer_field'
              name='developer'
              type='text'
            />
            <TextField
              helperText='Release Date'
              id='game_release_date_field'
              name='release_date'
              type='date'
            />
            <TextField
              helperText='Description'
              id='game_description_field'
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
    </>
  );
}