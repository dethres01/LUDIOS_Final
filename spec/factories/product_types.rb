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
FactoryBot.define do
  factory :product_type do
    name { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
  end
end
