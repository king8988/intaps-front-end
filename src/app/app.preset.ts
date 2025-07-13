import { definePreset } from '@primeng/themes';
import Lara from '@primeng/themes/lara';

export const QCPreset = definePreset(Lara, {
    semantic: {
        primary: {
            50: '{stone.50}',
            100: '{stone.100}',
            200: '{stone.200}',
            300: '{stone.300}',
            400: '{stone.400}',
            500: '{stone.500}',
            600: '{stone.600}',
            700: '{stone.700}',
            800: '{stone.800}',
            900: '{stone.900}',
            950: '{stone.950}',
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{stone.950}',
                    inverseColor: '#ffffff',
                    hoverColor: '{indigo.950}',
                    activeColor: '{stone.800}',
                },
                highlight: {
                    background: '{stone.950}',
                    focusBackground: '{stone.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff',
                },
                formField: {
                    hoverBorderColor: '{primary.color}',
                    borderColor: '{stone.950}'
                }
            },
            dark: {
                primary: {
                    color: '{green.50}',
                    inverseColor: '{green.950}',
                    hoverColor: '{green.100}',
                    activeColor: '{green.200}',
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)',
                },
            },
        },
    },
    surface: {
        
    }
});