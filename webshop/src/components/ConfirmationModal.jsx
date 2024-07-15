import React, { forwardRef, useState, useImperativeHandle, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ConfirmationModal = forwardRef((props, ref) => {
	const [show, setShow] = useState(false);
	const toBeDeletedRef = useRef();

	useImperativeHandle(ref, () => ({

		closeModal() {
			setShow(false);
		},

		handleShow(p) {
			setShow(true);
			toBeDeletedRef.current = p;
		}

	}));

	const handleClose = () => setShow(false);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => props.remove(toBeDeletedRef.current)}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default ConfirmationModal