Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/users', to: 'users#index'
  get '/users/:id', to: 'users#show'
  post '/users', to: 'users#create'
  delete '/users/:id', to: 'users#delete'
  put '/users/:id', to: 'users#update'

<<<<<<< HEAD
  get '/likes', to: 'likes#index'
  get '/likes/:id', to: 'likes#show'
  post '/likes', to: 'likes#create'
  delete '/likes/:id', to: 'likes#delete'
  put '/likes/:id', to: 'likes#update'
=======
  get '/posts', to: 'posts#index'
  get '/posts/:id', to: 'posts#show'
  post '/posts', to: 'posts#create'
  delete '/posts/:id', to: 'posts#delete'
  put '/posts/:id', to: 'posts#update'

  get '/comments', to: 'comments#index'
  post '/comments', to: 'comments#create'
  delete '/comments/:id', to: 'comments#delete'
  put '/comments/:id', to: 'comments#update'
>>>>>>> 5e1dcccdf2ff4e00edb128ce24bc8fa652f4463b
end
