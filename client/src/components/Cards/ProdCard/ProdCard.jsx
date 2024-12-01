import { Link } from "react-router-dom";
import { Icons } from "../../../utils/icons";
import "./ProdCard.scss";
import Rating from "../../Rating/Rating";

const ProdCard = () => {
  const isTop = true;
  const discount = 20;

  
  const toBag = (e) => {
    e.preventDefault();
  };

  return (
    <Link to="/singleProduct" className="prod-card">
      <div className="prod-card__head">
        <ul className="stickers">
          {isTop ? <li className="top">Top Rated</li> : ""}
          {discount ? <li className="discount">-{discount}%</li> : ""}
        </ul>
        <img src="images/img.png" alt="img" />
        <Icons.likeDefault />
      </div>

      <div className="prod-card__body">
        <h2 className="prod-card__body__title">
          All-Around Safe Block Essence Sun SPF45+
        </h2>
        <Rating rating={4} />
        <p className="prod-card__body__description">
          Skin Reinforcement Gel Type Cream
        </p>
        <p className="prod-card__body__price">32$</p>
      </div>
      <div className="prod-card__foot">
        <button onClick={(e) => toBag(e)}>Add To Bag</button>
      </div>
    </Link>
  );
};

export default ProdCard;
