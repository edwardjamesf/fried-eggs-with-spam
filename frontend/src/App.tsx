import './App.css';
import PurchasesPage from './pages/PurchasesPage.tsx';
import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import ConsolesPage from './pages/ConsolesPage.tsx';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<MainPage/>}/>
      <Route path={'/purchases'} element={<PurchasesPage/>}/>
      <Route path={'/consoles'} element={<ConsolesPage/>}/>
      <Route path={'*'} element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
