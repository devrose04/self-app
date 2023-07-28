import React from 'react'
import Links from '../components/Links'

const FTIContent = ({url, linkBackground, color, learnMore}) => {
  return (
    <>
        <h2 style={{color}} >Helen Fisher</h2>
        <p style={{color}} >
            Helen Fisher's assessment is a personality test designed to determine an individual's biological personality type. The assessment is based on Fisher's theory that there are four fundamental personality types, each associated with different brain chemicals and neurotransmitters.
            <br />
            <br />
            The Explorer is associated with high levels of dopamine, and Explorers tend to be curious, spontaneous, and open to new experiences. The Builder is associated with high levels of serotonin, and Builders tend to be cautious, traditional, and detail-oriented. The Director is associated with high levels of testosterone, and Directors tend to be decisive, logical, and analytical. The Negotiator is associated with high levels of estrogen and oxytocin, and Negotiators tend to be empathetic, intuitive, and emotionally expressive. 
        </p>
        <Links learnMore={learnMore} url={url} background={linkBackground} color={color} />
    </>
  )
}

export default FTIContent