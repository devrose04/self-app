import React from 'react'
import Links from '../components/Links'
import '../styles/personal.scss'

const BigfiveContent = ({url, linkBackground, color, learnMore}) => {
  return (
    <>
        <h2 style={{color}}>Big Five Assessment</h2>
          <h3 style={{color}}>The Big Five is a scientifically validated model of personality, widely used as a framework for understanding and assessing personality traits. Think of it like a recipe that makes you who you are! The five dimensions or factors are:</h3>
            <ol style={{color}} type='1'>
              <li>Openness: This factor reflects a person's tendency to be open-minded, imaginative, creative, and curious.</li>
              <li>Conscientiousness: This factor reflects a person's tendency to be responsible, reliable, organized, and goal-oriented.</li>
              <li>Extraversion: This factor reflects a person's tendency to be outgoing, talkative, assertive, and sociable.</li>
              <li>Agreeableness: This factor reflects a person's tendency to be cooperative, empathetic, and compassionate.</li>
              <li>Neuroticism: This factor reflects a person's tendency to experience negative emotions such as anxiety, insecurity, and sadness.</li>
            </ol>
            <Links learnMore={learnMore} url={url} background={linkBackground} />
    </>
  )
}

export default BigfiveContent