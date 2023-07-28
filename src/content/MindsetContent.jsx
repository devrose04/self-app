import React from 'react'
import Links from '../components/Links'

const MindsetContent = ({url, linkBackground, learnMore}) => {
  return (
    <>
        <h2>Mindset</h2>
        <p>
        Dr. Carol Dweck identified two basic mindsets: a fixed mindset and a growth mindset. People with a fixed mindset believe that their intelligence and abilities are fixed traits that cannot be changed, while those with a growth mindset believe that their abilities can be developed and improved over time through hard work and dedication. Her groundbreaking research shows that people with a growth mindset are more likely to succeed than those with a fixed mindset.
        <br/>
        <br/>
        Dweck's research has found that individuals' mindsets can have a significant impact on their motivation, learning, and achievement. People with a growth mindset are more likely to have a positive attitude toward learning and to engage in activities that promote their personal and professional growth.
        <br />
        <br />
        According to Dweck, people with a fixed mindset tend to avoid challenges and give up easily when faced with difficulties. They may also be less likely to take risks or try new things, as they fear failure and view it as a reflection of their intelligence or abilities. In contrast, people with a growth mindset tend to embrace challenges and persist in the face of obstacles. They view failure as an opportunity to learn and grow, and are more likely to take risks and try new things.
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} />
    </>
  )
}

export default MindsetContent