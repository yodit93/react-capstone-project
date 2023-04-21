import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoChevronBackSharp } from 'react-icons/io5';

const Details = () => {
  const { devices } = useSelector((store) => store.devices);
  const { id } = useParams();
  return (
    <>
      {devices.filter((device) => device.id === id).map((device) => (
        <div className="details" key={device.id} data-testid="test-id">
          <h3 className="device-title">{device.name}</h3>
          <div className="stats">Crypto Details</div>
          <ul className="device-details">
            <li className="property">
              <span>Rank</span>
              <span>{device.rank}</span>
            </li>
            <li className="property">
              <span>Supply</span>
              <span>{device.supply}</span>
            </li>
            <li className="property">
              <span>Max Supply</span>
              <span>{device.maxSupply}</span>
            </li>
            <li className="property">
              <span className="spec">Price Usd</span>
              <span>{device.priceUsd}</span>
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
