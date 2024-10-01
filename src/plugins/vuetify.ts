import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { mdi } from 'vuetify/iconsets/mdi';

import { createVuetify, IconProps, IconSet } from 'vuetify';
import RickFaceIcon from '@/icons/RickFaceIcon.vue';
import { h } from 'vue';

function isDayTime(): boolean {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
}

const defaultTheme = isDayTime() ? 'lightTheme' : 'darkTheme';

const customSvgNameToComponent: any = {
    RickFaceIcon,
};

const customSVGs: IconSet = {
    component: (props: IconProps) =>
        h(customSvgNameToComponent[props?.icon as string]),
};

export default createVuetify({
    theme: {
        defaultTheme,
        themes: {
            lightTheme: {
                dark: false,
                colors: {
                    primary: '#08C952',
                    secondary: '#FCE46D',
                    background: '#FFFFFF',
                    surface: '#F5F5F5',
                    error: '#FF6B6B',
                    info: '#00BFFF',
                    success: '#4CAF50',
                    warning: '#FFEB3B',
                },
            },
            darkTheme: {
                dark: true,
                colors: {
                    primary: '#FCE46D',
                    secondary: '#A1140A',
                    accent: '#08C952',
                    error: '#A1140A',
                    background: '#160440',
                    info: '#08C952',
                    success: '#08C952',
                    warning: '#EDCF6B',
                },
            },
        },
    },
    components: {},
    icons: {
        defaultSet: 'mdi',
        sets: {
            mdi,
            custom: customSVGs,
        },
    },
});
