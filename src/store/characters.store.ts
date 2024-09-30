import {
    BasicSearchPayload,
    BasicStoreData,
    CharactersSearchPayload,
} from '@/types/store.types';
import { defineStore } from 'pinia';
import { Character, Episode, getCharacter, getCharacters } from 'rickmortyapi';

export const useCharactersStore = defineStore('characters', {
    state: (): BasicStoreData<Character> => ({
        values: [],
        filtered: [],
        total: 0,
        page: 1,
        loading: false,
    }),
    actions: {
        async loadAllCharacters({
            page,
            search,
            gender,
            status,
        }: CharactersSearchPayload) {
            this.page = page || 0;
            this.values = [];
            this.loading = true;

            const res = await getCharacters({
                page: this.page,
                name: search,
                ...(gender && { gender }),
                ...(status && { status }),
            });
            if (res.status !== 200 || !res.data.info) {
                this.loading = false;
                return;
            }
            if (res.data.results) {
                this.values = res.data.results;
                this.total = res.data.info.count;
            }

            this.loading = false;
        },

        async loadByEpisode(episode: Episode) {
            this.values = [];
            this.loading = true;

            const ids = episode.characters.map((vl) =>
                Number(vl.split('/').at(-1)),
            );
            const res = await getCharacter(ids);
            if (res.status !== 200 || !res.data.length) {
                this.loading = false;
                return;
            }
            if (res.data) {
                this.values = res.data;
                this.total = res.data.length;
                this.filtered = res.data;
            }

            this.loading = false;
        },
        async filterCharacters({
            search,
            gender,
            status,
        }: CharactersSearchPayload) {
            this.loading = true;

            const conditions = (vl: Character) => {
                const filters = [
                    search
                        ? vl.name.toLowerCase().includes(search.toLowerCase())
                        : true,
                    gender ? vl.gender === gender : true,
                    status ? vl.status === status : true,
                ];
                return filters.every((condition) => condition);
            };

            this.filtered = this.values.filter((vl) => conditions(vl));
            this.loading = false;
        },
    },
});
