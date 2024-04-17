import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import Book from "./component/Book";
import NoPage from "./component/NoPage";
import AddYacht from "./component/AddYacht";
import ListYacht from "./component/ListYacht";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AddYacht />} />
          <Route path="book" element={<Book />} />
          <Route path="listyacht" element={<ListYacht />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
export default App;
