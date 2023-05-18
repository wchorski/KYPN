import { Carousel } from "../components/blocks/Carousel";
import { ContactForm } from "../components/blocks/ContactForm";
import { InfoCard } from "../components/blocks/InfoCard";
import { InfoCardParallax } from "../components/blocks/InfoCardParallax";
import {MediaText} from "../components/blocks/MediaText";
import { Slider } from "../components/blocks/SliderCustom";
import SliderSlick from "../components/blocks/SliderSlick";
import { FlexList } from "../components/elements/FlexList";
import { Section } from "../components/elements/Section";
import { EventCard } from "../components/events/EventCard";

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
              text: "Experience the Benefits"
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Are you ready to enhance your overall well-being? Look no further than the natural goodness of fresh fruits. Incorporating a variety of fruits into your daily diet brings a plethora of benefits that can significantly improve your health."
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
              text: "Elevate Your Lifestyle with Fruits"
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Are you looking to transform your lifestyle and achieve optimal vitality? Look no further than the incredible power of fruits. Bursting with natural goodness, fruits are an essential component of a healthy and balanced lifestyle. "
            }
          ]
        },
        {
          type: "heading",
          level: 2,
          children: [
            {
              text: "Vitamins and Minerals "
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Nourish your body from within. Fruits are also a fantastic source of dietary fiber, aiding in digestion, promoting satiety, and maintaining a healthy weight. Incorporating fruits into your daily routine can also enhance your mental well-being, as they have been linked to a reduced risk of depression and improved cognitive function."
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
                text: "a Flavorful Journey to Good Health"
              }
            ]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Discover the incredible taste and extraordinary health benefits that fruits have to offer. With an array of flavors ranging from sweet to tangy, fruits are a delightful way to nourish your body and delight your taste buds. Rich in natural sugars, fruits provide a healthier alternative to processed sweets, satisfying your cravings without the guilt."
              }
            ]
          },
      ]}
    },
    
  ]

  const events = [
    {
      link: '/events/1',
      title: 'Avocado Rave',
      img: 'https://cdn.pixabay.com/photo/2022/05/19/19/09/avocado-7207993_960_720.jpg',
      datetime: '2011-11-18T14:00:00.000',
      location: {
        name: 'Party Town',
        link: '/locations/1',
      }
    },
    {
      link: '/events/2',
      title: 'Fruity Givaway',
      img: 'https://i.pinimg.com/originals/13/3b/75/133b756e50d32b13e227cdf62bad3cb7.jpg',
      datetime: '2023-03-15T14:00:00.000',
      location: {
        name: 'Party Town',
        link: '/locations/1',
      }
    },
    {
      link: '/events/3',
      title: 'Poolside Pinnaple',
      img: 'https://cdn.pixabay.com/photo/2020/01/14/10/55/cartoon-4764726_960_720.png',
      datetime: '2023-08-01T09:00:00.000',
      location: {
        name: 'Party Town',
        link: '/locations/1',
      }
    },
  ]

  const fruitCards = [
    {
      title: "Berrylicious Summer Festival",
      bg: '/assets/textures/pexels-adrien-olichon-2387532.jpg',
      color: '#ffffffd9',
      link: '/services/1',
      content: "Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!"
    },
    {
      title: "Citrus Delight Yoga Retreat",
      bg: '/assets/textures/pexels-adrien-olichon-2387793.jpg',
      color: '#ffffffd9',
      link: '/services/1',
      content: "Refresh your mind, body, and spirit at our Citrus Delight Yoga Retreat. Immerse yourself in the invigorating essence of citrus fruits as you practice yoga amidst lush orange groves. Experience rejuvenating citrus-infused spa treatments, guided meditation sessions, and nutritious citrus-inspired meals. This retreat offers a perfect blend of relaxation and energizing activities, leaving you feeling revitalized and ready to embrace life with zest!"
    },
    {
      title: "Mango Madness Food Fiesta",
      bg: '/assets/textures/pexels-anni-roenkae-2832432.jpg',
      color: '#ffffffd9',
      link: '/services/1',
      content: "Get ready for a tantalizing journey into the world of mangoes at the Mango Madness Food Fiesta. Sample an assortment of mango dishes from around the globe, including mango salsas, mango sticky rice, and mango lassis. Watch live cooking demonstrations by renowned chefs as they showcase innovative ways to incorporate mangoes into your culinary creations. Don't miss the mango eating contest and the chance to explore the diverse flavors and textures of this tropical fruit!"
    },
    {
      title: "Apple Harvest Fair",
      bg: '/assets/textures/pexels-jonny-lew-1121123.jpg',
      color: '#ffffffd9',
      link: '/services/1',
      content: "Celebrate the bountiful apple harvest at our Apple Harvest Fair. Enjoy a day filled with apple-themed activities, including apple picking, cider pressing, and apple pie baking competitions. Delight in freshly made apple fritters, caramel apples, and hot apple cider. Explore local crafts and artisanal products, and let the kids have fun in the apple-themed playground. Immerse yourself in the crisp and fragrant atmosphere of the orchard as you savor the essence of autumn!"
    },
    {
      title: "Pineapple Paradise Beach Party",
      bg: '/assets/textures/pexels-sasha-martynov-1260727.jpg',
      color: '#ffffffd9',
      link: '/services/1',
      content: "Escape to a tropical paradise at our Pineapple Paradise Beach Party! Dance the night away to the rhythm of island music while sipping on refreshing pineapple cocktails. Enjoy a sumptuous buffet featuring an array of pineapple-infused dishes, such as grilled pineapple skewers and pineapple upside-down cake. Participate in limbo contests, beach volleyball, and other exciting beach games. Get ready to soak up the sun, feel the sand between your toes, and experience the ultimate pineapple-themed beach extravaganza!"
    }
  ];

  return (<>
    {/* <Slider slides={slides} parentWidth={1000}/> */}
    <Section bg='/assets/textures/pexels-aleksandr-slobodianyk-989941.jpg'>
      <ContactForm 
        title="Contact Us"
        submitText="Submit"
        color="white"
      />
    </Section>
    {mediatexts.map(mt => (
      <MediaText mediatext={mt} />
    ))}
    <Section bg="/assets/textures/pexels-sasha-martynov-1260727.jpg">
      <h2> Events </h2>
      {events.map((event, i) => (
        <EventCard {...event} key={i}/>
      ))}
    </Section>
    
    <Section>
      <FlexList>
        {fruitCards.map((info, i) => (
          <li key={i}>
            <InfoCard {...info}/>
            {/* <InfoCardParallax {...info}/> */}
          </li>
        ))}
      </FlexList>
    </Section>

    {/* <SliderSlick slides={slides} settings={sliderSettings}/> */}
    {/* <Carousel items={items} /> */}
  </>)
}
