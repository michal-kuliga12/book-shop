import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./BackBtn.scss";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      className="backBtn"
      onClick={() => {
        navigate(-1);
      }}
    >
      <i>
        <FontAwesomeIcon icon={faArrowLeft} />
      </i>
      Strona główna
    </button>
  );
};
export default BackBtn;
