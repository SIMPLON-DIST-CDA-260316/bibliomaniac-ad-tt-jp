import { useEffect, useRef } from "react";
import Button from "./Button";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      onCancel={onCancel}
      onClick={(e) => {
        if (e.target === ref.current) onCancel();
      }}
      className="mx-auto my-auto rounded-xl p-6 shadow-xl w-11/12 max-w-sm backdrop:bg-black/70"
    >
      <h2 className="font-title text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border-2 border-primary text-primary font-semibold cursor-pointer hover:bg-primary/10 transition-colors duration-300 ease-out"
        >
          {cancelLabel}
        </button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </dialog>
  );
}
