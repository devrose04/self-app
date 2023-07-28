import React from 'react'
import Links from '../components/Links'

const EQContent = ({url, linkBackground, color, learnMore}) => {
  return (
    <>
        <h2 style={{color}}>Emotional Intelligence (EQ)</h2>
        <p style={{color}}>
        Emotional intelligence, or EQ, is the ability to understand and manage your own emotions, as well as to recognize and respond appropriately to the emotions of others. Studies have shown that people with high EQ are more likely to succeed in their personal and professional lives, as they are better at building relationships, communicating effectively, and making sound decisions.
        <br />
        <br />
        EQ can be developed and improved over time, just like any other skill. By learning more about your own emotions and how to manage them, you can increase your EQ and boost your chances of success. Taking an EQ assessment can help you understand your strengths and weaknesses, and provide you with practical strategies for improving your emotional intelligence.
        <br />
        <br />
        So, if you want to enhance your interpersonal skills, build stronger relationships, and achieve greater success in your personal and professional life, taking an EQ assessment is a great first step. Are you ready to discover your EQ and unlock your full potential?"
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} color={color}/>
    </>
  )
}

export default EQContent
