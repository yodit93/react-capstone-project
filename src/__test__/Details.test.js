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
    devices: {
      devices: [
        {
          name: 'Light Based Imaging',
          class: '2',
          code: 'PSN',
          speciality_area: 'SU',
          submission_type: '1',
          speciality_description: 'General, Plastic Surgery',
          id: '1',
        },
      ],
      isLoading: false,
      error: null,
    },
  });
  store.dispatch = jest.fn();
  useParams.mockReturnValue({
    id: '1',
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
