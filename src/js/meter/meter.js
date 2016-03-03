import loadJS from '../utils/loadJS.js'

export default function meter(cb) {
	window.methode = {}

	loadJS('https://www.bostonglobe.com/js/metercheck.js', function() {
		const hasPaywall = meta.paywall
		const registrationWallVal = hasPaywall ? 'non-exempt' : 'exempt'

		window.bglobe.freeviewMeter.init({
			pageId: meta.pageId,
			registrationWall: registrationWallVal,
			webType: 'app',
			sectionPath: 'apps',
			debug: false
		})

		cb()

	});
}
