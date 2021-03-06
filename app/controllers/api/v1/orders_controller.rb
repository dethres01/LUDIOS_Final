# frozen_string_literal: true

module Api
  module V1
    class OrdersController < ApplicationController
      before_action :set_order, only: %i[show update destroy]
      # GET /api/v1/orders
      def index
        @orders = Order.all
        # look for status params
        if !params[:status].nil? && params[:status].present?
          @orders = OrdersSearchService.search(@orders, params[:status])
        end
        render json: @orders
      end

      # GET /api/v1/orders/:id
      def show
        render json: @order
      end

      def new; end

      # POST /api/v1/orders
      def create
        @order = Order.new(order_params)
        binding.pry
        if @order.save
          render json: @order, status: :created
        else

          render json: @order.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/orders/:id
      def update
        if @order.update(order_params)
          render json: @order
        else
          render json: @order.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/orders/:id
      def destroy
        @order.destroy
        head :no_content
      end

      private

      def order_params
        params.require(:order).permit(:client_id, :status, :paid, :payment_method, :total_price, :remaining_price,
                                      :description, :due_date, order_items_attributes: %i[id product_id quantity _destroy])
      end

      def set_order
        @order = Order.find(params[:id])
      end
    end
  end
end
