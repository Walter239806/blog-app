import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import PostTitle from './post-title';

type Props = {
	title: string;
	coverImage: string;
	createdAt: string;
	author: string;
};

const PostHeader = ({ title, coverImage, createdAt, author }: Props) => {
	return (
		<>
			<PostTitle>{title}</PostTitle>
			<div className="hidden md:block md:mb-12">
				<Avatar name={author} />
			</div>
			<div className="mb-8 md:mb-16 sm:mx-0">
				<CoverImage title={title} src={coverImage} />
			</div>
			<div className="max-w-2xl mx-auto">
				<div className="block md:hidden mb-6">
					<Avatar name={author} />
				</div>
				<div className="mb-6 text-lg">
					<DateFormatter dateString={createdAt} />
				</div>
			</div>
		</>
	);
};

export default PostHeader;
