class ChangePhotoPaths < ActiveRecord::Migration
  def change
  	add_column :photos, :url_cube_map, :string, array: true, default: nil
  end
end
