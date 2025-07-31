import { motion } from 'framer-motion'

export function ErrorState({ error }: { error: Error }) {
	return (
		<motion.div
			className='flex flex-col justify-center items-center p-8 min-h-[400px]'
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}>
			<div className='relative max-w-md text-center'>
				<motion.div
					className='flex justify-center items-center bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-6 rounded-full w-20 h-20'
					animate={{
						rotate: [0, 5, -5, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: 'easeInOut',
					}}>
					<svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
						/>
					</svg>
				</motion.div>

				<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
					<h3 className='mb-3 font-bold text-surface-900 dark:text-surface-0 text-2xl'>Oops! Something went wrong</h3>
					<p className='mb-6 text-surface-600 dark:text-surface-400'>
						{error.message || 'Failed to load workers data. Please try again later.'}
					</p>

					<motion.button
						className='bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:shadow-xl px-6 py-3 rounded-lg font-medium text-white transition-all duration-300'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => window.location.reload()}>
						Try Again
					</motion.button>
				</motion.div>
			</div>
		</motion.div>
	)
}
