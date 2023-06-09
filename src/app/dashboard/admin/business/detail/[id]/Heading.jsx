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
import UtilsBARStatus from "@/app/components/UtilsBARStatus";
import Button from "./Button";

const Heading = ({
  requestId,
  applicantUserId,
  currentAdminId,
  requestViewer,
  createdAt,
  adminUpdatedAt,
  businessAdminUpdatedAt,
  status,
}) => {
  const { supabase } = useSupabase();

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalInProccess, setOpenModalInProccess] = useState(false);
  const [openModalPost, setOpenModalPost] = useState(false);
  //const [requestDeleted, setRequestDeleted] = useState(false);
  const [requestViewerFullName, setRequestViewerFullName] = useState(null);
  const [realtimeStatus, setRealtimeStatus] = useState(null);

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

  return (
    <>
      <Modal
        warningTitle="Eliminar"
        warningDescription="Esta acción eliminará definitivamente esta solicitud como la cuenta del usuario que la creó. ¿Deseas continuar?"
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        buttonLabel="Eliminar"
        requestId={requestId}
        requestStatus={status}
        currentAdminId={currentAdminId}
        requestViewer={requestViewer}
        action={"delete"}
        //  setRequestDeleted={setRequestDeleted}
        applicantUserId={applicantUserId}
        color={"red"}
      />
      <Modal
        warningTitle="En revisión"
        warningDescription={`Esta acción marcará el estado de esta solicitud como "En revisión" y el comercio podrá continuar editándola. ¿Deseas continuar?`}
        open={openModalInProccess}
        setOpen={setOpenModalInProccess}
        buttonLabel="Poner en revisión"
        requestId={requestId}
        requestStatus={status}
        currentAdminId={currentAdminId}
        requestViewer={requestViewer}
        action={"en revisión"}
        color={"pink"}
      />
      <Modal
        warningTitle="Admitir registro"
        warningDescription="Esta acción admitirá esta solicitud y no podrá ser editada por el comercio. ¿Deseas continuar?"
        open={openModalPost}
        setOpen={setOpenModalPost}
        buttonLabel="Admitir solicitud"
        requestId={requestId}
        requestStatus={status}
        currentAdminId={currentAdminId}
        requestViewer={requestViewer}
        action={"admitida"}
        color={"pink"}
      />
      <div className="pt-4 pb-3">
        <div>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">
            Solicitud de Ingreso de Comercio
            <span className="ml-1">
              <UtilsBARStatus
                status={realtimeStatus ? realtimeStatus : status}
              />
            </span>
          </h3>
        </div>
        <div className="lg:-mt-4 xl:flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="mt-4">
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
                  Editada por admin el {formatDateHour(adminUpdatedAt)}
                </p>
              </div>
            )}
            {businessAdminUpdatedAt !== createdAt && (
              <div className="flex">
                <ClockIcon className="text-gray-400 w-4 h-4 mt-1.5 mr-1" />
                <p className="text-gray-500 text-sm mt-1">
                  Editada por comercio el{" "}
                  {formatDateHour(businessAdminUpdatedAt)}
                </p>
              </div>
            )}
            {requestViewerFullName && (
              <div className="flex">
                <ClipboardDocumentCheckIcon className="text-gray-400 w-4 h-4 mt-1.5 mr-1" />
                <p className="text-gray-500 text-sm mt-1">
                  {status} por
                  <span className="text-gray-500 font-medium">
                    {" "}
                    {requestViewerFullName}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="text-gray-400 text-sm mb-1">Opciones</div>
            <div className="flex-shrink-0">
              <Button label="Eliminar" action={() => setOpenModalDelete(true)}>
                <TrashIcon className="text-red-500 hover:text-red-600 w-5 inline-flex mr-1" />
              </Button>

              {status !== "En revisión" && (
                <Button
                  label="Poner en revisión"
                  action={() => setOpenModalInProccess(true)}
                >
                  <ClipboardDocumentListIcon className="text-yellow-500 hover:text-yellow-600 w-5 inline-flex mr-1" />
                </Button>
              )}
              {status !== "Admitida" &&
                businessAdminUpdatedAt !== createdAt && (
                  <Button label="Admitir" action={() => setOpenModalPost(true)}>
                    <CheckIcon className="text-green-600 hover:text-green-600 w-5 inline-flex" />
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;
