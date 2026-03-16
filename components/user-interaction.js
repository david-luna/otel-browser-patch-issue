const template = `
    <h2>Home Component</h2>
    <p>
        This is the User Interaction component.
    </p>
    <button>Click me!</button>
`;

/**
 * @param {HTMLElement} target
 */
export function Component(target) {
    target.innerHTML = template;
}
