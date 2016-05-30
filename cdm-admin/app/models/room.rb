class Room < ActiveRecord::Base
  has_one :photo
  has_many :room_translations
  has_many :materials
end