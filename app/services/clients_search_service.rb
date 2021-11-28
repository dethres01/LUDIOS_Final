class ClientsSearchService
  def self.search(curr_clients,query)
    # search clients from a query
    clients_ids = Rails.cache.fetch("clients_search/#{query}", expires_in: 1.hours) do
      curr_clients.where(needed: true).map(&:id)
    end

    curr_clients.where(id: clients_ids)
  end
end