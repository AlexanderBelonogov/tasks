# frozen_string_literal: true

module Subscriptions
  class TaskCreated < BaseSubscription
    field :task, Types::TaskType, null: true
  end
end
