<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h4 class="text-h4">Episodes</h4>
            </v-col>
            <v-col>
                <data-table
                    :itemsLength="episodesStore.totalEpisodes"
                    :dataItems="episodesStore.episodes"
                    :dataLoading="episodesStore.loading"
                    :itemsPerPage="20"
                    :dataHeaders="headers"
                    @rowClicked="showInfo"
                    @searchEvent="loadEpisodes"
                    @loadData="loadEpisodes"
                ></data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useEpisodesStore } from '@/store/episodes.store';
import { Episode } from 'rickmortyapi';
import DataTable from '../components/DataTable.vue';
const episodesStore = useEpisodesStore();

const headers: VDataTable['$props']['headers'] = [
    { title: 'Episode', key: 'episode', sortable: false },
    { title: 'Name', key: 'name', sortable: false },
    { title: 'Air Date', key: 'air_date', sortable: false },
    { title: '#Characters', key: 'characters', sortable: false },
];

const loadEpisodes = ({ page, search }: { page: number; search: string }) => {
    console.log('holaa', { page, search })
    episodesStore.loadEpisodes({ page: page, search: search ?? '' });
};

const showInfo = (item) => {
    console.log(item);
};
</script>
