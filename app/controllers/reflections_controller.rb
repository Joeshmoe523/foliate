class ReflectionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_reflection, only: [ :show, :update, :destroy ]

  def index
    @reflections = current_user.reflections
  end

  def show
  end

  def create
    @reflection = current_user.reflections.build(reflection_params)

    if @reflection.save
      redirect_to reflection_path(@reflection), notice: "Reflection created successfully."
    else
      redirect_to authenticated_root_path, alert: "Failed to create reflection."
    end
  end

  def update
    if @reflection.update(reflection_params)
      redirect_to reflection_path(@reflection), notice: "Reflection updated successfully."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @reflection.destroy

    redirect_to reflections_path, notice: "Reflection deleted successfully."
  end

  private

  def set_reflection
    @reflection = current_user.reflections.find_by(token: params[:token])
    redirect_to reflections_path, alert: "Reflection not found." unless @reflection
  end

  def reflection_params
    params.require(:reflection).permit(:content, :title, :parent_reflection_id, :reflectable_type, :reflectable_id)
  end
end
