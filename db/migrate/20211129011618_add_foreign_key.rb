class AddForeignKey < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :products, :product_types, column: :product_type_id
  end
end
