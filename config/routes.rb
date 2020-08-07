Rails.application.routes.draw do
  get '/flags/owned', to: 'flags#owned'
  resources :flags
  devise_for :users

  get '*path', to: 'home#base', constraints: ->(request){ request.format.html? }
  root to: 'home#base'
end
