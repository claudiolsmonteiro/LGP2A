class Room < ActiveRecord::Base
  has_one :photo
  has_many :room_translations, :class_name => 'RoomTranslation', :dependent => :destroy
  has_many :materials
  accepts_nested_attributes_for :room_translations, update_only: true, :allow_destroy => true
end