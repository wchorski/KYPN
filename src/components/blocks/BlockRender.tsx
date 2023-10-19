
import React, { ComponentProps } from 'react';
import styles from '@styles/blocs/blockrenderer.module.scss'
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import { Callout } from '@components/blocks/Callout';
import { ImageBlock } from '@components/blocks/ImageBlock';
import { ProductListBlock } from '@components/blocks/ProductListBlock';
import { ButtonLink } from '@components/blocks/ButtonLink';
import { ImageGallery } from '@components/blocks/ImageGallery';
import { VideoLocal } from '@components/blocks/VideoLocal';
import { YouTubeVideo } from '@components/blocks/YouTubeVideo';
import { Tweet } from '@components/blocks/Tweet';
import { PriceTable } from '@components/blocks/PriceTable';
import { MediaText } from '@components/blocks/MediaText';
import { SocialLinkNav } from '@components/blocks/SocialLinkNav';
import { ContactForm } from '@components/blocks/ContactForm';
import { ImageLinkList } from '@components/blocks/ImageLinkList';
import { InfoCardList } from '@components/blocks/InfoCardList';
import { PostsList } from '@components/blocks/PostsList';
import { EventsUpcoming } from '@components/blocks/EventsUpcoming';
import { IFrame } from '@components/blocks/IFrame';
import { Section } from '@components/blocks/Section';
import SliderSlick from '@components/blocks/SliderSlick';
import { Carousel } from '@components/blocks/Carousel';
import { Quote } from '@components/blocks/Quote';
import { Hero } from '@components/menus/Hero';
import { InfoCard } from '@components/blocks/InfoCard';
import { BlockLayout } from '@components/blocks/BlockLayout';
import { Paragraph } from '@components/blocks/ParagraphBlock';
import { HeadingBlock } from '@components/blocks/HeadingBlock';

// By default the DocumentRenderer will render unstyled html elements.
// We're customising how headings are rendered here but you can customise
// any of the renderers that the DocumentRenderer uses.
const renderers: DocumentRendererProps['renderers'] = {
  block: {
    // all custom components are block components
    // so they will be wrapped with a <div /> by default
    // we can override that to whatever wrapper we want
    // for eg. using React.Fragment wraps the component with nothing
    // @ts-ignore
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
    paragraph(props) {
      return  <Paragraph {...props}/>;
    },
    // list(props) {
    //   return <ListBlock {...props}/>
    // },
    heading(props) {
      return <HeadingBlock {...props} />
    }
    // paragraph({ children }) {
    //   return <div className={styles.paragraph_wrap}> <p>{children}</p> </div>;
    // },
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

type CustomRendererProps = ComponentProps<typeof DocumentRenderer>;

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

export function BlockRender({ document }: { document: any }) {

  // return <DocumentRenderer 
  //   document={document} 
  //   componentBlocks={customComponentRenderers}
  //   renderers={renderers} 
  // />;

  return (
    <div className={['block-renderer', styles.blockrenderer].join(' ')}>
      <DocumentRenderer
        renderers={renderers}
        componentBlocks={customComponentRenderers}
        document={document}
      />
    </div>

  )

}
