import { Fragment } from "react/jsx-runtime";
import "./auction-card.css";

export function Card() {
  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col" id="left-badge">
              <span className="badge rounded-pill text-bg-danger">Outbid</span>
            </div>
            <div className="col" id="right-badge">
              <span className="badge rounded-pill text-bg-danger">24h</span>
            </div>
          </div>
          <h4 className="card-title">Old chair</h4>
          <h4 className="card-text">65 €</h4>
        </div>
        <img
          src="https://www.deltachildren.com/cdn/shop/products/y8sklpkrls44udnvnrpd.jpg?v=1614635808"
          className="img"
          alt="..."
        />
      </div>
    </Fragment>
  );
}

export default Card;
