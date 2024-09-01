import { useEffect, useState } from 'react';
import { getConsoleData } from '../../api/ConsoleApi';
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Console from '../../models/Console';
import ConsoleForm from '../forms/ConsoleForm';

export default function ConsoleTable() {
  const [consoleData, setConsoleData] = useState<Console[]>([])

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     getConsoleData(setConsoleData);
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    getConsoleData(setConsoleData);
  }, []);

  return (
    <Box>
      <Stack spacing={1}>
        <ConsoleForm />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Release Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image (path)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consoleData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell>{row.manufacturer}</TableCell>
                  <TableCell>{row.release_date}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.image_path}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}