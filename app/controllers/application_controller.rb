class ApplicationController < ActionController::Base
    # protect_from_forgery
    skip_before_action :verify_authenticity_token

    # def json_request?
    #   request.format.json?
    # end
end