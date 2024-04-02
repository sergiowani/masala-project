import React from 'react'
import Modal from 'react-bootstrap/Modal';

export const ModalBasico2 = ({show, handleClose2, size="",title="Modal Basico 2", children}) => {

  return (
    <Modal show={show} onHide={handleClose2} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}
