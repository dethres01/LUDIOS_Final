# frozen_string_literal: true

class AddDefaultsToPriceOnORder < ActiveRecord::Migration[6.1]
  def change
    change_column :orders, :remaining_price, :decimal, default: 0, precision: 10, scale: 2
    change_column :orders, :total_price, :decimal, default: 0, precision: 10, scale: 2
  end
end
