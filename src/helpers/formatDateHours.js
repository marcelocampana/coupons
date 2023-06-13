export const formatDateHour = (date) => {
  const dateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const hourOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const dateFormat = new Date(date).toLocaleDateString("es-CL", dateOptions);
  const hoursFormat = new Date(date).toLocaleTimeString("es-CL", hourOptions);

  return `${dateFormat} a las ${hoursFormat}`;
};
