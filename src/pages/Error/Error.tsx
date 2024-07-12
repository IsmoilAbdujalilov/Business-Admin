import "./style.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error">
      <div className="error-container">
        <h1 className="error-container-title"> 404 </h1>
        <p className="error-container-text">Oops! The page you're looking for is not here.</p>
        <Link to="/">Go Back to Home</Link>
      </div>
    </section>
  );
};

export default Error;
