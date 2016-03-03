export default function getPageId() {
	
	const title = document.querySelector('title').textContent
	const titleWithoutGlobe = title.split('- The Boston Globe')[0].trim()
	const alpha = titleWithoutGlobe.replace(/\W+/g, '-')
	return `apps.${alpha}`.toLowerCase().slice(0, 20)
	
}
