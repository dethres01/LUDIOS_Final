class ClientSlug < ActiveRecord::Migration[6.1]
  def change
    add_column :clients, :last_name, :string
    add_column :clients, :slug, :string
    add_index :clients, :slug, unique: true
  end
end
