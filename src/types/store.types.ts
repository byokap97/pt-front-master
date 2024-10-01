import { Character } from 'rickmortyapi';
import { TypeFilters } from './table.types';

export interface BasicStoreData<T> {
    values: T[];
    total: number;
    page: number;
    filtered: T[];
    loading: boolean;
}

export interface BasicSearchPayload {
    page?: number;
    search: string;
}

export interface CharactersSearchPayload extends BasicSearchPayload {
    gender?: Character['gender'];
    status?: Character['status'];
}
