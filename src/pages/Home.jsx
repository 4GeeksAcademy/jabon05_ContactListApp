import React, { useContext } from "react";
import { ContactContext } from "../context/ContactActions";
import {ContactCard} from "../components/ContactCard";


export const Home = () => {
  const { contacts, loading } = useContext(ContactContext);

  if (loading) return <p>Loading contacts...</p>;
  if (!contacts.length)
    return <p className="text-muted">No contacts yet. Add a new one!</p>;

  return (
    <div>
      {contacts.map((c) => (
        <ContactCard key={c.id} contact={c} />
      ))}
    </div>
  );
};