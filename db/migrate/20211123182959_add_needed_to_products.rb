class AddNeededToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :needed, :boolean, default: false
  end
end
