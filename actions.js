export const actions = {
    style: (creation) => {
        const style = creation.data;
        const styleElement = document.getElementById("user-style");
        if (styleElement) {
            styleElement.innerHTML += style;
        }
        const params = new URLSearchParams(window.location.search);
        const styleParam = params.get("style");
        let styleArray = styleParam ? styleParam.split(",") : [];
        styleArray = styleArray.map((x) => Number(x));
        if (styleArray.includes(creation.id)) {
            styleArray = styleArray.filter((x) => x !== creation.id);
        } else {
            styleArray.push(creation.id);
        }
        const styleList = styleArray.join(",");

        const url = new URL(window.location.href);
        url.searchParams.set("style", styleList);
        window.history.replaceState({}, "", url);

        // Update links
        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (href && !href.startsWith("http")) {
                const baseUrl = window.location.origin;
                const fullUrl = new URL(href, baseUrl);
                fullUrl.searchParams.delete("style");
                fullUrl.searchParams.set("style", styleList);
                const relativeUrl = fullUrl.pathname + fullUrl.search;
                link.setAttribute("href", relativeUrl);
            }
        });
    },
};
