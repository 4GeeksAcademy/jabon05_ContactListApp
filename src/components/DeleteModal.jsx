import React, { useContext } from "react";
import { ContactContext } from "../context/ContactActions";

const DeleteModal = () => {
  const { contactToDelete, deleteContact, setContactToDelete } =
    useContext(ContactContext);

  const DeleteConfirmation = () => {
    if (contactToDelete) deleteContact(contactToDelete.id);
    setContactToDelete(null);
  };

  return (
    <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true" >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmDeleteModalLabel">
              Confirm Deletion
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setContactToDelete(null)}
            ></button>
          </div>
          <div className="modal-body">
            {contactToDelete ? (
              <p>
                Are you sure you want to delete{" "}
                <strong>{contactToDelete.full_name}</strong>?
              </p>
            ) : (
              <p>No contact selected.</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setContactToDelete(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={DeleteConfirmation}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;