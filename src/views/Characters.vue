<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h4 class="text-h4">Characters</h4>
            </v-col>
            <v-col>
                <data-table-characters
                    :itemsLength="characterStore.total"
                    :dataItems="characterStore.values"
                    :dataLoading="characterStore.loading"
                    :itemsPerPage="20"
                    :dataHeaders="headers"
                    :rowClickAble="true"
                    @rowClicked="showInfo"
                    @searchEvent="loadData"
                    @loadData="loadData"
                ></data-table-characters>
            </v-col>
            <character-info-modal
                :isActive="modalIsActive"
                :character="refCharacter"
                @close="closeModal"
            ></character-info-modal>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useCharactersStore } from '@/store/characters.store';
import {
    CharactersSearchPayload,
} from '@/types/store.types';
import { headersCharacters } from '@/constants/constants';
import CharacterInfoModal from '../components/CharacterInfoModal.vue';
import DataTableCharacters from '../components/DataTableCharacters.vue';

import { ref } from 'vue';
import { Character } from 'rickmortyapi';

const characterStore = useCharactersStore();

const headers = headersCharacters;
const modalIsActive = ref(false);
const refCharacter = ref({} as Character);

const loadData = ({
    page,
    search,
    gender,
    status,
}: CharactersSearchPayload) => {
    characterStore.loadAllCharacters({
        page: page,
        search: search ?? '',
        gender,
        status,
    });
};

const closeModal = () => {
    modalIsActive.value = false;
};

const showInfo = (item: Character) => {
    modalIsActive.value = true;
    refCharacter.value = item;
};
</script>
