import styled from 'styled-components'
import React from 'react'

const ProgressHolder = styled.div`
    padding: 0px;
    border: solid 2px ${props => props.background};
    border-radius: 10px;
`
const Progress = styled.div`
    margin: 0px;
    background-color: ${props => props.styles.background};
    border-radius: 8px;   
    width: ${props => props.styles.width}%;
    height: 100%;
    transition: width 600ms ease-in-out;
`

export default function ProgressBar (props) {

    const progressStyle = {
        width: props.width,
        background: props.background,
    }

    return <ProgressHolder 
        background = {props.background}>

        <Progress styles = {progressStyle}>
            <div style={{padding:13, textAlign: 'center'}}>
                {props.width.toFixed(0)}%
            </div>
        </Progress>
    </ProgressHolder>
}