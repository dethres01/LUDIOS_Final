# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_29_011618) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.string "name"
    t.string "phone_number"
    t.text "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "last_name"
    t.string "slug"
    t.index ["slug"], name: "index_clients_on_slug", unique: true
  end

  create_table "order_items", id: false, force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "product_id", null: false
    t.integer "quantity"
    t.decimal "price", precision: 10, scale: 2
    t.index ["order_id", "product_id"], name: "index_order_items_on_order_id_and_product_id"
    t.index ["product_id", "order_id"], name: "index_order_items_on_product_id_and_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "client_id"
    t.text "description"
    t.string "status", default: "ongoing"
    t.string "payment_method"
    t.decimal "total_price", precision: 10, scale: 2, default: "0.0"
    t.decimal "remaining_price", precision: 10, scale: 2, default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "paid", precision: 10, scale: 2, default: "0.0"
    t.date "due_date"
    t.index ["client_id"], name: "index_orders_on_client_id"
  end

  create_table "product_attributes", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.bigint "product_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_id"], name: "index_product_attributes_on_product_id"
  end

  create_table "product_types", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.decimal "price", precision: 8, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "quantity", default: 0
    t.integer "minimum_quantity", default: 0
    t.string "slug"
    t.boolean "needed", default: false
    t.integer "product_type_id"
    t.index ["slug"], name: "index_products_on_slug", unique: true
  end

  add_foreign_key "orders", "clients"
  add_foreign_key "product_attributes", "products"
  add_foreign_key "products", "product_types"
end
