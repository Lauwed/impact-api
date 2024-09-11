import { ReactNode } from "react";
import ReactModal from "react-modal";
import Button from "./Button";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "50px"
  },
};

ReactModal.setAppElement('#__next');

const Modal = ({
  isOpen = false,
  setIsOpen,
  afterOpenModal,
  children
}: {
  isOpen: boolean;
  setIsOpen: any;
  afterOpenModal?: any;
  children: ReactNode
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Button customStyle="block w-fit ml-auto mb-4" onClick={closeModal}>close</Button>

      {children}
    </ReactModal>
  );
};

export default Modal;