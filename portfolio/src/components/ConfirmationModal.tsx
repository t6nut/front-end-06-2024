import { forwardRef, useState, useImperativeHandle, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Product, Rating } from '../models/Product';

export interface ConfirmationModalInterface {
	remove: (product: Product) => void
}

export interface ConfirmationModalRefInterface {
	closeModal: () => void
	handleShow: (p: Product) => void
}

const ConfirmationModal = forwardRef((props: ConfirmationModalInterface, ref) => {
	const [show, setShow] = useState(false);
	const toBeDeletedRef = useRef<Product>(new Product(0, "", "", "", "", "", false));

	useImperativeHandle(ref, () => ({

		closeModal() {
			setShow(false);
		},

		handleShow(p: Product) {
			setShow(true);
			toBeDeletedRef.current = p;
		}

	}));

	const handleClose = () => setShow(false);

	return (
		<Modal data-testid="modal-id" show={show} onHide={handleClose}>
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