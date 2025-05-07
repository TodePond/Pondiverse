import { tools } from "/tools.js";
import { stores } from "/stores.js";
import { fetchPondiverseCreations } from "/pondiverse.js";

const TOOLS_COUNT_LS_KEY = "pondiverseHomepageToolsCount";
const STORE_COUNT_LS_KEY = "pondiverseHomepageStoreCount";
const CREATIONS_COUNT_LS_KEY = "pondiverseHomepageCreationsCount";
const UNIQUE_TYPES_COUNT_LS_KEY = "pondiverseHomepageUniqueTypesCount";

const toolsCountElement = document.getElementById("tools-count");
const storeCountElement = document.getElementById("store-count");
const creationsCountElement = document.getElementById("creations-count");
const uniqueTypesCountElement = document.getElementById("unique-types-count");

function loadCachedCounts() {
    if (toolsCountElement) {
        const cachedTools = localStorage.getItem(TOOLS_COUNT_LS_KEY);
        if (cachedTools) toolsCountElement.textContent = cachedTools;
    }

    if (storeCountElement) {
        const cachedStores = localStorage.getItem(STORE_COUNT_LS_KEY);
        if (cachedStores)
            storeCountElement.textContent = cachedStores;
    }

    if (creationsCountElement) {
        const cachedCreations = localStorage.getItem(CREATIONS_COUNT_LS_KEY);
        if (cachedCreations)
            creationsCountElement.textContent = cachedCreations;
    }

    if (uniqueTypesCountElement) {
        const cachedUniqueTypes = localStorage.getItem(
            UNIQUE_TYPES_COUNT_LS_KEY
        );
        if (cachedUniqueTypes)
            uniqueTypesCountElement.textContent = cachedUniqueTypes;
    }
}

async function updateLiveCounts() {
    if (tools && toolsCountElement) {
        const creatableTools = tools.filter(tool => {
            return !(tool.urls && tool.urls.create === null);
        });
        const liveToolsCount = creatableTools.length;
        toolsCountElement.textContent = liveToolsCount;
        try {
            localStorage.setItem(TOOLS_COUNT_LS_KEY, liveToolsCount.toString());
        } catch (e) {
            console.warn("Could not save tools count to localStorage:", e);
        }
    } else if (toolsCountElement && !localStorage.getItem(TOOLS_COUNT_LS_KEY)) {
        toolsCountElement.textContent = "Error";
    }

    if (stores && storeCountElement) {
        const liveStoreCount = stores.length;
        storeCountElement.textContent = liveStoreCount;
        try {
            localStorage.setItem(
                STORE_COUNT_LS_KEY,
                liveStoreCount.toString()
            );
        } catch (e) {
            console.warn("not saved to ls:", e);
        }
    } else if (
        storeCountElement &&
        !localStorage.getItem(STORE_COUNT_LS_KEY)
    ) {
        storeCountElement.textContent = "error";
    }

    if (
        creationsCountElement &&
        creationsCountElement.textContent.includes("...")
    ) {
        creationsCountElement.textContent = "Calculating...";
    }
    if (
        uniqueTypesCountElement &&
        uniqueTypesCountElement.textContent.includes("...")
    ) {
        uniqueTypesCountElement.textContent = "Calculating...";
    }

    let allFetchedCreations = [];
    let totalLiveCreations = 0;
    let fetchErrors = 0;

    if (stores) {
        const creationPromises = stores.map(async (store) => {
            try {
                const creations = await fetchPondiverseCreations({ store });
                allFetchedCreations.push(...creations);
                return creations.length;
            } catch (e) {
                console.error(
                    `Error fetching creations from ${store.name} for live update:`,
                    e
                );
                fetchErrors++;
                return 0;
            }
        });

        try {
            const countsPerStore = await Promise.all(creationPromises);
            totalLiveCreations = countsPerStore.reduce(
                (sum, count) => sum + count,
                0
            );

            if (creationsCountElement) {
                if (fetchErrors === stores.length && stores.length > 0) {
                    const cachedCreations = localStorage.getItem(
                        CREATIONS_COUNT_LS_KEY
                    );
                    creationsCountElement.textContent = cachedCreations
                        ? cachedCreations
                        : "error fetching all";
                } else {
                    let displayText = totalLiveCreations.toString();
                    if (fetchErrors > 0) displayText += ` (some errors)`;
                    creationsCountElement.textContent = displayText;
                    try {
                        localStorage.setItem(
                            CREATIONS_COUNT_LS_KEY,
                            totalLiveCreations.toString()
                        );
                    } catch (e) {
                        console.warn("not saved to ls:", e);
                    }
                }
            }

            if (uniqueTypesCountElement) {
                if (fetchErrors < stores.length || totalLiveCreations > 0) {
                    const uniqueTypes = new Set();
                    allFetchedCreations.forEach((creation) => {
                        if (creation.type) {
                            uniqueTypes.add(creation.type);
                        }
                    });
                    const liveUniqueTypesCount = uniqueTypes.size;
                    uniqueTypesCountElement.textContent = liveUniqueTypesCount;
                    try {
                        localStorage.setItem(
                            UNIQUE_TYPES_COUNT_LS_KEY,
                            liveUniqueTypesCount.toString()
                        );
                    } catch (e) {
                        console.warn("couldn't save to ls:", e);
                    }
                } else {
                    const cachedUniqueTypes = localStorage.getItem(
                        UNIQUE_TYPES_COUNT_LS_KEY
                    );
                    uniqueTypesCountElement.textContent = cachedUniqueTypes
                        ? cachedUniqueTypes
                        : fetchErrors > 0
                        ? "error"
                        : "0";
                }
            }
        } catch (error) {
            console.error("error processing live creation/type counts:", error);
            if (creationsCountElement) {
                const cachedCreations = localStorage.getItem(
                    CREATIONS_COUNT_LS_KEY
                );
                creationsCountElement.textContent = cachedCreations
                    ? cachedCreations
                    : "error";
            }
            if (uniqueTypesCountElement) {
                const cachedUniqueTypes = localStorage.getItem(
                    UNIQUE_TYPES_COUNT_LS_KEY
                );
                uniqueTypesCountElement.textContent = cachedUniqueTypes
                    ? cachedUniqueTypes
                    : "error";
            }
        }
    } else if (creationsCountElement || uniqueTypesCountElement) {
        if (
            creationsCountElement &&
            !localStorage.getItem(CREATIONS_COUNT_LS_KEY)
        )
            creationsCountElement.textContent = "error";
        if (
            uniqueTypesCountElement &&
            !localStorage.getItem(UNIQUE_TYPES_COUNT_LS_KEY)
        )
            uniqueTypesCountElement.textContent = "error";
        console.error(
            "stores data not found for live update and no cache available!"
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCachedCounts();
    updateLiveCounts();
});