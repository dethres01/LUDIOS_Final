# frozen_string_literal: true

FactoryBot.define do
  factory :product do
    name { Faker::Commerce.product_name }
    price { Faker::Commerce.price }
    description { Faker::Lorem.paragraph }
    quantity { Faker::Number.number(2) }
    minimum_quantity { Faker::Number.number(2) }
    transient do
      product_attributes_count { 4 }
      product_type_count { 1 }
    end
    after(:create) do |product, evaluator|
      create_list(:product_attribute, evaluator.product_attributes_count, product: product)
      create_list(:product_type, evaluator.product_type_count, product: product)
    end
  end
end
