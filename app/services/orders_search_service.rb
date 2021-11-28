class OrdersSearchService
  # search according to the search_params and return the result
  def self.search(curr_orders, status)
    if status != "ongoing" || status != "completed" || status != "cancelled"
      return curr_orders
    else
      orders_ids = Rails.cache.fetch("orders_search/#{status}", expires_in: 1.hours) do
        curr_orders.where(status: status).map(&:id)
      end

      curr_orders.where(id: orders_ids)
    end
  end
end