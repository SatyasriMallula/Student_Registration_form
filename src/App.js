
import './App.css';
import { ObjectTable } from './Components/ObjectDataInTable/ObjectTable';
import { StudentForm } from './Components/RegistrationForm/Form';
import { TableWithoutHtml } from './Components/TableUsingJS/TableWithoutHtml';
import { Route, Link, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      {/* <a href='./Components/ObjectDataInTable/ObjectTable.jsx'>Table</a> */}
      <nav style={{ display: "flex" }}>
        <ul id='ul'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ObjectTable">Object into Table</Link>
          </li>
          <li>
            <Link to="/withouthtml">withouthtml</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<StudentForm />}></Route>
        <Route path='/ObjectTable' element={<ObjectTable />}></Route>
        <Route path='/withouthtml' element={<TableWithoutHtml />}></Route>
      </Routes>

    </div>
  );
}

export default App;
