# frozen_string_literal: true

module Api
  module V1
    class ProductsController < ApplicationController
      before_action :set_product, only: %i[show update destroy]

      # GET /products
      def index
        @products = Product.all
        if !params[:needed].nil? && params[:needed].present?
          @products = ProductsSearchService.search(@products, params[:needed])
        end
        render json: @products, status: :ok
      end

      # GET /products/:id
      def show
        if @product
          render json: @product, status: :ok
        else
          render json: { error: 'Product not found' }, status: :not_found
        end
      end

      # POST /products
      def create
        @product = Product.new(product_params)
        if @product.save
          render json: @product, status: :created
        else
          render json: { error: 'Product not created' }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /products/:id
      def update
        if @product
          if @product.update(product_params)
            render json: @product, status: :ok
          else
            render json: { error: 'Product not updated' }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Product not found' }, status: :not_found
        end
      end

      # DELETE /products/:id
      def destroy
        if @product
          @product.destroy
          render json: { message: 'Product deleted' }, status: :ok
        else
          render json: { error: 'Product not found' }, status: :not_found
        end
      end

      private

      def set_product
        @product = Product.find_by(slug: params[:slug])
      end

      def product_params
        params.require(:product).permit(:name, :description, :price, product_type_attributes: %i[id name _destroy],
                                                                     product_attributes_attributes: %i[id name value _destroy])
      end
    end
  end
end
