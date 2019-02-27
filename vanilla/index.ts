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
    throw new Error(`could not find element matching selector ${selector}`);
  }

  if (element instanceof expectedConstructor) {
    return element;
  }

  throw new Error(
    `expected element of type ${expectedConstructor.name}; instead got ` +
      Object.getPrototypeOf(element).constructor.name
  );
}

function randInt(min: number, max: number) {
  return ~~(Math.random() * (max - min)) + min;
}

const container$ = qs(".container", HTMLDivElement);
const child$ = qs(".child", HTMLDivElement);

let { height: prevHeight } = container$.getBoundingClientRect();

function render() {
  const nextHeight = randInt(320, 800);

  cleanUpAnimations();

  container$.style.setProperty("height", `${nextHeight}px`);

  const ratio = prevHeight / nextHeight;

  container$.style.setProperty("transform", `scaleY(${ratio})`);
  child$.style.setProperty("transform", `scaleY(${1 / ratio})`);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      container$.classList.add("animating");
      child$.classList.add("animating");

      container$.style.setProperty("transform", "");
      child$.style.setProperty("transform", "");

      container$.addEventListener("transitionend", () => {
        cleanUpAnimations();
      });
    });
  });

  prevHeight = nextHeight;
}

function cleanUpAnimations() {
  container$.classList.remove("animating");
  child$.classList.remove("animating");
}

document.querySelector("#step").addEventListener("click", render);
