Rails.application.routes.draw do

  get 'point_translations_controller/new'

  get 'point_translations_controller/create'

  get 'point_translations_controller/edit'

  get 'point_translations_controller/update'

  get 'point_translations_controller/destroy'

  get 'point_translations_controller/show'

  get 'room_translations/new'

  get 'room_translations/create'

  get 'room_translations/update'

  get 'room_translations/destroy'

  get 'room_translation/new'

  get 'room_translation/edit'

  get 'room_translation/update'

  get 'room_translation/destroy'



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
  patch '/rooms' => 'rooms#update'
  #points
  resources :points
  get "api/point/:id", :to => 'points#get_room'
  get '/points' => 'points#new'
  post '/points' => 'points#create'
  patch '/points' => 'points#update'

end
