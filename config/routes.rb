Rails.application.routes.draw do
  get '/flags/search', to: 'flags#search'
  resources :flags
  devise_for :users

  get '*path', to: 'home#base', constraints: ->(request){ request.format.html? }
  root to: 'home#base'
end
