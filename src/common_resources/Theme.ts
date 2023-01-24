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
    borders,
    boxColors,
    textColors
}

// export const BlackRedTheme : DefaultTheme = {
//     engFont: "Anton"
// }

// export const BlackWhiteTheme : DefaultTheme = {
//     engFont: "Anton"
// }
