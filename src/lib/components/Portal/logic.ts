export function attachToBody(node: HTMLElement) {
  const body = document.body;

  function attach() {
    body.appendChild(node);
  }

  function detach() {
    if (node.parentNode === body) {
      body.removeChild(node);
    }
  }

  return {
    destroy: detach
  };
}