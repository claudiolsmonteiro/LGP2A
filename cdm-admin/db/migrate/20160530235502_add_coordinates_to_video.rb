class AddCoordinatesToVideo < ActiveRecord::Migration
  def change
    add_column :videos, :x, :float
    add_column :videos, :y, :float
  end
end
