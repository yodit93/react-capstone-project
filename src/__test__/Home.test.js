import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Home from '../components/Home';
import '@testing-library/jest-dom';

const mockStore = configureMockStore({});
const store = mockStore({
  coins: {
    coins: [
      {

        id: 'bitcoin',
        rank: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        supply: '19352300.0000000000000000',
        maxSupply: '21000000.0000000000000000',
        marketCapUsd: '543074435594.6282739081981100',
        volumeUsd24Hr: '6985906974.5734236508898975',
        priceUsd: '28062.5267071422143057',
        changePercent24Hr: '-2.4870462395916264',
        vwap24Hr: '28386.4166204579195196',
        explorer: 'https://blockchain.info/',
      },
      {
        id: 'ethereum',
        rank: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        supply: '120416479.5003552400000000',
        maxSupply: null,
        marketCapUsd: '230735330208.5710478627076398',
        volumeUsd24Hr: '4745173312.7241648314018058',
        priceUsd: '1916.1441288265727518',
        changePercent24Hr: '-1.7745566262586786',
        vwap24Hr: '1944.9008587570155206',
        explorer: 'https://etherscan.io/',
      },
    ],
    isLoading: false,
    error: null,
  },
});
store.dispatch = jest.fn();
const MockHome = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Home />
    </Provider>
  </BrowserRouter>
);

describe('Home component', () => {
  test('multiple list items should be in the Home component', async () => {
    render(<MockHome />);
    const listElements = await screen.findAllByRole('listitem');
    expect(listElements.length).toBe(2);
  });
});
