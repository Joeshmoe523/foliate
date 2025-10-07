class HomeController < ApplicationController
  def index
  end

  def dash
    @reflection = ReflectionForm.new
  end
end
