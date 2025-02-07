
import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Root } from './components/Root/Root';


const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} />
  )
);

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
       
    </>
  )
}

export default App
