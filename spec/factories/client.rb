#factory for clients
FactoryBot.define do
  factory :client do
    name { Faker::Name.name }
    phone_number { Faker::PhoneNumber.phone_number }
    notes { Faker::Lorem.paragraph }
  end
end