class GrowthPlansController < ApplicationController
  before_action :authenticate_user!
  before_action :set_growth_plan, only: [ :show, :update, :destroy ]
  def index
    @growth_plans = GrowthPlan.all
  end

  def show
  end

  def create
    @growth_plan = current_user.growth_plans.build(growth_plan_params)
    if @growth_plan.save
      redirect_to growth_plan_path(@growth_plan), notice: "Growth plan created successfully."
    else
      redirect_to authenticated_root_path, alert: "Failed to create growth plan."
    end
  end

  def update
    if @growth_plan.update(growth_plan_params)
      redirect_to growth_plan_path(@growth_plan), notice: "Growth plan updated successfully."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @growth_plan.destroy
    redirect_to growth_plans_path, notice: "Growth plan deleted successfully."
  end

  private

  def set_growth_plan
    @growth_plan = current_user.growth_plans.find_by(token: params[:token])
    redirect_to growth_plans_path, alert: "Growth plan not found." unless @growth_plan
  end

  def growth_plan_params
    params.require(:growth_plan).permit(:title, :visibility)
  end
end
