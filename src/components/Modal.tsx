import { MutableRefObject } from "react";

interface ModalProps {
  title: string;
  text: string;
  ref: React.RefObject<HTMLDialogElement>;
}

export const Modal = ({ title, text, ref }: ModalProps) => {
  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{text}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
