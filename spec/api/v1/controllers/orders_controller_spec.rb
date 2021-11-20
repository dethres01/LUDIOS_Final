# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::OrdersController, type: :controller do
  # create order
  let(:order) { create(:order) }
  let(:client) { create(:client) }
  let(:product) { create(:product) }

  # get all orders
  describe 'GET #index' do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
  # get one order
  describe 'GET #show' do
    it 'returns http success' do
      get :show, params: { id: order.id }
      expect(response).to have_http_status(:success)
    end
  end
  # create order
  describe 'POST #create' do
    it 'returns http success' do
      order_params = { 'client_id' => client.id.to_s, 'status' => 'ongoing', 'paid' => '0.0', 'payment_method' => 'cash',
                       'description' => 'test', 'order_items_attributes' => { '0' => { 'product_id' => product.id.to_s, 'quantity' => '1' } } }
      post :create, params: { order: order_params }

      expect(response).to have_http_status(:success)
    end
  end

  # update order
  describe 'PUT #update' do
    it 'returns http success' do
      put :update, params: { id: order.id, order: attributes_for(:order) }
      expect(response).to have_http_status(:success)
    end
  end

  # delete order
  describe 'DELETE #destroy' do
    it 'returns http success' do
      delete :destroy, params: { id: order.id }
      expect(response).to have_http_status(:success)
    end
  end
end
