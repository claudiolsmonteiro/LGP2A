class AddPathsAnimationBeaconToRoom < ActiveRecord::Migration
  def change

  	#paths
  	add_column :rooms, :model_path, :string
  	add_column :rooms, :model_detail_path, :string
  	add_column :rooms, :texture_path, :string
  	add_column :rooms, :texture_detail_path, :string

  	#animation
  	add_column :rooms, :animation, :float, array: true, default: [0,0,0]

  	#beacons
  	add_column :rooms, :beacon_uuid, :string
  	add_column :rooms, :beacon_major, :integer
  	add_column :rooms, :beacon_minor, :integer

  end
end
