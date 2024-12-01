import { Icons } from "../../utils/icons";
import "./Rating.scss";

const Rating = ({ rating }) => {
  const cache = [1, 2, 3, 4, 5];

  return (
    <div className="rating">
      <div className="rating__left">
        {cache.map((el) =>
          el <= rating ? (
            <Icons.star bool={true} key={el} />
          ) : (
            <Icons.star bool={false} key={el} />
          )
        )}
      </div>
      <div className="rating__right">({rating})</div>
    </div>
  );
};

export default Rating;
