import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import PostTitle from '../../components/post-title';
import Head from 'next/head';
import { postStore } from '../../store/post';
import { CMS_NAME } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';
import type PostType from '../../interfaces/post';
import { use, useEffect, useState } from 'react';
import { read } from 'fs';

type Props = {
	post: PostType;
	morePosts: PostType[];
	preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
	const router = useRouter();
	const { isLoading, readById, postList } = postStore();
	// const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`
	// if (!router.isFallback && !post?._id) {
	//   return <ErrorPage statusCode={404} />
	// }

	useEffect(() => {
		if (router.query._id) {
			readById(router.query._id as string);
			//TODO: Traer con zustand el post del _id
		}
	}, [router.query._id]);

	useEffect(() => {
		console.log('postList', postList);
	}, [postList]);

	return (
		<Layout preview={preview}>
			<Container>
				<Header />
				{router.isFallback ? (
					<PostTitle>Loading…</PostTitle>
				) : (
					<>
						<article className="mb-32">
							<Head>
								<title>{post.title}</title>
								<meta property="og:image" content={post.img} />
							</Head>
							<PostHeader
								title={post.title}
								coverImage={post.coverImage}
								createdAt={post.createdAt}
								author={post.author}
							/>
							<PostBody body={post.body} />
						</article>
					</>
				)}
			</Container>
		</Layout>
	);
}

type Params = {
	params: {
		slug: string;
	};
};

export async function getStaticProps({ params }: Params) {
	const post = getPostBySlug(params.slug, [
		'title',
		'date',
		'slug',
		'author',
		'content',
		'ogImage',
		'coverImage',
		'_id',
	]);
	const content = await markdownToHtml(post.content || '');

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	};
}

// export async function getStaticPaths() {
// 	const posts = getAllPosts(['slug']);

// 	return {
// 		paths: posts.map((post) => {
// 			return {
// 				params: {
// 					slug: post._id,
// 				},
// 			};
// 		}),
// 		fallback: false,
// 	};
// }
