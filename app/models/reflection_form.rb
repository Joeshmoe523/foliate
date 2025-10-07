class ReflectionForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :content, :string

  def persisted?
    false
  end

  def save
    # For testing purposes, just return true
    # In a real implementation, this would save to the database
    true
  end
end
