
FactoryBot.define do
  factory :order do
    #order attributes
    client
    status { 'ongoing'}
    payment_method { 'cash'}
    total_price { 0 }
    remaining_price { 0 }
    description { 'test' }
    #order_items attributes
    transient do
      order_items_count { 1 }
    end
    after(:create) do |order, evaluator|
      create_list(:order_item, evaluator.order_items_count, order: order)
    end
  end
end