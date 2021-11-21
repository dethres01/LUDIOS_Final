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
FactoryBot.define do
  factory :product_attribute do
    name { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    product
  end
end
