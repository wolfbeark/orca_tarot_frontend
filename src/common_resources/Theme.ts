import { DefaultTheme } from "styled-components"

const borders = {
    small : '5px',
    medium : '10px',
    large : '15px'
}
const boxColors = {
    soaring : 'rgba(83, 92, 104, 0.1)',
    standardBlack : 'rgba(20, 20, 20, 1)',
    opaqueBlack: 'rgba(20, 20, 20, 0.2)'
}
const textColors = {
    swanWhite : 'rgba(247, 241, 227,1.0)'
}
export type BorderTypes = typeof borders;
export type BoxColors = typeof boxColors;
export type TextColors = typeof textColors;

export const LightTheme : DefaultTheme = {
    engFont: "Anton",
    korFont: "Jua",
    borders,
    boxColors,
    textColors,
    canvasBackground : 'white',
    topNavBarShadow: '0 -2px 5px 2px rgba(247, 241, 227, 0.5)',
    topNavBarBackground : 'rgba(0, 0, 0, 0.2)',
    defaultBaseColor : 'rgba(223, 228, 234,1.0)',
    defaultBaseOpaqueColor : 'rgba(223, 228, 234, 0.2)',
    spreadCarpet : 'rgba(18, 137, 167, 0.2)'
}
export const DarkTheme : DefaultTheme = {
    engFont: "Anton",
    korFont: "Jua",
    borders,
    boxColors,
    textColors,
    canvasBackground : 'rgba(20, 20, 20, 1)',
    topNavBarBackground : 'rgba(0, 0, 0, 0.2)',
    topNavBarShadow: '0 -2px 5px 2px rgba(247, 241, 227, 0.5)',
    defaultBaseColor : 'rgba(20, 20, 20, 1)',
    defaultBaseOpaqueColor: 'rgba(20, 20, 20, 0.2)',

    //Spread
    spreadCarpet : 'rgba(111, 30, 81, 0.3)'
}

// export const BlackRedTheme : DefaultTheme = {
//     engFont: "Anton"
// }

