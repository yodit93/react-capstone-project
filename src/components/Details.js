import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoChevronBackSharp } from 'react-icons/io5';

const Details = () => {
  const { coins } = useSelector((store) => store.coins);
  const { id } = useParams();
  return (
    <>
      {coins.filter((coin) => coin.id === id).map((coin) => (
        <div className="details" key={coin.id} data-testid="test-id">
          <h3 className="coin-title">{coin.name}</h3>
          <div className="stats">Crypto Details</div>
          <ul className="coin-details">
            <li className="property">
              <span>Rank</span>
              <span>{coin.rank}</span>
            </li>
            <li className="property">
              <span>Supply</span>
              <span>{coin.supply}</span>
            </li>
            <li className="property">
              <span>Max Supply</span>
              <span>{coin.maxSupply}</span>
            </li>
            <li className="property">
              <span className="spec">Price Usd</span>
              <span>{coin.priceUsd}</span>
            </li>
          </ul>
          <NavLink to="/">
            <IoChevronBackSharp className="back-arrow" />
          </NavLink>
        </div>
      ))}
    </>
  );
};
export default Details;
