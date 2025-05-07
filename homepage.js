import { tools } from "/tools.js";
import { instances } from "/instances.js";
import { fetchPondiverseCreations } from "/pondiverse.js";

const toolsCountElement = document.getElementById("tools-count");
const creationsCountElement = document.getElementById("creations-count");

async function updateCounts() {
    if (tools && toolsCountElement) {
        toolsCountElement.textContent = tools.length;
    } else if (toolsCountElement) {
        toolsCountElement.textContent = "Error";
        console.error("Tools data not found or tools count element missing.");
    }

    if (instances && creationsCountElement) {
        creationsCountElement.textContent = "Calculating...";
        let totalCreations = 0;
        let fetchErrors = 0;

        const creationPromises = instances.map(async (instance) => {
            try {
                const creations = await fetchPondiverseCreations({ instance });
                return creations.length;
            } catch (e) {
                console.error(
                    `Error fetching creations from ${instance.name}:`,
                    e
                );
                fetchErrors++;
                return 0;
            }
        });

        try {
            const countsPerInstance = await Promise.all(creationPromises);
            totalCreations = countsPerInstance.reduce(
                (sum, count) => sum + count,
                0
            );

            if (fetchErrors > 0 && fetchErrors === instances.length) {
                creationsCountElement.textContent = "Error fetching all";
            } else if (fetchErrors > 0) {
                creationsCountElement.textContent = `${totalCreations} (some instances failed)`;
            } else {
                creationsCountElement.textContent = totalCreations;
            }
        } catch (error) {
            console.error("Error processing creation counts:", error);
            creationsCountElement.textContent = "Error";
        }
    } else if (creationsCountElement) {
        creationsCountElement.textContent = "Error";
        console.error(
            "Instances data not found or creations count element missing."
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCounts();
});
