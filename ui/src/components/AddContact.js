import React, { useState } from 'react';
import { Modal, Toast, ToastContainer } from 'react-bootstrap';
import AddContactButton from './AddContactButton';
import AddContactForm from './AddContactForm';

const AddContact = ({addresses, setAddresses}) => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const onSuccess = (newAddress) => {
    setShowModal(false);
    setShowSuccess(true);
    setAddresses([...addresses, newAddress])
  }

  return (
    <>
      <AddContactButton onClick={handleShow}/>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddContactForm onSuccess={onSuccess}/>
        </Modal.Body>
      </Modal>
      <ToastContainer>
        <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">New Contact Added</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>Contact added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default AddContact;