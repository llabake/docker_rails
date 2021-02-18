# frozen_string_literal: true

class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :avatar_url, null: false
      t.string :description, null: false, limit: 40
      t.boolean :completed, default: false
      t.timestamp :completed_at

      t.timestamps
    end
  end
end
