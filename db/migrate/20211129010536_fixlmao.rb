class Fixlmao < ActiveRecord::Migration[6.1]
  def change
    #remove product_id from product types
    remove_column :product_types, :product_id
    add_column :products, :product_type_id, :integer
  end
end
