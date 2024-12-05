import {useEffect, useState} from 'react';
import {Button, Paper} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import PurchaseModel from '../models/PurchaseModel.ts';
import {getPurchasesFromDbAll} from '../api/PurchaseApi.ts';
import NewPurchaseForm from '../components/NewPurchaseForm.tsx';
import UpdatePurchaseForm from '../components/UpdatePurchaseForm.tsx';
import {getConsolesFromDbAll} from '../api/ConsoleApi.ts';
import ConsoleModel from '../models/ConsoleModel.ts';
import GameModel from '../models/GameModel.ts';
import {getGamesFromDbAll} from '../api/GameApi.ts';

const purchaseColumns: GridColDef[] = [
  {field: 'name', headerName: 'Name'},
  {field: 'purchaseDate', headerName: 'Purchase Date'},
  {field: 'purchaseFrom', headerName: 'From'},
  {field: 'costTotal', headerName: 'Cost'},
  {field: 'notes', headerName: 'Notes', flex: 1},
];

const autosizeOptions = {
  includeHeaders: true,
  includeOutliers: true,
};

const paginationModel = {page: 0, pageSize: 20};

export default function PurchasesPage() {
  const [dbConsoles, setDbConsoles] = useState<ConsoleModel[]>([]);
  const [dbGames, setDbGames] = useState<GameModel[]>([]);
  const [dbPurchases, setDbPurchases] = useState<PurchaseModel[]>([]);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseModel>(dbPurchases[0]);
  const [openNewPurchaseForm, setOpenNewPurchaseForm] = useState<boolean>(false);
  const [openUpdatePurchaseForm, setOpenUpdatePurchaseForm] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getConsolesFromDbAll().then((data) => {
      setDbConsoles(data);
    });

    getGamesFromDbAll().then((data) => {
      setDbGames(data);
    });

    getPurchasesFromDbAll().then((data) => {
      setDbPurchases(data);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className={'page-div'}>
      <Button
        sx={{margin: '1em'}}
        variant={'contained'}
        onClick={() => {
          setOpenNewPurchaseForm(true);
        }}
      >
        Add Purchase
      </Button>

      <Paper>
        {isLoaded &&
            <DataGrid
                rows={dbPurchases}
                columns={purchaseColumns}
                initialState={{pagination: {paginationModel}}}
                pageSizeOptions={[10, 20, 50]}
                checkboxSelection={false}
                autosizeOnMount={true}
                autosizeOptions={autosizeOptions}
                density={'compact'}
                onCellClick={(params) => {
                  setSelectedPurchase(params.row);
                  setOpenUpdatePurchaseForm(true);
                }}
            />
        }
      </Paper>

      <NewPurchaseForm
        openNewPurchaseForm={openNewPurchaseForm}
        setOpenNewPurchaseForm={setOpenNewPurchaseForm}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
        dbGames={dbGames}
        setDbGames={setDbGames}
        dbPurchases={dbPurchases}
        setDbPurchases={setDbPurchases}
      />

      <UpdatePurchaseForm
        openUpdatePurchaseForm={openUpdatePurchaseForm}
        setOpenUpdatePurchaseForm={setOpenUpdatePurchaseForm}
        dbConsoles={dbConsoles}
        dbGames={dbGames}
        selectedPurchase={selectedPurchase}
        dbPurchases={dbPurchases}
        setDbPurchases={setDbPurchases}
      />
    </div>
  );
}