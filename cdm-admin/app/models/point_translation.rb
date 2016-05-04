class PointTranslation < ActiveRecord::Base
  belongs_to :point
  has_one :language
end
