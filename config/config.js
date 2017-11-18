let configuration = {
  devices: [
    {
      'name': 'hapac-mainroom',
      'address': '10.5.0.12',
      'username': process.env.HAPAC_MAINROOM_USER,
      'password': process.env.HAPAC_MAINROOM_PASSWORD,
      'interfaces': [
        'wlan1',
        'wlan1-nord-guest',
        'wlan2',
        'wlan2-nord-guest'
      ]
    },
    {
      'name': 'hapac-chillroom',
      'address': '10.5.0.13',
      'username': process.env.HAPAC_CHILLROOM_USER,
      'password': process.env.HAPAC_CHILLROOM_PASSWORD,
      'interfaces': [
        'wlan1',
        'wlan1-nord-guest',
        'wlan2',
        'wlan2-nord-guest'
      ]
    }
  ]
};

module.exports = configuration;
