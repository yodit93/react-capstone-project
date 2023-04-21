import reducer from '../Redux/devicesSlices';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    {
      devices: [],
      isLoading: false,
      error: null,
    },
  );
});
