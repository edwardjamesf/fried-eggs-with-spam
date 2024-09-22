import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActionCard from '../components/cards/ActionCard';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Stack spacing={8} direction={'row'}>
        <ActionCard image='/src/assets/images/add-to-database.png' text='View Consoles' callback={() => navigate('consoles')} />
        <ActionCard image='/src/assets/images/add-to-database.png' text='View Games' callback={() => navigate('games')} />
        <ActionCard image='/src/assets/images/add-to-database.png' text='View Purchases' callback={() => navigate('purchases')} />
      </Stack>
    </>
  );
}
