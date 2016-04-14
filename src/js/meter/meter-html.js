function html(pageId) {
	
	return `

<div class='paywall benton-bold'>
	<div class='paywall--content'>
		<div class='paywall--content-inner'>
			<a class='paywall--logo' href='http://bostonglobe.com' alt='The Boston Globe'>
				*inject-svg*
			</a>
			<p class='paywall--cta'>You have reached your free article limit. Subscribe now for unlimited access to BostonGlobe.com.</p>
			<a class='btn btn--secondary btn--sub' href='http://subscribe.bostonglobe.com/B4685/?p1=BG_${pageId}'>Get unlimited access</a>
			<p class='paywall--cta'>Already a subscriber? <a class='paywall--login' href='http://www.bostonglobe.com/login'>Sign in</a></p>
		</div>
	</div>
</div>

	`.trim()	

} 

export default html