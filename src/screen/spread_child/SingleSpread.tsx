/*eslint-disable */

import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components'
import {HorCenterDiv, VerCenterDiv} from 'common_resources/CommonStyle'
import { useRecoilState } from 'recoil'
import { singleControlManagerAtom } from 'recoil/SingleAtom'
import { motion, AnimatePresence } from 'framer-motion'
import { Typing } from 'components/common_res/typing_res/Typing';
import { ISpreadTotal } from 'components/spread_res/SpreadTotal';
import SingleSpreadZone from 'components/spread_res/single_spread_res/SingleSpreadZone';

const SingleContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: relative;
`
const InSingleContainer = styled(HorCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: inherit;
  position: relative;
`
const NoSpreadAlarm = styled(HorCenterDiv)`
  width: 60%;
  height: 60%;
  background-color: ${(props) => props.theme.boxColors.opaqueBlack};
  border-radius: ${(props) => props.theme.borders.small};
  padding: 0.5%;
`
const InNoSpreadAlarm = styled(NoSpreadAlarm)`
  width: 100%;
  height: 100%;
`
const ProjectAllEmptyBox = styled(VerCenterDiv)`
    width: 40%;
    height: 50%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    border-radius: ${(props) => props.theme.borders.small};
    padding: 0.5%;
    & > div{
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`
const LinkToCreateBtn = styled(HorCenterDiv)`
    width: 30%;
    height: 20%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    border-radius: ${(props)=> props.theme.borders.small};
    padding: 1%;
    div {
        width: 100%;
        height: 100%;
        background-color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: inherit;
        cursor: pointer;
        font-size: 100%;
        color: white;
    }
`
const TypingBox = styled(VerCenterDiv)`
    width: 70%;
    height: 40%;
    background-color: transparent;
    align-items: flex-start;
    justify-content: space-evenly;
    padding-left: 5%;
    & span:first-child {
        font-size: 170%;
        width: 100%;
        height: 40%;
        color: ${(props) => props.theme.textColors.swanWhite};
    }
    & span:last-child {
        font-size: 130%;
    }
`



function SingleSpread() {
  const navigate = useNavigate();
  const [singleManager, setSingleManager] = useRecoilState(singleControlManagerAtom);
  const spreadProps = useOutletContext<ISpreadTotal>();
  const linkToCreateHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        //setTabNumber(3);
        spreadProps.setTabNumber(3);
        navigate('/spread/create')
  }

  return (
    <SingleContainer>
      <InSingleContainer>
      <AnimatePresence>
      {!singleManager.isExistProject &&
      <ProjectAllEmptyBox>
        <div>
          <TypingBox>
              <Typing
                  text={"No spread was created"}
                  letterSpacing={0.1}
                  cursorThickness={0}
                  typeSpeed={3}
              />
              <Typing 
                  text={"Press button to create spread"}
                  letterSpacing={0.1}
                  typeSpeed={3}
                  cursorThickness={0}
              />
          </TypingBox>
          <LinkToCreateBtn>
              <motion.div
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
                onClick={(e)=> linkToCreateHandler(e)}
              >
                Create
            </motion.div>
          </LinkToCreateBtn>
        </div>
      </ProjectAllEmptyBox>
      }
      </AnimatePresence>
      <AnimatePresence>
      {singleManager.isExistProject &&
      <SingleSpreadZone />
      }
      </AnimatePresence>
      </InSingleContainer>
    </SingleContainer>
  )
}

export default React.memo(SingleSpread)