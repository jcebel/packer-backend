const mock = {
  destination_addresses: [
    'Garching - Forschungszentrum, 85748 Garching bei München, Germany',
    'Implerstraße 12A, 81371 München, Germany',
    'Mies-van-der-Rohe-Straße 6d, 80807 München, Germany'
  ],
  origin_addresses: [
    'Garching - Forschungszentrum, 85748 Garching bei München, Germany',
    'Implerstraße 12A, 81371 München, Germany',
    'Mies-van-der-Rohe-Straße 6d, 80807 München, Germany'
  ],
  rows: [
    {
      elements: [
        {
          distance: { text: '1 m', value: 0 },
          duration: { text: '1 min', value: 0 },
          status: 'OK'
        },
        {
          distance: { text: '25.4 km', value: 25427 },
          duration: { text: '28 mins', value: 1709 },
          status: 'OK'
        },
        {
          distance: { text: '14.2 km', value: 14220 },
          duration: { text: '13 mins', value: 784 },
          status: 'OK'
        }
      ]
    },
    {
      elements: [
        {
          distance: { text: '24.5 km', value: 24458 },
          duration: { text: '27 mins', value: 1631 },
          status: 'OK'
        },
        {
          distance: { text: '1 m', value: 0 },
          duration: { text: '1 min', value: 0 },
          status: 'OK'
        },
        {
          distance: { text: '11.9 km', value: 11895 },
          duration: { text: '19 mins', value: 1158 },
          status: 'OK'
        }
      ]
    },
    {

      elements: [
        {
          distance: { text: '14.5 km', value: 14489 },
          duration: { text: '14 mins', value: 830 },
          status: 'OK'
        },
        {
          distance: { text: '12.1 km', value: 12146 },
          duration: { text: '19 mins', value: 1131 },
          status: 'OK'
        },
        {
          distance: { text: '1 m', value: 0 },
          duration: { text: '1 min', value: 0 },
          status: 'OK'
        }
      ]
    }
  ],
  status: 'OK'
};

module.exports = mock;