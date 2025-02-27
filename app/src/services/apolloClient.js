import { split, ApolloClient, InMemoryCache } from '@apollo/client'

import { createConsumer } from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

const { REACT_APP_WEB_SOCKET_URL = 'ws://localhost:3000/cable' } = process.env

const cable = createConsumer(REACT_APP_WEB_SOCKET_URL)

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const link = split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable })
);

const client = new ApolloClient({ link, cache: new InMemoryCache() })

export default client;