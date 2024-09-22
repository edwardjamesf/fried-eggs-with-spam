import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Purchase from '../../models/Purchase';

export default function PurchaseCard(props: Purchase) {
  console.log(props)

  const message = `
    ID: ${props.id}
    Console ID: ${props.fk_console_id}
    Game ID: ${props.fk_game_id}
    Place of Purchase: ${props.fk_place_of_purchase}
    Image ID: ${props.fk_place_of_purchase}
    Name: ${props.name}
    Cost (Base): ${props.cost_base}
    Cost (Shipping): ${props.cost_shipping}
    Cost (Tax): ${props.cost_tax}
    Cost (Other): ${props.cost_other}
    Cost (Total): ${props.cost_total}
    Date: ${props.date}
    Notes: ${props.notes}
  `
  return (
    <Card className='card'>
      <CardActionArea className='card' onClick={() => alert(message)}>
        <CardMedia component={'img'}
          image={ "src/assets/images/add-to-database.png" }
        />
        <CardContent>
          <Typography>{props.date}</Typography>
          <Typography>{props.name}</Typography>
          <Typography>${props.cost_total}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
