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

    # Clear reflectable if no ID is selected
    if @reflection.reflectable_id.blank?
      @reflection.reflectable_type = nil
      @reflection.reflectable_id = nil
    end

    # Clear prompt_text if it's empty or blank
    if @reflection.prompt_text.blank?
      @reflection.prompt_text = nil
    end

    if @reflection.save
      # Redirect to the associated growth plan if this reflection belongs to one
      if @reflection.reflectable_type == "GrowthPlan" && @reflection.reflectable_id.present?
        redirect_to growth_plan_path(@reflection.reflectable, reflection_token: @reflection.token), notice: "Reflection created successfully."
      else
        redirect_to reflection_path(@reflection), notice: "Reflection created successfully."
      end
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
    params.require(:reflection).permit(:content, :title, :parent_reflection_id, :reflectable_type, :reflectable_id, :prompt_text)
  end
end
