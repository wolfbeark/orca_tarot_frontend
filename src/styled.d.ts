import 'styled-components';

import {BorderType, BoxColors, TextColors} from './common_resources/Theme'

declare module 'styled-components'{
    export interface DefaultTheme{
        // Common Styles
        engFont : string;
        borders : BorderType;
        boxColors : BoxColors;
        textColors : TextColors;
        //Login
    }
}