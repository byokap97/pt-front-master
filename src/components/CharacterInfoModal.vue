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
                <v-card class="d-flex flex-column dialog-card">
                    <!-- Toolbar for Dialog Header -->
                    <v-toolbar flat dense>
                        <v-btn
                            icon
                            @click="emit('close')"
                            aria-label="Close Dialog"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title class="ml-3">
                            {{ props.character.name }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <!-- Main Card Content -->
                    <v-container fluid>
                        <v-row>
                            <!-- Character Image -->
                            <v-col cols="12" md="4">
                                <v-img
                                    :src="props.character.image"
                                    alt="Character Image"
                                    height="200"
                                    cover
                                ></v-img>
                            </v-col>

                            <!-- Character Info -->
                            <v-col cols="12" md="8">
                                <v-card-title
                                    >Character Information</v-card-title
                                >
                                <v-card-subtitle>
                                    <div>
                                        Status: {{ props.character.status }}
                                    </div>
                                    <div>
                                        Species: {{ props.character.species }}
                                    </div>
                                    <div>
                                        Gender: {{ props.character.gender }}
                                    </div>
                                    <div v-if="props.character.type">
                                        Type: {{ props.character.type }}
                                    </div>
                                </v-card-subtitle>

                                <!-- Location Info -->
                                <v-card-text class="pt-2">
                                    <strong>Last known location:</strong>
                                    {{ props.character.location.name }}
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>

                    <!-- Data Table of Episodes -->
                    <v-card-text>
                        <div class="data-table-container">
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
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils/date.utils';
import { Character } from 'rickmortyapi';
import { BasicSearchPayload } from '@/types/store.types';
import { headersEpisode } from '@/constants/constants';
import { useEpisodesStore } from '@/store/episodes.store';
import DataTableEpisodes from './DataTableEpisodes.vue';

const headers = headersEpisode;
const episodesStore = useEpisodesStore();

const emit = defineEmits(['close', 'filter']);
const fDate = formatDate;

const loadData = () => {
    episodesStore.loadEpisodesByCharacter(props.character);
};

const searchEvent = ({ search }: BasicSearchPayload) => {
    episodesStore.filterEpisodes({ search });
};

const formatSeasonEpisode = (input: string): string => {
    const regex = /^S(\d{2})E(\d{2})$/;
    const match = input.match(regex);

    if (match) {
        const season = parseInt(match[1], 10);
        const episode = parseInt(match[2], 10);
        return `Season ${season} Episode ${episode}`;
    } else {
        return 'Invalid format';
    }
};

const props = defineProps<{
    isActive: boolean;
    character: Character;
}>();
</script>

<style scoped>
.dialog-card {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.data-table-container {
    flex-grow: 1;
    overflow-y: auto;
    max-height: 90%;
}

.v-card-title {
    font-size: 1.2rem;
    font-weight: bold;
}

.v-card-subtitle {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.7);
}

.v-card-actions {
    justify-content: flex-end;
}

.v-dialog {
    overflow: hidden;
}

.v-img {
    border-radius: 8px;
}

@media (max-width: 768px) {
    .v-card-title {
        font-size: 1rem;
    }

    .v-card-subtitle {
        font-size: 0.9rem;
    }

    .v-img {
        height: 180px;
    }
}
</style>
