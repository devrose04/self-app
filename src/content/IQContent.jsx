import React from 'react'
import Links from '../components/Links'

const IQContent = ({url, linkBackground, learnMore}) => {
  return (
    <>
        <h2>Intelligence Quotient (IQ)</h2>
        <p>
            IQ, or intelligence quotient, is a measure of cognitive ability that has been studied for over a century. Knowing your IQ can help you understand your cognitive strengths and weaknesses, and can be a useful tool for personal and professional development. Taking an IQ test can also be a fun and engaging way to challenge yourself and learn more about your own mental abilities. 
            <br />
            <br />
            A high IQ is often associated with academic and career success, while a low IQ may suggest areas where you could benefit from additional support or skill-building. With the advent of online IQ tests, it's easier than ever to take a test and get an estimate of your IQ score. 
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground}/>
    </>
  )
}

export default IQContent