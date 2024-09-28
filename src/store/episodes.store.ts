import { defineStore } from 'pinia';
import { Episode, getEpisodes } from 'rickmortyapi';

export const useEpisodesStore = defineStore('episodes', {
    state: () => ({
        values: [] as Episode[],
        total: 0,
        page: 1,
        loading: false,
    }),

    actions: {
        async load({ page, search }: { page: number; search: string }) {
            this.page = page;
            this.values = [];
            this.loading = true;

            const res = await getEpisodes({ page: this.page, name: search });
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
    },
});
