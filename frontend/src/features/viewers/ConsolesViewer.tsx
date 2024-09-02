import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Console from '../../models/Console';
import ConsoleCard from '../../components/cards/ConsoleCard';
import { useEffect, useState } from 'react';
import { addConsoles, getConsoleData } from '../../api/ConsoleApi';

interface AddConsoleFormOpts {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddConsoleForm({ open, setOpen }: AddConsoleFormOpts) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
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
          addConsoles(formJson);
          handleClose();
        },
      }}
    >
      <DialogTitle>New Console</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={'15px'}>
          Enter in console information:
        </DialogContentText>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <TextField
            required
            helperText='Name*'
            id='console_name_field'
            name='name'
            type='text'
          />
          <TextField
            helperText='Manufacturer'
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

export default function ConsolesViewer() {
  const fakeConsole: Console = {
    id: 0,
    manufacturer: 'Honda',
    name: 'Midnight',
    release_date: 'Oct 18, 2025',
    description: `Honda's newest shit, get on that`,
    image_path: 'src/assets/images/honda_midnight.jpg',
  };
  const [consoleData, setConsoleData] = useState<Console[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  useEffect(() => {
    getConsoleData(setConsoleData);
  }, []);

  return (
    <>
      <Typography>Consoles</Typography>
      <Grid container spacing={2}>
        {consoleData.map((item, index) => (
          <Grid item xs={4} key={index}>
            <ConsoleCard
              id={item.id}
              manufacturer={item.manufacturer}
              name={item.name}
              release_date={item.release_date}
              description={item.description}
              image_path={item.image_path}
            />
          </Grid>
        ))}
        <Grid item xs={4} key={consoleData.length + 1}>
          <ConsoleCard
            id={fakeConsole.id}
            manufacturer={fakeConsole.manufacturer}
            name={fakeConsole.name}
            release_date={fakeConsole.release_date}
            description={fakeConsole.description}
            image_path={fakeConsole.image_path}
          />
        </Grid>

        {/* Add new console card */}
        <Grid item xs={4} key={consoleData.length + 2}>
          <Card sx={{ width: '200px', height: '280px' }}>
            <CardActionArea sx={{ height: '100%' }} onClick={handleOpenForm}>
              <CardMedia
                component={'img'}
                height={'200px'}
                image='src/assets/images/add-to-database.png'
              />
              <CardContent>
                <Typography>Add a new console</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <AddConsoleForm open={openForm} setOpen={setOpenForm} />
    </>
  );
}
