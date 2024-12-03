import './App.css';
import {Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import MainPage from './pages/MainPage.tsx';
import PurchasesPage from './pages/PurchasesPage.tsx';
import ConsolesPage from './pages/ConsolesPage.tsx';
import GamesPage from './pages/GamesPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path={'/'} element={<MainPage/>}/>
        <Route path={'/purchases'} element={<PurchasesPage/>}/>
        <Route path={'/consoles'} element={<ConsolesPage/>}/>
        <Route path={'/games'} element={<GamesPage/>}/>
        <Route path={'*'} element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
