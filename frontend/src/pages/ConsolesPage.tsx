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
  {field: 'region', headerName: 'Region'},
  {field: 'releaseDate', headerName: 'Release Date'},
  {field: 'description', headerName: 'Description', flex: 1},
];

const paginationModel = {page: 0, pageSize: 10};

export default function ConsolesPage() {
  const [dbConsoles, setDbConsoles] = useState<ConsoleModel[]>([]);
  const [selectedConsole, setSelectedConsole] = useState<ConsoleModel>(dbConsoles[0]);
  const [openNewConsoleForm, setOpenNewConsoleForm] = useState<boolean>(false);
  const [openUpdateConsoleForm, setOpenUpdateConsoleForm] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getConsolesFromDbAll().then((data) => {
      setDbConsoles(data);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className={'main-table'}>
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
        {isLoaded &&
            <DataGrid
                rows={dbConsoles}
                columns={consoleColumns}
                initialState={{pagination: {paginationModel}}}
                pageSizeOptions={[10, 20, 50]}
                checkboxSelection={false}
                autosizeOnMount={true}
                density={'compact'}
                onCellClick={(params) => {
                  setSelectedConsole(params.row);
                  setOpenUpdateConsoleForm(true);
                }}
            />
        }
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