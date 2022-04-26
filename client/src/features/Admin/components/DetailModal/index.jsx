import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function DetailModal({ isOpen, hideModal, children }) {
  return (
    <Modal
      className="modal-dialog modal-dialog-scrollable"
      size="xl"
      centered
      isOpen={isOpen}
      toggle={hideModal}
    >
      <ModalHeader toggle={hideModal}>
        <div>
          <img
            src="https://www.einfosoft.com/templates/admin/spice/source/assets/img/logo.png"
            alt="admin logo"
          />
          <span className="sidebar__logo-name text-dark">LTH Booking</span>
        </div>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}

export default DetailModal;
