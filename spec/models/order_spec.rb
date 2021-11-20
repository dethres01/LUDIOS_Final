# == Schema Information
#
# Table name: orders
#
#  id              :bigint           not null, primary key
#  client_id       :bigint
#  description     :text
#  status          :string
#  payment_method  :string
#  total_price     :decimal(10, 2)
#  remaining_price :decimal(10, 2)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe Order, type: :model do
  #list order attributes
  it { should have_many(:order_items) }
  it { should have_many(:products).through(:order_items) }
  it { should belong_to(:client) }
  it { should validate_presence_of(:client_id) }
  #status should only accept "ongoing", "completed", "cancelled"
  it { should validate_inclusion_of(:status).in_array(%w(ongoing completed cancelled)) }
  #payment_method should be "cash", "deposit"
  it { should validate_inclusion_of(:payment_method).in_array(%w(cash deposit)) }
  #total_price should be a number
  it { should validate_numericality_of(:total_price) }
  #remaining_price should be a number
  it { should validate_numericality_of(:remaining_price) }
  #description can be blank
  it { should allow_value(nil).for(:description) }
  #it should allow nested attributes for order_items
  it { should accept_nested_attributes_for(:order_items) }



end
