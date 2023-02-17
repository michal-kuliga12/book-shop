import "../stepper/Stepper.scss";

const Stepper = ({ id, text }) => {
  return (
    <div className="stepperWrapper">
      <div className="stepperItem completed">
        <div className="stepCounter">{id}</div>
        <div className="stepName">{text}</div>
      </div>
    </div>
  );
};

export default Stepper;
