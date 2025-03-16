import {useEffect, useState} from 'react';
import {Button, Paper, Typography} from '@mui/material';
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

const autosizeOptions = {
  includeHeaders: true,
  includeOutliers: true,
};

const paginationModel = {page: 0, pageSize: 20};

export default function ConsolesPage() {
  const [dbConsoles, setDbConsoles] = useState<ConsoleModel[]>([]);
  const [selectedConsole, setSelectedConsole] = useState<ConsoleModel>(dbConsoles[0]);
  const [openNewConsoleForm, setOpenNewConsoleForm] = useState<boolean>(false);
  const [openUpdateConsoleForm, setOpenUpdateConsoleForm] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getDbData = () => {
      getConsolesFromDbAll().then((data) => {
        setDbConsoles(data);
        setIsLoaded(true);
      });
      console.log(new Date() + ': Retrieved console data from DB');
    };
    getDbData();
    const intervalId = setInterval(() => {
      getDbData();
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={'page-div'}>

      {/*Click the button to open up the new console form*/}
      <Button
        sx={{margin: '1em'}}
        variant={'contained'}
        onClick={() => {
          setOpenNewConsoleForm(true);
        }}
      >
        Add Console
      </Button>

      {/*If database consoles have been retrieved from DB, then load the table*/}
      <Paper className={'page-table'}>
        {isLoaded ?
          <DataGrid
            rows={dbConsoles}
            columns={consoleColumns}
            initialState={{pagination: {paginationModel}}}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection={false}
            autosizeOnMount={true}
            autosizeOptions={autosizeOptions}
            density={'compact'}
            onCellClick={(params) => {
              setSelectedConsole(params.row);
              setOpenUpdateConsoleForm(true);
            }}
          />
          :
          <Typography>Loading Consoles from DB...</Typography>
        }
      </Paper>

      {/*This form adds new consoles to the database*/}
      <UpdateConsoleForm
        openForm={openUpdateConsoleForm}
        setOpenForm={setOpenUpdateConsoleForm}
        selectedConsole={selectedConsole}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
        setSelectedConsole={setSelectedConsole}
      />

      {/*This form updates existing console data in the database*/}
      <NewConsoleForm
        openForm={openNewConsoleForm}
        setOpenForm={setOpenNewConsoleForm}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
        setSelectedConsole={setSelectedConsole}
      />
    </div>
  );
}