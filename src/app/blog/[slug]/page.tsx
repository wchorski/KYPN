import Link from "next/link";
import ErrorMessage from "@components/ErrorMessage";
import { YouTubeVideo } from "@components/blocks/YouTubeVideo";
import {
  datePrettyLocalDay,
  datePrettyLocalTime,
} from "@lib/dateFormatter";
import { TagsPool } from "@components/menus/TagsPool";
import { CategoriesPool } from "@components/menus/CategoriesPool";
import { ImageDynamic } from "@components/elements/ImageDynamic";
import {Post,User } from "@ks/types";
import { envs } from "@/envs";
import { BlockRender } from "@components/blocks/BlockRender";
import { fetchPost } from "@lib/fetchdata/fetchPost";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { Metadata, ResolvingMetadata } from "next";
import { Card } from "@components/layouts/Card";
import styles from "@styles/blog/blogpost.module.scss";
import { PostTHeaderContentFooter } from "@components/layouts/PostTemplates";
import { StatusBadge } from "@components/StatusBadge";
import Error404 from "../../not-found";

export const revalidate = 5;

type Props = {
  params: {
    slug: string | string[] | undefined;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  // fetch data
  const session = await getServerSession(nextAuthOptions);
  const { post } = await fetchPost(String(params?.slug), session);

  if (!post)
    return {
      title: envs.SITE_TITLE,
      description: envs.SITE_DESC,
    };

  const { title, excerpt, featured_image, tags, author } = post;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: title,
    description: String(excerpt),
    openGraph: {
      images: [String(featured_image), ...previousImages],
      title: title,
      description: excerpt,
      url: envs.FRONTEND_URL + "/blog/" + params.slug,
      type: "article",
    },
    keywords: tags?.map((tag) => tag.name).join(", "),
    authors: [{ name: author?.name, url: author?.url }],
  };
}

export default async function BlogPageBySlug({ params }: Props) {
  const session = await getServerSession(nextAuthOptions);
  const { post, error } = await fetchPost(String(params.slug), session);

  if (error) return <ErrorMessage error={error} />;

  if (!post) return <Error404 > <p> The post could not be found, or you do not have permission to view. </p></Error404>;

  const {
    id,
    title,
    pinned,
    status,
    featured_image,
    featured_video,
    excerpt,
    dateModified,
    dateCreated,
    template,
    allow_comments,
    author,
    categories,
    tags,
    content,
  } = post;

  return (
    <PostTHeaderContentFooter
      headerBgImg={featured_image}
      header={Header({ title, featured_image, author, dateCreated, status })}
      content={Content(post)}
      footer={Footer()}
    />
  );
}

type Header = {
  title?: string;
  featured_image?: string;
  author?: User;
  dateCreated?: string;
  status: Post["status"];
};

function Header({
  title,
  featured_image,
  author,
  dateCreated,
  status,
}: Header) {
  return (
    <>
      {/* <div className={[styles.breadcrumbs_wrap, 'siteWrapper'].join(' ')}>
      <BreadCrumbs />
    </div> */}

      <ImageDynamic photoIn={featured_image} />
      <div className="overlay siteWrapper">
        <div className={styles.title_wrap}>
          <h1>{title}</h1>
          {status !== "PUBLIC" && (
            <div>
              <StatusBadge type={"post"} status={status} />
            </div>
          )}
          <ul className="meta">
            {author && (
              <li>
                post by{" "}
                <Link href={`/users/${author.id}`}> {author.name} </Link>
              </li>
            )}
            <li>
              <time
                dateTime={dateCreated}
                className="date"
                data-tooltip={datePrettyLocalTime(dateCreated)}
              >
                {datePrettyLocalDay(String(dateCreated))}
              </time>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function Content(post: Post) {
  const {
    id,
    title,
    pinned,
    status,
    featured_image,
    featured_video,
    excerpt,
    dateModified,
    dateCreated,
    template,
    allow_comments,
    author,
    categories,
    tags,
    content,
  } = post;

  return (
    <>
      {featured_video && (
        <div className="featured_video">
          <YouTubeVideo url={featured_video} altText="featured video" />
        </div>
      )}

      <div className="content">
        <BlockRender document={content.document} />
      </div>
    </>
  );
}

function Footer() {
  return (
    <>
      <Card>
        <h4 className="categories">Categories: </h4>
        <CategoriesPool />
      </Card>

      <Card>
        <h4 className="tags">Tags:</h4>
        <TagsPool />
      </Card>
    </>
  );
}
