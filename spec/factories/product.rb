# frozen_string_literal: true

FactoryBot.define do
  factory :product do
    name { Faker::Commerce.product_name }
    price { Faker::Commerce.price }
    description { Faker::Lorem.paragraph }
    quantity { Faker::Number.number(digits: 2) }
    minimum_quantity { Faker::Number.number(digits: 2) }
    # get product_type_id from product_type factory
    association :product_type, factory: :product_type
    transient do
      product_attributes_count { 4 }
    end
    after(:create) do |product, evaluator|
      create_list(:product_attribute, evaluator.product_attributes_count, product: product)
    end
  end
end
