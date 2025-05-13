import { fetchPondiverseCreation } from "./pondiverse.js";

export async function loadParams() {
    const params = new URLSearchParams(window.location.search);
    const styleParam = params.get("style");
    const styleList = styleParam ? styleParam.split(",") : [];
    if (styleList) {
        const styleElement = document.getElementById("user-style");
        for (const style of styleList) {
            const creation = await fetchPondiverseCreation(style);
            if (creation) {
                styleElement.innerHTML += creation.data;
            } else {
                console.error("Failed to fetch creation data");
            }
        }
    }

    // Add params to links
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("http") && !href.includes("?")) {
            const styleParam =
                styleList.length > 0
                    ? `?style=${encodeURIComponent(styleList.join(","))}`
                    : "";
            link.setAttribute("href", `${href}${styleParam}`);
        } else if (href && !href.startsWith("http") && href.includes("?")) {
            const styleParam =
                styleList.length > 0
                    ? `&style=${encodeURIComponent(styleList.join(","))}`
                    : "";
            link.setAttribute("href", `${href}${styleParam}`);
        }
    });
}
