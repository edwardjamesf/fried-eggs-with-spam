import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActionCard from '../components/cards/ActionCard';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 10}}>
        <ActionCard image='/src/assets/images/add-to-database.png' text='New Purchase' callback={() => navigate('purchases')} />
      </Box>
      

      <Stack spacing={8} direction={'row'}>
        <ActionCard image='/src/assets/images/add-to-database.png' text='View Consoles' callback={() => navigate('consoles')} />
        <ActionCard image='/src/assets/images/add-to-database.png' text='View Games' callback={() => navigate('games')} />
        <ActionCard image='/src/assets/images/add-to-database.png' text='View Purchases' callback={() => navigate('purchases')} />
      </Stack>
    </>
  );
}
