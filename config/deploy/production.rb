server 'wifi-dashboard.nordsoftware.fi', user: 'pi', roles: %w{server ui}

set :ssh_options, {
  forward_agent: true,
  auth_methods: %w(publickey password)
}
