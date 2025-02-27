# frozen_string_literal: true

class SubscriptionRoot < GraphQL::Schema::Object
  graphql_name "SubscriptionRoot"
  description "The query root of the ApiSchema."

  field :task_created, subscription: Subscriptions::TaskCreated do
    argument :project_id, ID, required: true
  end
end
