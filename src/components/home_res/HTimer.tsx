/* eslint-disable */
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { HorCenterDiv } from 'common_resources/CommonStyle';

const TimerContainer = styled(HorCenterDiv)`
    width: 40%;
    height: 100%;
    color: white;
    font-family: ${(props) => props.theme.engFont};
    //background-color: blue;
    justify-content: left;
    padding-left: 2%;
`
const TimerText = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    letter-spacing: .2em;
    font-size: 120%;
`
const textVar = {
    initial : {
        opacity: 0
    },
    active : {
        opacity: 1,
        transition:{
            delay: 1
        }
    }
}
function HTimer() {

    const [isWork, setIsWork] = useState<boolean>(false);
    const [hours, setHours] = useState<string>("");
    const [minutes, setMinutes] = useState<string>("");
    const [seconds, setSeconds] = useState<string>("");
    const [week, setWeek] = useState<string>("");
    const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    
    const getTime = () => {
        if(!isWork){
            setIsWork(true);
        }
        const _date = new Date();
        const _hours = String(_date.getHours()).padStart(2, "0");
        const _minutes = String(_date.getMinutes()).padStart(2, "0");
        const _seconds = String(_date.getSeconds()).padStart(2, "0");

        if(week === ""){
            const _week = WEEKDAY[_date.getDay()];
            setWeek(_week);
        }
        setHours(_hours);
        setMinutes(_minutes);
        setSeconds(_seconds);
    }
    useEffect(() => {
        setInterval(getTime, 1000)
        return () => {
            setInterval(getTime, 1000)
        }
    },[])
  return (
    <TimerContainer>
        {
            isWork
            &&
            <TimerText
                variants={textVar}
                initial={textVar.initial}
                animate={isWork && textVar.active}
            >
                {week}  {hours}:{minutes}:{seconds}
            </TimerText>
        }
    </TimerContainer>
  )
}

export default React.memo(HTimer)