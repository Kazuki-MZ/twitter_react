import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
       <BrowserRouter>
         <Routes>
           <Route path="/api/v1/users" element={<SignUp />} />
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
