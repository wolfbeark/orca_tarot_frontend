/* eslint-disable */
import React from "react";

export enum EWhatDrawMode {
    "SINGLE",
    "SINGLE_EXTRA",
    "SINGLE_RESTART",
    "MULTI",
    "MULTI_EXTRA"
}

export interface IDrawPannelProps {
    whatDrawMode : EWhatDrawMode,
    oracleType : number | null,
    extraCardCount? : number,
    extraTarotDeck? : number[],
    setExtraTarotDeck? : React.Dispatch<React.SetStateAction<number[]>>,
    setExtraCardCount? : React.Dispatch<React.SetStateAction<number>>,
    setIsOpenExtraMake? : React.Dispatch<React.SetStateAction<boolean>>,
    setSelectOracleType? : React.Dispatch<React.SetStateAction<number | null>>,
    setIsFirstOver? : React.Dispatch<React.SetStateAction<boolean>>,
    setIsSecondOver? : React.Dispatch<React.SetStateAction<boolean>>,
    setLenorOrPokerCountValue? : React.Dispatch<React.SetStateAction<string>>,
}

export namespace DrawCommonInfo {
    
    export const Data = {
        DeckNameArr : [
            "TAROT",
            "LENORMAND",
            "ICHING",
            "POKER"
        ],
        DefaultImageArr : [
            {
                name : "TAROT",
                defaultImage : "/images/TarotDefault/Default0.png" 
            },
            {
                name : "LENORMAND",
                defaultImage : "/images/LenormandDefault/Default_Lenormand0.png", 

            },
            {
                name : "ICHING",
                defaultImage : "/images/IChingDefault/iching0.png" 

            },
            {
                name : "POKER",
                defaultImage : "/images/PokerDefault/Default_Poker53.png", 
            }
        ],
        TarotDeckTypeNameArr : [
            "FREE DECK",
            "THREE CARDS",
            "SEVEN CARDS",
            "CELTIC CROSS"
        ],
        TarotAutoDeckCountArr : [
            0,
            3,
            7,
            10
        ],
        OracleCountLimitArr : [
            "1 - 78",
            "1 - 36",
            "2",
            "1 - 54"
        ],
        OracleMaxLimitArr : [
            78,
            36,
            2,
            54
        ],
        IChingTranslateCodeArr : [
            "111111",
            "000000",
            "100010",
            "010001",
            "111010",
            "010111",
            "010000",
            "000010",
            "111011",
            "110111",
            "111000",
            "000111",
            "101111",
            "111101",
            "001000",
            "000100",
            "100110",
            "011001",
            "110000",
            "000011",
            "100101",
            "101001",
            "000001",
            "100000",
            "100111",
            "111001",
            "100001",
            "011110",
            "010010",
            "101101",
            "001110",
            "011100",
            "001111",
            "111100",
            "000101",
            "101000",
            "101011",
            "110101",
            "001010",
            "010100",
            "110001",
            "100011",
            "111110",
            "011111",
            "000110",
            "011000",
            "010110",
            "011010",
            "101110",
            "011101",
            "100100",
            "001001",
            "001011",
            "110100",
            "101100",
            "001101",
            "011011",
            "110110",
            "010011",
            "110010",
            "110011",
            "001100",
            "101010",
            "010101",
        ],

    }

    export function RandomArrGenerator(
        limitCount : number
    ): number[]{
        let _tempArr : number[] = new Array(limitCount);
        for(let i = 0; i < _tempArr.length; i++){
            let _num = Math.floor((Math.random() * limitCount));
            _tempArr[i] = _num;
            for(let j = 0; j < i; j++){
                if(_tempArr[j] === _tempArr[i]){
                    i--;
                    break;
                }
            }
        }
        return _tempArr;
    }
}