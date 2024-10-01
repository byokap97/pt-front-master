<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h4 class="text-h4">Episodes</h4>
            </v-col>
            <v-col>
                <data-table-episodes
                    :itemsLength="episodesStore.total"
                    :dataItems="episodesStore.values"
                    :dataLoading="episodesStore.loading"
                    :itemsPerPage="20"
                    :rowClickAble="true"
                    :dataHeaders="headers"
                    @rowClicked="showInfo"
                    @searchEvent="loadEpisodes"
                    @loadData="loadEpisodes"
                ></data-table-episodes>
            </v-col>
            <episode-info-modal
                :isActive="modalIsActive"
                :episode="refEpisode"
                :characters="characterStore.values"
                @close="closeModal"
            ></episode-info-modal>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useEpisodesStore } from '@/store/episodes.store';
import DataTableEpisodes from '../components/DataTableEpisodes.vue';
import EpisodeInfoModal from '../components/EpisodeInfoModal.vue';
import { ref } from 'vue';
import { Episode } from 'rickmortyapi';
import { BasicSearchPayload } from '@/types/store.types';
import { useCharactersStore } from '@/store/characters.store';
import { headersEpisode } from '@/constants/constants';

const episodesStore = useEpisodesStore();
const characterStore = useCharactersStore();

const modalIsActive = ref(false);
const refEpisode = ref({} as Episode);

const headers = headersEpisode;

const loadEpisodes = ({ page, search }: BasicSearchPayload) => {
    episodesStore.loadEpisodes({ page: page, search: search ?? '' });
};

const closeModal = () => {
    modalIsActive.value = false;
};

const showInfo = (episode: Episode) => {
    characterStore.loadByEpisode(episode);
    modalIsActive.value = true;
    refEpisode.value = episode;
};
</script>
