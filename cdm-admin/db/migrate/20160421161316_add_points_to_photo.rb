class AddPointsToPhoto < ActiveRecord::Migration
  def change
    add_reference :points, :photo, index: true, foreign_key: true
  end
end
