class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.belongs_to :client, index: true
      t.text :description
      t.string :status
      t.string :payment_method
      t.string :total_price
      t.string :remaining_price
      t.timestamps
    end
  end
end
