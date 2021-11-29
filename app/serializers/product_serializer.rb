# frozen_string_literal: true

# == Schema Information
#
# Table name: products
#
#  id               :bigint           not null, primary key
#  name             :string
#  description      :string
#  price            :decimal(8, 2)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  quantity         :integer          default(0)
#  minimum_quantity :integer          default(0)
#  slug             :string
#  needed           :boolean          default(FALSE)
#  product_type_id  :integer
#
class ProductSerializer < ActiveModel::Serializer
  # has_many :order_items
  # has_many :orders, through: :order_items
  has_many :product_attributes
  belongs_to :product_type
  attributes :name, :description, :price, :product_type, :quantity, :minimum_quantity, :slug,:needed, :product_type_id

  def product_type
    object.product_type.name
  end
end
