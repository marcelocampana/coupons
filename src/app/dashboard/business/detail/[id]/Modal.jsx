"use client";

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";
import deleteUser from "../../../../../helpers/deleteUser";

const Modal = ({
  warningTitle,
  warningDescription,
  open,
  setOpen,
  buttonLabel,
  requestId,
  userAdminId,
  action,
  applicantUserId,
}) => {
  console.log(applicantUserId);
  const cancelButtonRef = useRef(null);
  const { supabase } = useSupabase();
  const router = useRouter();

  const updateRequestStatus = async (requestId, userId, newStatus) => {
    const { data, error } = await supabase
      .from("business_admission_requests")
      .update({ request_status: newStatus }) //, request_viewer: userId
      .eq("business_admission_request_id", requestId)
      .select();
    console.log(error, data);
  };

  const deleteRequest = async (requestId) => {
    console.log("applicantId", applicantUserId);
    const { error } = await supabase
      .from("business_admission_requests")
      .delete()
      .eq("business_admission_request_id", requestId);

    if (!error) {
      if (deleteUser(applicantUserId));
      router.push("/dashboard/business/confirm-delete");
    }

    setOpen(false);
  };

  const handleRequest = async (requestAction) => {
    if (requestAction === "review") {
      updateRequestStatus(requestId, userId, "En revisión");
    } else if (requestAction === "delete") {
      deleteRequest(requestId);
    } else if (requestAction === "publish") {
      updateRequestStatus(requestId, userId, "Archivado");
    }
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    <ExclamationTriangleIcon
                      className={`h-6 w-6 text-red-600`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {warningTitle}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {warningDescription}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto`}
                    onClick={() => handleRequest(action)}
                  >
                    {buttonLabel}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;