/* eslint-disable react/prop-types */
import Modal from "./Modal";
import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";

const ConfirmModal = ({ isOpen, onClose, onDelete, isLoading }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertTriangle className="h-6 w-6 text-rose-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete book
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">Are you sure you want to delete this book? This action cannot be undone.</p>
                    </div>
                </div>
            </div>
            <div className="sm:flex sm:flex-row-reverse mt-5 sm:mt-4 gap-3">
                <button type="button" className="px-3 py-2 rounded text-white bg-rose-600" onClick={onDelete} disabled={isLoading}>
                    Delete
                </button>
                <button type="button" className="px-3 py-2 rounded text-white bg-indigo-600" onClick={onClose} disabled={isLoading}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
