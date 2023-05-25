"use client";
import { useEffect, useState } from "react";
import { CheckIcon, TrashIcon } from "@heroicons/react/20/solid";
//import { useSupabase } from "@/app/supabase-provider";
import Modal from "./Modal";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const UpdateRequestStatus = ({
  requestId,
  requestStatus,
  userId,
  applicantUserId,
}) => {
  //const { supabase } = useSupabase();

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalInProccess, setOpenModalInProccess] = useState(false);
  const [openModalPost, setOpenModalPost] = useState(false);
  const [requestDeleted, setRequestDeleted] = useState(false);

  useEffect(() => {
    console.log(
      openModalDelete,
      openModalInProccess,
      openModalPost,
      requestDeleted
    );
  }, [openModalDelete, openModalInProccess, openModalPost, requestDeleted]);

  const Button = ({ label, action, children }) => {
    return (
      <div className="ml-5 inline-flex">
        {children}
        <button
          type="button"
          onClick={action}
          className="text-gray-500 text-md"
        >
          {label}
        </button>
      </div>
    );
  };
  console.log(requestDeleted);

  return (
    <>
      <Modal
        warningTitle="Eliminar"
        warningDescription="Esta acción eliminará definitivamente está solicitud. ¿Deseas continuar?"
        textColor="text-red-500"
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        buttonLabel="Eliminar"
        requestId={requestId}
        requestStatus={requestStatus}
        userId={userId}
        action={"delete"}
        setRequestDeleted={setRequestDeleted}
        applicantUserId={applicantUserId}
      />
      <Modal
        warningTitle="En revisión"
        warningDescription={`Esta acción marcará el estado de esta solicitud como  "En revisión". ¿Deseas continuar?`}
        open={openModalInProccess}
        setOpen={setOpenModalInProccess}
        buttonLabel="Poner en revisión"
        requestId={requestId}
        requestStatus={requestStatus}
        userId={userId}
        action={"review"}
      />
      <Modal
        warningTitle="Publicar"
        warningDescription="Esta acción publicará este comercio en el sitio web. ¿Deseas continuar?"
        open={openModalPost}
        setOpen={setOpenModalPost}
        buttonLabel="Publicar"
        requestId={requestId}
        requestStatus={requestStatus}
        userId={userId}
        action={"publish"}
      />
      <div className="pt-4 pb-3">
        <div className="-mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="mt-4">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              Solicitud de Ingreso de Comercio
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Estado de solicitud: {requestStatus}
            </p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <Button
              label="Eliminar"
              // listener={() =>
              //   handleRequestStatus(requestId, userId, "Archivada")
              // }
              action={() => setOpenModalDelete(true)}
            >
              <TrashIcon className="text-red-500 hover:text-red-600 w-5 inline-flex" />
            </Button>
            <Button
              label="Poner en revisión"
              // listener={() =>
              //   handleRequestStatus(requestId, userId, "En proceso")
              // }
              action={() => setOpenModalInProccess(true)}
            >
              <ClipboardDocumentListIcon className="text-yellow-500 hover:text-yellow-600 w-5 inline-flex mr-1" />
            </Button>
            <Button
              label="Publicar"
              // listener={() =>
              //   handleRequestStatus(requestId, userId, "Aprobada")
              // }
              action={() => setOpenModalPost(true)}
            >
              <CheckIcon className="text-green-600 hover:text-green-600 w-5 inline-flex" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRequestStatus;
