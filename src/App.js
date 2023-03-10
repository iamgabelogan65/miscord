import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            }
          />
          <Route path='/login' element={ <Login /> }/>
          <Route path='/register' element={ <Register /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
