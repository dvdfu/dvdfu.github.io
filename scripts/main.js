$(document).ready(function () {
	analytics();
	cycleTitle();

	$.getJSON('/data/projects.json', function (data) {
		var $projectError = document.getElementById('project-error');
		if ($projectError) $projectError.style.display = 'none';
		addProjects(data.projects);
	});

	$.scrollIt({
		upKey: 37,
		downKey: 39,
		scrollTime: 250,
		topOffset: -50,
	});
});

function addProjects(projects) {
	var $projectList = document.getElementById('project-list');
	projects.forEach(addProject);

	function addProject(project) {
		var $project = document.createElement('li');
		$project.className = 'project';

		// title (+link)
		var $titleContainer = document.createElement('div'),
			$title = document.createElement('h2');
		$titleContainer.className = 'project-title-container';
		$title.className = 'project-title';
		$titleContainer.appendChild($title);
		if (project.url) {
			$title.innerHTML = '<a href="'+project.url+'">'+project.name+'</a>';
		} else {
			$title.innerHTML = project.name;
		}
		$project.appendChild($titleContainer);

		// image
		if (project.img) {
			var $imageContainer = document.createElement('div'),
				$image = document.createElement('img');
			$imageContainer.className = 'project-image-container';
			$image.className = 'project-image';
			$image.src = '/images/projects/'+project.img;
			$imageContainer.appendChild($image);
			var self = $imageContainer;
			$imageContainer.onclick = function () {
				if (self.classList.contains('opened')) {
					self.classList.remove('opened');
				} else {
					self.classList.add('opened');
				}
			}
			$project.appendChild($imageContainer);
		}

		// description (+tools) (+github)
		var $descContainer = document.createElement('div'),
			$desc = document.createElement('p');
		$descContainer.className = 'project-desc-container';
		$desc.className = 'project-desc';
		$desc.innerHTML = project.desc;
		var extra = '';
		if (project.tools && project.tools.length > 0) {
			var listed = false;
			extra += ' Made with <strong>';
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
}

function cycleTitle() {
	var $pref = document.getElementById('cycle-prefix'),
		$text = document.getElementById('cycle-text'),
		index = 0,
		titles = [
			'a coder.',
			'a musician.',
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
		setTimeout(cycle, 1000);
	}
}

function analytics() {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})
	(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-54888428-1', 'auto');
	ga('send', 'pageview');
}
