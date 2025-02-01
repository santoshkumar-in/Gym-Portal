"use client";
import Modal from "react-modal";
import classnames from "classnames";

Modal.setAppElement(document.body);
interface ModalProps {
  children: React.ReactNode;
  modalIsOpen: boolean;
  className?: string;
}

const FitNxtModal = ({ children, modalIsOpen, className }: ModalProps) => {
  return (
    <Modal
      portalClassName="fitnxt-modal-container"
      className={classnames(
        "w-full rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15",
        className,
        {
          "max-w-142.5": !className,
        },
      )}
      overlayClassName="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 block"
      isOpen={modalIsOpen}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default FitNxtModal;
