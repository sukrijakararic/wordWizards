import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Root } from "./components/Root/Root";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { ContextProviders} from "./context-api/ContextProviders";
import { RequireAuth } from "./utils/RequireAuth";
import { Login } from "./components/login/Login";
import { Profile } from "./components/profile/Profile";
import { AboutUs } from "./components/AboutUs/AboutUs";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
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
  );
}

export default App;
