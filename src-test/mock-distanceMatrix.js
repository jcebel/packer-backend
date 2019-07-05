const mockstart = {
  destination_addresses: [
    'Arcisstraße 28, 80799 München, Germany',
    'Balanstraße 29, 81669 München, Germany',
    'Ungererstraße 28, 80802 München, Germany',
    'Kolumbuspl. 28, 81541 München, Germany'
  ],
  origin_addresses: [
    'Arcisstraße 28, 80799 München, Germany',
    'Balanstraße 29, 81669 München, Germany',
    'Ungererstraße 28, 80802 München, Germany',
    'Kolumbuspl. 28, 81541 München, Germany'
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
          distance: { text: '4.7 km', value: 4712 },
          duration: { text: '14 mins', value: 848 },
          status: 'OK'
        },
        {
          distance: { text: '2.7 km', value: 2738 },
          duration: { text: '9 mins', value: 542 },
          status: 'OK'
        },
        {
          distance: { text: '4.3 km', value: 4337 },
          duration: { text: '16 mins', value: 931 },
          status: 'OK'
        }
      ]
    },
    {
      elements: [
        {
          distance: { text: '4.3 km', value: 4348 },
          duration: { text: '12 mins', value: 748 },
          status: 'OK'
        },
        {
          distance: { text: '1 m', value: 0 },
          duration: { text: '1 min', value: 0 },
          status: 'OK'
        },
        {
          distance: { text: '6.3 km', value: 6309 },
          duration: { text: '15 mins', value: 873 },
          status: 'OK'
        },
        {
          distance: { text: '2.1 km', value: 2107 },
          duration: { text: '6 mins', value: 380 },
          status: 'OK'
        }
      ]
    },
    {
      elements: [
        {
          distance: { text: '3.5 km', value: 3481 },
          duration: { text: '12 mins', value: 722 },
          status: 'OK'
        },
        {
          distance: { text: '6.0 km', value: 5999 },
          duration: { text: '14 mins', value: 836 },
          status: 'OK'
        },
        {
          distance: { text: '1 m', value: 0 },
          duration: { text: '1 min', value: 0 },
          status: 'OK'
        },
        {
          distance: { text: '6.8 km', value: 6847 },
          duration: { text: '16 mins', value: 963 },
          status: 'OK'
        }
      ]
    },
    {
      elements: [
        {
          distance: { text: '5.8 km', value: 5779 },
          duration: { text: '15 mins', value: 879 },
          status: 'OK'
        },
        {
          distance: { text: '2.1 km', value: 2099 },
          duration: { text: '6 mins', value: 376 },
          status: 'OK'
        },
        {
          distance: { text: '6.1 km', value: 6133 },
          duration: { text: '18 mins', value: 1100 },
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

const mockend = {
  destination_addresses: [
    'Theresienstraße 5, 80333 München, Germany',
    'Fraunhoferstraße 12, 80469 München, Germany',
    'Gärtnerpl. 2, 80469 München, Germany',
    'Munich, Germany'
  ],
      origin_addresses: [
  'Theresienstraße 5, 80333 München, Germany',
  'Fraunhoferstraße 12, 80469 München, Germany',
  'Gärtnerpl. 2, 80469 München, Germany',
  'Munich, Germany'
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
        distance: { text: '3.0 km', value: 2996 },
        duration: { text: '10 mins', value: 604 },
        status: 'OK'
      },
      {
        distance: { text: '2.6 km', value: 2647 },
        duration: { text: '9 mins', value: 558 },
        status: 'OK'
      },
      {
        distance: { text: '1.8 km', value: 1809 },
        duration: { text: '6 mins', value: 357 },
        status: 'OK'
      }
    ]
  },
  {
    elements: [
      {
        distance: { text: '3.0 km', value: 3009 },
        duration: { text: '10 mins', value: 588 },
        status: 'OK'
      },
      {
        distance: { text: '1 m', value: 0 },
        duration: { text: '1 min', value: 0 },
        status: 'OK'
      },
      {
        distance: { text: '0.7 km', value: 679 },
        duration: { text: '3 mins', value: 183 },
        status: 'OK'
      },
      {
        distance: { text: '1.4 km', value: 1408 },
        duration: { text: '5 mins', value: 304 },
        status: 'OK'
      }
    ]
  },
  {
    elements: [
      {
        distance: { text: '2.6 km', value: 2578 },
        duration: { text: '9 mins', value: 538 },
        status: 'OK'
      },
      {
        distance: { text: '0.4 km', value: 422 },
        duration: { text: '2 mins', value: 125 },
        status: 'OK'
      },
      {
        distance: { text: '1 m', value: 0 },
        duration: { text: '1 min', value: 0 },
        status: 'OK'
      },
      {
        distance: { text: '1.0 km', value: 978 },
        duration: { text: '4 mins', value: 259 },
        status: 'OK'
      }
    ]
  },
  {
    elements: [
      {
        distance: { text: '2.0 km', value: 1990 },
        duration: { text: '7 mins', value: 420 },
        status: 'OK'
      },
      {
        distance: { text: '1.3 km', value: 1283 },
        duration: { text: '5 mins', value: 302 },
        status: 'OK'
      },
      {
        distance: { text: '0.9 km', value: 934 },
        duration: { text: '5 mins', value: 276 },
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



module.exports = {mockend:mockend, mockstart:mockstart};