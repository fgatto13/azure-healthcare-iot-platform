import { useState, useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
import { PatientCard } from "../components/common/PatientCard";
import { Button, Container } from "react-bootstrap";
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
} from "../services/api.services";
import { useMsalAuth } from "../hooks/useMsalAuth";

export const Dashboard = () => {
  const { getAccessToken } = useMsalAuth();
  const { response, error, loading, fetchData } = useAxios(getAccessToken);
  const [patientId, setPatientId] = useState("");
  const { claims } = useMsalAuth();

  // Extract patients from response
  const patients =
    response?.resourceType === "Bundle"
      ? response.entry?.map((entry) => entry.resource) || []
      : response?.resourceType === "Patient"
      ? [response]
      : [];
  return (
    <div>
      <h1>Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>An error occurred: {error}</p>}
        <Container className="flex flex-col justify-center content-center gap-3">
          {claims.roles?.includes('User.Admin') && (
            <Button onClick={() => fetchData(createPatient())}>
              Create New Patient
            </Button>
          )}
          {claims.roles?.some(r => ['User.Admin', 'User.Doctor'].includes(r)) && (
            <Button onClick={() => fetchData(updatePatient())}>
              Create / Update Patient
            </Button>
          )}
          <Button 
            onClick={() => fetchData(getPatients())}>
            Fetch all patients
          </Button>
          <input
            type="text"
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="border-2 border-blue-400 rounded-sm p-2"
            />
          <Button 
            onClick={() => fetchData(getPatientById(patientId))}>Fetch patient by ID
          </Button>
        </Container>

      <div className="grid gap-3 p-2">
        {patients.length > 0 ? (
          patients.map((p) => <PatientCard key={p.id} patient={p} />)
        ) : (
          <p className="p-2">No patients to display.</p>
        )}
      </div>
    </div>
  );
}
