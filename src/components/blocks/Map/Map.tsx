
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

export type tMap = {
  address:string,
}

const Map = ({address}:tMap) => {

  if(address.startsWith('http')) return <Link href={address} className={'button large'} >{address}</Link>

  return (
    <div style={{ aspectRatio: DEFAULT_WIDTH / DEFAULT_HEIGHT }}>
      <p className={'sub-text'} > ***Map Placeholder...</p>
      <p className={'sub-text'} > ***Image Placeholder...</p>
      <DynamicMap address={address}/>
    </div>
  )
}

export default Map;