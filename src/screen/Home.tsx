/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom';

import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle';
import { IContainer } from 'common_resources/CommonInterfaces';
import { useRecoilValue } from 'recoil';
import { totalManagerAtom } from 'recoil/TotalAtom';
import TopNavBar from 'components/common_res/TopNavBar';
import { IImgBoxContainer } from 'common_resources/ComponentInterface';
import Snowfall from 'react-snowfall'
import { AnimatePresence, motion } from 'framer-motion';

import { IHoverControl, ISelectControl } from 'components/home_res/homeIntrefaces';
import ModeDescription from 'components/home_res/ModeDescription';
import DesTyping from 'components/home_res/DesTyping';
import FadeIn from 'components/common_res/FadeIn'

const HomeContainer = styled(VerCenterDiv)<IContainer>`
  width: 100%;
  height: ${(props) => `${props.wheight}px`};
  position: relative;
  *{
    font-family: "Anton";
    font-display: block;
  }
`
const HomeContentBox = styled(HorCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.boxColors.standardBlack};
  position: relative;
  justify-content: space-between;
`
const LeftBgBox = styled(VerCenterDiv)<IImgBoxContainer>`
  width: 80%;
  height: 100%;
  background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0) 10%,
        rgba(20, 20, 20, 0.25) 25%,
        rgba(20, 20, 20, 0.5) 50%,
        rgba(20, 20, 20, 0.75) 75%,
        rgba(20, 20, 20, 1) 100%
    ), url(${(props) => props.imgsrc});
  image-rendering: -webkit-optimize-contrast;
  background-size: 100% 100%;
  justify-content: flex-end;
`

const InHomeContentBox = styled(VerCenterDiv)`
  width: 100%;
  height: 91%;
  //opacity: 0.8;
  background-color: transparent;
`
const IntroduceModeBox  = styled(VerCenterDiv)`
  width: 70%;
  height: 95%;
  background-color: ${(props)=> props.theme.boxColors.opaqueBlack};
  border-radius: 5px;
  padding: 1%;
  font-family: ${(props) => props.theme.engFont};
  border-radius : ${(props) => props.theme.borders.small};
`
const WelecomeMat = styled(VerCenterDiv)`
  width: 100%;
  height: 15%;
  span {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 2%;
    width: 100%;
    color: ${(props) => props.theme.textColors.swanWhite};
    user-select: none;
  }
  & span:first-child{
    height: 70%;
    font-size: 150%;
    letter-spacing: 0.1em;
  }
  & span:last-child{
    height: 30%;
  }
`
const ModeDesSelectBox = styled(HorCenterDiv)`
  width: 100%;
  height: 78%;
  padding: 0.8% 0 0.8% 0;
  justify-content: space-between;
  user-select: none;

`
const ModeSelectBox = styled(VerCenterDiv)`
  width: 49%;
  height: 95%;
  background-color: ${(props)=> props.theme.boxColors.opaqueBlack};
  border-radius: ${(props) => props.theme.borders.small};
  padding: 1%;
  justify-content: space-between;
`
const ModeSelectName = styled(HorCenterDiv)`
  width: 100%;
  height: 14%;
  background-color: inherit;
  justify-content: left;
  padding-left: 5%;
  font-size: 130%;
  letter-spacing: 0.1em;
  color: ${(props) => props.theme.textColors.swanWhite};
`
const DivideLine = styled(HorCenterDiv)`
  width: 100%;
  height: 1%;
  opacity: 0.5;
  background: linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
`
const ModeBtnBox = styled(motion.ul)`
  width: 100%;
  height: 83%;
  background-color: inherit;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 1%;
`
const ModeBtn = styled(motion.li)`
  width: 100%;
  min-width: 30%;
  height: 10%;
  background-color: transparent;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 5%;
  color: ${(props) => props.theme.textColors.swanWhite};
  border-radius: ${(props) => props.theme.borders.small};
  cursor: pointer;
  letter-spacing: 0.05em;
  position: relative;
  &:first-child{
    margin-bottom: 2%;
  }
`
const WallPaperBox = styled(HorCenterDiv)<IImgBoxContainer>`
  width: 50%;
  height: 100%;
  background: url(${(props) => props.imgsrc});
  image-rendering: -webkit-optimize-contrast;
  background-size: 100% 100%;
  transform:translateZ(0);
`
const Cube = styled(HorCenterDiv)`
  width: 200px;
  height: 200px;
  border: solid 5px skyblue;
  border: 5px solid transparent;
    border-radius: 20px;
    background-image: linear-gradient(#444444, #444444), linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
    background-origin: border-box;
    background-clip: content-box, border-box;
`

const DescriptionBox = styled(HorCenterDiv)`
  width: 100%;
  height: 7%;
`
const RedCircle = styled(HorCenterDiv)`
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  right: 1%;
`
const RightPannelBox = styled(VerCenterDiv)`
  width: 20%;
  height: 100%;
  background-color: transparent;
  justify-content: flex-end;
  padding: 1%;
  //padding-top: 10%;
`
const InRightPannelBox = styled(VerCenterDiv)`
  width: 100%;
  height: 91%;
  background-color: transparent;
  justify-content: flex-end;
`
const RightAniBox = styled(HorCenterDiv)`
  width: 100%;
  height: 50%;
  background-color: transparent;
  padding: 1%;
`
const AniBox = styled(HorCenterDiv)<IAniBoxWidth>`
  width: 100%;
  height: ${(props) =>`${props.aniboxwidth}px`};
  background-color: transparent;
  justify-content: space-evenly;
  align-items: flex-end;
  position: relative;
`
const AniBoxMask = styled(HorCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: absolute;
  z-index: 1;
  box-shadow: inset 0 0 50px 30px ${(props)=> props.theme.boxColors.opaqueBlack};
`
const MovingBox = styled(HorCenterDiv)<IAniBoxWidth>`
  width: 10%;
  height: ${(props) => `${props.boxwidth}px`};
  background-color: beige;
  border: 2px solid transparent;
  background-image: linear-gradient(rgba(20, 20, 20, 1), rgba(20, 20, 20, 1)), linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
  background-image: linear-gradient(rgba(20, 20, 20, 1), rgba(20, 20, 20, 1)), linear-gradient(to right, rgba(24, 220, 255,1.0), rgba(23, 192, 235,1.0), rgba(24, 220, 255,1.0));
  background-origin: border-box;
  background-clip: content-box, border-box;
`

const RightControlBox = styled(VerCenterDiv)`
  width: 100%;
  height: 30%;
  margin-top : 30%;
  justify-content: space-evenly;
  user-select: none;
`
const ShowModeDataBox = styled(VerCenterDiv)`
  width: 100%;
  height: 55%;
  justify-content: space-evenly;
`
const NextBtnBox = styled(VerCenterDiv)`
  width: 100%;
  height: 35%;
  padding: 1%;
`
const NextBtn = styled(HorCenterDiv)`
  width: 70%;
  height: 70%;
  background-color: orangered;
  border-radius: ${(props) => props.theme.borders.small};
  background-color: ${(props) => props.theme.boxColors.soaring};;
  font-family: ${(props) => props.theme.engFont};
  cursor: pointer;

`
const CurrentModeName = styled(HorCenterDiv)`
  width: 100%;
  height: 45%;
  justify-content: left;
  font-size: 150%;
  padding-left: 2%;
  letter-spacing: 0.1em;
  color : ${(props) => props.theme.textColors.swanWhite};
`
interface IAniBoxWidth {
  boxwidth? : number,
  aniboxwidth? : number
}



function Home() {

  const navigate = useNavigate();
  const { wheight } = useRecoilValue(totalManagerAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoverData, setHoverData] = useState<IHoverControl>({
    isSingle : null, 
    isHover: false, 
    hoveringType: 0
  });
  const [modeData, setModeData] = useState<ISelectControl>({
    isSingle : null,
    isSelected : false,
    selectModeNum : -1,
    typingData : 'Mode Not Found'
  });
  const movingBox = useRef() as React.MutableRefObject<HTMLDivElement>;
  const aniBox = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [boxWidth, setBoxWidth] = useState<number>(0);
  const [aniboxWidth, setAniboxWidth] = useState<number>(0);
  const modeNameArr = ["Single", "Multi"]
  const btnNameArr = ["Normal Spread", "Sandbox Spread"];
  
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false);
    }, 3000)
  }, [])
  useEffect(()=>{
    const temp = movingBox?.current.getBoundingClientRect();
    const temp2 = aniBox?.current.getBoundingClientRect();
    setBoxWidth(temp.width);
    setAniboxWidth(temp2.width);
  }, [])
  const aniBoxVar = {
    initial: {
      opacity: 1,
      y: 0
    },
    start :{
      y: -(aniboxWidth - boxWidth),
      opacity: [0, 0.8, 0.3, 0.8, 0],
    }
  }

  const modeBtnVar = {
    hover : {
      originX : 0,
      backgroundColor: 'rgba(209, 204, 192, 0.15)',    
    },
    selected : {
      originX : 0,
      backgroundColor: 'rgba(209, 204, 192, 0.15)',
    }
  }
  const circleVar = {
    initial : {
      opacity: 0
    },
    visible :{
      opacity : 1,
    },
    hidden : {
      opacity : 0
    }
  }
  const selcectedCircleVar = {
    nitial : {
      opacity: 0
    },
    visible :{
      opacity : 1,
      backgroundColor : 'rgba(50, 255, 126,1.0)'
    },
    hidden : {
      opacity : 0
    }
  }
  const S_DesNameArr = [
    "Single - Normal",
    "Single - Sandbox"
  ]
  const M_DesNameArr = [
    "Multi - Normal",
    "Multi - Sandbox"
  ]
  const S_DesContentArr = [
    "Use a single spread",
    "Set the card freely, using a single spread",
  ]
  const M_DesContentArr = [
    "Use 5 spreads at the same time",
    "Set the card freely, using five spreads at the same time"
  ]

  const selectModeHandler = (
    e : React.MouseEvent<HTMLLIElement>,
    flag : boolean,
    i : number) => {
    e.preventDefault();

    setModeData({
      isSingle : flag,
      isSelected : true,
      selectModeNum : i,
      typingData : flag ? S_DesNameArr[i] : M_DesNameArr[i]
    })
    
  }
  const navigatingHandler = (e : React.MouseEvent<HTMLDivElement>) =>{
    e.preventDefault();
    navigate('/translation/single')
  }
  const delayArr : number[] = [
    3.4,
    2.8,
    7.1,
    4.3,
    5.38,
    1.2
  ]
  return (
    <HomeContainer
      wheight={wheight}
    >
      <HomeContentBox>
        <LeftBgBox
          imgsrc={`${process.env.PUBLIC_URL}/images/LDefaultBackGround.png`}
        >
          <InHomeContentBox>
            <IntroduceModeBox>
              <WelecomeMat>
                <span>Welcome to this place, translator.</span>
                <span>
                  Select the settings to use for the translation. It will help you.
                </span>
              </WelecomeMat>
              <ModeDesSelectBox>
                <ModeSelectBox>
                  <ModeSelectName>
                    Single Mode
                  </ModeSelectName>
                  <DivideLine />
                  <ModeBtnBox>
                    {
                      btnNameArr.map((a, i) => {
                        return(
                          <ModeBtn
                              key={`singleModeBtn${i}`}
                              variants={modeBtnVar}
                              whileHover={modeBtnVar.hover}
                              onHoverStart={()=>{
                                setHoverData({
                                  isSingle: true,
                                  isHover: true,
                                  hoveringType: i,
                                })
                              }}
                              onHoverEnd={()=>{
                                setHoverData({
                                  isSingle: null,
                                  isHover: false,
                                  hoveringType: -1,
                                })
                              }}
                              onClick={(e)=>{
                                selectModeHandler(e, true, i);
                              }}
                          >
                            {a}
                            <AnimatePresence>
                              <RedCircle 
                                initial={{opacity: 0}}
                                animate={
                                  hoverData.isSingle === true
                                  && hoverData.isHover 
                                  && hoverData.hoveringType === i 
                                  ? {opacity: 1} 
                                  : {opacity:0}
                                }
                                exit={{opacity: 0}}
                              />
                            </AnimatePresence>
                          </ModeBtn>
                        );
                      })
                    }
                  </ModeBtnBox>
                </ModeSelectBox>
                <ModeSelectBox>
                  <ModeSelectName>
                    Multi Mode
                  </ModeSelectName>
                  <DivideLine />
                  <ModeBtnBox>
                    {
                      btnNameArr.map((a, i) => {
                        return(
                          <ModeBtn
                              key={`multiModeBtn${i}`}
                              variants={modeBtnVar}
                              whileHover={modeBtnVar.hover}
                              onHoverStart={()=>{
                                setHoverData({
                                  isSingle: false,
                                  isHover: true,
                                  hoveringType: i,
                                })
                              }}
                              onHoverEnd={()=>{
                                setHoverData({
                                  isSingle: null,
                                  isHover: false,
                                  hoveringType: -1,
                                })
                              }}
                              onClick={(e)=>{
                                selectModeHandler(e, false, i);
                              }}
                          >
                            {a}
                            <AnimatePresence>
                              <RedCircle 
                                initial={{opacity: 0}}
                                animate={
                                  hoverData.isSingle === false
                                  && hoverData.isHover 
                                  && hoverData.hoveringType === i 
                                  ? {opacity: 1} 
                                  : {opacity:0}
                                }
                                exit={{opacity: 0}}
                              />
                            </AnimatePresence>
                          </ModeBtn>
                        );
                      })
                    }
                  </ModeBtnBox>
                </ModeSelectBox>
              </ModeDesSelectBox>
              <DescriptionBox>
              <AnimatePresence>
                {
                  hoverData.isHover &&
                  <ModeDescription 
                    hoverData={hoverData}
                    modeData={modeData}
                  />
                }
              </AnimatePresence>
              </DescriptionBox>
            </IntroduceModeBox>
          </InHomeContentBox>
        </LeftBgBox>
        <RightPannelBox>
          <InRightPannelBox>
            <RightAniBox>
              <AniBox ref={aniBox} aniboxwidth={aniboxWidth}>
                <MovingBox 
                  ref={movingBox} 
                  boxwidth={boxWidth}
                  initial={{
                    opacity: 1,
                    y: 0
                  }}
                  animate={{
                    y: -(aniboxWidth - boxWidth),
                    opacity: [0, 0.8, 0.3, 0.8, 0],
                    transition: {
                      duration: 5,
                      repeat: Infinity
                    }
                  }}
                />
                {
                  delayArr.map((a,i) => {
                    return(
                      <MovingBox 
                        key={`homeanibox${i}`}
                        variants={aniBoxVar}
                        animate={aniBoxVar.start}
                        transition={{
                          delay: a,
                          duration: 5,
                          repeat: Infinity
                        }}
                        boxwidth={boxWidth}
                      />
                    );
                  })
                }
                {/* <AniBoxMask /> */}
              </AniBox>
            </RightAniBox>
            <RightControlBox>
              <ShowModeDataBox>
                <CurrentModeName>
                  Selected Mode 
                </CurrentModeName>
                <DesTyping modeData={modeData}/>
              </ShowModeDataBox>
              <NextBtnBox>
                <AnimatePresence>
                  {
                    modeData.isSelected
                    &&
                    <NextBtn
                     initial={{
                      opacity: 0
                     }}
                     animate={{
                      opacity: 1,
                      color: ['rgba(240, 147, 43,1.0)', 'rgba(240, 147, 43, 0.2)','rgba(240, 147, 43,1.0)'],
                      transition: {
                          color:{
                              repeat: Infinity,
                              duration: 1.5
                          }
                      }
                     }}
                    >
                      <Link to='/spread/make' state={{autoStart : true}}>
                        Start Translation
                      </Link>
                    </NextBtn>
                  }
                </AnimatePresence>
              </NextBtnBox>
            </RightControlBox>
          </InRightPannelBox>
        </RightPannelBox>
      </HomeContentBox>
      <Snowfall
        color={'rgba(246, 229, 141, 0.7)'}
            speed={[0.5, 1.0]}
            snowflakeCount={8}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute'
        }}
      />
      <AnimatePresence>
      { isLoading === true && <FadeIn />}
      </AnimatePresence>
    </HomeContainer>
  )
}

export default Home