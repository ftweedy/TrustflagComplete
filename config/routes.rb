Rails.application.routes.draw do
  resources :flags
  devise_for :users

  get '*path', to: 'home#base', constraints: ->(request){ request.format.html? }
  root to: 'home#base'
end
