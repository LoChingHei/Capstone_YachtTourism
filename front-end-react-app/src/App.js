import logo from './logofinal.png';
import './App.css';
import AddYacht from './components/addYacht';
import BookYacht from './components/bookYacht';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import ListYacht from './components/listYacht';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      {/* Navigation bar */}
      <Router>
        <Navbar bg="primary" variant="dark" expand="lg">
        <img src={logo} width="80" height="80" className="d-inline-block align-top" alt="Logo"/>
          <Navbar.Brand as={Link} to="/">BlueWave Tourism</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/add-yacht">Add Yacht</Nav.Link>
              <Nav.Link as={Link} to="/list-yacht">Yacht List</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>  
        
        <Routes>
          <Route path="/" element={<AddYacht />} />
          <Route path="/add-yacht" element={<AddYacht />} />
          <Route path="/book-yacht/:id" element={<BookYacht />} />
          <Route path="/list-yacht" element={<ListYacht />} />
        </Routes>
      </Router>
      <footer className="bg-dark text-white text-center p-3">
      <div>
        <p>&copy; 2024 BlueWave Tourism</p>
        <div>
          <a href="https://www.facebook.com/"><FaFacebook className="text-white me-3" /></a>
          <a href="https://twitter.com/"><FaTwitter className="text-white me-3" /></a>
          <a href="https://www.instagram.com/"><FaInstagram className="text-white" /></a>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default App;
