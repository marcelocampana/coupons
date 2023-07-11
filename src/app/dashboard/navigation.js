import {
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const navigation = (recordId) => {
  return [
    {
      name: "Bienvenida",
      href: "/dashboard/business-admin/business/home",
      icon: HomeIcon,
      current: true,
      role: "business-admin",
    },
    {
      name: "Solicitudes de ingreso",
      href: "/dashboard/admin/business/list",
      icon: ClipboardDocumentCheckIcon,
      current: false,
      role: "admin",
    },
    {
      name: "Mi registro",
      href: `/dashboard/business-admin/business/detail/${recordId}`,
      icon: BuildingOffice2Icon,
      current: true,
      role: "business-admin",
    },
  ];
};

export default navigation;
