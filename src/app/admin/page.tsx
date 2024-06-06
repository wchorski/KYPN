import { envs } from "@/envs";
import ErrorMessage from "@components/ErrorMessage";
import { List } from "@components/elements/List";
import { PageTHeaderMain } from "@components/layouts/PageTemplates";
import { Section } from "@components/layouts/Section";
import fetchEvents from "@lib/fetchdata/fetchEvents";
import Link from "next/link";
import { Booking, Event } from "@ks/types";
import { EventsCalendar } from "@components/events/EventsCalendar";
import { SchedualCalendar } from "@components/events/SchedualCalendar";
import fetchBookings from "@lib/fetchdata/fetchBookings";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";

type Props = {
  params: { id: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
    date: string | undefined;
  };
};

const today = new Date();

export default async function AdminPage({ params, searchParams }: Props) {
  const session = await getServerSession(nextAuthOptions);
  const dateParam = searchParams?.date || today.toDateString();
  const date = new Date(dateParam).toDateString();
  const { events, count, error: eventsError } = await fetchEvents(date);
  const { bookings, error: bookingsError } = await fetchBookings(date, session);

  if (eventsError || bookingsError)
    return <ErrorMessage error={eventsError || bookingsError} />;
  return (
    <PageTHeaderMain header={Header()} main={Main(date, events, bookings)} />
  );
}

function Header() {
  return (
    <>
      <Section layout={"1"}>
        <h1> Admin Tools </h1>
        <p className={"subtext"}>
          {" "}
          custom tools specifically designed per admin needs{" "}
        </p>
      </Section>
    </>
  );
}

function Main(date: string, events?: Event[], bookings?: Booking[]) {
  return (
    <>
      <Section layout={"1"}>
        <Link href={envs.BACKEND_URL} className="button large">
          {" "}
          Admin Dashboard{" "}
        </Link>
        <List>
          <Link href={`/users`}> Users </Link>
          <Link href={`/locations`}> Locations </Link>
        </List>
      </Section>
      <Section layout={"1"}>
        <h2> Events & Bookings </h2>
        <AdminCalendar events={events} bookings={bookings} date={date} />
      </Section>
    </>
  );
}

type AdminCal = {
  events?: Event[];
  bookings?: Booking[];
  date: string;
};

function AdminCalendar({ events, bookings, date }: AdminCal) {
  return (
    <>
      {/* <EventsCalendar date={date} events={events} /> */}
      <SchedualCalendar date={date} events={events} bookings={bookings} />
    </>
  );
}
