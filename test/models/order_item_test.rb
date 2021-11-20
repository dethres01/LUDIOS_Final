# frozen_string_literal: true

# == Schema Information
#
# Table name: order_items
#
#  order_id   :bigint           not null
#  product_id :bigint           not null
#  quantity   :integer
#  price      :decimal(10, 2)
#
require 'test_helper'

class OrderItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
