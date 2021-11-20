#factory for clients
FactoryBot.define do
  factory :client do
    name { Faker::Name.name }
    phone_number { Faker::PhoneNumber.phone_number }
    notes { Faker::Lorem.paragraph }
    
    factory :client_with_orders do
      transient do
        order_count { 1 }
      end
      
      after(:create) do |client, evaluator|
        create_list(:order, evaluator.order_count, client: client)
      end
    end
  end
end