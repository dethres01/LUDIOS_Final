# frozen_string_literal: true

class CreateClients < ActiveRecord::Migration[6.1]
  def change
    create_table :clients do |t|
      t.string :name
      t.string :phone_number
      t.text :notes

      t.timestamps
    end
  end
end
