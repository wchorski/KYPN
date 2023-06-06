
/** @jsxRuntime classic */
/** @jsx jsx */

import { callout } from './callout';
import { hero } from './hero';
import { carousel } from './carousel';
import { quote } from './quote';
import { tweet } from './tweet';
import { youtubeVideo } from './youtube-video';
import { slider } from './slider';
import { mediatext } from './mediatext';
import { section } from './section';
import { eventsupcoming } from './eventsupcoming';

// it's important that this file has a named export called componentBlocks
// schema.Post.ui.views import looks for a named export `componentBlocks`
export const componentBlocks = {
  callout,
  slider,
  mediatext,
  section,
  eventsupcoming,
  hero,
  carousel,
  quote,
  tweet,
  youtubeVideo,
};