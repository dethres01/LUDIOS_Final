# frozen_string_literal: true

# == Schema Information
#
# Table name: order_items
#
#  order_id   :bigint           not null
#  product_id :bigint           not null
#  quantity   :integer
#
class OrderItem < ApplicationRecord
  # Associations
  belongs_to :order
  belongs_to :product
end
