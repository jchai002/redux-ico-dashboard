# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# git tasks
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

#npm/yarn tasks
require 'capistrano/yarn'
require 'capistrano/pm2'

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
