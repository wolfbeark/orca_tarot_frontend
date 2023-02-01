
export interface IContainer {
    wheight : number,
    imgsrc? : string,
}
export interface IImgBox {
    imgsrc : string
}

export interface ICustomDOMPosition {
    bottom : number,
    height : number,
    left : number,
    right : number,
    top : number,
    width : number,
    x : number,
    y : number
}
export let PositionValueObj: ICustomDOMPosition = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0
}
export interface IPositionInfo{
    waitingInfo : ICustomDOMPosition;
    carpetInfo: ICustomDOMPosition;
    gapX : number;
    gapY : number;
}