
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function TestPage({ params, searchParams }:Props) {
  return (
    <>
    <h1>This is a PAGE</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex nam corrupti porro accusantium, sit nisi praesentium blanditiis dolor suscipit officia officiis quasi optio impedit unde perferendis illo eum vero commodi</p>
    <ul>
      <li>one</li>
      <li>thwo</li>
      <li>three</li>
    </ul>
    </>
  )
}

