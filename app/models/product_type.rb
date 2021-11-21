# frozen_string_literal: true

# == Schema Information
#
# Table name: product_types
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :string
#  product_id  :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class ProductType < ApplicationRecord
  belongs_to :product

  # validations
  validates :name, presence: true
  validates :product_id, presence: true
end
