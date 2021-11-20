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
  #Callbacks
  #calculate total_price and remaining_price
  before_validation :calculate_total_price, if: :order_items_changed?
  before_validation :calculate_remaining_price, if: :order_items_changed?
  #Methods
  #calculate total_price
  def calculate_total_price
    self.total_price = order_items.map(&:price).sum
  end
  #calculate remaining_price
  def calculate_remaining_price
    #will have to check how to update this
    self.remaining_price = total_price - paid
  end
  #returns true if order is ongoing
  def ongoing?
    status == 'ongoing'
  end
  #returns true if order is completed
  def completed?
    status == 'completed'
  end
  #returns true if order is cancelled
  def cancelled?
    status == 'cancelled'
  end
  #returns true if order is paid
  def paid?
    remaining_price == 0
  end
  #returns true if order is not paid
  def unpaid?
    remaining_price > 0
  end
  #returns true if order is not paid and not cancelled
  def payable?
    unpaid? && !cancelled?
  end

