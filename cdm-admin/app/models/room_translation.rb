class RoomTranslation < ActiveRecord::Base
  belongs_to :room, :class_name => 'Room'
  has_one :language
end
