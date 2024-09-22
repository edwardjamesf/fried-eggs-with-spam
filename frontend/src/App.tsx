import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar/NavBar';
import Home from './pages/Home';
import { Suspense } from 'react';
import ConsolesPage from './pages/ConsolesPage';

function App() {
  // TODO: Make page for no route found path
  // TODO: Make component for failback, maybe
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Please wait...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/consoles' element={<ConsolesPage />} />
          <Route path='*' element={<div>You dun goofed</div>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
