// models/admin/ApplicationForm.ts

export interface FileObject {
  id: string
  file: File
}

export interface FileData {
  url: string
  filename: string
}

export type ApplicationRequestStatus =
  | 'new'
  | 'reviewing'
  | 'interviewed'
  | 'do_not_hire'
  | 'spam'
  | 'closed'

/** ---- Form Sections (shared logical fields) ---- */

export interface ApplicationPersonal {
  select: string
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  over18: string
  citizen: string
  felony: string
}

export interface ApplicationDriving {
  hasEndorsements: string
  endorsements?: string
  hasAccidents: string
  accidents?: string
  hasTrafficConvictions: string
  trafficConvictions?: string
  hasMVR: string

  /** Admin/API doc: uploaded file metadata */
  MVR?: FileData
  driversLicense?: FileData
}

export interface ApplicationWork {
  learnedAboutUs: string
  otherExplain?: string
  hasWorkedAtGoldenGate: string
  employmentType: string
  availability?: string
  willingToWorkOvertime: string

  /** IMPORTANT: backend encryptor expects string; keep as string here too */
  preferablePayRate: string

  /** store as ISO string or whatever your date picker returns; treat as string */
  dateAvailableToStart: string

  /** Admin/API doc: uploaded file metadata */
  resume: FileData
}

export interface ApplicationData {
  personal: ApplicationPersonal
  driving: ApplicationDriving
  work: ApplicationWork
}

/** ---- Admin/API Document ---- */
export interface ApplicationDocument extends ApplicationData {
  id: string
  contact_type: string
  tags: string[]
  status: ApplicationRequestStatus
  created_at: string
  updated_at?: string

  /** Queryable meta fields (recommended) */
  position?: string               // e.g. "city_cab-driver"
  department?: string             // e.g. "city_cab"
  position_name?: string          // e.g. "driver"
}

export type ApplicationFormData = ApplicationDocument

/** ---- Frontend Form State (upload-ready) ----
 * Matches your page state where file inputs are arrays of FileObject
 * and you remove them from applicationData before sending.
 */
export interface ApplicationFormState {
  personal: ApplicationPersonal
  driving: Omit<ApplicationDriving, 'MVR' | 'driversLicense'> & {
    MVR: FileObject[]
    driversLicense: FileObject[]
  }
  work: Omit<ApplicationWork, 'resume'> & {
    resume: FileObject[]
  }
}