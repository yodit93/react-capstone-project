const mockResponce = {
  data: {
    results: [
      {
        product_code: 'PSN',
        review_panel: 'SU',
        medical_specialty: 'SU',
        device_name: 'Light Based Imaging',
        medical_specialty_description: 'General, Plastic Surgery',
        device_class: '2',
        submission_type_id: '1',
      },
    ],
  },
};

export default {
  get: jest.fn().mockResolvedValue(mockResponce),
};
