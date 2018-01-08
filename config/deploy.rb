set :application, 'wifi-dashboard'
set :repo_url, 'git@github.com:digiaonline/wifi-dashboard.git'
set :deploy_to, '/home/pi/wifi-dashboard'

append :linked_files, '.env'

namespace :server do
	desc "Install dependencies"
	task :install do
		on roles(:server) do
			within File.join(fetch(:release_path), 'src/server') do
				execute :composer, "install --no-dev --prefer-dist --no-interaction --quiet --optimize-autoloader --classmap-authoritative"
			end
		end
	end
	
	desc "Restart"
	task :restart do
		on roles(:server) do
			execute :sudo, "systemctl daemon-reload"
			execute :sudo, "systemctl restart wifi-dashboard"
		end
	end
end

namespace :ui do
	desc "Install dependencies"
	task :install do
		on roles(:ui) do
			within release_path do
				execute :yarn, "install --production"
			end
		end
	end
	
	desc "Build"
	task :build do
		on roles(:ui) do
			within release_path do
				execute :yarn, "run build"
			end
		end
	end
	
	desc "Restart"
	task :restart do
		on roles(:ui) do
			execute :sudo, "service nginx reload"
		end
	end
end

namespace :deploy do
	after :updated, "server:install"
	after :updated, "ui:install"
	after :updated, "ui:build"
	
	after :published, "server:restart"
	after :published, "ui:restart"
end
