# frozen_string_literal: true

module Api
  module V1
    class ClientsController < ApplicationController
      before_action :set_client, only: %i[show update destroy]
      def index
        @clients = Client.all
        if !params[:search].nil? && params[:search].present?
          @clients = ClientsSearchService.search(@clients,params[:search])
        end
        render json: @clients, status: :ok
      end

      # GET /clients/:id
      def show
        if @client
          render json: @client
        else
          render json: { error: 'Client not found' }, status: 404
        end
      end

      def new
        @client = Client.new
      end

      def edit; end

      # POST /clients
      def create
        @client = Client.new(client_params)
        if @client.save
          render json: @client, status: :created
        else
          render json: { error: 'Client not created' }, status: 422
        end
      end

      # PATCH /clients/:id
      def update
        if @client
          if @client.update(client_params)
            render json: @client
          else
            render json: { error: 'Client not updated' }, status: 422
          end
        else
          render json: { error: 'Client not found' }, status: 404
        end
      end

      # DELETE /clients/:id
      def destroy
        if @client.destroy
          render json: { message: 'Client deleted' }
        else
          render json: { error: 'Client not deleted' }, status: 404
        end
      end

      private

      def set_client
        @client = Client.find_by(slug: params[:slug])
      end

      def client_params
        params.require(:client).permit(:name,:last_name, :phone_number, :notes)
      end
    end
  end
end
