# frozen_string_literal: true

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
class Order < ApplicationRecord
  # Associations
  belongs_to :client, class_name: 'Client', foreign_key: 'client_id'
  has_many :order_items, dependent: :destroy
  has_many :products, through: :order_items
  accepts_nested_attributes_for :order_items, allow_destroy: true, reject_if: :all_blank
  #validations
  #foreign key shouldn't be optional
  validates :client_id, presence: true
  #validate total_price numericality
  validates :total_price, numericality: { greater_than_or_equal_to: 0 }
  #validate remaining_price numericality
  validates :remaining_price, numericality: { greater_than_or_equal_to: 0 }
  #validate status inclusion
  validates :status, inclusion: { in: %w[ongoing completed cancelled] }
  #validate payment_method inclusion with cash and deposit
  validates :payment_method, inclusion: { in: %w[cash deposit] }
  #validate description can be blank
  validates :description, allow_blank: true
end
