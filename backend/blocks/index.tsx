
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
import { postslist } from './postslist';
import { infocard } from './infocard';
import { contactform } from './contactform';
import { sociallinknav } from './sociallinknav';
import { iframe } from './iframe';
import { pricetable } from './pricetable';
import { infocardlist } from './infocardlist';
import { imagelinklist } from './imagelinklist';
import { videoLocal } from './video-local';
import { imagegallery } from './imagegallery';
import { buttonlink } from './buttonlink';

// it's important that this file has a named export called componentBlocks
// schema.Post.ui.views import looks for a named export `componentBlocks`
export const componentBlocks = {
  callout,
  slider,
  mediatext,
  section,
  eventsupcoming,
  postslist,
  infocard,
  infocardlist,
  imagelinklist,
  contactform,
  sociallinknav,
  iframe,
  pricetable,
  hero,
  carousel,
  quote,
  tweet,
  youtubeVideo,
  videoLocal,
  imagegallery,
  buttonlink,
};