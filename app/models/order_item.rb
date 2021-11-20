# frozen_string_literal: true

# == Schema Information
#
# Table name: order_items
#
#  order_id   :bigint           not null
#  product_id :bigint           not null
#  quantity   :integer
#  price      :decimal(10, 2)
#
class OrderItem < ApplicationRecord
  # Associations
  belongs_to :order
  belongs_to :product
  # Validations
  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  # Callbacks
  before_save :calculate_price
  # Methods
  def calculate_price
    self.price = self.product.price * self.quantity
  end
end
