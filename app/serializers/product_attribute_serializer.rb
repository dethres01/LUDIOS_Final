# frozen_string_literal: true

# == Schema Information
#
# Table name: product_attributes
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :string
#  product_id  :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class ProductAttributeSerializer < ActiveModel::Serializer
  attributes :id,:name, :description
end
