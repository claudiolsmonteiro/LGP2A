class Room < ActiveRecord::Base
  has_many :photos
  has_many :room_translations
end