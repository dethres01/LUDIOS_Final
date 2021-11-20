# frozen_string_literal: true

class AddForeignKeyToOrders < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :orders, :clients, column: :client_id
  end
end
