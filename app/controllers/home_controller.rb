class HomeController < ApplicationController
  include CalendarHelper

  def index
  end

  def dash
    @reflection = Reflection.new
    @growth_plans = current_user.growth_plans
    @current_month = Date.current
    @calendar_data = build_calendar_data(@current_month, current_user)
    @reflection_stats = reflection_stats(@current_month, current_user)
  end
end
