# == Schema Information
#
# Table name: product_types
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class ProductTypeSerializer < ActiveModel::Serializer
  attributes :id,:name, :description
end
