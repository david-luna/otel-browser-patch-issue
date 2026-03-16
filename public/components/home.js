const template = `
    <h2>Home Component</h2>
    <p>
        This is the Home component.
    </p>
`;

/**
 * @param {HTMLElement} target
 */
export function Component(target) {
    target.innerHTML = template;
}
