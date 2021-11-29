# frozen_string_literal: true

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
require 'rails_helper'

RSpec.describe ProductType, type: :model do
  # validations
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:product_id) }
  # description can be blank
end
