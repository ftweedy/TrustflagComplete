class ApplicationController < ActionController::Base
    # protect_from_forgery
    protect_from_forgery unless: -> { request.format.json? }
    # skip_before_action :verify_authenticity_token, if: :json_request?

    # def json_request?
    #   request.format.json?
    # end
end