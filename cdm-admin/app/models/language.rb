class Language < ActiveRecord::Base
  belongs_to :room_translation
  belongs_to :point_translation
end
