Rails.application.routes.draw do

  #root
  root             'sessions#new'
  #login/logout
  get    'login'   => 'sessions#new'
  post   'login'   => 'sessions#create'
  get 'logout'  => 'sessions#destroy'
  #users
  resources :users
  get '/signup' => 'users#new'
  post'/users' => 'users#create'

  #photos
  get "api/photo/:id", :to => 'photo#get_photo'
  get "api/photo/:id/points", :to => 'photo#get_photo_points'
  get "api/photo/:id/videos", :to => 'photo#get_photo_videos'

  #rooms
  resources :rooms
  get "api/room/:id", :to => 'rooms#get_room'
  get "api/room/:id/photos", :to => 'rooms#get_room_photos'
  get "api/everything", :to => 'rooms#get_everything'

  get '/rooms' => 'rooms#new'
  post '/rooms' => 'rooms#create'
  #points
  resources :points
  get '/newpoint' => 'points#new'
  post '/point' => 'points#create'

end
