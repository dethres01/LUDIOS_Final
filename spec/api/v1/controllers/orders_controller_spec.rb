
require 'rails_helper'

RSpec.describe Api::V1::OrdersController, type: :controller do
  #test suite for api/v1/orders_controller
  #create a order
  let(:order) { create(:order) }
  let(:order_params) { attributes_for(:order) }
  let(:invalid_order_params) { attributes_for(:order, name: nil) }
  #check GET api/v1/orders
  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
  #check GET api/v1/orders/:id
  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: order.to_param }
      expect(response).to have_http_status(:success)
    end
  end
  #check POST api/v1/orders
  describe "POST #create" do
    context "with valid params" do
      it "creates a new order" do
        expect {
          post :create, params: { order: order_params }
        }.to change(Order, :count).by(1)
      end
      it "renders a JSON response with the new order" do
        post :create, params: { order: order_params }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response.location).to eq(api_v1_order_url(Order.last))
      end
    end
    context "with invalid params" do
      it "renders a JSON response with errors for the new order" do
        post :create, params: { order: invalid_order_params }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
  #check put api/v1/orders/:id
  describe "PUT #update" do
    context "with valid params" do
      it "updates the requested order" do
        put :update, params: { id: order.to_param, order: order_params }
        order.reload
        expect(order.name).to eq(order_params[:name])
      end
      it "renders a JSON response with the order" do
        put :update, params: { id: order.to_param, order: order_params }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
    context "with invalid params" do
      it "renders a JSON response with errors for the order" do
        put :update, params: { id: order.to_param, order: invalid_order_params }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
  #check delete api/v1/orders/:id
  describe "DELETE #destroy" do
    it "destroys the requested order" do
      order
      expect {
        delete :destroy, params: { id: order.to_param }
      }.to change(Order, :count).by(-1)
    end
    it "renders a JSON response with the order" do
      delete :destroy, params: { id: order.to_param }
      expect(response).to have_http_status(:no_content)
    end
  end
end