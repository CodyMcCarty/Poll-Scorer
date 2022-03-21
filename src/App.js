import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PollGrader from './PollGrader/PollGrader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<PollGrader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
