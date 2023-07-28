import React from 'react'
import Links from '../components/Links'

const AttachmentStylesContent = ({url, linkBackground, learnMore}) => {
  return (
    <>
        <h2>Attachment Styles</h2>
        <p>
        Attachment styles shape how individuals form and maintain relationships with others. They are patterns of behavior and emotional responses that develop early in life, based on the interactions between a child and their primary caregiver(s).
        <br />
        <br />
        Understanding your own attachment style can help you recognize patterns in your own behavior and how they may be affecting your relationships. It can also help you identify your needs and preferences in relationships, and communicate them effectively to your partners.
        <br />
        <br />
        There are four main attachment styles: secure, anxious-preoccupied, dismissive-avoidant, and fearful-avoidant.
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} />

    </>
  )
}

export default AttachmentStylesContent
