import loadJS from '../utils/loadJS.js'
import getPageId from '../utils/getPageId'
import getMetaContent from '../utils/getMetaContent'
import disableScroll from '../utils/disableScroll'
import isMobile from '../utils/isMobile'
import toggleClass from '../utils/toggleClass'
import insertStyle from '../utils/insertStyle'
import html from './paywall-html'

const meter = {
	load: cb => {
		window.methode = {}

		loadJS('//www.bostonglobe.com/js/metercheck.js', () => {
			const hasPaywall = getMetaContent('paywall')
			const registrationWallVal = hasPaywall ? 'non-exempt' : 'exempt'

			window.bglobe.freeviewMeter.init({
				pageId: getPageId(),
				registrationWall: registrationWallVal,
				webType: 'app',
				sectionPath: 'apps',
				debug: false,
			})

			cb()
		})
	},

	showPaywall: () => {
		disableScroll()

		// insert css
		insertStyle(`*inject-css*`)

		const tempDiv1 = document.createElement('div')
		tempDiv1.innerHTML = html(getPageId())
		const el = tempDiv1.firstChild

		if (isMobile.any()) {

			el.style.backgroundSize = 'cover'
			el.style.background = 'url("//apps.bostonglobe.com/common/paywall/press.jpg")'

		} else {

			const filepath = '//apps.bostonglobe.com/common/paywall/press'

			const videoHTML = `
				<video loop muted autoplay poster='${filepath}.jpg' class='fullscreen-bg__video'>
					<source src='${filepath}.mp4' type='video/mp4'>
				</video>
			`.trim()

			const tempDiv2 = document.createElement('div')
			toggleClass.add(tempDiv2, 'fullscreen-bg')
			tempDiv2.innerHTML = videoHTML
			
			el.insertBefore(tempDiv2, el.firstChild)

		}

		document.body.appendChild(el)
	}
}

export default meter
