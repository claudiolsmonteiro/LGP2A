class RoomTranslation < ActiveRecord::Base
  belongs_to :room
  has_one :language
end
