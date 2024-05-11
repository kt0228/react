//import logo from './logo.svg';
import './App.css';
import GameEndurance from './game/endurance';
import GameSearch from './game/search';
import GameMarubatu from './game/marubatu';
import GameTest from './game/test';
import NotFound from './NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<GameSearch />}/>
        <Route path="/test" element={<GameTest />} />
        <Route path="/endurance" element={<GameEndurance />} />
        <Route path="/marubatu" element={<GameMarubatu />} />
        <Route path="/search" element={<GameSearch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
