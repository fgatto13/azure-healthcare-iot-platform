// Small component to render a single patient
export const PatientCard = ({ patient }) => {
  const fullName = patient.name
    ? `${patient.name[0].given.join(" ")} ${patient.name[0].family}`
    : "Unknown";
  return (
    <div className="patient-card border-2 rounded-2 border-blue-200">
      <h3>{fullName}</h3>
      <p>ID: {patient.id}</p>
      <p>Gender: {patient.gender}</p>
      {patient.birthDate && <p>Birth Date: {patient.birthDate}</p>}
    </div>
  );
};