class AddPromptTextToReflections < ActiveRecord::Migration[8.0]
  def change
    add_column :reflections, :prompt_text, :string
  end
end
