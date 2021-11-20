# frozen_string_literal: true

# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :string
#  image_url   :string
#  price       :decimal(8, 2)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class ProductSerializer < ActiveModel::Serializer
  has_many :order_items
  has_many :orders, through: :order_items
  attributes :id
end
