import {useEffect, useState} from 'react';
import {Button, Paper, Typography} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import PurchaseModel from '../models/PurchaseModel.ts';
import {getPurchasesFromDbAll} from '../api/PurchaseApi.ts';
import NewPurchaseForm from '../components/NewPurchaseForm.tsx';
import UpdatePurchaseForm from '../components/UpdatePurchaseForm.tsx';
import {getConsolesFromDbAll} from '../api/ConsoleApi.ts';
import ConsoleModel, {defaultConsoleModel} from '../models/ConsoleModel.ts';
import GameModel, {defaultGameModel} from '../models/GameModel.ts';
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

const paginationModel = {page: 0, pageSize: 10};

export default function PurchasesPage() {
  const [dbConsoles, setDbConsoles] = useState<ConsoleModel[]>([]);
  const [dbGames, setDbGames] = useState<GameModel[]>([]);
  const [dbPurchases, setDbPurchases] = useState<PurchaseModel[]>([]);
  const [selectedConsole, setSelectedConsole] = useState<ConsoleModel>(defaultConsoleModel);
  const [selectedGame, setSelectedGame] = useState<GameModel>(defaultGameModel);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseModel>(dbPurchases[0]);
  const [openNewPurchaseForm, setOpenNewPurchaseForm] = useState<boolean>(false);
  const [openUpdatePurchaseForm, setOpenUpdatePurchaseForm] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const setSelectedConsoleAndGameFromPurchase = () => {
    const purchaseConsole = dbConsoles.find((dbConsole) => dbConsole.id === selectedPurchase?.consoleId);
    if (purchaseConsole) {
      setSelectedConsole(purchaseConsole);
    } else {
      setSelectedConsole(defaultConsoleModel);
    }

    const purchaseGame = dbGames.find((dbGame) => dbGame.id === selectedPurchase?.gameId);
    if (purchaseGame) {
      setSelectedGame(purchaseGame);
    } else {
      setSelectedGame(defaultGameModel);
    }
  };

  useEffect(() => {
    const getDbData = () => {
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
      console.log(new Date() + ': Retrieved purchase data from DB');
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
      {/*Click the button to open up the new purchase form*/}
      <Button
        sx={{margin: '1em'}}
        variant={'contained'}
        onClick={() => {
          setSelectedConsole(defaultConsoleModel);
          setSelectedGame(defaultGameModel);
          setOpenNewPurchaseForm(true);
        }}
      >
        Add Purchase
      </Button>

      {/*If database purchases have been retrieved from DB, then load the table*/}
      <Paper className={'page-table'}>
        {isLoaded ?
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
              setSelectedConsoleAndGameFromPurchase();
              setOpenUpdatePurchaseForm(true);
            }}
          />
          :
          <Typography>Loading Purchases from DB...</Typography>
        }
      </Paper>

      {/*This form adds new purchases to the database*/}
      <NewPurchaseForm
        openNewPurchaseForm={openNewPurchaseForm}
        setOpenNewPurchaseForm={setOpenNewPurchaseForm}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
        dbGames={dbGames}
        setDbGames={setDbGames}
        dbPurchases={dbPurchases}
        setDbPurchases={setDbPurchases}
        selectedConsole={selectedConsole}
        setSelectedConsole={setSelectedConsole}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
      />

      {/*This form updates existing purchase data in the database*/}
      <UpdatePurchaseForm
        openUpdatePurchaseForm={openUpdatePurchaseForm}
        setOpenUpdatePurchaseForm={setOpenUpdatePurchaseForm}
        dbConsoles={dbConsoles}
        setDbConsoles={setDbConsoles}
        dbGames={dbGames}
        setDbGames={setDbGames}
        selectedPurchase={selectedPurchase}
        dbPurchases={dbPurchases}
        setDbPurchases={setDbPurchases}
        selectedConsole={selectedConsole}
        setSelectedConsole={setSelectedConsole}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
      />
    </div>
  );
}