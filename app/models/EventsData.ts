export type EventsData = {
        id: string;
        dateStart: string;
        archived: boolean;
        dateEnd?: string;
        title: string;
        location: string;
        address: string;
        description: string;
        link: string;
}[]

export type AddEventData = {
    dateStart: string;
    dateEnd?: string;
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
    dateStart: string;
    dateEnd?: string;
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

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages?: number;
  totalCount?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}