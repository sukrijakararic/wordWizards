
import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Root } from './components/Root/Root';
import { Basic } from './components/basic/Basic';


const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Basic />} />
    </Route>
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
