class MakePriceNumber < ActiveRecord::Migration[6.1]
  def change
    change_column :orders, :remaining_price, :decimal, precision: 10, scale: 2, using: 'remaining_price::numeric(10,2)'
    change_column :orders, :total_price, :decimal, precision: 10, scale: 2, using: 'total_price::numeric(10,2)'
  end
end
