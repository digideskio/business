export default function getPageId() {
	
	const title = document.querySelector('title').textContent
	return `apps.${title}`.slice(0, 15)
	
}
