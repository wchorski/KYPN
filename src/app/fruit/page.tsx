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
      <h3> FruitPage </h3>
    </Section>
  </>
}

function Main(){

  return<>

    <Section layout={'1'}>
      <h1> Headings 1 </h1>
      <h2> Headings 2 </h2>
      <h3> Headings 3 </h3>
      <h4> Headings 4 </h4>
      <h5> Headings 5 </h5>
      <h6> Headings 6 </h6>

      <h2> Paragaphs: </h2>
      <p> Lorem ipsum dolor sit amet <strong> bold text </strong> adipisicing elit. Debitis veritatis similique deleniti perferendis rerum eligendi cum enim itaque voluptatem, inventore ducimus tempore dolorum reprehenderit voluptas voluptatibus error cupiditate numquam recusandae.</p>
      <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex possimus <em> EMPHASIZE INLINE </em> id, ipsa voluptates culpa fugit ducimus odio at, rem laudantium explicabo laboriosam consequatur quod saepe quaerat eius mollitia eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum neque doloribus culpa dicta ipsa necessitatibus optio? Accusantium voluptates suscipit temporibus eius explicabo! Delectus quaerat ad sint, ratione natus vel laboriosam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque cum non praesentium commodi. Atque quis voluptatem culpa blanditiis. Reiciendis ex architecto ab, modi sit inventore est repudiandae rerum vero harum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt at iste et. Sequi modi praesentium, quo voluptate ducimus, dolorum eveniet id inventore, obcaecati adipisci laborum cupiditate totam incidunt tenetur aliquid.</p>
      <p>Lorem ipsum dolor sit <a href='/'> Inline Link </a> amet consectetur adipisicing elit. Reprehenderit doloremque beatae est perspiciatis. Recusandae veritatis numquam, quae voluptatem reprehenderit qui itaque, libero, corporis deserunt consectetur modi. Tenetur iusto impedit incidunt!</p>

      <h2> Lists: </h2>
      <ul>
        <li> bannana </li>
        <li> apple </li>
        <li> lemon </li>
      </ul>

      <ol>
        <li> one </li>
        <li> two </li>
        <li> three </li>
      </ol>

      <h2> Interactive: </h2>
      <button> regular </button>
      <button className='medium button'>  medium </button>
      <button className='large button'>  large </button>

      <a href="/"> anchor tag </a>
      <a href="/" className='button'> anchor tag button </a>

      <h4> Form: </h4>
      <form>
        <fieldset>
          <legend> inputs </legend>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="checkbox" />
          <select>
            <option value=""> one </option>
            <option value=""> two </option>
            <option value=""> three </option>
          </select>
          <textarea />
        </fieldset>
      </form>

      <h2> Media: </h2>
      <ImageDynamic photoIn={''}/>

    </Section>
  </>
}