<template>
    <v-container>
        <v-data-table-server
            :items-per-page="itemsPerPage"
            :items-per-page-options="[itemsPerPage]"
            :items-length="itemsLength"
            :headers="dataHeaders"
            :items="dataItems"
            class="elevation-2 rounded"
            :loading="dataLoading"
            @update:options="loadData"
            v-on="tableOptions"
        >
            <template #top>
                <v-row class="mb-4">
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            outlined
                            shaped
                            clearable
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-select
                            v-model="gender"
                            :items="['Male', 'Female', 'Genderless', 'unknown']"
                            label="Gender"
                            outlined
                            shaped
                            clearable
                            hide-details
                        ></v-select>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-select
                            v-model="status"
                            :items="['Alive', 'Dead', 'unknown']"
                            label="Status"
                            outlined
                            shaped
                            clearable
                            hide-details
                        ></v-select>
                    </v-col>
                </v-row>
            </template>

            <template #item.image="{ item }">
                <v-card class="mx-auto" max-width="50" flat>
                    <v-img :src="item.image" height="50" contain></v-img>
                </v-card>
            </template>

            <template #item.air_date="{ item }">
                <span class="text-caption">{{
                    formatDate(item.air_date)
                }}</span>
            </template>

            <template #item.characters="{ item }">
                <span class="text-caption"
                    >{{ item.characters.length }} Characters</span
                >
            </template>
        </v-data-table-server>
    </v-container>
</template>

<script setup lang="ts">
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import { computed, ref, watch } from 'vue';
import { CharactersSearchPayload } from '@/types/store.types';
import { formatDate } from '@/utils/date.utils';
import { Character } from 'rickmortyapi';

const props = defineProps<{
    itemsLength: number;
    dataItems: any[];
    dataLoading: boolean;
    itemsPerPage: number;
    dataHeaders: VDataTable['$props']['headers'];
    rowClickAble: boolean;
}>();

const emit = defineEmits(['rowClicked', 'searchEvent', 'loadData']);

const search = ref('');
const gender = ref('' as Character['gender']);
const status = ref('' as Character['status']);

watch([search, gender, status], ([search, gender, status]) => {
    handleSearch({ page: 1, search, gender, status });
});

const loadData = ({ page }: { page: number; search: string }) => {
    emit('loadData', { page, search: search.value });
};

const handleSearch = (searchData: CharactersSearchPayload) => {
    emit('searchEvent', searchData);
};

const handleClick = (event: Event, row: any) => {
    const item = row.item;
    emit('rowClicked', item);
};

const tableOptions = computed(() => {
    if (props.rowClickAble) {
        return {
            'click:row': handleClick,
        };
    }
    return {};
});
</script>

<style scoped>
/* Estilos generales para hacer la tabla más atractiva */
.v-data-table-server {
    border-radius: 10px;
    overflow: hidden;
}

/* Mejor hover sobre filas */
.v-data-table-server tbody tr:hover {
    background-color: #f5f5f5;
    cursor: pointer;
}

/* Estilo personalizado para las imágenes */
.v-img {
    border-radius: 8px;
    border: 1px solid #eee;
}

/* Mejora en la presentación del texto en la tabla */
.text-caption {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
}
</style>
