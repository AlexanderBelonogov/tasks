# frozen_string_literal: true

module System
  class BaseJob < ApplicationJob
    queue_as :high

    def perform
      raise NotImplementedError, 'An abstract method was called'
    end
  end
end
