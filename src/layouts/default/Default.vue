<template>
    <v-navigation-drawer v-model="drawer" app>
        <v-list nav>
            <v-list-item prepend-icon="mdi-view-list" title="Episodes" to="/" />
            <v-list-item prepend-icon="mdi-view-list" title="Characters" to="/Characters" />
        </v-list>
    </v-navigation-drawer>
    <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>
