function cycleTitle() {
	var $pref = document.getElementById('cycle-prefix'),
		$text = document.getElementById('cycle-text'),
		index = 0,
		titles = [
			'a coder.',
			'a musician.',
			'a learner.',
			'a game dev.',
			'an artist.',
			'a creator.',
			'a designer.',
		];

	cycle(0);

	function cycle() {
		var str = titles[index],
			pref = str.substring(0, str.indexOf(' ')),
			text = str.substring(str.indexOf(' '));
		$pref.innerHTML = pref;
		$text.innerHTML = text;
		index = (index + 1) % titles.length;
		setTimeout(cycle, 500);
	}
}

$(document).ready(function () {
	analytics();
	cycleTitle();

	$.scrollIt({
		upKey: 33,
		downKey: 34,
		scrollTime: 500,
		topOffset: -50
	});
});

function analytics() {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})

	(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-54888428-1', 'auto');
	ga('send', 'pageview');
}
