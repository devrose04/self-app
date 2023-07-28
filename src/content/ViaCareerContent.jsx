import React from 'react'
import Links from '../components/Links'

const ViaCareerContent = ({url, linkBackground, color, learnMore}) => {
  return (
    <>
        <h2 style={{color}} >Via Career Strengths</h2>
        <p style={{color}} >
        The VIA Survey of Character Strengths is a proprietary psychological assessment measure designed to identify an individual's profile of character strengths. 
            <br />
            <br />
            It is a scientific instrument widely used in academic, corporate, and other settings.
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} color={color} />
    </>
  )
}

export default ViaCareerContent