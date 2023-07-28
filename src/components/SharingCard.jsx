import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getIdFromUrl,
  getCollectionById,
  verifyUrl,
  sortGallupData,
  sortViaData,
} from "../utils";
import "../styles/sharingCard.scss";
import GlassDetailImg from "../images/Magnifyingglass.svg";

const SharingCard = ({ collectionName, title }) => {
  const [cardData, setCardData] = useState(null);
  const location = useLocation();
  const userId = getIdFromUrl(location.pathname);

  useEffect(() => {
    getCollectionById(collectionName, userId)
      .then((data) => {
        if (collectionName === "GallupStrengthsFinder") {
          setCardData(sortGallupData(data));
        } else if (collectionName === "ViaCareerStrengths") {
          setCardData(sortViaData(data));
        } else {
          setCardData(data);
        }
      })
      .catch((error) => {
        // setIsLoading(false);
      });
  }, [collectionName, userId]);

  const cleanData = (data) => {
    const { userId, detail, ...restProps } = data;
    return { ...restProps, detail };
  };

  return (
    <div className="card">
      <div className="header">
        <h2>{title}</h2>
      </div>
      <div className="card-content">
        {cardData ? (
          Object.keys(cleanData(cardData)).map((key) => (
            <div className="row">
              {key !== "detail" && (
                <>
                  <span>{key}</span>
                  <span>{cardData[key]}</span>
                </>
              )}

              {key === "detail" && (
                <Link
                  target={cardData.detail}
                  to={verifyUrl(cardData.detail)}
                  className="detail_button"
                >
                  {" "}
                  <img src={GlassDetailImg} alt="detail" /> Detail
                </Link>
              )}
            </div>
          ))
        ) : (
          <span className="not-completed">Test not completed yet.</span>
        )}
      </div>
    </div>
  );
};

export default SharingCard;
