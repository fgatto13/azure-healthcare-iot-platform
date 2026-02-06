import { useState } from "react";
import useAxios from "../hooks/useAxios";
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
} from "../services/api.services";

// Small component to render a single patient
const PatientCard = ({ patient }) => {
  const fullName = patient.name
    ? `${patient.name[0].given.join(" ")} ${patient.name[0].family}`
    : "Unknown";
  return (
    <div className="patient-card" style={{ border: "1px solid #ccc", padding: "8px", margin: "4px 0" }}>
      <h3>{fullName}</h3>
      <p>ID: {patient.id}</p>
      <p>Gender: {patient.gender}</p>
      {patient.birthDate && <p>Birth Date: {patient.birthDate}</p>}
    </div>
  );
};

function Dashboard() {
  const { response, error, loading, fetchData } = useAxios();
  const [patientId, setPatientId] = useState("");
  // Extract patients from response
  const patients =
    response?.resourceType === "Bundle"
      ? response.entry?.map((entry) => entry.resource) || []
      : response?.resourceType === "Patient"
      ? [response]
      : [];
  return (
    <>
      <h1>Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>An error occurred: {error}</p>}

      <div style={{ marginBottom: "16px" }}>
        <button onClick={() => fetchData(getPatients())} style={{ marginRight: "8px" }}>
          Fetch all patients
        </button>

        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <button onClick={() => fetchData(getPatientById(patientId))}>Fetch patient by ID</button>
      </div>

      <div>
        {patients.length > 0 ? (
          patients.map((p) => <PatientCard key={p.id} patient={p} />)
        ) : (
          <p>No patients to display.</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
