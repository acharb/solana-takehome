"use client";

import { createContext, useContext, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon, XCircleIcon } from "@heroicons/react/20/solid";

const AlertContext = createContext<{
  showAlert: (message: string) => void;
}>({
  showAlert: () => {},
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState({
    message: "",
    visible: false,
  });

  const showAlert = (message: string) => {
    setAlert({ message, visible: true });

    // Auto-hide after 6 seconds
    setTimeout(() => {
      setAlert({ message: "", visible: false });
    }, 6000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert alert={alert} setAlert={setAlert} />
    </AlertContext.Provider>
  );
};

// Custom Hook for using Context
export const useAlert = () => useContext(AlertContext);

interface Alert {
  message: string;
  visible: boolean;
}

// Alert Component
const Alert = ({
  alert,
  setAlert,
}: {
  alert: Alert;
  setAlert: (alert: Alert) => void;
}) => {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed z-[100] inset-0 flex items-start px-4 py-6 sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition show={alert.visible}>
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-slate-800 shadow-lg ring-1 ring-slate-700/50 transition-opacity duration-300 ease-out">
            <div className="p-4">
              <div className="flex items-center">
                <div className="shrink-0">
                  <XCircleIcon
                    aria-hidden="true"
                    className="size-6 text-red-400"
                  />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm text-slate-300">{alert.message}</p>
                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    onClick={() => setAlert({ message: "", visible: false })}
                    className="inline-flex rounded-md bg-slate-800 text-slate-400 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};
