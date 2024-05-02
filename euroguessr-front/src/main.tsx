import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  BrowserRouter,
} from "react-router-dom";
import Header from './components/Header/Header.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Header/>
    <App />
  </BrowserRouter>
)
