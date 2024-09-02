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
    <Card sx={{ width: '200px', height: '280px' }}>
      <CardActionArea>
        <CardMedia
          component={'img'}
          height={'200px'}
          image={
            props.image_path
              ? props.image_path
              : 'src/assets/images/video-game.png'
          }
        />
        <CardContent>
          <Typography>{props.release_date}</Typography>
          <Typography>
            {props.manufacturer} {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
