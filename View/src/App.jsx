
import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Root } from './components/Root/Root';
import { LandingPage } from './components/LandingPage/LandingPage';
import { ContextProviders } from './context-api/ContextProviders';



const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<LandingPage />} />

    </Route>
  )
);

function App() {

  return (
    <>
    <ContextProviders>
      <RouterProvider router={appRouter} />
    </ContextProviders>
       
    </>
  )
}

export default App
