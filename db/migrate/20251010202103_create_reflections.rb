class CreateReflections < ActiveRecord::Migration[8.0]
  def change
    create_table :reflections do |t|
      t.string :token, null: false
      t.integer :user_id, null: false
      t.integer :parent_reflection_id
      t.string :reflectable_type
      t.integer :reflectable_id
      t.string :title, null: false
      t.text :content

      t.timestamps
    end

    add_index :reflections, :token, unique: true
    add_index :reflections, :user_id
    add_index :reflections, :parent_reflection_id
    add_index :reflections, [ :reflectable_type, :reflectable_id ], name: 'index_reflections_on_reflectable'
  end
end
