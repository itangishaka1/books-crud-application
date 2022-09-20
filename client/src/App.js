import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.scss';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
import Books from './pages/Books';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={ <Books />} />
          <Route path='/add'  element={ <AddBook />} />
          <Route path='/update/:id' exact element={ <UpdateBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
