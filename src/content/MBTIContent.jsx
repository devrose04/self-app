import React from 'react'
import Links from '../components/Links'

const MBTIContent = ({url, linkBackground, learnMore}) => {
  return (
    <>
            <h2>
                Myers-Briggs Type Indicator (MBTI)
            </h2>
              <h3>The MBTI is a personality assessment tool based on the theories of psychologist Carl Jung, commonly used in career counseling, team-building, and personal development. The assessment measures four dichotomies of personality, resulting in 16 possible personality types.</h3>
              <h4>The four contrasting traits are:</h4>
              <ol type='1'>
                <li>
                  Extraversion (E) - Introversion (I)
                </li>
                <li>
                  Sensing (S) - Intuition (N)
                </li>
                <li>
                  Thinking (T) - Feeling (F)
                </li>
                <li>
                  Judging (J) - Perceiving (P)
                </li>
              </ol>
              <Links learnMore={learnMore} url={url} background={linkBackground} />
      </>
  )
}

export default MBTIContent