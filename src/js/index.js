import weather from '../../src/templates/weather.html';
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
		template: "src/templates/brightness.html",
		title: "Brightness",
	},
	"/wifi": {
		template: "src/templates/wifi.html",
		title: "WiFi Manager",
	},
	"/theme": {
		template: "src/templates/theme.html",
		title: "Theme",
	},
	"/time": {
		template: "src/templates/time.html",
		title: "Time",
	},
	"/debug": {
		template: "src/templates/debug.html",
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