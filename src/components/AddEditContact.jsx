import React, { useContext, useState, useEffect } from "react";
import { ContactContext } from "../context/ContactActions";
import { useNavigate, useParams, Link} from "react-router-dom";

export const AddEditContact = () => {
  const { addNewContact, updateContact, contacts } = useContext(ContactContext);
  const navigate = useNavigate();
  const { theId } = useParams();
  const existing = Array.isArray(contacts) ?  contacts.find((c) => c.id === parseInt(theId)) : null;
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const ManageChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (theId) updateContact(theId, form);
    else addNewContact(form);
    navigate("/");
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">{theId ? "Edit Contact" : "Add New Contact"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            name="full_name"
            value={form.full_name}
            onChange={ManageChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={ManageChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={ManageChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={ManageChange}
            className="form-control"
            required
          />
        </div>
        <Link to="/" className="btn btn-outline-danger me-2">
            Get back to Contacts
        </Link>
        <button type="submit" className="btn btn-success">
          {theId ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};
