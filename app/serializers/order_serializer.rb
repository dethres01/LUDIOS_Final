class OrderSerializer < ActiveModel::Serializer
  has_many :order_items
  has_many :products, through: :order_items
  belongs_to :client
  attributes :id
end
