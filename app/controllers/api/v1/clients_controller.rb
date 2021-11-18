class Api::V1::ClientsController < ApplicationController
  before_action :set_client, only: [:show, :update, :destroy]
  def index
    @clients = Client.all.order(name: :asc)
    render json: @clients
  end
  def show  # GET /clients/:id
    if @client
      render json: @client
    else
      render json: {error: "Client not found"}, status: 404
    end
  end
  def new
    @client = Client.new
  end
  def edit
  end
  def create  # POST /clients
    @client = Client.new(client_params)
    if @client.save
      render json: @client
    else
      render json: {error: "Client not created"}, status: 404
    end
  end

  def update  # PATCH /clients/:id
    if @client.update(client_params)
      render json: @client
    else
      render json: {error: "Client not updated"}, status: 404
    end
  end
  def destroy  # DELETE /clients/:id
    if @client.destroy
      render json: {message: "Client deleted"}
    else
      render json: {error: "Client not deleted"}, status: 404
    end
  end
  private
    def set_client
      @client = Client.find(params[:id])
    end
    def client_params
      params.require(:client).permit(:name, :phone_number, :notes)
    end
end
