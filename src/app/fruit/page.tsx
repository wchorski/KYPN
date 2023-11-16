import { ImageDynamic } from '@components/elements/ImageDynamic'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function FruitPage ({ params, searchParams }:Props) {
  return (
    <PageTHeaderMain
      header={Header()}
      main={Main()}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> FruitPage </h1>
    </Section>
  </>
}

function Main(){

  return<>
    <Section layout={'1'}>
      <h3> Vitamin Cee U Later </h3>

      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, accusantium. Molestiae eligendi quibusdam omnis laborum nobis, quas eius illum rerum, similique laudantium et nulla officia natus hic quaerat obcaecati architecto!</p>
      
      <ImageDynamic photoIn={''}/>

      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, modi fugit. Ipsum iusto optio minima, ea harum illum sint similique maiores magni blanditiis totam debitis facilis nostrum quos omnis porro?</p>
    </Section>

    <Section layout={'1_1'}>
      <ImageDynamic photoIn={''}/>

      <div>
        <ul>
          <li> hey </li>
          <li> hey </li>
          <li> hey </li>
          <li> hey </li>
          <li> hey </li>
        </ul>

        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, et ratione repellendus corrupti accusantium consectetur reiciendis expedita nihil aliquam, impedit quasi? Dolorum praesentium alias asperiores neque enim consequuntur mollitia quos.</p>
      </div>
    </Section>
  </>
}