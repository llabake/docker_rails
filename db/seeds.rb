10.times do
  Task.create(
    { description: Faker::Lorem.sentence(word_count: 3),
      avatar_url: Faker::LoremFlickr.image(size: '100x100'),
      completed: Faker::Boolean.boolean }
  )
end
puts 'Seeded tasks successfully'

tasks = Task.all

tasks.each_with_index do |task, i|
  task.completed ? task.update(completed_at: Time.now + i) : task.completed_at
end

puts 'Updated some task completed_at value'
