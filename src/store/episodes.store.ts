import { BasicSearchPayload, BasicStoreData } from '@/types/store.types';
import { defineStore } from 'pinia';
import { Character, Episode, getEpisode, getEpisodes } from 'rickmortyapi';

export const useEpisodesStore = defineStore('episodes', {
    state: (): BasicStoreData<Episode> => ({
        values: [],
        filtered: [],
        total: 0,
        page: 1,
        loading: false,
    }),

    actions: {
        async loadEpisodes({ page, search }: BasicSearchPayload) {
            this.page = page || 0;
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
                this.filtered = res.data.results;
            }

            this.loading = false;
        },

        async loadEpisodesByCharacter(character: Character) {
            this.values = [];
            this.loading = true;

            const ids = character.episode.map((vl) =>
                Number(vl.split('/').at(-1)),
            );
            const res = await getEpisode(ids);
            if (res.status !== 200 || !res.data) {
                this.loading = false;
                return;
            }
            if (!!res.data) {
                this.values = res.data;
                this.total = res.data.length;
                this.filtered = res.data;
            }

            this.loading = false;
        },

        async filterEpisodes({ search }: BasicSearchPayload) {
            this.loading = true;
            if (!!search) {
                this.filtered = this.values.filter((vl) => {
                    return vl.name.toLowerCase().includes(search);
                });
            } else {
                this.filtered = this.values;
            }

            this.loading = false;
        },
    },
});
