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
  const { getAccessToken, isAuthenticated } = useMsalAuth();
  const { response, error, loading, fetchData } = useAxios(getAccessToken);
  const [patientId, setPatientId] = useState("");

  // to make sure that the accessToken gets retrieved and is correct
  useEffect(() => {
    const logToken = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessToken();
        console.log("ACCESS TOKEN:", token);
      } catch (err) {
        console.error("Failed to get access token:", err);
      }
    };

    logToken();
  }, [isAuthenticated, getAccessToken]);

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
      <div>

        <Container className="flex flex-col justify-center content-center gap-3">
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
          onClick={() => fetchData(getPatientById(patientId))}>Fetch patient by ID</Button>
        </Container>
      </div>

      <div>
        {patients.length > 0 ? (
          patients.map((p) => <PatientCard key={p.id} patient={p} />)
        ) : (
          <p className="p-2">No patients to display.</p>
        )}
      </div>
    </div>
  );
}
