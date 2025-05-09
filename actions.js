export const actions = {
    "style": (creation) => {
        const style = creation.data;
        const styleElement = document.getElementById("user-style");
        if (styleElement) {
            styleElement.innerHTML = style;
        }
        // Update page URL
        const url = new URL(window.location.href);
        url.searchParams.set("style", creation.id);
        window.history.replaceState({}, "", url);

        // Update links
        const links = document.querySelectorAll("a");
        links.forEach(link => {
            const href = link.getAttribute("href");
            if (href && !href.startsWith("http")) {
                const baseUrl = window.location.origin;
                const fullUrl = new URL(href, baseUrl);
                fullUrl.searchParams.delete("style");
                fullUrl.searchParams.set("style", creation.id);
                const relativeUrl = fullUrl.pathname + fullUrl.search;
                link.setAttribute("href", relativeUrl);
            }
        });
    }
}