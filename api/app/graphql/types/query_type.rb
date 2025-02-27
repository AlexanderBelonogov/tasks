# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    field :projects, Types::ProjectType.collection_type, null: true do
      argument :page, Integer, required: false
      argument :limit, Integer, required: false
    end

    def projects(page: nil, limit: nil)
      Project.page(page).per(limit)
    end

    field :tasks, Types::TaskType.collection_type, null: true do
      argument :id, ID, required: true
      argument :page, Integer, required: false
      argument :limit, Integer, required: false
    end

    def tasks(id:, page: nil, limit: nil)
      project = Project.find(id)
      project.tasks.order(name: :asc).page(page).per(limit)
    end
  end
end
