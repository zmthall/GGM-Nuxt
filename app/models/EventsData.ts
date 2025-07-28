export type EventsData = {
        id: string;
        date: string;
        archived: boolean;
        dateTo?: string;
        title: string;
        location: string;
        address: string;
        description: string;
        link: string;
}[]

export type AddEventData = {
    date: string;
    dateTo?: string;
    title: string;
    location: string;
    address: string;
    description: string;
    link: string;
}

export interface EventUpdateResponse {
  success: boolean;
  data?: {
    id: string;
    date: string;
    dateTo?: string;
    archived: boolean;
    title: string;
    location: string;
    address: string;
    description: string;
    link: string;
  };
  message?: string;
}

export interface CommunityEventsResponse {
  success: boolean;
  data: EventsData;
  pagination: {
    hasNextPage: boolean;
    pageSize: number;
    count: number;
  };
}