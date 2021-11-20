# frozen_string_literal: true

# == Schema Information
#
# Table name: orders
#
#  id              :bigint           not null, primary key
#  client_id       :bigint
#  description     :text
#  status          :string           default("ongoing")
#  payment_method  :string
#  total_price     :decimal(10, 2)   default(0.0)
#  remaining_price :decimal(10, 2)   default(0.0)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  paid            :decimal(10, 2)   default(0.0)
#
class OrderSerializer < ActiveModel::Serializer
  has_many :order_items
  has_many :products, through: :order_items
  belongs_to :client
  attributes :id, :description, :status, :payment_method, :total_price, :remaining_price, :paid
end
