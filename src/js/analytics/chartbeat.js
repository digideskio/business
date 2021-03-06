import getMetaContent from '../utils/getMetaContent'

const chartbeat = {
	load: cb => {
		window._sf_startpt = (new Date()).getTime()
		window._sf_async_config = {uid:8544 ,domain:'bostonglobe.com'}
		window._sf_async_config.path = location.pathname

		// Section and Author tagging
		window._sf_async_config.sections = getMetaContent('section').toLowerCase()
		window._sf_async_config.authors = 'infographic'

		function loadChartbeat() {
			window._sf_endpt = (new Date()).getTime()
			const e = document.createElement('script')
			e.setAttribute('language', 'javascript')
			e.setAttribute('type', 'text/javascript')
			e.setAttribute('src', ((document.location.protocol === 'https:') ? 'https://s3.amazonaws.com/' : 'http://') + 'static.chartbeat.com/js/chartbeat.js')
			document.body.appendChild(e)
		}

		const oldonload = window.onload

		window.onload = (typeof window.onload !== 'function') ? loadChartbeat : function() {
			oldonload()
			loadChartbeat()
		}

		cb()
	}
}

export default chartbeat
