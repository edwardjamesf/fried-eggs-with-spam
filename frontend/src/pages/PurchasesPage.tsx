import {useEffect, useState} from 'react';
import {Button, Paper} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import PurchaseModel from '../models/PurchaseModel.ts';
import {getPurchasesFromDbAll} from '../api/PurchaseApi.ts';
import NewPurchaseForm from '../components/NewPurchaseForm.tsx';
import UpdatePurchaseForm from '../components/UpdatePurchaseForm.tsx';

const purchaseColumns: GridColDef[] = [
  {field: 'name', headerName: 'Name'},
  {field: 'purchaseDate', headerName: 'Purchase Date'},
  {field: 'purchaseFrom', headerName: 'From'},
  {field: 'costTotal', headerName: 'Cost'},
  {field: 'notes', headerName: 'Notes', flex: 1},
];

const autosizeOptions = {
  includeHeaders: true
};

const paginationModel = {page: 0, pageSize: 10};

export default function PurchasesPage() {
  const [dbPurchases, setDbPurchases] = useState<PurchaseModel[]>([]);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseModel>(dbPurchases[0]);
  const [openNewPurchaseForm, setOpenNewPurchaseForm] = useState<boolean>(false);
  const [openUpdatePurchaseForm, setOpenUpdatePurchaseForm] = useState<boolean>(false);

  useEffect(() => {
    getPurchasesFromDbAll().then((data) => {
      setDbPurchases(data);
    });
  }, []);

  return (
    <div style={{width: 960}}>
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
      </Paper>
      <UpdatePurchaseForm
        openForm={openUpdatePurchaseForm}
        setOpenForm={setOpenUpdatePurchaseForm}
        selectedPurchase={selectedPurchase}
        dbPurchases={dbPurchases}
        setDbPurchases={setDbPurchases}
      />
      <NewPurchaseForm
        openForm={openNewPurchaseForm}
        setOpenForm={setOpenNewPurchaseForm}
        dbPurchases={dbPurchases}
        setDbPurchases={setDbPurchases}
      />
    </div>
  );
}