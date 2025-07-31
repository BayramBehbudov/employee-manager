import { motion } from 'framer-motion'

export function LoadingState() {
	return (
		<motion.div
			className='flex flex-col justify-center items-center p-8 min-h-svh'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}>
			<div className='relative'>
				<div className='flex justify-center items-center space-x-3 mb-8'>
					{Array.from({ length: 3 }).map((_, index) => (
						<motion.div
							key={index}
							className='relative flex flex-col items-center'
							animate={{
								y: [0, -10, 0],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								delay: index * 0.2,
							}}>
							<div className='bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-full w-8 h-8' />
							<div className='-bottom-1 left-1/2 absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-6 h-2 -translate-x-1/2 transform' />
						</motion.div>
					))}
				</div>

				<motion.div
					className='text-center'
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity }}>
					<h3 className='mb-2 font-semibold text-surface-900 dark:text-surface-0 text-xl'>Loading Workers</h3>
					<p className='mb-6 text-surface-600 dark:text-surface-400'>Preparing team data</p>
				</motion.div>

				<div className='bg-surface-200 dark:bg-surface-700 rounded-full w-64 h-2 overflow-hidden'>
					<motion.div
						className='bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-full'
						animate={{
							width: ['0%', '100%'],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</div>

				<div className='flex justify-center space-x-1 mt-4'>
					{Array.from({ length: 3 }).map((_, index) => (
						<motion.div
							key={index}
							className='bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-2 h-2'
							animate={{
								scale: [1, 1.5, 1],
								opacity: [0.5, 1, 0.5],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								delay: index * 0.2,
							}}
						/>
					))}
				</div>
			</div>
		</motion.div>
	)
}
