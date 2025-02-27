import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface AlertProps {
  show?: boolean;
  type: "info" | "success" | "warning" | "error";
  message: string;
  onClose: () => void;
}

export const Alert = ({ show = false, type, message, onClose }: AlertProps) => {
  const style = clsx({
    "z-20 absolute top-3 right-3 w-96 alert ": true,
    "alert-info": type == "info",
    "alert-success": type == "success",
    "alert-warning": type == "warning",
    "alert-error": type == "error",
  });

  const infoIcon = () => {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    );
  };

  const successIcon = () => {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    );
  };

  const warningIcon = () => {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    );
  };

  const errorIcon = () => {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    );
  };

  const renderIcon = () => {
    switch (type) {
      case "info":
        return infoIcon();
      case "error":
        return errorIcon();
      case "success":
        return successIcon();
      case "warning":
        return warningIcon();
    }
  };

  return (
    show && (
      <div role="alert" className={style}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          {renderIcon()}
        </svg>
        <span>{message}</span>
        <div onClick={onClose} className="cursor-pointer">
          <XMarkIcon className="w-[20px]" />
        </div>
      </div>
    )
  );
};
