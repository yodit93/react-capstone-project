import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDevices } from '../Redux/devicesSlices';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);
  return (
    <>
      <div className="background-cont">
        background image
      </div>
      <ul className="device-lists" />
    </>
  );
};
export default Home;
