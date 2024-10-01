///<reference types="react-scripts" />

declare module '*.jpg'
declare module '*.svg'

declare module '*.module.scss' {
	const classes: { [key: string]: string }
	export default classes
}
