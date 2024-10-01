export enum TypeFilters {
    Search = 'search',
    Gender = 'gender',
    Status = 'status',
}

export type Filters = Record<TypeFilters, boolean>;

export interface BasicSearchPayload {
    page?: number;
    search: string;
}
