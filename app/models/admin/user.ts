export interface UserData {
    created_at?: string;
    created_by?: string;
    updated?: {
        at: string;
        by: string;
    };
    displayName: string;
    email: string;
    id: string;
    lastLogin: string;
    role: 'admin' | 'user' | 'correspondence';
    status: 'active' | 'disabled';
    lastPasswordReset: string;
}

export interface FetchUser {
    data?: UserData;
    success: boolean;
    message?: string;
}

export interface AddUserData {
    email: string;
    password: string;
    displayName?: string;
    role: 'admin' | 'user' | 'correspondence';
}