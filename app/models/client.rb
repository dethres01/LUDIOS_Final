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
class Client < ApplicationRecord
  # Associations
  has_many :orders

  # Validations
  validates :name, presence: true
  # Callbacks
  before_save :create_slug

  def create_slug
    crude_slug = "#{self.name} #{self.last_name}"
    self.slug = crude_slug.parameterize
  end
end
