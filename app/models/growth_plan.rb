class GrowthPlan < ApplicationRecord
  has_secure_token

  # Associations
  belongs_to :user, optional: true
  has_many :reflections, as: :reflectable, dependent: :destroy

  # Validations
  validates :title, presence: true
  validates :user_id, presence: true

  # Scopes
  scope :for_user, ->(user) { where(user_id: user.id) }

  # Methods
  def to_param
    token
  end
end
