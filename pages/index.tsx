import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { PostFrontMatter } from 'types/PostFrontMatter'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

const MAX_DISPLAY = 5

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  authorDetails: AuthorFrontMatter
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', ['default'])
  const { frontMatter } = authorDetails

  return {
    props: {
      posts,
      authorDetails: frontMatter,
    },
  }
}

export default function Home({
  posts,
  authorDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    avatar,
    company,
    email,
    github,
    instagram,
    linkedin,
    name,
    occupation,
    youtube,
  } = authorDetails
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          {/*<h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">*/}
          {/*  Самое интересное*/}
          {/*</h1>*/}
          {/*<p className="text-lg leading-7 text-gray-500 dark:text-gray-400">*/}
          {/*  {siteMetadata.description}*/}
          {/*</p>*/}

          <div className="items-center flex flex-col">
            <div className="flex">
              <Link href="/about">
                <Image
                  src={avatar}
                  alt="avatar"
                  width="150px"
                  height="150px"
                  className="w-48 h-48 rounded-full"
                />
              </Link>
            </div>
            <div className="items-center flex flex-col">
              <h3 className="pt-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
              <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
              <div className="text-gray-500 dark:text-gray-400">{company}</div>
            </div>
            <div className="flex pt-4 space-x-4">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="instagram" href={instagram} />
              <SocialIcon kind="youtube" href={youtube} />
            </div>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Читать &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            Все статьи &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">{/*<NewsletterForm />*/}</div>
      )}
    </>
  )
}
