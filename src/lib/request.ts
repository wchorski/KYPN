import { envs } from '@/envs';
import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient(envs.FRONTEND_URL + '/api/graphql');