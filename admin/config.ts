import type { AdminConfig } from '@keystone-6/core/types';
import { Providers } from './components/Providers';
import './global.scss'
// import '../src/styles/vars.scss'

export const components: AdminConfig['components'] = {
  Navigation: Providers
}