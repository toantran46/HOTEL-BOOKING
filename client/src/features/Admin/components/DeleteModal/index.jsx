import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function DeleteModal({ isOpen, hideDeleteModal, handleRemove }) {
  return (
    <Modal centered isOpen={isOpen} toggle={hideDeleteModal}>
      <ModalHeader toggle={hideDeleteModal}>
        <div>
          <img
            src="https://www.einfosoft.com/templates/admin/spice/source/assets/img/logo.png"
            alt="admin logo"
          />
          <span className="sidebar__logo-name text-dark">LTH Booking</span>
        </div>
      </ModalHeader>
      <ModalBody>Are you sure remove this room ?</ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={handleRemove}>
          Confirm
        </Button>{" "}
        <Button onClick={hideDeleteModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteModal;
