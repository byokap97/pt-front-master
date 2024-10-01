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
            v-on="tableOptions"
        >
            <template #top>
                <v-row class="pa-2">
                    <v-col cols="12">
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
            <template #item.image="{ item }">
                <v-card rounded>
                    <v-img :src="item.image" height="32" cover></v-img>
                </v-card>
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
import { computed, ref, watch } from 'vue';
import { BasicSearchPayload } from '@/types/store.types';
import { formatDate } from '@/utils/date.utils';

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

watch(search, (value) => {
    handleSearch({ page: 1, search: value });
});

const loadData = ({ page }: { page: number; search: string }) => {
    emit('loadData', { page, search: search.value });
};

const handleSearch = (searchData: BasicSearchPayload) => {
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
