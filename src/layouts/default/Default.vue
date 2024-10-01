<template>
    <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
        app
        color="background"
    >
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
                :to="{ path: '/characters' }"
            />
        </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-icon>custom:RickFaceIcon</v-icon>
        <v-toolbar-title color="secondary">Rick & Morty Api</v-toolbar-title>
    </v-app-bar>

    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>

<style scoped>
.v-toolbar__content > .v-toolbar-title {
    margin-inline-start: 5px;
}
</style>
