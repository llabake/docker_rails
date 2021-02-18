require 'rails_helper'

RSpec.describe Task, type: :model do
  subject {
    described_class.new(description: Faker::Lorem.sentences(number: 1),
                        avatar_url: Faker::Avatar.image,
                        completed: Faker::Boolean.boolean,
                        completed_at: Time.now)
  }
  describe 'validations' do
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:avatar_url) }

    it 'is invalid without a description' do
      subject.description = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:description]).to include("can't be blank")
    end

    it 'is invalid without an avatar_url' do
      subject.avatar_url = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:avatar_url]).to include("can't be blank")
    end
  end

  describe "creation" do
    it "creates a valid task" do
      expect(subject).to be_valid
    end

    it "has completed to false by default" do
      expect(Task.new.completed).to eq false
    end

    it "creates a list of tasks" do
      built_tasks   = create_list(:task, 3)
      expect(built_tasks.length).to eq 3
    end
  end
end
