<template>
    <v-container>
        <div class="text-center pa-4">
            <v-dialog
                @click:outside="emit('close')"
                v-model="props.isActive"
                transition="dialog-bottom-transition"
                scrollable
                fullscreen
            >
                <v-card class="d-flex flex-column" color="background">
                    <v-toolbar flat dense color="primary" class="sticky-toolbar">
                        <v-btn icon="mdi-close" @click="emit('close')"></v-btn>
                        <v-toolbar-title class="ml-3">
                            Character Information
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-img
                                    :src="props.character.image"
                                    alt="Character Image"
                                    height="200"
                                    cover
                                ></v-img>
                            </v-col>

                            <v-col cols="12" md="8">
                                <v-card-title>{{
                                    props.character.name
                                }}</v-card-title>
                                <v-card-subtitle>
                                    <div>
                                        <b>Status:</b>
                                        {{ props.character.status }}
                                    </div>
                                    <div>
                                        <b> Species: </b>
                                        {{ props.character.species }}
                                    </div>
                                    <div>
                                        <b> Gender: </b>
                                        {{ props.character.gender }}
                                    </div>
                                    <div v-if="props.character.type">
                                        <b> Type: </b>
                                        {{ props.character.type }}
                                    </div>
                                </v-card-subtitle>

                                <v-card-text class="pt-2">
                                    <strong>Last known location:</strong>
                                    {{ props.character.location.name }}
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>

                    <data-table-episodes
                        :itemsLength="episodesStore.total"
                        :dataItems="episodesStore.filtered"
                        :dataLoading="episodesStore.loading"
                        :itemsPerPage="20"
                        :dataHeaders="headers"
                        :rowClickAble="false"
                        @searchEvent="searchEvent"
                        @loadData="loadData"
                    ></data-table-episodes>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { Character } from 'rickmortyapi';
import { BasicSearchPayload } from '@/types/store.types';
import { headersEpisode } from '@/constants/constants';
import { useEpisodesStore } from '@/store/episodes.store';
import DataTableEpisodes from './DataTableEpisodes.vue';

const headers = headersEpisode;
const episodesStore = useEpisodesStore();

const emit = defineEmits(['close', 'filter']);

const loadData = () => {
    episodesStore.loadEpisodesByCharacter(props.character);
};

const searchEvent = ({ search }: BasicSearchPayload) => {
    episodesStore.filterEpisodes({ search });
};

const props = defineProps<{
    isActive: boolean;
    character: Character;
}>();
</script>

<style scoped>
.v-card {
    overflow: auto;
    background-color: var(--v-theme-background);
    color: var(--v-theme-on-background);
}

.v-toolbar__title {
    color: var(--v-theme-secondary);
}

.v-btn {
    color: var(--v-theme-secondary);
}

.sticky-toolbar {
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>
