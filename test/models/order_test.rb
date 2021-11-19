# == Schema Information
#
# Table name: orders
#
#  id              :bigint           not null, primary key
#  client_id       :bigint
#  description     :text
#  status          :string
#  payment_method  :string
#  total_price     :string
#  remaining_price :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require "test_helper"

class OrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
