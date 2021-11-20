import type React from 'react';

import { useAppSelector } from '@app/hooks/redux';
import { Dialog } from '@headlessui/react';

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ children, open, onClose }: ModalProps): JSX.Element => {
  const darkMode = useAppSelector((state) => state.app.darkMode);
  return (
    <>
      <Dialog
        as="div"
        className={`fixed inset-0 z-30 ${darkMode ? 'dark' : ''}`}
        open={open}
        onClose={onClose}
      >
        <Dialog.Overlay className="fixed w-full h-full backdrop-filter backdrop-blur-sm" />
        <div className="text-center ">
          <span
            className="inline-block h-screen align-middle "
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-3xl align-middle">
            {children}
          </div>
        </div>
      </Dialog>
    </>
  );
};