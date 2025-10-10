class HomeController < ApplicationController
  def index
  end

  def dash
    @reflection = Reflection.new
  end
end
