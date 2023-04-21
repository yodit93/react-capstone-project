import reducer from '../Redux/coinsSlices';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    {
      coins: [],
      isLoading: false,
      error: null,
    },
  );
});
