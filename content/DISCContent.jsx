import React from 'react'
import Links from '../components/Links'

const DISCContent = ({url, linkBackground, color, learnMore}) => {
  return (
    <>
        <h2 style={{color}} >DISC</h2>
        <p style={{color}} >
            DiSC is a personal assessment tool used by more than one million people every year to help improve teamwork, communication, and productivity in the workplace.
            <br />
            <br />
            Receive personalized insights to deepen your understanding of self and others.        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} color={color} />
    </>
  )
}

export default DISCContent