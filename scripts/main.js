// elements
var $filterList = document.getElementById('filter-list')
	$projectError = document.getElementById('project-error'),
	$projectList = document.getElementById('project-list'),
	$factError = document.getElementById('fact-error'),
	$factList = document.getElementById('fact-list'),
	$cyclePref = document.getElementById('cycle-prefix'),
	$cycleText = document.getElementById('cycle-text'),
	$overlay = document.getElementById('overlay'),
	$overlayContainer = document.getElementById('overlay-container');

// globals
var projectWidth = 320,
	factWidth = 220,
	filter = 'all'

// on ready
$(document).ready(function () {
	analytics();
	cycleTitle();
	$overlay.onclick = hideImage;

	for (var i = 0, len = $filterList.children.length; i < len; i++) {
		enableFilter(i);
	}

	function enableFilter(i) {
		var $filter = $filterList.children[i];
		$filter.onclick = function() {
			if ($filter.getAttribute('data-filter') === filter) return;
			filter = $filter.getAttribute('data-filter');
			filterProjects();
		}
	}

	$.getJSON('/data/data.json', function (data) {
		if ($projectError) {
			$projectError.style.display = 'none';
		}
		if ($factError) {
			$factError.style.display = 'none';
		}
		addFacts(data.facts, function() {
			addProjects(data.projects, scrolling);
		});
	});

	function hideImage() {
		$overlay.className = 'hidden';
	}
});

function fitItems() {
	$projectList.style.width = Math.floor($(window).width() / projectWidth) * projectWidth + 'px';
	for (var i = factWidth, maxWidth = $(window).width(); i < maxWidth && i <= factWidth * 4; i *= 2) {
		$factList.style.width = i + 'px';
	}
}

// nav scrolling
function scrolling() {
	fitItems();
	var activeSection = -1;
	getTop.cache = {};
	scroll();
	window.onscroll = scroll;
	window.addEventListener('resize', function() {
		fitItems();
		getTop.cache = {};
	});

	$('[data-scroll-nav]').click(function () {
		var index = $(this).attr('data-scroll-nav');
		// window.scrollTo(0, getTop(index));
		$('html, body').animate({
			scrollTop: getTop(index),
		}, 250);
	});

	function scroll() {
		var windowY = window.pageYOffset,
			newSection = activeSection;
		[0,1,2].forEach(function (index) {
			if (windowY >= getTop(index)) {
				newSection = index;
			}
		})
		if (newSection !== activeSection) {
			changeSection(newSection);
		}
	}

	function getTop(index) {
		if (getTop.cache[index]) return getTop.cache[index];
		var $element = $('[data-scroll-index='+index+']');
		getTop.cache[index] = $element.offset().top - 50;
		return getTop.cache[index];
	}

	function changeSection(section) {
		activeSection = section;
		$('[data-scroll-nav]').removeClass('active');
		$('[data-scroll-nav=' + section + ']').addClass('active');
	}
}

// loat facts
function addFacts(facts, callback) {
	facts.forEach(addFact);
	callback()

	function addFact(fact) {
		var $fact = document.createElement('li'),
			$circle = document.createElement('div'),
			$title = document.createElement('h2'),
			$desc = document.createElement('p');
		$fact.className = 'fact';
		$factList.appendChild($fact);

		$circle.className = 'fact-circle';
		$circle.innerHTML = '<i class="fact-icon fa fa-4x '+fact.icon+'"></i>';
		$fact.appendChild($circle);

		$title.innerHTML = fact.name;
		$fact.appendChild($title);

		$desc.innerHTML = fact.desc;
		$fact.appendChild($desc);
	}
}

// load projects
function addProjects(projects, callback) {
	projects.forEach(addProject);
	callback();

	function addProject(project) {
		if (project.hide) return;
		var $project = document.createElement('li');
		$project.className = 'project';
		$project.setAttribute('data-project-type', project.type);

		// title (+link)
		var $titleContainer = document.createElement('div'),
			$title = document.createElement('h2'),
			$date = document.createElement('p');
		$titleContainer.className = 'project-title';
		$titleContainer.appendChild($title);
		$titleContainer.appendChild($date);
		if (project.url) {
			$title.innerHTML = '<a href="'+project.url+'">'+project.name+'</a>';
		} else {
			$title.innerHTML = project.name;
		}
		if (project.date) {
			$date.innerHTML = project.date;
		}
		$project.appendChild($titleContainer);

		// image
		if (project.img) {
			var $imageContainer = document.createElement('div'),
				$image = document.createElement('img');
			$imageContainer.className = 'project-image';
			$image.src = '/images/'+project.type+'/'+project.img;
			$imageContainer.appendChild($image);
			$project.appendChild($imageContainer);

			// image modal on click
			var self = $imageContainer;
			$imageContainer.onclick = function() {
				viewImage($image.src, project.desc);
			};
		}

		// description (+tools) (+github)
		var $descContainer = document.createElement('div'),
			$desc = document.createElement('p');
		$descContainer.className = 'project-desc';
		$desc.innerHTML = project.desc;
		var extra = '';
		if (project.team) {
			extra += ' Team of ' + project.team + '.';
		}
		if (project.tools && project.tools.length > 0) {
			var listed = false;
			extra += ' <strong>';
			project.tools.forEach(function (tool) {
				if (listed) extra += ', ';
				extra += tool;
				listed = true;
			});
			extra += '.</strong>';
		}
		if (project.source) {
			extra += '&nbsp;<a href="'+project.source+'"><i class="fa fa-github-square"></i></a>';
		}
		$desc.innerHTML += extra;
		$descContainer.appendChild($desc);
		$project.appendChild($descContainer);
		$projectList.appendChild($project);
	}

	function viewImage(image, description) {
		var $image = document.createElement('img'),
			$desc = document.createElement('p');
		$image.src = image;
		$overlayContainer.innerHTML = '';
		$overlayContainer.appendChild($image);
		if (description) {
			$desc.innerHTML = description;
			$overlayContainer.appendChild($desc);
		}
		$overlay.className = 'visible';
	}
}

function filterProjects() {
	for (var i = 0, len = $filterList.children.length; i < len; i++) {
		var $filter = $filterList.children[i];
		$filter.classList.remove('active');
		if ($filter.getAttribute('data-filter') === filter) {
			$filter.classList.add('active');
		}
	}

	for (var i = 0, len = $projectList.children.length; i < len; i++) {
		var $project = $projectList.children[i];

		if (filter === 'all') {
			$project.classList.remove('hide');
		} else if (filter === $project.getAttribute('data-project-type')) {
			$project.classList.remove('hide');
		} else {
			$project.classList.add('hide');
		}
	}
}

// title cycling
function cycleTitle() {
	var index = 0,
		titles = [
			'a coder.',
			'a musician.',
			'a game dev.',
			'an artist.',
			'a creator.',
			'a designer.',
			'a smasher.',
			'a blogger.',
		];
	cycle(0);

	function cycle() {
		var str = titles[index],
			pref = str.substring(0, str.indexOf(' ')),
			text = str.substring(str.indexOf(' '));
		$cyclePref.innerHTML = pref;
		$cycleText.innerHTML = text;
		index = (index + 1) % titles.length;
		setTimeout(cycle, 1000);
	}
}

// google analytics
function analytics() {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})
	(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-54888428-1', 'auto');
	ga('send', 'pageview');
}
