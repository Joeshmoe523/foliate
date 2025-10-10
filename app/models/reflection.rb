class Reflection < ApplicationRecord
  has_secure_token

  # Associations
  belongs_to :user
  belongs_to :parent_reflection, class_name: "Reflection", optional: true
  has_many :child_reflections, class_name: "Reflection", foreign_key: "parent_reflection_id", dependent: :nullify
  belongs_to :reflectable, polymorphic: true, optional: true

  # Callbacks
  before_validation :set_default_title, on: :create

  # Validations
  validates :title, presence: true
  validates :user_id, presence: true

  # Scopes
  scope :top_level, -> { where(parent_reflection_id: nil) }
  scope :for_user, ->(user) { where(user_id: user.id) }
  scope :with_parent, -> { where.not(parent_reflection_id: nil) }

  def to_param
    token
  end

  private

  def set_default_title
    self.title = "#{Date.current.strftime('%b %-d, %Y')} Reflection" if title.blank?
  end
end
