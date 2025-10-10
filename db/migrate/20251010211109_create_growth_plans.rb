class CreateGrowthPlans < ActiveRecord::Migration[8.0]
  def change
    create_table :growth_plans do |t|
      t.string :token, null: false
      t.references :user, null: true, foreign_key: true
      t.string :visibility, null: false, default: "private"
      t.string :title, null: false

      t.timestamps
    end

    add_index :growth_plans, :token, unique: true
  end
end
