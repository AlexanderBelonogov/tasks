# frozen_string_literal: true

module System
  class AddRecurringTaskJob < BaseJob
    TASK_NAME = 'New Task %s'

    def perform(project_id)
      project = Project.find(project_id)
      return unless project

      task = project.tasks.create!(name: TASK_NAME % Time.current)
      ApiSchema.subscriptions.trigger(:task_created, { project_id: }, { task: })
    end
  end
end
