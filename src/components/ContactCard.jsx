import React, { useContext } from "react";
import { ContactContext } from "../context/ContactActions";
import { Link } from "react-router-dom";

export const ContactCard = ({contact})=> {
   const { setContactToDelete } = useContext(ContactContext);

   return (
    <div className="card mb-3 shadow-sm"> 
{/*Container para la card */}
        <div className="card-body d-flex justify-content-between align-items-center">
{/*Imagen*/}
            <img
                src={`https://randomuser.me/api/portraits/men/${contact.id % 99}.jpg`}
                alt="profile" className="rounded-circle me-3" width="100" height="100"/>
{/*Informacion de contacto*/}
            <div>
                <h6 className="fw-bold mb-1">
                    {contact.name}
                </h6>
                <p className="mb-1">
                    <i className="fa-solid fa-location-dot me-2 text-secondary"></i> 
                    {contact.address}
                </p>
                <p className="mb-1">
                    <i className="fa-solid fa-phone me-2 text-secondary"></i>
                    {contact.phone}
                </p>
                <p className="mb-0">
                    <i className="fa-solid fa-envelope me-2 text-secondary"></i>
                    {contact.email}
                </p>
            </div>
{/*Acciones*/}
            <div>
                <Link to={`/edit/${contact.id}`} className="btn btn-link text-secondary p-1">
                    <i className="fa-solid fa-pen"></i>
                </Link>
                <button className="btn btn-link text-danger p-1" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" 
                onClick={() => setContactToDelete(contact)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
      </div>
   );
    
   
    };