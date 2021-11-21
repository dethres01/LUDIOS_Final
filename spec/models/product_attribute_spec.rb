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
require 'rails_helper'

RSpec.describe ProductAttribute, type: :model do
  # validations
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:product_id) }

  # associations
  it { should belong_to(:product) }
end
