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
class OrderItemSerializer < ActiveModel::Serializer
  belongs_to :order
  belongs_to :product
  attributes :quantity, :price
end
