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
  before_create :create_slug
  after_create :normalize_name
  after_save :normalize_name

  def normalize_name
    self.name.downcase!
    self.last_name.downcase!
  end
  
  def create_slug
    
    crude_slug = "#{self.name} #{self.last_name}"
    puts "crude_slug #{crude_slug}"
    self.slug = crude_slug.parameterize
  end
end
