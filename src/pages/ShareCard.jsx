import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCollectionById, getIdAndTypeFromUrl } from "../utils";
import "../styles/shareCard.scss";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import Spinner from "../components/Spinner";

const ShareCard = () => {
  const location = useLocation();
  const cardType = getIdAndTypeFromUrl(location.pathname).type;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [cardData, setCardData] = useState(null);
  const messageTest = "Test not completed yet";
  const userId = useMemo(
    () => getIdAndTypeFromUrl(location.pathname).id,
    [location.pathname]
  );

  useEffect(() => {
    Promise.all([
      getCollectionById("MBTI", userId),
      getCollectionById("Enneagram", userId),
      getCollectionById("Astrology", userId),
    ])
      .then(([mbtiData, enneagramData, astrologyData]) => {
        setCardData((prev) => ({
          ...prev,
          "MBTI Type": mbtiData?.type || messageTest,
          Enneagram:
            enneagramData?.type && enneagramData?.wing && enneagramData?.tritype
              ? enneagramData?.type +
                "w" +
                enneagramData?.wing +
                enneagramData?.tritype
              : messageTest,
          Astrology: astrologyData?.sun || messageTest,
        }));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (cardType === "Personality") {
      setMessage("Welcome to me.");
    }
    if (cardType === "Relationship") {
      setMessage("This is how I love.");
    }
  }, [cardType]);

  return (
    <div className="share-wrapper">
      <div className="modal-content">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="container">
              {cardData &&
                Object.keys(cardData).map((item, index) => (
                  <div
                    key={item}
                    className="row"
                    style={{
                      borderTopLeftRadius: index === 0 ? 20 : 0,
                      borderTopRightRadius: index === 0 ? 20 : 0,
                      borderBottomLeftRadius:
                        index === Object.keys(cardData).length - 1 ? 20 : 0,
                      borderBottomRightRadius:
                        index === Object.keys(cardData).length - 1 ? 20 : 0,
                      borderBottom: index !== 0 ? 3 : 0,
                    }}
                  >
                    <span>{item}</span>
                    <span>{cardData[item]}</span>
                  </div>
                ))}
            </div>
            <div className="footer">
              {cardType === "Personality" && <span>Welcome to me.</span>}
              {cardType === "Relationship" && <span>This is how I love</span>}
              <span className="web">www.self-app.com</span>
              <span className="share-this-content">share this content</span>
              <div className="buttons">
                <FacebookShareButton
                  hashtag="#SelfApp"
                  url="https://self-app-prod.web.app/"
                  quote={message}
                  title={message}
                >
                  <FacebookIcon size={32} />
                </FacebookShareButton>
                <LinkedinShareButton
                  hashtag="#SelfApp"
                  url="https://self-app-prod.web.app/"
                  size={32}
                >
                  <LinkedinIcon size={32} />
                </LinkedinShareButton>
                <TwitterShareButton
                  hashtag="#SelfApp"
                  url="https://self-app-prod.web.app/"
                  size={32}
                >
                  <TwitterIcon size={32} />
                </TwitterShareButton>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShareCard;
