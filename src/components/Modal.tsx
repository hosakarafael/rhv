import { LoginButton } from "./LoginButton";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface ModalProps {
  type?: "Close" | "Login" | "Cancel/Yes";
  title: string;
  text: string;
  ref: React.RefObject<HTMLDialogElement>;
  onYes?: () => void;
}

export const Modal = ({
  type = "Close",
  title,
  text,
  ref,
  onYes,
}: ModalProps) => {
  const pathname = usePathname();
  const t = useTranslations("Modal");

  const renderButtonsSection = () => {
    switch (type) {
      case "Close":
        return (
          <button className="btn btn-neutral text-xl text-white rounded-full">
            {t("close")}
          </button>
        );
      case "Login":
        return (
          <div className="flex gap-2">
            <button className="btn btn-neutral text-xl text-white rounded-full">
              {t("close")}
            </button>
            <LoginButton continueTo={pathname} />
          </div>
        );
      case "Cancel/Yes":
        return (
          <div className="flex gap-2">
            <button className="btn btn-neutral text-xl text-white rounded-full">
              {t("cancel")}
            </button>
            <button
              onClick={onYes}
              className="btn btn-primary text-xl text-white rounded-full"
            >
              {t("yes")}
            </button>
          </div>
        );
    }
  };

  return (
    <dialog
      ref={ref}
      className="modal modal-bottom sm:modal-middle dark:text-white"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{text}</p>
        <div className="modal-action">
          <form method="dialog">{renderButtonsSection()}</form>
        </div>
      </div>
    </dialog>
  );
};
