# frozen_string_literal: true

class Task < ApplicationRecord
  validates_presence_of :description, :avatar_url

  validates :description, length: {
    minimum: 3,
    maximum: 40,
    too_long: '%<count> characters is the maximum allowed',
    too_short: '%<count> characters is the minimum allowed'
  }

  # def self.sort_tasks
  # 	order(completed_at: :desc, created_at: :desc)
  # end

  scope :sort_tasks, -> { order(completed_at: :desc, created_at: :desc) }
end
