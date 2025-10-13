class HomeController < ApplicationController
  def index
  end

  def dash
    @reflection = Reflection.new
    @growth_plans = current_user.growth_plans
    @reflections = current_user.reflections.group_by { |r| r.created_at.to_date }
  end
end
