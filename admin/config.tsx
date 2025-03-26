import type { AdminConfig } from '@keystone-6/core/types';
import { KSProviders } from './components/KSProviders';
import './global.css'
import '../src/styles/vars.css'
import type { CSSProperties } from 'react';

function CustomLogo () {
  return <h3>{tawtawSVG} + {ksSVG}<span style={{color: '#2563eb'}}>6</span></h3>
}

export const components: AdminConfig['components'] = {
  Navigation: KSProviders,
  Logo: CustomLogo,
}

const stylesSVG = {
  display: "inline-block",
  width: "3rem",
  height: "2rem",
  margin: "0 0 4px 0",
  verticalAlign: "middle",
  fontFamily: `system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif`,
  fontSize: '700',
  fontWeight: '1.25rem'
} as CSSProperties

const ksSVG = <svg style={stylesSVG} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" className="css-1xrg3zo"><defs><linearGradient id="logo-a" x1="0%" x2="50%" y1="0%" y2="71.9%"><stop offset="0%" stopColor="#5AE8FA"></stop><stop offset="100%" stopColor="#2684FF"></stop></linearGradient></defs><path fill="url(#logo-a)" fillRule="evenodd" d="M290.1 47h117.5c17.8 0 24.3 1.9 30.8 5.3a36.3 36.3 0 0115.1 15.2c3.5 6.5 5.4 13 5.4 30.8v117.4c0 17.9-1.9 24.3-5.4 30.8a36.3 36.3 0 01-15.1 15.2c-6.5 3.4-13 5.3-30.8 5.3H290c-17.8 0-24.3-1.9-30.8-5.3a36.3 36.3 0 01-15.1-15.2c-3.5-6.5-5.3-13-5.3-30.8V98.3c0-17.9 1.8-24.3 5.3-30.8a36.3 36.3 0 0115.1-15.2c6.5-3.4 13-5.3 30.8-5.3zm11.8 56.8V218H327v-36.8l14.4-14.6 34.4 51.4h31.5l-49-69.1 44.7-45.1h-31.3L327 151v-47.3H302z" transform="translate(-238.9 -47)"></path></svg>
const tawtawSVG = <svg style={stylesSVG} width="1422" height="635" viewBox="0 0 1422 635" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="317.491" width="449" height="449" rx="27" transform="rotate(-45 0 317.491)" fill="#9FD6B5"/>
<rect x="787" y="317.491" width="449" height="449" rx="27" transform="rotate(-45 787 317.491)" fill="#9FD6B5"/>
<rect x="399" y="317.491" width="449" height="449" rx="27" transform="rotate(-45 399 317.491)" fill="#9FD6B5"/>
<path d="M415.592 336.181C405.048 325.637 405.048 308.541 415.592 297.997L497.276 216.313C507.82 205.769 524.916 205.769 535.46 216.313L617.497 298.35C628.041 308.894 628.041 325.99 617.497 336.534L535.813 418.218C525.269 428.762 508.173 428.762 497.629 418.218L415.592 336.181Z" fill="#D4DFD8"/>
<path d="M813.092 335.96C802.548 325.416 802.548 308.32 813.092 297.776L894.776 216.092C905.32 205.548 922.416 205.548 932.96 216.092L1015 298.129C1025.54 308.673 1025.54 325.769 1015 336.313L933.313 417.997C922.769 428.541 905.673 428.541 895.129 417.997L813.092 335.96Z" fill="#D4DFD8"/>
</svg>

