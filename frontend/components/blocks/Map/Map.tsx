//@ts-nocheck
import dynamic from 'next/dynamic';

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


  return (
    <div style={{ aspectRatio: DEFAULT_WIDTH / DEFAULT_HEIGHT }}>
      <DynamicMap address={address}/>
    </div>
  )
}

export default Map;