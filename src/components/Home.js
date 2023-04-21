import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { fetchCoins } from '../Redux/coinsSlices';

const Home = () => {
  const { coins, isLoading, error } = useSelector((store) => store.coins);
  const [state, setState] = useState({
    searchValue: '',
    filtered: [],
  });
  const handleChange = (e) => {
    const results = coins.filter((coin) => {
      if (e.target.value === '') return coins;
      return coin.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setState({
      searchValue: e.target.value,
      filtered: results,
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (coins.length === 0) {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.length]);
  return (
    <>
      <header className="header">
        <h2 className="title">Crypto Currency Status</h2>
        <input
          type="text"
          className="search"
          placeholder="Search"
          value={state.searchValue}
          onChange={handleChange}
        />
      </header>
      <div className="stats">Crypto status</div>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <ul className="coin-lists">
        {state.searchValue.length > 1 ? (
          state.filtered.map((coin) => (
            <li className="list" key={coin.id}>
              <div className="container">
                <h4 className="name">
                  {coin.name}
                  <span className="sub-type">{coin.rank}</span>
                </h4>
                <NavLink to={`details/${coin.id}`}>
                  <IoArrowForwardCircleOutline className="for-arrow" />
                </NavLink>
              </div>
            </li>
          ))
        ) : (
          coins.map((coin) => (
            <li className="list" key={coin.id}>
              <div className="container">
                <h4 className="name">
                  {coin.name}
                  <span className="sub-type">{coin.rank}</span>
                </h4>
                <NavLink to={`details/${coin.id}`}>
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
