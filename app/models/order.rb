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
class Order < ApplicationRecord
  # Associations
  belongs_to :client, class_name: 'Client', foreign_key: 'client_id'
  has_many :order_items, dependent: :delete_all
  has_many :products, through: :order_items
  accepts_nested_attributes_for :order_items, allow_destroy: true, reject_if: :all_blank
  # validations
  # foreign key shouldn't be optional
  validates :client_id, presence: true
  # validate total_price numericality
  validates :total_price, numericality: { greater_than_or_equal_to: 0 }
  # validate total_price default value to 0
  # validate remaining_price numericality
  validates :remaining_price, numericality: { greater_than_or_equal_to: 0 }
  # validate status inclusion
  validates :status, inclusion: { in: %w[ongoing completed cancelled] }

  validates :payment_method, inclusion: { in: %w[cash deposit] }

  after_save :set_product_quantity
  before_save :calculate_remaining_price
  before_save :set_status


  def set_product_quantity
    if self.status == 'completed'
      order_items.each do |order_item|
        product = order_item.product
        product.quantity -= order_item.quantity
        product.save
      end
    end
  end

  def calculate_total_price
    self.total_price = order_items.sum(:price)
  end

  def set_status
    self.status = 'ongoing' if status.blank?
    self.status = 'completed' if paid?
    self.status = 'cancelled' if cancelled?
  end

  # calculate remaining_price
  def calculate_remaining_price
    # will have to check how to update this
    self.remaining_price = total_price - paid
  end

  # returns true if order is ongoing
  def ongoing?
    status == 'ongoing'
  end

  # returns true if order is completed
  def completed?
    status == 'completed'
  end

  # returns true if order is cancelled
  def cancelled?
    status == 'cancelled'
  end

  # returns true if order is paid
  def paid?
    remaining_price.zero?
  end

  # returns true if order is not paid
  def unpaid?
    remaining_price.positive?
  end

  # returns true if order is not paid and not cancelled
  def payable?
    unpaid? && !cancelled?
  end
  # check if order is due in 1 week
  def due_in_1_week?
    due_date.between?(Date.today, Date.today + 7)
  end
end
