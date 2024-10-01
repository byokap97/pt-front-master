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
                <v-card
                    class="d-flex flex-column"
                    color="background"
                >
                    <v-toolbar flat dense color="primary">
                        <v-btn icon="mdi-close" @click="emit('close')"></v-btn>

                        <v-toolbar-title> Episode Information </v-toolbar-title>

                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card>
                        <v-card-title class="text-h5 pt-4">{{
                            props.episode.name
                        }}</v-card-title>
                        <v-card-subtitle class="pl-4">
                            <strong>Air Date:</strong>
                            {{ formatDate(props.episode.air_date) }}
                        </v-card-subtitle>
                        <v-card-subtitle class="pl-4">
                            {{ formatSeasonEpisode(props.episode.episode) }}
                        </v-card-subtitle>
                        <v-card-subtitle class="pl-4">
                            <strong>Link: </strong>
                            <a :href="props.episode.url" target="_blank">{{
                                props.episode.url
                            }}</a>
                        </v-card-subtitle>
                        <div class="data-table-container">
                            <data-table-characters
                                :itemsLength="charactersStore.total"
                                :dataItems="charactersStore.filtered"
                                :dataLoading="charactersStore.loading"
                                :itemsPerPage="20"
                                :dataHeaders="headers"
                                :rowClickAble="false"
                                @searchEvent="filter"
                                @loadData="loadData"
                            ></data-table-characters>
                        </div>
                    </v-card>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils/date.utils';
import { Character, Episode } from 'rickmortyapi';
import { headersCharacters } from '@/constants/constants';
import DataTableCharacters from './DataTableCharacters.vue';
import { useCharactersStore } from '@/store/characters.store';
import { CharactersSearchPayload } from '@/types/store.types';

const charactersStore = useCharactersStore();
const headers = headersCharacters;

const emit = defineEmits(['close', 'filter']);

const loadData = () => {
    charactersStore.loadByEpisode(props.episode);
};

const filter = (data: CharactersSearchPayload) => {
    charactersStore.filterCharacters(data);
};

const formatSeasonEpisode = (input: string): string => {
    // Usamos una expresión regular para capturar los números de temporada y episodio
    const regex = /^S(\d{2})E(\d{2})$/;
    const match = input.match(regex);

    if (match) {
        // Convertimos los números de temporada y episodio a enteros
        const season = parseInt(match[1], 10);
        const episode = parseInt(match[2], 10);

        // Retornamos el formato deseado
        return `Season ${season} Episode ${episode}`;
    } else {
        // Si el input no tiene el formato esperado, lanzamos un error o retornamos un mensaje
        return 'Invalid format';
    }
};
const props = defineProps<{
    isActive: boolean;
    episode: Episode;
    characters: Character[];
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
</style>
