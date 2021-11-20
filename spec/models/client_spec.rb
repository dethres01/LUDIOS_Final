# == Schema Information
#
# Table name: clients
#
#  id           :bigint           not null, primary key
#  name         :string
#  phone_number :string
#  notes        :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
#rspec model test for client
require 'rails_helper'

RSpec.describe Client, type: :model do
  #check if client is valid
  it "is valid with valid attributes" do
    client = Client.new(name: "Test Client", phone_number: "1234567890", notes: "Test Notes")
    expect(client).to be_valid
  end
  #check if client is invalid
  it "is invalid without a name" do
    client = Client.new(name: nil,phone_number: "1234567890", notes: "Test Notes")
    expect(client).to_not be_valid
  end
  #check if client is invalid
  it "may be valid without a phone number" do
    client = Client.new(phone_number: nil,name: "Test Client", notes: "Test Notes")
    expect(client).to be_valid
  end
  #check if client is invalid
  it "is valid without a notes" do
    client = Client.new(notes: nil,name: "Test Client", phone_number: "1234567890")
    expect(client).to be_valid
  end
  #check association with orders
  it "has many orders" do
    client = Client.reflect_on_association(:orders)
    expect(client.macro).to eq(:has_many)
  end
end
