export type JobDescription = {
    id: string;
    description: string;
    qualifications: string | string[];
    responsibilities: string | string[];
    select: string;
    shifts: string | string[];
    title: string;
}

export type JobDescriptionFetch = {
    data: JobDescription;
    success: boolean;
}

export type JobDescriptions = JobDescription[];