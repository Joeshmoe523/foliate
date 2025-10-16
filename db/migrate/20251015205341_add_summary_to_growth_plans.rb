class AddSummaryToGrowthPlans < ActiveRecord::Migration[8.0]
  def change
    add_column :growth_plans, :summary, :text
  end
end
