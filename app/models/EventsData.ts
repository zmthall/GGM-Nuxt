export type EventsData = {
        id: string;
        date: string;
        dateTo?: string;
        title: string;
        location: string;
        address: string;
        description: string;
        link: string;
}[]

export interface CommunityEventsResponse {
  success: boolean;
  data: EventsData;
  pagination: {
    hasNextPage: boolean;
    pageSize: number;
    count: number;
  };
}