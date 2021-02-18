Rails.application.routes.draw do
  root to: 'static#index'
  resources :tasks, only: [:index, :create, :update]
end
