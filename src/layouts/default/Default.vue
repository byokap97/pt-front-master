<template>
    <v-navigation-drawer 
    v-model="drawer" 
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
    app>
        <v-list nav>
            <v-list-item
                prepend-icon="mdi-view-list"
                title="Episodes"
                :to="{ path: '/' }"
                exact
            />
            <v-list-item
                prepend-icon="mdi-view-list"
                title="Characters"
                :to="{ path: '/Characters' }"
            />
        </v-list>
    </v-navigation-drawer>
    <v-app-bar
    color="#272b33">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
       
        <v-toolbar-title>Rick & Morty Api</v-toolbar-title>
    </v-app-bar>
    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>
