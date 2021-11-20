class AadPriceToOrderItems < ActiveRecord::Migration[6.1]
  def change
    add_column :order_items, :price, :decimal, precision: 10, scale: 2, using: 'price::numeric(10,2)'
  end
end
