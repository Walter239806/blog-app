import Avatar from './avatar';
import React from 'react';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import Link from 'next/link';

type Props = {
	_id: string;
	title: string;
	coverImage: string;
	createdAt: string;
	excerpt: string;
	author: string;
	slug: string;
};

const HeroPost = ({
	_id,
	title,
	coverImage,
	createdAt,
	excerpt,
	author,
	slug,
}: Props) => {
	return (
		<section>
			<div className="mb-8 md:mb-16">
				{/* <CoverImage title={title} src={coverImage} _id={_id} /> */}
			</div>
			<div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
				<div>
					<h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
						<Link
							// as={`/posts/${_id}`}
							href={`/posts/${_id}`}
							className="hover:underline"
						>
							{title}
						</Link>
					</h3>
					<div className="mb-4 md:mb-0 text-lg">
						<DateFormatter dateString={createdAt} />
					</div>
				</div>
				<div>
					<p className="text-lg leading-relaxed mb-4">{excerpt}</p>
					<Avatar name={author} />
				</div>
			</div>
		</section>
	);
};

export default HeroPost;
