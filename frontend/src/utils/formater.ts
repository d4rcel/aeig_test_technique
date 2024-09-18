export const getStatusStyle = (status: string) => {
    switch (formatStatusValue(status)) {
      case "Pending":
        return "pending-style style1";
      case "Progress":
        return "pending-style style2";
      case "Completed":
        return "pending-style style3";
      default:
        return "";
    }
  };

export const getFormatedDate = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    return formattedDate as string
}

export const formatStatusValue = (status: string) => {
    switch (status) {
      case "En attente":
        return "Pending";
      case "En cours":
        return "Progress";
      case "Terminé":
        return "Completed";
      default:
        return "";
    }
  };