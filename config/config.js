let configuration = {
  devices: [
    {
      'name': 'hapac-mainroom',
      'address': '10.5.0.12',
      'username': process.env.HAPAC_MAINROOM_USER,
      'password': process.env.HAPAC_MAINROOM_PASSWORD,
      'interfaceGroups': {
        '5 GHz': [
          'wlan2',
          'wlan2-nord-guest'
        ],
        '2.4 GHz': [
          'wlan1',
          'wlan1-nord-guest',
        ]
      }
    },
    {
      'name': 'hapac-chillroom',
      'address': '10.5.0.13',
      'username': process.env.HAPAC_CHILLROOM_USER,
      'password': process.env.HAPAC_CHILLROOM_PASSWORD,
      'interfaceGroups': {
        '5 GHz': [
          'wlan2',
          'wlan2-nord-guest'
        ],
        '2.4 GHz': [
          'wlan1',
          'wlan1-nord-guest',
        ]
      }
    },
    {
      'name': 'crs-mainrack',
      'address': '10.5.0.1',
      'username': process.env.CRS_MAINRACK_USER,
      'password': process.env.CRS_MAINRACK_PASSWORD,
      'interfaceGroups': {
        'WAN': [
          'br1-wan'
        ]
      }
    }
  ]
};

module.exports = configuration;
