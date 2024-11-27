import {useEffect, useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {getVgConsolesAll} from '../api/ConsoleApi.ts';
import VgConsole from '../models/VgConsole.ts';
import {Button, Paper} from '@mui/material';
import UpdateVgConsoleForm from '../components/UpdateVgConsoleForm.tsx';
import NewVgConsoleForm from '../components/NewVgConsoleForm.tsx';

const vgConsoleColumns: GridColDef[] = [
  {field: 'manufacturer', headerName: 'Manufacturer'},
  {field: 'name', headerName: 'Console Name'},
  {field: 'releaseDate', headerName: 'Release Date'},
  {field: 'description', headerName: 'Description', flex: 1},
];

const autosizeOptions = {
  includeHeaders: true
};

const paginationModel = {page: 0, pageSize: 10};

export default function ConsolesPage() {
  const [vgConsoles, setVgConsoles] = useState<VgConsole[]>([]);
  const [vgConsole, setVgConsole] = useState<VgConsole>(vgConsoles[0]);
  const [openNewVgConsoleForm, setOpenNewVgConsoleForm] = useState<boolean>(false);
  const [openUpdateVgConsoleForm, setOpenUpdateVgConsoleForm] = useState<boolean>(false);

  useEffect(() => {
    getVgConsolesAll().then((data) => {
      setVgConsoles(data);
    });
  }, []);

  return (
    <div style={{width: 960}}>
      <Button
        sx={{margin: '1em'}}
        variant={'contained'}
        onClick={() => {
          setOpenNewVgConsoleForm(true);
        }}
      >
        Add Console
      </Button>
      <Paper>
        <DataGrid
          rows={vgConsoles}
          columns={vgConsoleColumns}
          initialState={{pagination: {paginationModel}}}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection={false}
          autosizeOnMount={true}
          autosizeOptions={autosizeOptions}
          density={'compact'}
          onCellClick={(params) => {
            setVgConsole(params.row);
            setOpenUpdateVgConsoleForm(true);
          }}
        />
      </Paper>
      <UpdateVgConsoleForm
        openForm={openUpdateVgConsoleForm}
        setOpenForm={setOpenUpdateVgConsoleForm}
        vgConsole={vgConsole}
      />
      <NewVgConsoleForm
        openForm={openNewVgConsoleForm}
        setOpenForm={setOpenNewVgConsoleForm}
      />
    </div>
  );
}