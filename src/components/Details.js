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
          <div className="stats">Device Details</div>
          <ul className="device-details">
            <li className="property">
              <span>Code</span>
              <span>{device.code}</span>
            </li>
            <li className="property">
              <span>Class</span>
              <span>{device.class}</span>
            </li>
            <li className="property">
              <span>Speciality Area</span>
              <span>{device.speciality_area}</span>
            </li>
            <li className="property">
              <span className="spec">Medical speciality description</span>
              <span>{device.speciality_description}</span>
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
