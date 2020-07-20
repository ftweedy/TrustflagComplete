class CreateFlags < ActiveRecord::Migration[6.0]
  def change
    create_table :flags do |t|
      t.integer :user_id
      t.string :expiration_date
      t.string :park_location
      t.string :gps_coordinates
      t.string :poi
      t.string :lic_plate
      t.string :address
      t.string :phone
      t.string :notes

      t.timestamps
    end
  end
end
