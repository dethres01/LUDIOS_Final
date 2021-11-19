class Api::V1::OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]
  # GET /api/v1/orders
  def index
    @orders = Order.all
    render json: @orders
  end
  # GET /api/v1/orders/:id
  def show
    render json: @order
  end
  def new
  end
  # POST /api/v1/orders
  def create
    @order = Order.new(order_params)
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
      params.require(:order).permit(:user_id, :status, :total_price)
    end
    def set_order
      @order = Order.find(params[:id])
    end
end
