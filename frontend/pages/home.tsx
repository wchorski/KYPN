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

  return (<>
    {/* <Slider slides={slides} parentWidth={1000}/> */}
    <MediaText />
    <SliderSlick slides={slides} settings={sliderSettings}/>
    {/* <Carousel items={items} /> */}
  </>)
}
