import Container from '../components/container';
import Intro from '../components/intro';
import Layout from '../components/layout';
import Head from 'next/head';
import Post from '../interfaces/post';
import { postStore } from '../store/post';
import { useEffect, useState } from 'react';
import HeroPost from '../components/hero-post';
import MoreStories from '../components/more-stories';

// type Post = {
// 	allPosts: Post[];
// };

const initPost: Post = {
	title: '',
	slug: '',
	_id: '',
	body: '',
	createdAt: '',
	author: '',
	coverImage: '',
	excerpt: '',
	img: '',
};

export default function Index() {
	const [heroPost, setHeroPost] = useState<Post>(initPost);
	const [morePosts, setMorePosts] = useState<Post[]>([]);

	const { list, isLoading, readAll } = postStore();

	useEffect(() => {
		readAll();
	}, []);

	useEffect(() => {
		console.log('isLoading', isLoading);
		if (list.length > 0) {
			console.log(list);
			setHeroPost(list[0]);
			setMorePosts(list.slice(1));
		}
	}, [list]);

	return (
		<>
			<Layout>
				<Head>
					<title>{`Blog-App`}</title>
				</Head>
				<Container>
					<Intro />
					{heroPost._id && (
						<HeroPost
							title={heroPost.title}
							coverImage={heroPost.coverImage}
							createdAt={heroPost.createdAt}
							author={heroPost.author}
							_id={heroPost._id}
							slug={heroPost.slug}
							excerpt={heroPost.excerpt}
						/>
					)}
					{morePosts.length > 0 && <MoreStories posts={morePosts} />}
				</Container>
			</Layout>
		</>
	);
}

// export const getStaticProps = async () => {
// 	const allPosts = getAllPosts([
// 		'title',
// 		'date',
// 		'slug',
// 		'author',
// 		'coverImage',
// 		'excerpt',
// 	]);

// 	return {
// 		props: { allPosts },
// 	};
// };
