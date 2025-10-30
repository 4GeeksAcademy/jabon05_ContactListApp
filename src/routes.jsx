// Import necessary components and functions from react-router-dom.
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import {AddEditContact} from "./components/AddEditContact";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Parent route
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        {/*Child routes */}
        <Route index element={<Home />} />
        <Route path="add" element={<AddEditContact />} />
        <Route path="edit/:id" element={<AddEditContact />} />
      </Route>
    )
);