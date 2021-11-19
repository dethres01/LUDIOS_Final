# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'clients', to: 'clients#index'
      get 'clients/:id', to: 'clients#show'
      post 'clients/create'
      patch 'clients/:id', to: 'clients#update'
      delete 'clients/:id', to: 'clients#destroy'
    end
  end

  root 'clients#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
