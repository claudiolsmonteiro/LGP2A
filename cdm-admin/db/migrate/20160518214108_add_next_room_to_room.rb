class AddNextRoomToRoom < ActiveRecord::Migration
  def change
  	add_column :rooms, :next_room, :string
  end
end
