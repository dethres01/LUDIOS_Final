class CreateJoinTableOrderProduct < ActiveRecord::Migration[6.1]
  def change
    create_join_table :orders, :products,table_name: :order_items do |t|
      t.index [:order_id, :product_id]
      t.index [:product_id, :order_id]
      t.integer :quantity
    end
  end
end
