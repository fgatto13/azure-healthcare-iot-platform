// API request handler
export const getPatients = () => ({
  url: "/patients",
  method: "GET",
});

export const getPatientById = (id) => ({
  url: `/patients/${id}`,
  method: "GET",
});

export const createPatient = (data) => ({
  url: "/patients",
  method: "POST",
  data,
});

export const updatePatient = (id, data) => ({
  url: `/patients/${id}`,
  method: "PUT",
  data,
});
