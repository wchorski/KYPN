// cred - https://dev.to/fibonacid/creating-a-todo-app-using-the-html-dialog-element-4634

import { useCallback, useEffect, useRef, type ComponentPropsWithoutRef } from "react";

export type DialogProps = Omit<
  ComponentPropsWithoutRef<"dialog">,
  "onClose"
> & {
  open: boolean; // required
  onClose: (returnValue?: string) => void; // override
};

export default function DialogModalPopup(props: DialogProps) {
  const { open, children, onClose, ...rest } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const handleClose = useCallback(() => {
    onClose(dialogRef.current?.returnValue);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} onClose={handleClose} {...rest}>
      {children}
    </dialog>
  );
}
