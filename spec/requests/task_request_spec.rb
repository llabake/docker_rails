require 'rails_helper'

RSpec.describe 'Tasks' do
  let!(:tasks) { create_list(:task, 10) }
  let(:task_id) { tasks.first.id }
  let(:task) { create(:task) }

  context 'GET /tasks' do
    before { get '/tasks' }
    it 'returns tasks' do
      expect(JSON.parse(response.body)).not_to be_empty
      expect(JSON.parse(response.body).size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /tasks' do
    task_params = {
      task: {
        description: Faker::Lorem.sentence,
        avatar_url: Faker::Avatar.image,
        completed: Faker::Boolean.boolean
      }
    }
    context 'when the request is valid' do
      before { post '/tasks', params: task_params }
      it 'creates a task' do
        expect(JSON.parse(response.body)['description']).to eq(task_params[:task][:description])
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/tasks', params: { task: { description: Faker::Lorem.sentence } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match("{\"error\":{\"avatar_url\":[\"can't be blank\"]}}")
      end
    end
  end

  describe 'PUT /tasks/:id' do
    let(:task_params) { { task: { completed: !tasks.first.completed } } }

    context 'when valid data is sent' do
      before { put "/tasks/#{task_id}", params: task_params }

      it 'updates the record' do
        expect(JSON.parse(response.body)[:completed]).not_to eq(tasks.first.completed)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when invalid data is sent' do
      let(:task_params) { { task: { description: '' } } }

    it 'returns unproccessable entity' do
        put "/tasks/#{task_id}", params: task_params
        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end
end
