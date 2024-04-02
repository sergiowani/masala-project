import React from 'react'
import Modal from 'react-bootstrap/Modal';
import './modalBasico.scss'

export const ModalBasico = ({show, handleClose, size="", title="Modal Basico", children}) => {

  return (
    <Modal show={show} onHide={handleClose}  size={size} >
      <Modal.Header className='d-flex justify-content-center' closeButton>
        <Modal.Title className='text-center'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-ppal'>{children}</Modal.Body>
    </Modal>
  )
}
