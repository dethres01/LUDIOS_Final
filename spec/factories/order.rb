# frozen_string_literal: true

FactoryBot.define do
  factory :order do
    # create order with order_items
    client
    status { 'ongoing' }

    paid { 0 }
    payment_method { 'cash' }
    description { 'test' }
    due_date { Date.new(2021,12,rand(1..30)) }
    # add order_items on creation
    transient do
      order_items_count { 3 }
    end
    after(:create) do |order, evaluator|
      create_list(:order_item, evaluator.order_items_count, order: order)
    end
  end
end
