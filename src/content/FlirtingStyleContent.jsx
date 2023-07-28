import React from 'react'
import Links from '../components/Links'

const FlirtingStyleContent = ({url, linkBackground, color, learnMore}) => {
  return (
    <>
        <h2 style={{color}} >Flirting Styles</h2>
        <p style={{color}} >
            Knowing your flirting style can help you better understand how you approach romantic relationships and communicate with potential partners. Additionally, understanding your flirting style can help you become more confident in your approach to dating and develop strategies to better connect with others who have different flirting styles.            <br />
            <br />
            <br />
            The major study conducted at Kansas University identified five main flirting styles: physical, traditional, polite, sincere, and playful.
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} color={color} />
    </>
  )
}

export default FlirtingStyleContent