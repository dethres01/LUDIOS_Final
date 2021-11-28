class ProductsSearchService

  def self.search(curr_products, needed)
    # search products from a query
    products_ids = Rails.cache.fetch("products_search/#{needed}", expires_in: 1.hours) do
      curr_products.where(needed: needed).map(&:id)
    end

    curr_products.where(id: products_ids)
  end

end