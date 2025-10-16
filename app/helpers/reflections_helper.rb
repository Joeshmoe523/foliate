module ReflectionsHelper
  def current_reflection?(reflection)
    @reflection&.token == reflection.token
  end
end
