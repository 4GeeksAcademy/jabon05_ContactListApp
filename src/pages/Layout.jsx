// src/pages/Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

export const Layout = () => (
  <div className="container py-4">
    <nav className="mb-4 d-flex justify-content-between align-items-center">
      <h4 className="fw-bold"> Contact List</h4>
      <div>
        <Link to="/add" className="btn btn-primary">
          Add Contact
        </Link>
      </div>
    </nav>

    <Outlet />
    <DeleteModal />
  </div>
);
