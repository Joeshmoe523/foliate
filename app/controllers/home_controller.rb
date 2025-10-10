class HomeController < ApplicationController
  def index
  end

  def dash
    @reflection = Reflection.new
    @growth_plans = current_user.growth_plans
  end
end
