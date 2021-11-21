# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'clients', to: 'clients#index'
      get 'clients/:id', to: 'clients#show'
      post 'clients', to: 'clients#create'
      put 'clients/:id', to: 'clients#update'
      delete 'clients/:id', to: 'clients#destroy'
      # orders routes
      get 'orders', to: 'orders#index'
      get 'orders/:id', to: 'orders#show'
      post 'orders', to: 'orders#create'
      put 'orders/:id', to: 'orders#update'
      delete 'orders/:id', to: 'orders#destroy'

      # products routes
      get 'products', to: 'products#index'
      get 'products/:id', to: 'products#show'
      post 'products', to: 'products#create'
      put 'products/:id', to: 'products#update'
      delete 'products/:id', to: 'products#destroy'
    end
  end

  root 'clients#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
