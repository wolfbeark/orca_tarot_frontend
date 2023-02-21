/* eslint-disable */

import React, {useState, useEffect, useLayoutEffect} from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion';

import {HorCenterDiv, VerCenterDiv} from 'common_resources/CommonStyle';
import { ILoginContainer } from 'common_resources/ComponentInterface';
import * as Loader from 'react-spinners';
import Snowfall from 'react-snowfall';
import { useNavigate } from 'react-router-dom';

const Error404Container = styled(HorCenterDiv)`
  width: 100vw;
  height: 100vh;
  //background-color: rgba(20, 20, 20, 1);
  background-color: black;
  font-family: "Anton";
  font-display: swap;
  justify-content: center;
  position: relative;
  user-select: none;

`
const InRightImg = styled(HorCenterDiv)<ILoginContainer>`
  width: 50%;
  height: 100%;
  background-image: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
  border: none;
  transform:translateZ(0);
  display: flex;
  image-rendering: -webkit-optimize-contrast;
  //box-shadow: 0 0 30px 50px rgba(20, 20, 20, 1);
  content: "";
  border-radius: 5px;
  box-shadow: inset 0 0 40px 100px rgba(20, 20, 20, 0.9);

  margin-left: 1%;
`
// ${process.env.PUBLIC_URL}/images/NotFoundImg.png

const InShadowBox = styled(HorCenterDiv)`
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 30px 50px rgba(20, 20, 20, 1),
    0 0 40px 100px rgba(20, 20, 20, 1);
  border-radius: 5px;
`

const LeftContentBox = styled(VerCenterDiv)`
  width: 50%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(247, 215, 148,1.0),
    rgba(245, 205, 121,1.0),
    rgba(243, 166, 131,1.0),
    rgba(241, 144, 102,1.0)
  );
  border-radius: 5px;
  justify-content: flex-end;
  margin-right: 1%;
  //box-shadow:  inset 0 0 40px 100px rgba(20, 20, 20, 1);

`

const InContainer = styled(HorCenterDiv)`
  width : 100%;
  height: 100%;
  justify-content: center;
  background-color: transparent;
  position: relative;
`
const ContentBox = styled(VerCenterDiv)`
  width: 50%;
  height: 100%;
  background-color: beige;
  background-color: transparent;
  /* background: linear-gradient(
    45deg,
    rgba(247, 215, 148,1.0),
    rgba(245, 205, 121,1.0),
    rgba(243, 166, 131,1.0),
    rgba(241, 144, 102,1.0)
  ); */
  box-shadow: inset 0 0 30px 80px black;
  padding: 1%;
  border-radius: 20px;
  justify-content: flex-start;
  padding-top : 7%;
  padding-bottom: 5%;
`
const ErrorCode = styled(HorCenterDiv)`
  width: 70%;
  height: 20%;
  //background-color: red;
  font-size: 300%;
  font-family: inherit;
  font-display: swap;
  justify-content: left;
  color: white;
  text-decoration: underline ;
  text-decoration-color: rgba(255, 255, 255, 0.8);
  text-underline-offset: 10%;
`
const InContent = styled(HorCenterDiv)`
  width: 70%;
  height: 20%;
  //background-color: red;
  font-size: 300%;
  font-family: inherit;
  font-display: swap;
  justify-content: left;
  color: white;
`
const InContent2 = styled(HorCenterDiv)`
  width: 70%;
  height: 20%;
  //background-color: blue;
  font-size: 250%;
  font-family: inherit;
  font-display: swap;
  justify-content: left;
  color: white;
  margin-bottom: 5%;

`
const ImageBox = styled(HorCenterDiv)<ILoginContainer>`
  width: 50%;
  height: 100%;
  background-color: beige;
  background-image: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
  background-color: transparent;
  box-shadow: inset 0 0 30px 70px black;
  border-radius: 10px;

`
const CrossBox = styled(HorCenterDiv)`
  width: 5%;
  height: 100%;
  background-color: tan;
  background-color: black;
  position: absolute;
  //z-index: 3;
  left: 50%;
  transform: translate(-70%, 0);
`

const ErrFadeIn = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
`
const fadeInVar = {
  initial: {
    backgroundColor: 'rgba(0, 0, 0, 1)'
  },
  start: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transition: {
      //delay: 1,
      duration: 1
    }
  }
}
const fadeOutVar = {
  initial:{
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  start:{
    backgroundColor: 'rgba(0, 0, 0, 1)',
    transition:{
      duration: 1.5
    }
  }
}
function Error404() {

  //const [isArrive, setIsArrive] = useState<boolean>(false);
  const [defaultImg, setDefaultImg] = useState<string>('/images/NotFoundImg.png');

  const navigate = useNavigate();

  useLayoutEffect(()=>{
    let img = new Image();
    let path = '/images/NotFoundImg.png';
    img.src = path;
    setDefaultImg(path);
  }, [])
  
  useEffect(()=> {
    let time = setTimeout(()=>{navigate('/')}, 5000);
    
    return() => {
      clearTimeout(time);
    } 
  }, [])
  return (
    <Error404Container>
      <InContainer>
        <ContentBox>
          <ErrorCode>
            ERROR // PAGE NOT FOUND 
          </ErrorCode>
          <InContent>
            ARE YOU LOST ? 
          </InContent>
          <InContent2>
            Don't worry, I will guide you.
          </InContent2>
          <InContent2
            style={{
              fontSize: '130%',
              height: "10%",
              color: "rgba(255, 255, 255, 0.8)"
            }}
          >
            You will return to the home page in a few seconds.
          </InContent2>
          <Loader.PuffLoader size={100} color='rgba(238, 90, 36,1.0)'></Loader.PuffLoader>
        </ContentBox>
        <ImageBox
          imgsrc={`${process.env.PUBLIC_URL}${defaultImg}`}
        ></ImageBox>
        <CrossBox></CrossBox>
      </InContainer>
      <Snowfall
        snowflakeCount={7}
        color={'rgba(247, 159, 31, 0.5)'}
        radius={[1.5, 4]}
      ></Snowfall>
      <Snowfall
        snowflakeCount={7}
        color={'rgba(238, 90, 36, 0.3)'}
        radius={[1.5, 4]}
      ></Snowfall>
      <ErrFadeIn 
        variants={fadeInVar}
        initial={fadeInVar.initial}
        animate={fadeInVar.start}
      ></ErrFadeIn>
      {/* <ErrFadeIn
        variants={fadeOutVar}
        initial={fadeOutVar.initial}
        animate={isArrive === true ? fadeOutVar.start : ""}
      /> */}
    </Error404Container>
  )
}

export default Error404