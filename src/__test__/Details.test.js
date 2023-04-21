import { BrowserRouter, useParams } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Details from '../components/Details';
import '@testing-library/jest-dom';

const mockStore = configureMockStore({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
let store;
beforeEach(() => {
  store = mockStore({
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
      ],
      isLoading: false,
      error: null,
    },
  });
  store.dispatch = jest.fn();
  useParams.mockReturnValue({
    id: 'bitcoin',
  });
});

describe('Home component', () => {
  test('multiple list items should be in the Home component', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Details />
        </Provider>
      </BrowserRouter>,
    );
    const divElements = await screen.findAllByTestId(/test-id/i);
    expect(divElements.length).toBe(1);
  });
});
