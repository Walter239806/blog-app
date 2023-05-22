import Container from './container';
import cn from 'classnames';
import { EXAMPLE_PATH } from '../lib/constants';
import Link from 'next/link';

type Props = {
	preview?: boolean;
};

const Alert = () => {
	return (
		<div
			className={cn('border-b', {
				// 'bg-neutral-800 border-neutral-800 text-white': preview,
				// 'bg-neutral-50 border-neutral-200': !preview,
			})}
		>
			<Container>
				<div className="py-2 text-center text-sm">
					<>
						Admin?{' '}
						<Link
							href={'/login'}
							className="underline hover:text-blue-600 duration-200 transition-colors"
						>
							Login
						</Link>
						.
					</>
				</div>
			</Container>
		</div>
	);
};

export default Alert;
