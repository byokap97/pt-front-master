import { VDataTable } from 'vuetify/lib/components/index.mjs';

export const headersEpisode: VDataTable['$props']['headers'] = [
    { title: 'Episode', key: 'episode', sortable: false },
    { title: 'Name', key: 'name', sortable: false },
    { title: 'Air Date', key: 'air_date', sortable: false },
    { title: '#Characters', key: 'characters', sortable: false },
];

export const headersCharacters: VDataTable['$props']['headers'] = [
    { title: 'Image', key: 'image', sortable: false },
    { title: 'Status', key: 'status', sortable: false },
    { title: 'Name', key: 'name', sortable: false },
    { title: 'Species', key: 'species', sortable: false },
    { title: 'Gender', key: 'gender', sortable: false },
    { title: 'Origin', key: 'origin.name', sortable: false },
];
