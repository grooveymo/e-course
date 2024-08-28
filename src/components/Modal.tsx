import { ReactNode } from 'react';
import Button from './Button';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, onConfirm, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        {children}
        <div className="button-container">
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.displayName = 'Modal';
