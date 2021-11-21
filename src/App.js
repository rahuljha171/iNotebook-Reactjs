import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alerts from './components/Alerts';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alerts message="This is working" />
          <div className="container">
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="about/*" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
