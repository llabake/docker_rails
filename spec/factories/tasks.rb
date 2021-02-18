FactoryBot.define do
  factory :task do
    description { Faker::Lorem.sentence(word_count: 3) }
    avatar_url { Faker::LoremFlickr.image(size: "100x100") }
    completed { Faker::Boolean.boolean }
    completed_at { Time.now }

    trait :uncompleted do
      completed { false }
    end
  end
end