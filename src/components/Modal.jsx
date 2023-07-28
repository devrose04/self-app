import { Link } from "react-router-dom";
import "../styles/modal.scss";

const Modal = ({ setShowModal, title, data, userId }) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={handleCloseModal}>
          X
        </button>
        <div className="container">
          {data &&
            Object.keys(data).map((item, index) => (
              <div
                className="row"
                style={{
                  borderTopLeftRadius: index === 0 ? 20 : 0,
                  borderTopRightRadius: index === 0 ? 20 : 0,
                  borderBottomLeftRadius:
                    index === Object.keys(data).length - 1 ? 20 : 0,
                  borderBottomRightRadius:
                    index === Object.keys(data).length - 1 ? 20 : 0,
                  borderBottom: index !== 0 ? 3 : 0,
                }}
              >
                <span>{item}</span>
                <span>{data[item]}</span>
              </div>
            ))}
        </div>
        <div className="footer">
          {title === "Personality" && <span>Welcome to me.</span>}
          {title === "Relationship" && <span>This is how I love</span>}
          <Link to={`/sharing-card/${title}/${userId}`} className="share">
            Share
          </Link>
        </div>
        <span>www.self-app.com</span>
      </div>
    </div>
  );
};

export default Modal;
