class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :avatar_url, :completed, :completed_at
end
