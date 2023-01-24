import React, { SetStateAction } from 'react'

export interface IHoverControl{
  isSingle: boolean | null,
  isHover : boolean,
  hoveringType : number,
}

export interface ISelectControl {
  isSingle : boolean | null,
  isSelected : boolean,
  selectModeNum : number,
  typingData : string
}


export interface IHoverProps {
    hoverData : IHoverControl,
    modeData : ISelectControl
}

export interface ISelectProps{
    modeData : ISelectControl
}