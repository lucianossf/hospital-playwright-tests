export const hospitalUsers = {
  valid: {
    username: process.env.HOSPITAL_USERNAME ?? 'admin',
    password: process.env.HOSPITAL_PASSWORD ?? 'pass',
  },
  invalid: {
    username: 'invalid-user',
    password: 'invalid-password',
  },
} as const;

export const hospitalPatient = {
  searchTerm: process.env.HOSPITAL_PATIENT_SEARCH ?? 'Phil',
  expectedName: process.env.HOSPITAL_PATIENT_NAME ?? 'Belford, Phil',
} as const;
