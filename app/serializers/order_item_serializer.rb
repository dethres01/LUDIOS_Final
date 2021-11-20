# == Schema Information
#
# Table name: order_items
#
#  order_id   :bigint           not null
#  product_id :bigint           not null
#  quantity   :integer
#
class OrderItemSerializer < ActiveModel::Serializer
  belongs_to :order
  belongs_to :product
  attributes :id
end
