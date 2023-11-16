import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { PageTMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import { Event, Session, Tag } from "@ks/types"
import { datePrettyLocalDay, datePrettyLocalTime } from "@lib/dateFormatter"
import { fetchEvent } from "@lib/fetchdata/fetchEvent"
import { Metadata, ResolvingMetadata } from "next"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { RiFileEditFill } from "react-icons/ri"
import styleProduct from '@styles/ecommerce/productSingle.module.scss'
import { BlockRender } from "@components/blocks/BlockRender"
import { AddTicketButton } from "@components/tickets/AddTicketButton"
import { Card } from "@components/layouts/Card"
import DialogPopup from "@components/menus/Dialog"
import { TicketForm } from "@components/tickets/TicketForm"
import styles from '@styles/events/event.module.scss'

type Props = {
  params:{
    id:string,
  },
  searchParams: { 
    [key: string]: string | string[] | undefined, 
    q: string | undefined, 
  }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
 
  // fetch data
  const session = await getServerSession(nextAuthOptions)
  const { event, error } = await fetchEvent(params.id)

  if(!event) return {
    title: envs.SITE_TITLE,
    description: envs.SITE_DESC,
  }

  const { summary, excerpt, image, tags, hosts } = event
  
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: summary,
    description: String(excerpt),
    openGraph: {
      images: [String(image), ...previousImages],
      title: summary,
      description: excerpt,
      url: envs.FRONTEND_URL + '/events/' + params.id,
      type: 'article'
    },
    keywords: tags?.map((tag:Tag) => tag.name).join(', '),
    authors: hosts?.map(host => ({name: host.name, email: host.email, url: host.email}))
  }
}

export default async function EventByID({ params }:Props) {

  const { id } = params
  const { event, error } = await fetchEvent(params.id)
  const session = await getServerSession(nextAuthOptions)
  
  if(error) return <ErrorMessage error={error}/>
  
  return (
    <PageTMain 
      main={Main(id, event, session)}
    />
  )
}

function Main(
  id:string|undefined,
  event:Event|undefined,
  session:Session|any,
){

  async function onClose(){
    'use server'
    console.log('modal closed');
  }

  async function onOk(){
    'use server'
    console.log('ok clicked closed');
  }

  if(!event) return <p> no event found </p>

  const {image, summary, excerpt, description, tickets = [], price, start, end, seats, hosts, location, categories, tags} = event

  return<>
    
    <DialogPopup 
      title={`${summary}`}
      onClose={onClose}
      onOk={onOk}
      buttonLabel=""
    >
      {session ? (
        <TicketForm event={event} user={session?.user}/>
      ) : (
        <p> must have an account to order tickets and redeem tickets.
          <Link href={`/api/auth/signin`}> Login </Link> or <Link href={`/auth/register`}> Create an Account </Link>
        </p>
      )}
    </DialogPopup>

    <Section layout="1">
    <article className={styleProduct.product} >

      <header>
        <div className="container">
    
          <picture className={styles.featured} >
            <ImageDynamic 
              photoIn={image} 
            />
          </picture>

          {/* <h3>{summary}</h3> */}
          <ul className="categories">
            {categories?.map(cat => (
              <li key={cat.id}>
                <Link href={`/blogs/search?categories=${cat.id}`} > {cat.name} </Link>
              </li>
            ))}
          </ul>

          {/* <AddToCalendarButton
            name={summary}
            startDate={new Date(start || '').toLocaleDateString('en-Ca')}
            startTime={new Date(start || '').toLocaleTimeString('en-CA', {hour12:false })}
            endDate={new Date(end || '').toLocaleDateString('en-Ca')}
            endTime={new Date(end || '').toLocaleTimeString('en-CA', {hour12:false })}
            timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
            options={['Apple','Google','Yahoo','iCal']}
          /> */}

          <ul className="meta unstyled">
            <li>{datePrettyLocalDay(start || '')}</li>
            <li>{datePrettyLocalTime(start || '')}</li>
            <li> capacity: {seats}</li>
            <li>
              <address>
                {location?.name}
                <br />
                {location?.address}
              </address>
            </li>
          </ul>
        </div>
      </header>

      <div className={styles.content}>
        <h1>{summary}</h1>

        <Card >

          <Section layout="1_1">
            <div 
              className="info-cont"
              style={{
                display: 'grid',
                alignContent: 'center',
                height: '100%',
              }}
            >
              <strong>
                Purchase Ticket
              </strong> 

              {/* <br/> */}
              {/* <small>sub text</small>  */}
            </div>

            <AddTicketButton 
              // setIsPopup={setIsPopup}
              price={price} 
              date={start} 
            />
          </Section>
          



        </Card>
        
        <br />
        <h3>About</h3>
        <div className={styles.description}>
          <BlockRender document={description.document} />
        </div>

        <hr />
        <ul className="tags">
          {tags?.map(tag => (
            <li key={tag.id}>
              <Link href={`/blogs/search?tags=${tag.id}`} > {tag.name} </Link>
            </li>
          ))}
        </ul>

        {/* //todo have multiple hosts */}
        {/* {session && (host?.id === session.id || session.isAdmin) && ( */}
        {session && (hosts?.map(host => host.id).includes(session.id) || session.isAdmin) && (
          <section className="admin-panel">
            <h2> Host Panel </h2>

            <h3>Hosts</h3>
            <ul>
              {hosts?.map(host => (
                <li key={host?.id}>
                  <Link href={`/users/${host?.id}`}> {host?.name} | {host?.email} </Link>
                </li>
              ))}
            </ul>

            <Link href={`/events/edit/${id}`} className="medium">
              <RiFileEditFill />
              Edit Event Details
            </Link>

            <h3>Edit Attendees</h3>
            <div style={{position: 'relative'}}>
              {/* <SearchUserTicket  eventId={id} setIsPopup={setIsPopup} setPickedUser={setPickedUser} setTicketPopupData={setTicketPopupData}/> */}
            </div>
            
            <h3>All Ticket Holders</h3>
            {/* <AttendeeTable event={data.event} className="display-none" /> */}
            {/* <TicketsList tickets={tickets} key={animTrig} setPopupData={setTicketPopupData}/> */}
          </section>
        )} 
      </div>

    </article>
    </Section>
  
  </>
}
