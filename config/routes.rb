Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  delete "/logout", to: "sessions#destroy"
  get "/my_groups", to: "users#my_groups"
  get "/me", to: "users#show"

  resources :users
  resources :groups
  resources :user_groups, only: [:create, :destroy]
  resources :posts
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
