# frozen_string_literal: true

module System
  class AddRecurringTasksJob < BaseJob
    def perform
      Project.find_in_batches(batch_size: 100) do |batch_projects|
        jobs = batch_projects.pluck(:id)
                             .map { AddRecurringTaskJob.new(_1) }
        ActiveJob.perform_all_later(jobs)
      end
    end
  end
end
