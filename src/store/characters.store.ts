import { defineStore } from 'pinia';
import { Character, getCharacters } from 'rickmortyapi';

export const useCharactersStore = defineStore('characters', {
    state: () => ({
        characters: [] as Character[],
        total: 0,
        page: 1,
        loading: false,
    }),

    actions: {
        async load({ page, search }: { page: number; search: string }) {
            this.page = page;
            this.characters = [];
            this.loading = true;

            const res = await getCharacters({ page: this.page, name: search });
            if (res.status !== 200 || !res.data.info) {
                this.loading = false;
                return;
            }
            if (res.data.results) {
                this.characters = res.data.results;
                this.total = res.data.info.count;
            }

            this.loading = false;
        },
    },
});
