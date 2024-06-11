import { PageTHeaderMain } from "@components/layouts/PageTemplates";
import { Section } from "@components/layouts/Section";
type Props = {
  searchParams: { q: string };
  params: { id: string };
};

export default async function AnalyticsPage({ params, searchParams }: Props) {
  return <PageTHeaderMain header={Header()} main={Main()} />;
}

function Header() {
  return (
    <>
      <Section layout={"1"}>
        <h1> AnalyticsPage </h1>
      </Section>
    </>
  );
}

function Main() {
  return (
    <>
      <Section layout={"1"}>
        <iframe
          src=""
          width="100%"
          height="500px"
          sandbox="allow-scripts"
          allowFullScreen
        ></iframe>
      </Section>
    </>
  );
}
