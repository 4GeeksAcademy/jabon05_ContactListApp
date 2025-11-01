import React, { createContext, useState, useEffect } from "react";

export const ContactContext = createContext();

const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "Jabon05_ContactList";  

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  {/*Create agenda if it does not exist*/}
  const createNewAgenda = async () => {
    try {
      const response = await fetch(`${BASE_URL}/agendas/${AGENDA}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log(`Agenda "${AGENDA}" creada correctamente.`);
        await GetAllContacts();   {/*Fetch contacts after creation*/}
      } else {
        console.error("Error creando la agenda:", await response.text());
      }
    } catch (err) {
      console.error("Error al crear la agenda:", err);
    }
  };

  {/*Fecth all contacts using GET*/}
  const GetAllContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`);
      {/*Checking if the agenda is created*/}
      if (response.status === 404) {
        console.warn(`Agenda no encontrada, creando una nueva llamada ${AGENDA}` );
        await createNewAgenda();
        return;
      }
      const data = await response.json();
      console.log("Fetched contacts:", data);
      if (Array.isArray(data.contacts)) {
      setContacts(data.contacts);
      } else {setContacts([]);
        console.warn("Formato de respuesta incorrecto:", data);
      }
    } catch (err) {
      console.error("Error buscando los contactos:", err);
    } finally {
      setLoading(false);
    }
  };

   {/*Create new contact using POST*/}
  const addNewContact = async (contact) => {
    try {
      await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: contact.full_name,
          phone: contact.phone,
          email: contact.email,
          address: contact.address}),
      });
      GetAllContacts();
    } catch (err) {
      console.error("Error agregando un contacto nuevo:", err);
    }
  };

  {/*Update an existing contact using PUT*/}
  const updateContact = async (id, updatedContact) => {
    try {
      await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
      GetAllContacts();
    } catch (err) {
      console.error("Error actualizando el contacto:", err);
    }
  };

  {/*Update an existing contact using DELETE*/}
  const deleteContact = async (id) => {
    try {
      await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, { method: "DELETE" });
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error borrando el contacto:", err);
    }
  };

  useEffect(() => {
    GetAllContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        addNewContact,
        updateContact,
        deleteContact,
        GetAllContacts,
        contactToDelete,
        setContactToDelete,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
