import React from 'react'
import Links from '../components/Links'

const LoveLanguagesContent = ({url, linkBackground, learnMore}) => {
  return (
    <>
        <h2>Love Languages</h2>
        <p>
        Each person has their own preferences for how they like to receive love and express affection.
        <br />
        <br />
        The 5 Love Languages are important because they help individuals understand how they give and receive love, as well as how their partners or loved ones give and receive love. By understanding each other's love languages, couples and individuals can avoid misunderstandings and conflicts that can arise when they assume that everyone experiences and expresses love in the same way, thereby allowing them to communicate their love more effectively and build stronger, more fulfilling relationships. 
        <br />
        <br />
        The five love languages are words of affirmation, quality time, physical touch, acts of service, and receiving gifts.
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} />
    </>
  )
}

export default LoveLanguagesContent