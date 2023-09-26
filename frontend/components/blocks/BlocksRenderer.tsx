import React, { ComponentProps } from 'react';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Hero } from './Hero';
import { Callout } from './Callout';
import { Quote } from './Quote';
import { Carousel } from './Carousel';
import { Tweet } from './Tweet';
import { YouTubeVideo } from './YouTubeVideo';
import SliderSlick from './SliderSlick';
import { MediaText } from './MediaText';
import { Section } from './Section';
import { EventsUpcoming } from './EventsUpcoming';
import { PostsList } from './PostsList';
import { InfoCard } from './InfoCard';
import { BlockLayout } from './BlockLayout';
import { ContactForm } from './ContactForm';
import { SocialLinkNav } from './SocialLinkNav';
import { IFrame } from './IFrame';
import { PriceTable } from './PriceTable';
import { InfoCardList } from './InfoCardList';
import { ImageLinkList } from './ImageLinkList';
import { VideoLocal } from './VideoLocal';
import { ImageGallery } from './ImageGallery';
import { ButtonLink } from './ButtonLink';
import styles from './styles/blockrenderer.module.scss'
import { ProductListBlock } from './ProductListBlock';
import { ImageBlock } from './ImageBlock';

type CustomRendererProps = ComponentProps<typeof DocumentRenderer>;

const defaultElementRenderers: CustomRendererProps['renderers'] = {
  block: {
    // all custom components are block components
    // so they will be wrapped with a <div /> by default
    // we can override that to whatever wrapper we want
    // for eg. using React.Fragment wraps the component with nothing
    block: React.Fragment,
    layout: props => {
      return <BlockLayout {...props} />
    },
    // customise blockquote elements with your own styles
    blockquote({ children }) {
      return <blockquote className={`blockquote`}>{children}</blockquote>;
    },
    // block code ``` ```
    code({ children }) {
      return <pre className={`pre`}>{children}</pre>;
    },
    // and more - check out the types to see all available block elements
  },
  inline: {
    bold: ({ children }) => {
      return <strong style={{ color: 'var(--c-bold)' }}>{children}</strong>;
    },
    // inline code ` `
    code: ({ children }) => {
      return <code className={`code`}>{children}</code>;
    },
    // and more - check out the types to see all available inline elements
  },
};

const customComponentRenderers: CustomRendererProps['componentBlocks'] = {
  hero: props => {
    return <Hero {...props} />;
  },
  callout: props => {
    return <Callout {...props} />;
  },
  quote: props => {
    return <Quote {...props} />;
  },
  carousel: props => {
    return <Carousel {...props} />;
  },
  slider: props => {
    return <SliderSlick {...props}/>
  },
  section: props => {
    return <Section {...props}/>
  },
  iframe: props => {
    return <IFrame {...props}/>
  },
  eventsupcoming: props => {
    return <EventsUpcoming {...props}/>
  },
  postslist: props => {
    return <PostsList {...props}/>
  },
  infocard: props => {
    return <InfoCard {...props}/>
  },
  infocardlist: props => {
    return <InfoCardList {...props}/>
  },
  imagelinklist: props => {
    return <ImageLinkList {...props}/>
  },
  contactform: props => {
    return <ContactForm {...props}/>
  },
  sociallinknav: props => {
    return <SocialLinkNav {...props}/>
  },
  mediatext: props => {
    return <MediaText {...props}/>
  },
  pricetable: props => {
    return <PriceTable {...props}/>
  },
  tweet: props => {
    return <Tweet {...props} />;
  },
  youtubeVideo: props => {
    return <YouTubeVideo {...props} />;
  },
  videoLocal: props => {
    return <VideoLocal {...props} />;
  },
  imagegallery: props => {
    return <ImageGallery {...props} />;
  },
  buttonlink: props => {
    return <ButtonLink {...props} />;
  },
  productslist: props => {
    return <ProductListBlock {...props} />;
  },
  image: props => {
    return <ImageBlock {...props} />;
  },
};

export function BlockRenderer({ document }: CustomRendererProps) {
  return (
    <div className={`block-renderer ${styles.blockrenderer}`}>
      <DocumentRenderer
        renderers={defaultElementRenderers}
        componentBlocks={customComponentRenderers}
        document={document}
      />
    </div>
  );
}
