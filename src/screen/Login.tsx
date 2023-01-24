/* eslint-disable */
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { ILoginContainer } from 'common_resources/ComponentInterface'
import React, { useEffect, useState, CSSProperties } from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import styled from 'styled-components'
import Snowfall from 'react-snowfall'
import {useForm} from 'react-hook-form'
import Timer from 'components/login_res/Timer'
import { useNavigate, useLocation } from 'react-router-dom'
import FadeOut from 'components/common_res/FadeOut'
import FadeIn from 'components/common_res/FadeIn'
import { IContainer } from 'common_resources/CommonInterfaces'
import { totalManagerAtom } from 'recoil/TotalAtom'
import {useRecoilValue} from 'recoil'

const LoginContainer = styled(HorCenterDiv)<IContainer>`
    width: 100%;
    height: ${(props) => `${props.wheight}px`};
    justify-content: space-between;
    position: relative;
`

const LeftImgContainer = styled(HorCenterDiv)<ILoginContainer>`
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
    transform:translateZ(0);
`
const RightAccessContainer = styled(VerCenterDiv)`
    width: 20%;
    height: 100%;
    background-color: rgba(20, 20, 20, 1);
    padding: 1%;
    justify-content: space-evenly;
    padding-top: 20%;
`

const WelcomeMat = styled(HorCenterDiv)`
    width: 100%;
    height: 10%;
    //background-color: skyblue;
    font-family: ${(props) => props.theme.engFont};
    font-size: 300%;
    font-weight: 500;
    color: white;
    letter-spacing: .1em;
    transform: rotate(0.04deg);
    text-align: center;
`

const AccessBox = styled(motion.form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2% 0 2%;
    width: 100%;
    height: 60%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    border-radius: ${(props) => props.theme.borders.small};
    position: relative;
`
const AccessInputBox = styled(VerCenterDiv)`
    width : 100%;
    height: 30%;
    //background-color: pink;
    font-family: ${(props) => props.theme.engFont};
    margin-bottom: 5%;
`
const AccessLabel = styled(HorCenterDiv)`
    width: 100%;
    height: 50%;
    padding-left: 1%;
    //justify-content: left;
    text-decoration: underline;
    color: white;
    cursor: pointer;
`
const AccessInput = styled(motion.input)`
    width: 100%;
    height: 50%;
    padding-left: 1%;
    border-color: unset;
    border-radius: ${(props) => props.theme.borders.small};
    background-color: ${(props) => props.theme.boxColors.soaring};
    color: white;
    text-align : center;
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: none;
    &:focus {
        box-shadow: inset 0 0 5px 2px rgba(255, 255, 255, 0.4);
    }
`
const AcessBtn = styled(motion.button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 15%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    color: rgba(83, 92, 104,1.0);
    border-radius: ${(props) => props.theme.borders.small};
    font-family: ${(props) => props.theme.engFont};
    position: relative;
    backdrop-filter: blur(10px);
`
const ErrorBox = styled(HorCenterDiv)`
    position: absolute;
    width: 100%;
    height: 10%;
    font-family: ${(props) => props.theme.engFont};
    bottom: 5%;
    color: white;
`

const RightVar = {
    initial : {
        opacity: 0,
        y: 10
    },
    animate : {
        opacity: 1,
        y: 0,
        transition:{
            delay: 2
        }
    }
}

const BtnVar = {
    inActive : {
        color: 'rgba(83, 92, 104,1.0)',
        //backgroundColor: 'rgba(20, 20, 20, 0)'
    },
    active: {
        color: ['rgba(240, 147, 43,1.0)', 'rgba(240, 147, 43, 0.2)','rgba(240, 147, 43,1.0)'],
        //backgroundColor: ['rgba(75, 75, 75,1.0)', 'rgba(75, 75, 75,1.0)'],
        transition: {
            color:{
                repeat: Infinity,
                duration: 1.5
            }
        }
    }
}
// span {
//   background: linear-gradient(to right, #fbcac9, #8ca6ce);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// }
const TestBtnVar = {
    inActive : {
        color: 'rgba(83, 92, 104,1.0)',
        //backgroundColor: 'rgba(20, 20, 20, 0)'
        background: [
            //'linear-gradient(135deg, rgba(251, 202, 201, 1), rgba(140, 166, 206, 1), rgba(126, 255, 245,1.0), rgba(255, 77, 77,1.0))', 
            //'linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5))',
            //'linear-gradient(270deg, rgba(140, 166, 206, 1), rgba(255, 255, 255, 1))',
            //'linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))',
            //'linear-gradient(135deg, rgba(251, 202, 201, 1), rgba(140, 166, 206, 1))', 
            //'linear-gradient(270deg, rgba(251, 202, 201, 1), rgba(140, 166, 206, 1))', 
            'linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1))',
            'linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(253, 21, 255, 0.5), rgba(0, 0, 0, 1))',
            'linear-gradient(270deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1))',
            'linear-gradient(360deg, rgba(0, 0, 0, 0.1), rgba(253, 21, 255, 0.5), rgba(0, 0, 0, 1))',
        ],
        //WebkitTransition: '-webkit-text-fill-color: transparent',
        transition:{
            repeat: Infinity,
            duration: 10
        }
    },
    active: {
        color: [
            'rgba(240, 147, 43,1.0)', 
            'rgba(240, 147, 43, 0.2)',
            'rgba(240, 147, 43,1.0)'],
        //backgroundColor: ['rgba(75, 75, 75,1.0)', 'rgba(75, 75, 75,1.0)'],
        transition: {
            color:{
                repeat: Infinity,
                duration: 3
            }
        }
    }
}
interface IAccessData{
    accessKey : string,
}


function Login() {
    
    const { wheight } = useRecoilValue(totalManagerAtom)

    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const navigate = useNavigate();
    const {
        getValues, 
        setValue, 
        register, 
        watch, 
        handleSubmit, 
        formState:{errors}, 
        setError 
    } = useForm<IAccessData>({
        defaultValues:{
            accessKey: ""
        }
    });

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, 2100)
    }, [setIsLoading]);


    const onValid = (data : IAccessData) => {
        if(data.accessKey === "") return
        if(data.accessKey !== process.env.REACT_APP_DEV_ACCESS_KEY){
            setError(
                "accessKey", 
                {message : "THE ACCESS KEY DO NOT MATCH"}
            )
            setValue("accessKey", "");
            return;
        }
        setIsSuccess(true);
        setTimeout(()=>{
            navigate('/')
        }, 1500)
    };

    return (
    <>
    <LoginContainer
        wheight={wheight}
    >
        <LeftImgContainer
            id="loginBg"
            imgsrc={`${process.env.PUBLIC_URL}/images/LDefaultBackGround.png`}
        />
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
        <Snowfall
            color={'rgba(246, 229, 141, 0.4)'}
            speed={[0.5, 1.0]}
            snowflakeCount={7}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute'
            }}
        />
        <RightAccessContainer  
        >
            <WelcomeMat
                variants={RightVar}
                initial={RightVar.initial}
                animate={RightVar.animate}
            >
                WELCOME
            </WelcomeMat>
            <AccessBox
                onSubmit={handleSubmit(onValid)}
                variants={RightVar}
                initial={RightVar.initial}
                animate={RightVar.animate}
                transition={{
                    delay: 0.5
                }} 
            >
                <AccessInputBox>
                    <AccessLabel 
                        as="label"
                        htmlFor="loginAccessInput"
                    >
                        ENTER AN ACCESS KEY TO GET STARTED
                    </AccessLabel>
                    <AccessInput 
                        id="loginAccessInput"
                        type="password"
                        {...register(
                            "accessKey", 
                            {
                                required: "ACCESS KEY IS REQUIRED",
                                
                            }
                        )}
                        autoComplete="off"
                    />
                </AccessInputBox>
                <AcessBtn
                    type="button"
                    variants={BtnVar}
                    animate={watch("accessKey").length > 0 ? BtnVar.active : BtnVar.inActive}
                    style={
                        watch("accessKey").length > 0
                        ? {cursor:'pointer'}
                        : {cursor: 'auto'}
                    }
                >
                    <span>ACCESS</span>
                </AcessBtn>
                <ErrorBox>
                    {errors?.accessKey?.message as string}
                </ErrorBox>
            </AccessBox>
            <Timer />
        </RightAccessContainer>
        <AnimatePresence>
        {
            isSuccess === true
            && <FadeOut />
        }
        </AnimatePresence>
        
        
    </LoginContainer>
    <AnimatePresence>
    {
        isLoading === true
        &&
        <>
        <FadeIn />
        </>
    }
    </AnimatePresence>

    </>
  )
}

export default Login