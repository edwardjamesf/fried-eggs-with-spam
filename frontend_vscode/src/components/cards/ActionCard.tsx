import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';

interface ActionCardProps {
  image: string;
  text: string;
  callback: MouseEventHandler | undefined;
}

export default function ActionCard({ image, text, callback }: ActionCardProps) {
  return(
    <Card className='card'>
      <CardActionArea className='card' onClick={callback}>
        <CardMedia component={'img'} image={image}/>
        <CardContent><Typography>{text}</Typography></CardContent>
      </CardActionArea>
    </Card>
  );
}
