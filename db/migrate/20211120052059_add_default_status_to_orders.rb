class AddDefaultStatusToOrders < ActiveRecord::Migration[6.1]
  def change
    change_column :orders, :status, :string, default: 'ongoing'
  end
end
