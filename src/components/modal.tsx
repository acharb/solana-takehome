import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export const Modal = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-10"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <DialogTitle id="wallet-modal-title" className="sr-only">
              Wallet Connect
            </DialogTitle>
            <div
              className="relative mt-6 flex-1 px-4 sm:px-6"
              role="region"
              aria-label="Drawer content"
            >
              {children}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
