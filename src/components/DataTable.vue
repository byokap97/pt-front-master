<template>
    <v-container>
        <v-data-table-server
            :items-per-page="itemsPerPage"
            :items-per-page-options="[itemsPerPage]"
            :items-length="itemsLength"
            :headers="dataHeaders"
            :items="dataItems"
            class="elevation-1"
            :loading="dataLoading"
            @update:options="loadData"
            @click:row="handleClick"
        >
            <template #top>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
            </template>
            <template #item.air_date="{ item }">
                {{ formatDate(item.air_date) }}
            </template>
            <template #item.characters="{ item }">
                {{ item.characters.length }}
            </template>
        </v-data-table-server>
    </v-container>
</template>

<script setup lang="ts">
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import { ref, watch } from 'vue';
import dayjs from 'dayjs';

const props = defineProps<{
    itemsLength: number;
    dataItems: any[];
    dataLoading: boolean;
    itemsPerPage: number;
    dataHeaders: VDataTable['$props']['headers'];
}>();

const emit = defineEmits(['rowClicked', 'searchEvent', 'loadData']);

const search = ref('');

watch(search, (value) => {
    handleSearch({ page: 1, search: value });
});

const loadData = ({ page}) => {
    emit('loadData', { page, search: search.value });
};

const handleSearch = (searchData) => {
    emit('searchEvent', searchData);
};

const handleClick = (event, row) => {
    const item = row.item;
    emit('rowClicked', item);
};

const formatDate = (date: string) => {
    return dayjs(date, 'MMM D, YYYY').format('DD/MM/YYYY');
};
</script>
