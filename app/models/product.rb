# frozen_string_literal: true

# == Schema Information
#
# Table name: products
#
#  id               :bigint           not null, primary key
#  name             :string
#  description      :string
#  price            :decimal(8, 2)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  quantity         :integer          default(0)
#  minimum_quantity :integer          default(0)
#  slug             :string
#  needed           :boolean          default(FALSE)
#
class Product < ApplicationRecord
  # create many to many relationship with order
  has_many :order_items
  has_many :orders, through: :order_items
  has_many :product_attributes
  has_one :product_type

  # nested attributes
  accepts_nested_attributes_for :product_attributes, allow_destroy: true
  accepts_nested_attributes_for :product_type, allow_destroy: true
  # validations
  validates :name, presence: true
  validates :price, presence: true
  validates :price, numericality: { greater_than: 0 }
  # require at least one attribute
  before_save :check_needed
  before_create :set_slug

  def check_needed
    if self.quantity < self.minimum_quantity
      needed = true
    else
      needed = false
    end
  end
  def set_slug
    var = "#{self.name} #{self.id}"
    self.slug = var.parameterize
  end
end
