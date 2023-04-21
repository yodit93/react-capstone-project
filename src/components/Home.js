import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { fetchDevices } from '../Redux/devicesSlices';

const Home = () => {
  const { devices, isLoading, error } = useSelector((store) => store.devices);
  const [state, setState] = useState({
    searchValue: '',
    filtered: [],
  });
  const handleChange = (e) => {
    const results = devices.filter((device) => {
      if (e.target.value === '') return devices;
      return device.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setState({
      searchValue: e.target.value,
      filtered: results,
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (devices.length === 0) {
      dispatch(fetchDevices());
    }
  }, [dispatch, devices.length]);
  return (
    <>
      <header className="header">
        <h2 className="title">Classification of Biomedical Imaging Devices</h2>
        <input
          type="text"
          className="search"
          placeholder="Search"
          value={state.searchValue}
          onChange={handleChange}
        />
      </header>
      <div className="stats">CLASSIFICATION BY SPECIALITY</div>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <ul className="device-lists">
        {state.searchValue.length > 1 ? (
          state.filtered.map((device) => (
            <li className="list" key={device.id}>
              <div className="container">
                <h4 className="name">
                  {device.name}
                  <span className="sub-type">{device.submission_type}</span>
                </h4>
                <NavLink to={`details/${device.id}`}>
                  <IoArrowForwardCircleOutline className="for-arrow" />
                </NavLink>
              </div>
            </li>
          ))
        ) : (
          devices.map((device) => (
            <li className="list" key={device.id}>
              <div className="container">
                <h4 className="name">
                  {device.name}
                  <span className="sub-type">{device.submission_type}</span>
                </h4>
                <NavLink to={`details/${device.id}`}>
                  <IoArrowForwardCircleOutline className="for-arrow" />
                </NavLink>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
};
export default Home;
