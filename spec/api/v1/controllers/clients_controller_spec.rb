#rspec test for api/v1/clients_controller
require 'spec_helper'
require 'rails_helper'

RSpec.describe Api::V1::ClientsController, type: :controller do
  #Create a client
  let(:client) { create(:client) }
  let(:client_params) { attributes_for(:client) }
  let(:invalid_client_params) { attributes_for(:client, name: nil) }

  #check GET api/v1/clients
  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
  #check GET api/v1/clients/:id
  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: client.to_param }
      expect(response).to have_http_status(:success)
    end
  end
  #check POST api/v1/clients
  describe "POST #create" do
    context "with valid params" do
      it "creates a new Client" do
        expect {
          post :create, params: { client: client_params }
        }.to change(Client, :count).by(1)
      end

      it "renders a JSON response with the new client" do
        post :create, params: { client: client_params }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new client" do
        post :create, params: { client: invalid_client_params }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
  #check PATCH/PUT api/v1/clients/:id
  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) { attributes_for(:client) }

      it "updates the requested client" do
        put :update, params: { id: client.to_param, client: new_attributes }
        client.reload
        expect(client.name).to eq(new_attributes[:name])
      end

      it "renders a JSON response with the client" do
        put :update, params: { id: client.to_param, client: client_params }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the client" do
        put :update, params: { id: client.to_param, client: invalid_client_params }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
  #check DELETE api/v1/clients/:id
  describe "DELETE #destroy" do
    it "destroys the requested client" do
      client
      expect {
        delete :destroy, params: { id: client.to_param }
      }.to change(Client, :count).by(-1)
    end
  end
end