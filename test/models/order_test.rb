# frozen_string_literal: true

# == Schema Information
#
# Table name: orders
#
#  id              :bigint           not null, primary key
#  client_id       :bigint
#  description     :text
#  status          :string           default("ongoing")
#  payment_method  :string
#  total_price     :decimal(10, 2)   default(0.0)
#  remaining_price :decimal(10, 2)   default(0.0)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  paid            :decimal(10, 2)   default(0.0)
#  due_date        :date
#
require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
