class AddVideoToPhoto < ActiveRecord::Migration
  def change
    add_reference :videos, :photo, index: true, foreign_key: true
  end
end
