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
#  product_type_id  :integer
#
require 'rails_helper'

RSpec.describe Product, type: :model do
  # validations
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:price) }
  # description can be blank

  # associations
  it { should have_many(:product_attributes) }
  it { should have_one(:product_type) }
  it { should have_many(:order_items) }
  it { should have_many(:orders).through(:order_items) }

  # nested attributes
  it { should accept_nested_attributes_for(:product_attributes) }
  it { should accept_nested_attributes_for(:product_type) }
end
