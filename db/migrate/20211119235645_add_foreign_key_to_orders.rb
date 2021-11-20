class AddForeignKeyToOrders < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :orders, :clients, column: :client_id, primary_key: :id
  end
end
