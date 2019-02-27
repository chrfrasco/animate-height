interface Constructor<T> {
  new (): T;
  prototype: T;
}

function qs<T extends Element>(
  selector: string,
  expectedConstructor: Constructor<T>
): T {
  const element = document.querySelector(selector);
  if (element == null) {
    throw new Error(
      `could not find element matching selector ${selector}`
    );
  }

  if (element instanceof expectedConstructor) {
    return element;
  }

  throw new Error(
    `expected element of type ${expectedConstructor.name}; instead got ` +
      Object.getPrototypeOf(element).constructor.name
  );
}

function randInt(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

const container$ = qs(".container", HTMLDivElement);
const child$ = qs(".child", HTMLDivElement);

let { height: prevHeight } = container$.getBoundingClientRect();

function render() {
  const nextHeight = randInt(320, 800);

  container$.style.setProperty("transition", "none");
  child$.style.setProperty("transition", "none");

  container$.style.setProperty("height", `${nextHeight}px`);

  const ratio = prevHeight / nextHeight;

  container$.style.setProperty("transform", `scaleY(${ratio})`);
  child$.style.setProperty("transform", `scaleY(${1 / ratio})`);

  setTimeout(() => {
    container$.style.setProperty(
      "transition",
      "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
    );
    child$.style.setProperty(
      "transition",
      "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
    );

    container$.style.setProperty("transform", "scaleY(1)");
    child$.style.setProperty("transform", "scaleY(1)");

    container$.addEventListener("transitionend", () => {
      container$.style.setProperty("transition", "none");
      child$.style.setProperty("transition", "none");
    });
  }, 0);

  prevHeight = nextHeight;
}

document.querySelector("#step").addEventListener("click", render);
