import 'promis'
import omniture from './analytics/omniture'
import chartbeat from './analytics/chartbeat'
import meter from './meter/meter'
import socialConnect from './socialConnect/socialConnect'
import paywall from './paywall/paywall'
import toggleClass from './utils/toggleClass'
import getMetaContent from './utils/getMetaContent'

const loaded = { omniture: false, meter: false, 'socialConnect': false }

function triggerPaywall() {

	if (getMetaContent('paywall') === 'true' && window.methode.freeviewCount > 5) paywall()

}

function handleLoaded(result) {
	console.log(result)
	// loaded[name] = true
		
	// if(loaded.omniture && loaded.meter && loaded.socialConnect) {

	// 	// check if we need to show paywall
	// 	triggerPaywall()

	// 	// start tracking all the things
	// 	omniture.setupTracking(getMetaContent('paywall') === 'true' && methode.freeviewCount > 5)
		
	// 	// check if we need to show social signon
	// 	socialConnect.setup()

	// }
}

function handleError(error) {
	console.error(error)
}

function init() {

	if (window.location.hostname.indexOf('localhost')) {
		// list of which libs to load
		const defaultLibs = ['chartbeat', 'omniture']
		const optionalLibs = ['meter', 'paywall', 'socialConnect']

		// add other libs to load conditionally
		const libs = optional.reduce((previous, lib) => {
			const add = getMetaContent(lib)
			if (add) previous.push(lib)
			return previous
		}, libsToLoad)

		// setup promises to load all libs then setup
		const promises = libs.map(lib => {
			return new Promise((resolve, reject) =>
			  	lib.load(err => {
			  		if (err) reject(err)
			  		else resolve(lib.name)
			  	})
			)
		})

		promise.All(promises)
			.then(handleLoaded)
			.catch(handleError)
		// // load chartbeat lib
		

		// // load omniture lib
		// omniture.load(() => checkLoaded('omniture'))

		// // load meter lib
		// meter(() => checkLoaded('meter'))

		// // load fb lib
		// socialConnect.load(() => checkLoaded('socialConnect'));
	}

}

init()
