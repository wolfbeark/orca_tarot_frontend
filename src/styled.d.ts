import 'styled-components';

import {BorderType, BoxColors, TextColors} from './common_resources/Theme'

declare module 'styled-components'{
    export interface DefaultTheme{
        // Common Styles
        engFont : string;
        korFont : string;
        borders : BorderType;
        boxColors : BoxColors;
        textColors : TextColors;
        canvasBackground : string;
        topNavBarShadow : string;
        topNavBarBackground : string;
        defaultBaseColor : string;
        defaultBaseOpaqueColor : string;

        // Spread
        spreadCarpet : string;
        spreadDefaultTextColor : string;

        //Login
    }
}