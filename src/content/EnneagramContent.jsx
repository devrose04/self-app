import React from 'react'
import Links from '../components/Links'

const EnneagramContent = ({url, linkBackground, learnMore}) => {
  return (
    <>
        <h2>Enneagram</h2>
              <p>
                The Enneagram is a personality typology that suggests there are nine basic personality types, 
                each with their own motivations, fears, and strengths. 
                It is a complex system that combines elements of psychology, spirituality, 
                and personal development. 
                <br />
                <br />
                According to the Enneagram, each type has a core fear and a core desire that shape their behavior and attitudes. 
                The Enneagram also suggests that each type has a particular way of interacting with the world, 
                referred to as a "center" or "instinct." These include the body center (types 8, 9, and 1), 
                the heart center (types 2, 3, and 4), and the head center (types 5, 6, and 7).
                <br />
                <br />
                One of the unique features of the Enneagram is that it recognizes that each type has both healthy and 
                unhealthy expressions, and that individuals can move along a continuum between 
                these expressions depending on their level of self-awareness and personal development. 
                The Enneagram can therefore be used as a tool for personal growth and transformation, 
                as individuals learn to recognize their patterns of behavior and work towards more balanced expressions 
                of their type.
              </p>
              <Links learnMore={learnMore} url={url} background={linkBackground}/>
    </>
  )
}

export default EnneagramContent