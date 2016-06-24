import 'promis'

import omniture from './analytics/omniture'
import chartbeat from './analytics/chartbeat'
import meter from './meter/meter'
import socialConnect from './socialConnect/socialConnect'
import getMetaContent from './utils/getMetaContent'

function handleLoaded(libs) {
	let paywall = false
	
	if (libs.indexOf('meter') > -1) {
		paywall = !methode.subscribed && methode.showPaywall
	}

	// check if we need to trigger paywall
	if (paywall) meter.showPaywall()

	// start tracking all the things
	omniture.setupTracking(paywall)
	
	// check if we need to show social signon		
	if (libs.indexOf('socialConnect') > -1) socialConnect.setup()
}

function handleError(error) {
	console.error(error)
}

function getLibName(lib) {
	return Object.keys(lib)[0]
}

function init() {
	if (window.location.hostname.indexOf('localhost') === -1) {
		// list of which libs to load
		const defaultLibs = [{chartbeat}, {omniture}]
		const optionalLibs = [{meter}, {socialConnect}]

		// add other libs to load conditionally
		const libs = optionalLibs.reduce((previous, lib) => {
			const add = getMetaContent(getLibName(lib)).toLowerCase() === 'true'
			if (add) previous.push(lib)
			return previous
		}, defaultLibs)

		// setup promises to load all libs then setup
		const promises = libs.map(lib =>
			new Promise((resolve, reject) => {
				const name = getLibName(lib)
				lib[name].load(err => {
					if (err) reject(err)
					else resolve(name)
				})
			})
		)

		Promise.all(promises)
			.then(handleLoaded)
			.catch(handleError)
	}
}

init()
