import { useContext } from 'react';
import './App.css'
import { MasalaProvider } from './Context/MasalaProvider';
import { AppRoutes } from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';



function App() {


  return (
    <BrowserRouter>
      <MasalaProvider>
        <AppRoutes/>
      </MasalaProvider>
    </BrowserRouter>

  )
}

export default App
