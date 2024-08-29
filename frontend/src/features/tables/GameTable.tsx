import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Game from '../../models/Game';
import getGameData from '../../api/GameApi';

export default function GameTable() {
  const [gameData, setGameData] = useState<Game[]>([])

  useEffect(() => {
    (async () => {
      getGameData(setGameData);
    })();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>Developer</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Image (path)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell>{row.publisher}</TableCell>
              <TableCell>{row.developer}</TableCell>
              <TableCell>{row.release_date}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.image_path}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}