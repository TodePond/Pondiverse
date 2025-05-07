import { tools } from "/tools.js";
import { instances } from "/instances.js";
import { fetchPondiverseCreations } from "/pondiverse.js";

const TOOLS_COUNT_LS_KEY = "pondiverseHomepageToolsCount";
const CREATIONS_COUNT_LS_KEY = "pondiverseHomepageCreationsCount";

const toolsCountElement = document.getElementById("tools-count");
const creationsCountElement = document.getElementById("creations-count");

function loadCachedCounts() {
    if (toolsCountElement) {
        const cachedTools = localStorage.getItem(TOOLS_COUNT_LS_KEY);
        if (cachedTools) {
            toolsCountElement.textContent = cachedTools;
        }
    }

    if (creationsCountElement) {
        const cachedCreations = localStorage.getItem(CREATIONS_COUNT_LS_KEY);
        if (cachedCreations) {
            creationsCountElement.textContent = cachedCreations;
        }
    }
}

async function updateLiveCounts() {
    if (tools && toolsCountElement) {
        const liveToolsCount = tools.length;
        toolsCountElement.textContent = liveToolsCount;
        try {
            localStorage.setItem(TOOLS_COUNT_LS_KEY, liveToolsCount.toString());
        } catch (e) {
            console.warn("Could not save tools count to localStorage:", e);
        }
    } else if (toolsCountElement && !localStorage.getItem(TOOLS_COUNT_LS_KEY)) {
        toolsCountElement.textContent = "Error";
        console.error(
            "Tools data not found for live update and no cache available."
        );
    }

    if (instances && creationsCountElement) {
        const currentCreationsText = creationsCountElement.textContent;
        if (
            currentCreationsText.includes("...") ||
            !isNaN(parseInt(currentCreationsText))
        ) {
            creationsCountElement.textContent = "Calculating...";
        }

        let totalLiveCreations = 0;
        let fetchErrors = 0;

        const creationPromises = instances.map(async (instance) => {
            try {
                const creations = await fetchPondiverseCreations({ instance });
                return creations.length;
            } catch (e) {
                console.error(
                    `Error fetching creations from ${instance.name} for live update:`,
                    e
                );
                fetchErrors++;
                return 0;
            }
        });

        try {
            const countsPerInstance = await Promise.all(creationPromises);
            totalLiveCreations = countsPerInstance.reduce(
                (sum, count) => sum + count,
                0
            );

            if (fetchErrors === instances.length && instances.length > 0) {
                console.error(
                    "All instances failed to fetch creations for live update."
                );
                const cachedCreations = localStorage.getItem(
                    CREATIONS_COUNT_LS_KEY
                );
                if (cachedCreations) {
                    creationsCountElement.textContent = cachedCreations;
                } else {
                    creationsCountElement.textContent = "Error fetching all";
                }
            } else {
                let displayText = totalLiveCreations.toString();
                if (fetchErrors > 0) {
                    displayText += ` (some errors)`;
                }
                creationsCountElement.textContent = displayText;

                try {
                    localStorage.setItem(
                        CREATIONS_COUNT_LS_KEY,
                        totalLiveCreations.toString()
                    );
                } catch (e) {
                    console.warn(
                        "Could not save creations count to localStorage:",
                        e
                    );
                }
            }
        } catch (error) {
            console.error("Error processing live creation counts:", error);
            const cachedCreations = localStorage.getItem(
                CREATIONS_COUNT_LS_KEY
            );
            if (cachedCreations) {
                creationsCountElement.textContent = cachedCreations;
            } else {
                creationsCountElement.textContent = "Error";
            }
        }
    } else if (
        creationsCountElement &&
        !localStorage.getItem(CREATIONS_COUNT_LS_KEY)
    ) {
        creationsCountElement.textContent = "Error";
        console.error(
            "Instances data not found for live update and no cache available."
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCachedCounts();
    updateLiveCounts();
});
