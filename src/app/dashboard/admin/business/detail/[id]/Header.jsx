"use client";
import { useEffect, useState } from "react";
import {
  CheckIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSupabase } from "@/app/supabase-provider";
import Modal from "./Modal";
import { ClockIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { formatDateHour } from "@/helpers/formatDateHours";
import Profiles from "@/services/Profiles";
import { classNames } from "@/helpers/classnames";

const Header = ({
  requestId,
  requestStatus,
  adminId,
  applicantUserId,
  requestViewer,
  createdAt,
  adminUpdatedAt,
  businessAdminUpdatedAt,
}) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalInProccess, setOpenModalInProccess] = useState(false);
  const [openModalPost, setOpenModalPost] = useState(false);
  const [requestDeleted, setRequestDeleted] = useState(false);
  const [requestViewerFullName, setRequestViewerFullName] = useState(null);
  const [realtimeStatus, setRealtimeStatus] = useState(null);

  const { supabase } = useSupabase();

  useEffect(() => {
    supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "business_admission_requests",
        },
        (payload) => {
          setRealtimeStatus(payload.new.request_status);
        }
      )
      .subscribe();
  }, [realtimeStatus]);

  const getProfile = async (profileId) => {
    const profileQuery = new Profiles(supabase);
    const profile = await profileQuery.getRecordById(profileId);
    setRequestViewerFullName(`${profile[0].firstname} ${profile[0].lastname}`);
  };

  requestViewer && getProfile(requestViewer);

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
        adminId={adminId}
        action={"delete"}
        setRequestDeleted={setRequestDeleted}
        applicantUserId={applicantUserId}
        color={"red"}
      />
      <Modal
        warningTitle="En revisión"
        warningDescription={`Esta acción marcará el estado de esta solicitud como "En revisión". ¿Deseas continuar?`}
        open={openModalInProccess}
        setOpen={setOpenModalInProccess}
        buttonLabel="Poner en revisión"
        requestId={requestId}
        requestStatus={requestStatus}
        adminId={adminId}
        action={"en revisión"}
        color={"indigo"}
      />
      <Modal
        warningTitle="Admitir registro"
        warningDescription="Esta acción admitirá este comercio para mas adelante ser publicado. ¿Deseas continuar?"
        open={openModalPost}
        setOpen={setOpenModalPost}
        buttonLabel="Publicar"
        requestId={requestId}
        requestStatus={requestStatus}
        adminId={adminId}
        action={"admitida"}
        color={"indigo"}
      />
      <div className="pt-4 pb-3">
        <div className="-mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="mt-4">
            <div className="flex">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">
                Solicitud de Ingreso de Comercio
              </h3>
              <p className="ml-1 max-w-2xl text-sm leading-6 text-gray-500">
                <span
                  className={classNames(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium  ring-1 ring-inset",
                    realtimeStatus === "En revisión" ||
                      requestStatus === "En revisión"
                      ? "bg-yellow-50 text-yellow-600 ring-yellow-600/20"
                      : realtimeStatus === "Admitida" ||
                        requestStatus === "Admitida"
                      ? "bg-green-50 text-green-600 ring-green-600/20"
                      : realtimeStatus === "Por revisar" ||
                        requestStatus === "Por revisar"
                      ? "bg-gray-50 text-gray-600 ring-gray-600/20"
                      : null
                  )}
                >
                  {realtimeStatus ? realtimeStatus : requestStatus}
                </span>
              </p>
            </div>
            <div className="flex">
              <RocketLaunchIcon className="text-gray-400 w-4 h-4 mt-1.5 mr-1" />
              <p className="text-gray-500 text-sm mt-1">
                Creada el {formatDateHour(createdAt)}
              </p>
            </div>
            {adminUpdatedAt !== createdAt && (
              <div className="flex">
                <ClockIcon className="text-gray-400 w-4 h-4 mt-1.5 mr-1" />
                <p className="text-gray-500 text-sm mt-1">
                  Última modificación del administrador el{" "}
                  {formatDateHour(adminUpdatedAt)}
                </p>
              </div>
            )}
            {businessAdminUpdatedAt !== createdAt && (
              <div className="flex">
                <ClockIcon className="text-gray-400 w-4 h-4 mt-1.5 mr-1" />
                <p className="text-gray-500 text-sm mt-1">
                  Última modificación por el comercio el{" "}
                  {formatDateHour(businessAdminUpdatedAt)}
                </p>
              </div>
            )}
            {requestViewerFullName && (
              <div className="flex">
                <ClipboardDocumentCheckIcon className="text-gray-400 w-4 h-4 mt-1.5 mr-1" />
                <p className="text-gray-500 text-sm mt-1">
                  {requestStatus} por
                  <span className="text-gray-500 font-medium">
                    {" "}
                    {requestViewerFullName}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="ml-4 mt-4 flex-shrink-0">
            <Button label="Eliminar" action={() => setOpenModalDelete(true)}>
              <TrashIcon className="text-red-500 hover:text-red-600 w-5 inline-flex" />
            </Button>
            {requestStatus !== "En revisión" &&
              requestStatus !== "Admitida" && (
                <Button
                  label="Poner en revisión"
                  action={() => setOpenModalInProccess(true)}
                >
                  <ClipboardDocumentListIcon className="text-yellow-500 hover:text-yellow-600 w-5 inline-flex mr-1" />
                </Button>
              )}
            {requestStatus !== "Admitida" && (
              <Button label="Admitir" action={() => setOpenModalPost(true)}>
                <CheckIcon className="text-green-600 hover:text-green-600 w-5 inline-flex" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
