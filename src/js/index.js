import weather from '../../src/templates/weather.html';
import brightness from '../../src/templates/brightness.html';
import wifi from '../../src/templates/wifi.html';
import time from '../../src/templates/time.html';
import theme from '../../src/templates/theme.html';
import debug from '../../src/templates/debug.html';
import home from '../../src/templates/home.html';

const urlRoutes = {
	404: {
		template: "/templates/404.html",
		title: "404",
	},
	"/": {
		template: home,
		title: "Home",
	},
	"/weather": {
		template: weather,
		title: "Weather Settings",
	},
	"/brightness": {
		template: brightness,
		title: "Brightness",
	},
	"/wifi": {
		template: wifi,
		title: "WiFi Manager",
	},
	"/theme": {
		template: theme,
		title: "Theme",
	},
	"/time": {
		template: time,
		title: "Time",
	},
	"/debug": {
		template: debug,
		title: "Debug",
	},
};
function router() {
	let view = urlRoutes[location.pathname];

	if (view) {
		document.title = view.title;
		// const html = await fetch(view.template).then((response) => response.text());
		const html = view.template;
		app.innerHTML = html;
	}
	else {
		history.replaceState("", "", "/");
		router();
	}
};

// Handle navigation
document.querySelectorAll('[data-link]').forEach(function (elem) {
	elem.addEventListener("click", function (e) {
		e.preventDefault();
		if (e.target.href) {
			history.pushState("", "", e.target.href);

		}
		else {
			history.pushState("", "", e.target.offsetParent.href);

		}
		router();
	});
});


// Update router
window.addEventListener("popstate", e => {
	// e.preventDefault();
	console.log("Popstate trigger");
	router();
});
window.addEventListener("DOMContentLoaded", router);
// window.addEventListener("beforeunload", e => {
// 	e.preventDefault();
// 	router();
// }
// );

document.querySelector(".hamburger").addEventListener("click", function () {
	document.querySelector("body").classList.toggle("active");
})
router(window.location.pathname)