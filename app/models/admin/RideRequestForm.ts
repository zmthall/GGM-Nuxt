export interface RideRequestFormData {
    name: string;
    phone: string;
    email: string;
    status: RideRequestStatus
    dob: string;
    med_id: string;
    created_at: string;
    apt_time: string;
    apt_date: string;
    pickup_address: string;
    dropoff_address: string;
    notes: string;
    tags: string[];
    id: string;
}

export type RideRequestStatus =
  | "new"
  | "completed"
  | "reviewing"
  | "spam"
  | "declined";