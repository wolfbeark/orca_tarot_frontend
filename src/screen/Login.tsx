/* eslint-disable */
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { ILoginContainer } from 'common_resources/ComponentInterface'
import React, { useEffect, useState, CSSProperties } from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import styled from 'styled-components'
import Snowfall from 'react-snowfall'
import {useForm} from 'react-hook-form'
import Timer from 'components/login_res/Timer'
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import FadeOut from 'components/common_res/FadeOut'
import FadeIn from 'components/common_res/FadeIn'
import { IContainer } from 'common_resources/CommonInterfaces'
import { totalManagerAtom } from 'recoil/TotalAtom'
import {useRecoilValue} from 'recoil'
import { 
    WindowScreenInfoContext,
    IHaveImageProps 
} from 'definition/CommonDefinition'

// 2023.02.13 수술중
import * as S_Login from 'components/login_res/Login.styled';


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

    const {windowinfo} = useOutletContext<WindowScreenInfoContext>();

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
    <S_Login.Container
        wheight={windowinfo.wheight}
    >
        <S_Login.LeftImgContainer 
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
        <S_Login.RightAccessContainer  
        >
            <S_Login.WelcomeMat
                variants={RightVar}
                initial={RightVar.initial}
                animate={RightVar.animate}
            >
                WELCOME
            </S_Login.WelcomeMat>
            <S_Login.AccessBox
                onSubmit={handleSubmit(onValid)}
                variants={RightVar}
                initial={RightVar.initial}
                animate={RightVar.animate}
                transition={{
                    delay: 0.5
                }} 
            >
                <S_Login.AccessInputBox>
                    <S_Login.AccessLabel 
                        as="label"
                        htmlFor="loginAccessInput"
                    >
                        ENTER AN ACCESS KEY TO GET STARTED
                    </S_Login.AccessLabel>
                    <S_Login.AccessInput 
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
                </S_Login.AccessInputBox>
                <S_Login.AcessBtn
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
                </S_Login.AcessBtn>
                <S_Login.ErrorBox>
                    {errors?.accessKey?.message as string}
                </S_Login.ErrorBox>
            </S_Login.AccessBox>
            <Timer />
        </S_Login.RightAccessContainer>
        <AnimatePresence>
        {
            isSuccess === true
            && <FadeOut />
        }
        </AnimatePresence>
    </S_Login.Container>
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