import { envs } from "@/envs";
import { nextAuthOptions } from "@/session";
import ErrorMessage from "@components/ErrorMessage";
import { ImageDynamic } from "@components/elements/ImageDynamic";
import { PageTMain } from "@components/layouts/PageTemplates";
import { Section } from "@components/layouts/Section";
import { Event, Session, Tag } from "@ks/types";
import {
  datePrettyLocal,
  datePrettyLocalDay,
  datePrettyLocalTime,
} from "@lib/dateFormatter";
import { fetchEvent } from "@lib/fetchdata/fetchEvent";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { RiFileEditFill } from "react-icons/ri";
import styleProduct from "@styles/ecommerce/productSingle.module.scss";
import { BlockRender } from "@components/blocks/BlockRender";
import { AddTicketButton } from "@components/tickets/AddTicketButton";
import { Card } from "@components/layouts/Card";
import DialogPopup from "@components/menus/Dialog";
import { TicketForm } from "@components/tickets/TicketForm";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import styles from "@styles/events/event.module.scss";
import { AddToCalendar } from "@components/widgets/AddToCalendar";
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard";
import { plainObj } from "@lib/utils";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { event, error } = await fetchEvent(params.id);

  if (!event)
    return {
      title: envs.SITE_TITLE,
      description: envs.SITE_DESC,
    };

  const { summary, excerpt, image, tags, hosts } = event;
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: summary,
    description: String(excerpt),
    openGraph: {
      images: [String(image), ...previousImages],
      title: summary,
      description: excerpt,
      url: envs.FRONTEND_URL + "/events/" + params.id,
      type: "article",
    },
    keywords: tags?.map((tag: Tag) => tag.name).join(", "),
    authors: hosts?.map((host) => ({
      name: host.name,
      email: host.email,
      url: host.email,
    })),
  };
}

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
    q: string | undefined;
  };
};

export default async function EventByID({ params }: Props) {
  const { id } = params;
  const { event, error } = await fetchEvent(params.id);
  const session = await getServerSession(nextAuthOptions);

  if (error) return <ErrorMessage error={error} />;

  return <PageTMain main={Main(id, event, session)} />;
}

function Main(
  id: string | undefined,
  event: Event | undefined,
  session: Session | any
) {
  async function onClose() {
    "use server";
    console.log("modal closed");
  }

  async function onOk() {
    "use server";
    console.log("ok clicked closed");
  }

  if (!event) return <p> no event found </p>;

  const {
    image,
    summary,
    excerpt,
    description,
    tickets = [],
    price,
    start,
    end,
    seats,
    hosts,
    location,
    categories,
    tags,
  } = event;

  return (
    <>
      <DialogPopup
        title={`${summary}`}
        onClose={onClose}
        onOk={onOk}
        buttonLabel=""
      >
        <p>{datePrettyLocal(start, "full")}</p>
        {session ? (
          <TicketForm event={plainObj(event)} user={session?.user} />
          // <p>debug form</p>
        ) : (
          <p>
            {" "}
            must have an account to order tickets and redeem tickets.
            <Link href={`/login`}> Login </Link> or{" "}
            <Link href={`/register`}> Create an Account </Link>
          </p>
        )}
      </DialogPopup>

      <Section layout="1">
        <article className={styleProduct.product}>
          <header>
            <div className="container">
              <picture className={styles.featured}>
                <ImageDynamic photoIn={image} />
              </picture>

              {/* <h3>{summary}</h3> */}
              <ul className="categories">
                {categories?.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/blogs/search?categories=${cat.id}`}>
                      {" "}
                      {cat.name}{" "}
                    </Link>
                  </li>
                ))}
              </ul>

              <AddToCalendar summary={summary} start={start} end={end} />
            </div>
          </header>

          <div className={styles.content}>
            <h1>{summary}</h1>

            <Card layout={"flex"} direction={"row"}>
              <div
                className="info-cont"
                style={{
                  display: "grid",
                  alignContent: "center",
                  height: "100%",
                }}
              >
                <ul className="meta unstyled padding-0">
                  <li>{datePrettyLocalDay(start || "")}</li>
                  <li>{datePrettyLocalTime(start || "")}</li>
                  {/* <li> capacity: {seats}</li> */}
                  {location && (
                    <li>
                      <address>
                        {location?.name}
                        <br />
                        {location?.address}
                      </address>
                    </li>
                  )}
                </ul>
              </div>

              {!session.data.role ? (
                <VerifyEmailCard email={""} />
              ) : (
                <AddTicketButton price={price} date={start} />
              )}
            </Card>

            <br />
            <h3>About</h3>
            <div className={styles.description}>
              <BlockRender document={description.document} />
            </div>

            <hr />
            <ul className="tags">
              {tags?.map((tag) => (
                <li key={tag.id}>
                  <Link href={`/blogs/search?tags=${tag.id}`}>
                    {" "}
                    {tag.name}{" "}
                  </Link>
                </li>
              ))}
            </ul>

            {/* //todo have multiple hosts */}
            {/* {session && (host?.id === session.id || session.isAdmin) && ( */}
            {session &&
              (hosts?.map((host) => host.id).includes(session.id) ||
                session.isAdmin) && (
                <section className="admin-panel">
                  <h2> Host Panel </h2>

                  <h3>Hosts</h3>
                  <ul>
                    {hosts?.map((host) => (
                      <li key={host?.id}>
                        <Link href={`/users/${host?.id}`}>
                          {" "}
                          {host?.name} | {host?.email}{" "}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/events/edit/${id}`} className="medium">
                    <RiFileEditFill />
                    Edit Event Details
                  </Link>

                  <h3>Edit Attendees</h3>
                  <div style={{ position: "relative" }}>
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
  );
}
