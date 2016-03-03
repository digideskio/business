import omniture from './analytics/omniture'
import chartbeat from './analytics/chartbeat'
import meter from './meter/meter'
import socialConnect from './socialConnect/socialConnect'
import showPaywall from './paywall/paywall'
import toggleClass from './utils/toggleClass'
import getMetaContent from './utils/getMetaContent'

const loaded = { omniture: false, meter: false, 'socialConnect': false }

function triggerPaywall() {

	if (getMetaContent('paywall') === 'true' && window.methode.freeviewCount > 5) paywall()

}

function checkLoaded(name) {

	loaded[name] = true
		
	if(loaded.omniture && loaded.meter && loaded.socialConnect) {

		// check if we need to show paywall
		triggerPaywall()

		// start tracking all the things
		omniture.setupTracking(getMetaContent('paywall') === 'true' && methode.freeviewCount > 5)
		
		// check if we need to show social signon
		socialConnect.setup()

	}

}

function init() {

	if (window.location.hostname.indexOf('localhost') !== 0) {

		// tell chartbeat to do its thing
		chartbeat()

		// load omniture lib
		omniture.load(() => checkLoaded('omniture'))

		// load meter lib
		meter(() => checkLoaded('meter'))

		// load fb lib
		socialConnect.load(() => checkLoaded('socialConnect'));

	}

}

init()
