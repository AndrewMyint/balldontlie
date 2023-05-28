import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: isOpen ? "block" : "none",
    background: "rgba(0, 0, 0, 0.5)",
  };

  const modalContentStyles: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "20px",
    borderRadius: "4px",
    minWidth: "300px",
    maxWidth: "600px",
  };

  const closeModal = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" style={modalStyles}>
      <div className="modal-content" style={modalContentStyles}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
