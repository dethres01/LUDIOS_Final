class ClientSerializer < ActiveModel::Serializer
  has_many :orders
  attributes :id, :name, :phone_number, :notes
end
