import markdownStyles from './markdown-styles.module.css';

type Props = {
	body: string;
};

const PostBody = ({ body }: Props) => {
	return (
		<div className="max-w-2xl mx-auto">
			<div
				className={markdownStyles['markdown']}
				dangerouslySetInnerHTML={{ __html: body }}
			/>
		</div>
	);
};

export default PostBody;
