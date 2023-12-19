
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
		template: "src/WebInterface/templates/404.html",
		title: "404",
	},
	// "/": {
	// 	template: "src/WebInterface/index.html",
	// 	title: "Home ",
	// },
	"/weather": {
		template: "src/WebInterface/templates/weather.html",
		title: "Weather Settings",
	},
	"/brightness": {
		template: "src/WebInterface/templates/brightness.html",
		title: "Brightness",
	},
	"/wifi": {
		template: "src/WebInterface/templates/wifi.html",
		title: "WiFi Manager",
	},
	"/theme": {
		template: "src/WebInterface/templates/theme.html",
		title: "Theme",
	},
	"/time": {
		template: "src/WebInterface/templates/time.html",
		title: "Time",
	},
	"/debug": {
		template: "src/WebInterface/templates/debug.html",
		title: "Debug",
	},
};
async function router() {
    let view = urlRoutes[location.pathname];

    if (view) {
        document.title = view.title;

        const html = await fetch(view.template).then((response) => response.text());
        app.innerHTML = html;
    } 
    else {
        history.replaceState("", "", "/");
        router();
    }
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
        console.log(e.target.href);
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);