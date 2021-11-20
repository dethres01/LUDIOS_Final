# == Schema Information
#
# Table name: orders
#
#  id              :bigint           not null, primary key
#  client_id       :bigint
#  description     :text
#  status          :string
#  payment_method  :string
#  total_price     :decimal(10, 2)
#  remaining_price :decimal(10, 2)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class OrderSerializer < ActiveModel::Serializer
  has_many :order_items
  has_many :products, through: :order_items
  belongs_to :client
  attributes :id
end
