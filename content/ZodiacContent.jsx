import React from 'react'
import Links from '../components/Links'

const ZodiacContent = ({url, linkBackground, learnMore}) => {
  return (
    <>
        <h2>Zodiac</h2>
        <p>
        Have you ever wondered why you just "click" with some people and not with others? Or why you have your certain personality? Your zodiac sign might hold some of the answers! 
        <br />
        <br />
        Astrology is the study of the movements and relative positions of celestial bodies and how they can influence human affairs and terrestrial events. 
        <br />
        <br />
        Each person's zodiac sign is determined by their birth date and is said to influence their personality traits, behaviors, and even relationships. Knowing your zodiac sign can help you better understand your strengths and weaknesses, as well as your compatibility with others.
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground}/>
    </>
  )
}

export default ZodiacContent