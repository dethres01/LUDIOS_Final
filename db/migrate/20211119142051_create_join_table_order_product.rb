# frozen_string_literal: true

class CreateJoinTableOrderProduct < ActiveRecord::Migration[6.1]
  def change
    create_join_table :orders, :products, table_name: :order_items do |t|
      t.index %i[order_id product_id]
      t.index %i[product_id order_id]
      t.integer :quantity
    end
  end
end
