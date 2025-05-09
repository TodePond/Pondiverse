import { fetchPondiverseCreation } from "./pondiverse.js";

export async function loadParams() {
    const params = new URLSearchParams(window.location.search);
    const style = params.get("style");
    if (style) {
        const styleElement = document.getElementById("user-style");
        if (styleElement) {
            const creation = await fetchPondiverseCreation(style);
            if (creation) {
                styleElement.innerHTML = creation.data;
            } else {
                console.error("Failed to fetch creation data");
            }
        }
    }

    // Add params to links
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("http") && !href.includes("?")) {
            const styleParam = style ? `?style=${encodeURIComponent(style)}` : "";
            link.setAttribute("href", `${href}${styleParam}`);
        } else if (href && !href.startsWith("http") && href.includes("?")) {
            const styleParam = style ? `&style=${encodeURIComponent(style)}` : "";
            link.setAttribute("href", `${href}${styleParam}`);
        }
    });
}