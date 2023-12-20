import weather from '../../src/templates/weather.html';
import brightness from '../../src/templates/brightness.html';
import wifi from '../../src/templates/wifi.html';
import time from '../../src/templates/time.html';
import theme from '../../src/templates/theme.html';
import debug from '../../src/templates/debug.html';

// const routes = {
//     "/": { title: "Home", render: home },
//     "/weather": { title: "Weather", render: weather },
//     "/brightness": { title: "Brightness", render: brightness },
//     "/wifi": { title: "WiFi", render: wifi },
//     "/theme": { title: "Theme", render: theme },
//     "/time": { title: "Time", render: time },
//     "/debug": { title: "Debug", render: debug },
// };

const urlRoutes = {
	404: {
		template: "/templates/404.html",
		title: "404",
	},
	// "/": {npm 
	// 	template: "index.html",
	// 	title: "Home ",
	// },
	"/weather": {
		// template: weather,
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
async function router() {
    let view = urlRoutes[location.pathname];

    if (view) {
        document.title = view.title;
        // const html = await fetch(view.template).then((response) => response.text());
        const html = view.template;
        app.innerHTML = html;
    } 
    // else {
    //     history.replaceState("", "", "/");
    //     router();
    // }
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        if(e.target.localName === 'span'){
            history.pushState("", "", e.target.parentElement.href);
        }
        else{
            history.pushState("", "", e.target.href);
        }
        router();
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);