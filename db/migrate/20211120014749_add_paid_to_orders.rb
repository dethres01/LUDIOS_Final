class AddPaidToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :paid, :decimal, precision: 10, scale: 2, default: 0, using: 'paid::numeric(10,2)'
  end
end
