class RemoveNotTranslatedColumns < ActiveRecord::Migration
  def change
    remove_column :points, :text
    remove_column :rooms, :name
    remove_column :rooms, :description
  end
end
