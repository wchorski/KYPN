import { Carousel } from "../components/blocks/Carousel";
import MediaText from "../components/blocks/MediaText";
import { Slider } from "../components/blocks/SliderCustom";
import SliderSlick from "../components/blocks/SliderSlick";

const slides = [
  {
    id: '1',
    template: 0,
    color: '#fff',
    title: 'Refreshing and Nourishing',
    excerpt: 'Are you ready to enhance your overall well-being? Look no further than the natural goodness of fresh fruits. Incorporating a variety of fruits into your daily diet brings a plethora of benefits that can significantly improve your health.',
    bg: 'https://cdn.wallpapersafari.com/43/90/V75Fys.png',
    content: null,
    button: {
      link: '/home',
      text: 'Click Now',
      template: 0,
    }
  },
  {
    id: '2',
    template: 0,
    color: '#fff',
    title: 'Embrace a Flavorful Journey to Good Health with Fruits!',
    excerpt: "Discover the incredible taste and extraordinary health benefits that fruits have to offer. With an array of flavors ranging from sweet to tangy, fruits are a delightful way to nourish your body and delight your taste buds. Rich in natural sugars, fruits provide a healthier alternative to processed sweets, satisfying your cravings without the guilt. What's more, their low-calorie content makes them an excellent choice for weight management. Moreover, fruits are known to lower the risk of chronic diseases, such as heart disease, stroke, and certain types of cancer. Don't miss out on the opportunity to savor these succulent wonders—make fruits a central part of your daily routine and embark on a delicious journey to good health!",
    bg: 'https://i.pinimg.com/originals/13/3b/75/133b756e50d32b13e227cdf62bad3cb7.jpg',
    content: null,
    button: {
      link: '/home',
      text: 'Flavor Town',
      template: 0,
    }
  },
  {
    id: '3',
    template: 0,
    color: '#fff',
    title: 'Optimal Vitality!',
    excerpt: 'Are you looking to transform your lifestyle and achieve optimal vitality? Look no further than the incredible power of fruits. Bursting with natural goodness',
    bg: 'https://img.freepik.com/free-vector/collection-flat-delicious-fruits_23-2148936876.jpg?size=338&ext=jpg',
    content: null,
    button: {
      link: '/home',
      text: 'Learn More',
      template: 0,
    }
  },
]

export default function HomePage() {
  const sliderSettings = {
    accessibility: true,
    fade: false,
    dots: true,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 1000 * 2,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnFocus: true,
    pauseOnHover: true,
    arrows: true,
    // centerMode: true,
    pauseOnDotsHover: true,
    adaptiveHeight: false,
    // appendDots: () => <ul>{'o'}</ul>,
  }

  const items = [
    {
      title: 'slide 1',
      imageSrc: 'https://cdn.wallpapersafari.com/43/90/V75Fys.png',
    },
    {
      title: 'slide 2',
      imageSrc: 'https://cdn.wallpapersafari.com/43/90/V75Fys.png',
    },
    {
      title: 'slide 3',
      imageSrc: 'https://cdn.wallpapersafari.com/43/90/V75Fys.png',
    },
  ]

  const mediatexts = [
    {
      bg: `https://i.pinimg.com/originals/13/3b/75/133b756e50d32b13e227cdf62bad3cb7.jpg`,
      mediaWidth: '50%',
      rowReverse: false,
      content: {
        document: [
        {
          type: "heading",
          level: 2,
          children: [
            {
              text: "Whats the Pitch?"
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Pitch!? Please… we don’t hire salespeople, we don’t use gimmicks and we don’t have a ‘sales pitch’. We hire real DJs, we shoot straight and we let our work speak for itself (see our raves). Weddings, clubs, bars and more… we’ve ‘been there, DJ’d that’. Be it a graceful and traditional dinner reception, an all-out floor-shaking dance party or both, we’ve got a performer that will bring the vibe that’s right for you!"
            }
          ]
        },
      ]}
    },
    {
      bg: `https://cdn.pixabay.com/photo/2020/01/14/10/55/cartoon-4764726_960_720.png`,
      mediaWidth: '50%',
      rowReverse: true,
      content: {
        document: [
        {
          type: "heading",
          level: 2,
          children: [
            {
              text: "Why Vibe With Us?"
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            {
              text: "We are ACTUAL DJs! From the first song to the last, we creatively mix through your favorite music with finesse. Party Vibe DJs are true artists that will leave your guests speechless with a combination of elegance and raw skill!"
            }
          ]
        },
        {
          type: "heading",
          level: 2,
          children: [
            {
              text: "Prove it."
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Can do. We stream LIVE performances straight from this website every month. Check the calendar for our next public performance! You can also read our ‘About Us‘ page to get to know us a little better!"
            }
          ]
        },
      ]}
    },
    {
      bg: `https://cdn.pixabay.com/photo/2022/05/19/19/09/avocado-7207993_960_720.jpg`,
      mediaWidth: '50%',
      rowReverse: false,
      content: {
        document: [
          {
            type: "heading",
            level: 2,
            children: [
              {
                text: "What if I Have to postpone?"
              }
            ]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Do it. Our rescheduling policy is extremely lenient. You can reschedule for any extraordinary circumstance, even if you have to postpone more than once. "
              }
            ]
          },
      ]}
    },
    
  ]

  return (<>
    {/* <Slider slides={slides} parentWidth={1000}/> */}
    {mediatexts.map(mt => (
      <MediaText mediatext={mt} />
    ))}

    {/* <SliderSlick slides={slides} settings={sliderSettings}/> */}
    {/* <Carousel items={items} /> */}
  </>)
}
