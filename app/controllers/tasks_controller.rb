class TasksController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    tasks = Task.all.sort_tasks
    render json: tasks, status: :ok
  end

  def create
    task = Task.new(task_params)

    if task.save
      render json: task, status: :created
    else
      render json: { error: task.errors.messages }, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find(params[:id])

    if task.update(completed_at: Time.now, completed: task_params[:completed])
      render json: task, status: :ok
    else
      render json: { error: task.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:task).permit(:description, :avatar_url, :completed, :completed_at)
  end
end
