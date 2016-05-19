class ChangeRoomAnimationDefault < ActiveRecord::Migration
	def up
		change_column :rooms, :animation, :float, array: true, default: []
  	end
  def change
  end
end
