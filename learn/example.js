//  
//  pondiverse | example.js
//

const PONDIVERSE_INSTANCE_URL = "https://pondiverse.val.run";
const appName = "example.js"  // change name of app

const pondiverseControlsContainer = document.getElementById(
    "pondiverse-controls"
);

function addPondiverseButton() {
    // ensure container exists
    if (!pondiverseControlsContainer) {
        console.error(
            "Pondiverse controls container (#pondiverse-controls) not found in HTML."
        );
        return;
    }

    pondiverseButton = document.createElement("button");
    pondiverseButton.className = "pondiverse-button"; // make sure this class exists in CSS
    pondiverseButton.textContent = "✶ Share"; // the visible text for the button

    pondiverseControlsContainer.prepend(pondiverseButton); // FIX THIS

    // --- create and append pondiverse dialog (only once) ---
    // EDIT THIS HTML IF YOU WANT TO CHANGE ANYTHING!!!
    let dialog = document.getElementById("pondiverse-dialog");
    if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.id = "pondiverse-dialog";
        dialog.innerHTML = `
        <form method="dialog"> <!-- Use method="dialog" for easier closing -->
          <p>Share your creation to the <a href="https://pondiverse.com" target="_blank" rel="noopener noreferrer">Pondiverse</a>?</p>
          <p><em>(Creations auto-delete after 25 hours)</em></p>
          <!-- <img id="preview-image" src="" alt="Preview" style="display: none;"> --> <!-- DO THIS IF YOU WANT A PREVIEW -->
          <label for="pondiverse-name">Title</label>
          <input type="text" id="pondiverse-name" name="name" required autocomplete="off" spellcheck="false" />
          <input type="hidden" name="data" value="" />
          <input type="hidden" name="type" value="" />
          <hgroup class="space">
              <button type="button" value="cancel" class="secondary cancel">Cancel</button>
              <button type="submit" value="default" class="submit">Publish</button>
          </hgroup>
        </form>
        `;
        document.body.append(dialog);

        // --- attach dialog listeners (only once when created) ---
        const form = dialog.querySelector("form");
        const previewImage = dialog.querySelector("#preview-image");
        const nameInput = dialog.querySelector("#pondiverse-name");
        const cancelButton = dialog.querySelector("button.cancel");

        if (previewImage) {
            previewImage.onerror = () => {
                previewImage.style.display = "none";
            };
            previewImage.onload = () => {
                previewImage.style.display = "block";
            };
        }
        if (nameInput)
            nameInput.addEventListener("keydown", (e) => {
                e.stopPropagation();
            }); // prevent closing on enter in input
        if (cancelButton)
            cancelButton.addEventListener("click", (e) => {
                e.stopPropagation();
                closePondiverseDialog();
            });

        // close on backdrop click
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                closePondiverseDialog();
            }
        });

        // handle form submission
        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault(); // manual submission handling

                const publishButton = form.querySelector("button.submit");
                const cancelButton = form.querySelector("button.cancel");
                const hiddenDataInput =
                    form.querySelector("input[name='data']");
                const hiddenTypeInput =
                    form.querySelector("input[name='type']");
                const nameInput = form.querySelector("#pondiverse-name");

                // Ensure elements exist before accessing properties
                if (
                    !publishButton ||
                    !cancelButton ||
                    !hiddenDataInput ||
                    !hiddenTypeInput ||
                    !nameInput
                ) {
                    console.error(
                        "Could not find all necessary elements within the Pondiverse dialog form."
                    );
                    alert("Dialog error. Cannot submit.");
                    return;
                }

                const request = {
                    title: nameInput.value,
                    data: hiddenDataInput.value,
                    type: hiddenTypeInput.value,
                    // image: , // put an image in a data:image format (base64) if your tool needs this
                };

                publishButton.disabled = true;
                publishButton.textContent = "Publishing...";
                publishButton.style.cursor = "not-allowed";
                cancelButton.disabled = true;

                try {
                    const response = await fetch(
                        new URL("/add-creation", PONDIVERSE_INSTANCE_URL),
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(request),
                        }
                      );

                    if (response.ok) {
                        closePondiverseDialog(); // close dialog on success
                    } else {
                        const errorText = await response.text();
                        console.error(
                            "Pondiverse upload failed:",
                            response.status,
                            errorText
                        );
                        alert(
                            `Upload failed (${
                                response.status
                            }): ${errorText.substring(0, 100)}...`
                        );
                        // re-enable buttons on failure
                        publishButton.disabled = false;
                        publishButton.textContent = "Publish";
                        publishButton.style.cursor = "pointer";
                        cancelButton.disabled = false;
                    }
                } catch (error) {
                    console.error("Error during Pondiverse fetch:", error);
                    alert(
                        `An error occurred while publishing. Check the console.\nError: ${error.message}`
                    );
                    // Re-enable buttons on fetch error
                    publishButton.disabled = false;
                    publishButton.textContent = "Publish";
                    publishButton.style.cursor = "pointer";
                    cancelButton.disabled = false;
                }
            });
        }
    } // end if (!dialog)

    // Attach click listener to the button itself
    if (pondiverseButton) {
        pondiverseButton.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!pondiverseButton.disabled) {
                openPondiverseDialog();
            }
        });
    }
}

function openPondiverseDialog() {
    const dialog = document.getElementById("pondiverse-dialog");
    if (!dialog) {
        console.error("Pondiverse dialog not found.");
        return;
    }

    if (typeof window.getPondiverseCreation !== "function") {
        console.error("window.getPondiverseCreation() is not defined.");
        alert("Error: Cannot get creation data.");
        return;
    }
    const creation = window.getPondiverseCreation();

    const nameInput = dialog.querySelector("#pondiverse-name");
    const hiddenDataInput = dialog.querySelector("input[name='data']");
    const hiddenTypeInput = dialog.querySelector("input[name='type']");
    const publishButton = dialog.querySelector("button.submit");
    const cancelButton = dialog.querySelector("button.cancel");

    // make sure elements exist before using them
    if (
        !nameInput ||
        !hiddenDataInput ||
        !hiddenTypeInput ||
        !publishButton ||
        !cancelButton
    ) {
        console.error(
            "Could not find all necessary elements within the Pondiverse dialog."
        );
        alert("Dialog error. Cannot open.");
        return;
    }

    hiddenDataInput.value = creation.data || "";
    hiddenTypeInput.value = creation.type || appName;
    nameInput.value = ""; // clear previous title
    publishButton.disabled = false;
    publishButton.textContent = "Publish";
    publishButton.style.cursor = "pointer";
    cancelButton.disabled = false;

    dialog.showModal();
    nameInput.focus();
}

function closePondiverseDialog() {
    const dialog = document.getElementById("pondiverse-dialog");
    if (dialog && dialog.open) {
        // check if it's actually open
        dialog.close();
        const publishButton = dialog.querySelector("button.submit");
        const cancelButton = dialog.querySelector("button.cancel");
        if (publishButton) {
            publishButton.disabled = false;
            publishButton.textContent = "Publish";
            publishButton.style.cursor = "pointer";
        }
        if (cancelButton) cancelButton.disabled = false;
    }
}

window.getPondiverseCreation = function () {
    return {
        type: appName,
        data: "",
        // image: "",
    };
};

document.addEventListener("DOMContentLoaded", () => {
    addPondiverseButton();
});