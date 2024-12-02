import {useEffect, useState} from 'react';
import {Button, Paper} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ConsoleModel from '../models/ConsoleModel.ts';
import {getConsolesFromDbAll} from '../api/ConsoleApi.ts';
import NewConsoleForm from '../components/NewConsoleForm.tsx';
import UpdateConsoleForm from '../components/UpdateConsoleForm.tsx';

const consoleColumns: GridColDef[] = [
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
  const [dbConsoles, setDbConsoles] = useState<ConsoleModel[]>([]);
  const [selectedConsole, setSelectedConsole] = useState<ConsoleModel>(dbConsoles[0]);
  const [openNewConsoleForm, setOpenNewConsoleForm] = useState<boolean>(false);
  const [openUpdateConsoleForm, setOpenUpdateConsoleForm] = useState<boolean>(false);

  useEffect(() => {
    getConsolesFromDbAll().then((data) => {
      setDbConsoles(data);
    });
  }, []);

  return (
    <div style={{width: 960}}>
      <Button
        sx={{margin: '1em'}}
        variant={'contained'}
        onClick={() => {
          setOpenNewConsoleForm(true);
        }}
      >
        Add Console
      </Button>
      <Paper>
        <DataGrid
          rows={dbConsoles}
          columns={consoleColumns}
          initialState={{pagination: {paginationModel}}}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection={false}
          autosizeOnMount={true}
          autosizeOptions={autosizeOptions}
          density={'compact'}
          onCellClick={(params) => {
            setSelectedConsole(params.row);
            setOpenUpdateConsoleForm(true);
          }}
        />
      </Paper>
      <UpdateConsoleForm
        openForm={openUpdateConsoleForm}
        setOpenForm={setOpenUpdateConsoleForm}
        selectedConsole={selectedConsole}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
      />
      <NewConsoleForm
        openForm={openNewConsoleForm}
        setOpenForm={setOpenNewConsoleForm}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
      />
    </div>
  );
}