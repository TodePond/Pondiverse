export const actions = {
    "style": (creation) => {
        const style = creation.data;
        const styleElement = document.getElementById("user-style");
        if (styleElement) {
            styleElement.innerHTML = style;
        }
    }
}