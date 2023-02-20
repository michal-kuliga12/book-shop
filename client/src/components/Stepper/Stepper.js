import "../Stepper/Stepper.scss";

const Stepper = ({ orderStatus }) => {
  return (
    <ol className="stepperWrapper">
      <li
        className={`stepperItem ${
          orderStatus === 1 ? "inProgress" : "completed"
        }`}
      >
        <h3 className="stepCounter">1</h3>
        <p className="stepName">Koszyk</p>
      </li>
      <li
        className={`stepperItem ${
          (orderStatus === 1 && "") ||
          (orderStatus === 2 && "inProgress") ||
          (orderStatus === 3 && "completed")
        }`}
      >
        <h3 className="stepCounter">2</h3>
        <p className="stepName">Dane zamówienia</p>
      </li>
      <li className={`stepperItem ${orderStatus === 3 && "inProgress"}`}>
        <h3 className="stepCounter">3</h3>
        <p className="stepName">Podsumowanie i płatność</p>
      </li>
    </ol>
  );
};

export default Stepper;
