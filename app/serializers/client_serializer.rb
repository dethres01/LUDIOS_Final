# frozen_string_literal: true

# == Schema Information
#
# Table name: clients
#
#  id           :bigint           not null, primary key
#  name         :string
#  phone_number :string
#  notes        :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  last_name    :string
#  slug         :string
#
class ClientSerializer < ActiveModel::Serializer
  has_many :orders
  attributes :id,:name, :phone_number, :notes, :last_name, :slug
end
