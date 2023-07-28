import React from 'react'
import Links from '../components/Links'


const GallupContent = ({url, linkBackground, color, learnMore}) => {
  return (
    <>
        <h2 style={{color}} >Gallup StrengthsFinder</h2>
        <p style={{color}} >
            Understanding your strengths unlocks your potential and leads you to greater performance: Talent x Investment = Strength            
            <br />
            <br />
            30 million use their CliftonStrengths to thrive at work and everywhere else.
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} color={color} />
    </>
  )
}

export default GallupContent