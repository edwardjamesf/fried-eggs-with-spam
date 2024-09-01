import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Console from '../../models/Console';

export default function ConsoleCard(props: Console) {
  return (
    <Card sx={{width: '200px', height: '280px'}}>
      <CardActionArea>
        <CardMedia
          component={'img'}
          height={'200px'}
          image={props.image_path}
        />
        <CardContent>
          <Typography>{props.release_date}</Typography>
          <Typography>{props.manufacturer} {props.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
