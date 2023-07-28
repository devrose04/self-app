import React from 'react'
import Links from '../components/Links'

const GritContent = ({url, linkBackground, learnMore}) => {
  return (
    <>
        <h2>Grit</h2>
        <p>
        Do you ever feel like giving up when faced with challenges or setbacks? Do you wish you had more resilience and perseverance? Angela Duckworth, a renowned psychologist, has identified a key trait that separates successful individuals from others: grit.
        <br />
        <br />
        It's the unique combination of passion and perseverance that keeps you going when the going gets tough, and to bounce back from failures and setbacks.
        <br />
        <br />
        The good news is that grit isn't something you're born with - it's a skill that can be developed over time.
        <br />
        <br />
        The Grit Scale assessment measures your level of grit across two dimensions - consistency of interest and perseverance of effort. By taking the assessment, you'll gain insights into your own strengths and weaknesses and learn how to cultivate a growth mindset that will help you achieve your goals.
        <br />
        <br />
        So, are you ready to join the ranks of the grittiest individuals out there? Take the Grit Scale assessment today and start your journey towards success!
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} />
    </>
  )
}

export default GritContent