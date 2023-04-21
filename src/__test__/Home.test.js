import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Home from '../components/Home';
import '@testing-library/jest-dom';

const mockStore = configureMockStore({});
const store = mockStore({
  devices: {
    devices: [
      {
        name: 'Light Based Imaging',
        class: '2',
        code: 'PSN',
        speciality_area: 'SU',
        submission_type: '1',
        speciality_description: 'General, Plastic Surgery',
        id: uuidv4(),
      },
      {
        name: 'Light Based Imaging',
        class: '2',
        code: 'PSN',
        speciality_area: 'SU',
        submission_type: '1',
        speciality_description: 'General, Plastic Surgery',
        id: uuidv4(),
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
