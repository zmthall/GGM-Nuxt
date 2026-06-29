export interface ConsultationForm {
  personal_information: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    contact_method: 'email' | 'phone';
  };
  individual_care_information: {
    person_seeking_care: {
      value: 'self' | 'parent' | 'family-member' | 'friend' | 'client-patient' | 'other';
      other: string;
    };
    age_range: '18-40' | '40-55' | '55-65' | '65-75' | '75+' | 'no-answer';
    insurance_type: {
      value: 'medicaid' | 'medicare' | 'private-insurance' | 'va-benefits' | 'unknown' | 'other';
      other: string;
    };
    questions: {
      name: string;
      label: string;
      value: 'yes' | 'no' | 'unsure';
    }[];
    placement: 'immediate' | '30-days' | '1-3-months' | 'exploring';
  };
  message: string;
}

export type ConsultationFormStatus =
  | 'new'
  | 'reviewing'
  | 'contacted'
  | 'spam'
  | 'closed'

export interface ConsultationQuestion {
  name: string
  label: string
  value: 'yes' | 'no' | 'unsure'
}

export interface ConsultationPersonSeekingCare {
  value:
    | 'self'
    | 'parent'
    | 'family-member'
    | 'friend'
    | 'client-patient'
    | 'other'
  other: string
}

export interface ConsultationInsuranceType {
  value:
    | 'medicaid'
    | 'medicare'
    | 'private-insurance'
    | 'va-benefits'
    | 'unknown'
    | 'other'
  other: string
}

export interface ConsultationMessageRecord {
  id: string

  contact_type: string

  first_name: string
  last_name: string
  email: string
  phone: string
  contact_method: 'email' | 'phone'

  person_seeking_care: ConsultationPersonSeekingCare
  age_range:
    | '18-40'
    | '40-55'
    | '55-65'
    | '65-75'
    | '75+'
    | 'no-answer'

  insurance_type: ConsultationInsuranceType

  questions: ConsultationQuestion[]

  placement:
    | 'immediate'
    | '30-days'
    | '1-3-months'
    | 'exploring'

  message: string

  status: ConsultationFormStatus

  tags: string[]

  created_at: string
  updated_at: string

  email_status: string
  email_sent_at: string | null
  message_id: string
  email_error: string
  email_failed_at: string | null

  raw_payload: Record<string, unknown>
}

export type ConsultationRequestFormData = ConsultationMessageRecord