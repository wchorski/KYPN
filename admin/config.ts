import type { AdminConfig } from '@keystone-6/core/types';
import { Providers } from './components/Providers';
import './global.css'
import '../src/styles/vars.css'

export const components: AdminConfig['components'] = {
  Navigation: Providers
}