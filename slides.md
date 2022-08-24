---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
# persist drawings in exports and build
drawings:
  persist: false
---

<!--prettier-disable-->

# How to migrate react libraries to svelte

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/puruvj" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--

Hi! Hope ur all enjoying Svelte Summit! So, my talk, as u can see is about migrating react libraries to Svelte. What this means: I will show you step by step how I converted an existing React library to Svelte. And made it smaller and faster.

So, first question: All the svelte devs?
2nd question: All who have been react developers in the past, and don't do react anymore
3rd question: Still do React?

-->

---
layout: fact
---

# What is the problem

<!--

So, what exactly is the problem here?

-->

---
layout: quote
---

# React's ecosystem is big.

---
layout: quote
---

# React's ecosystem is big. Svelte's is not.

<!--

Now, I know what many of you are gonna disagree with that. And I don't wanna get eggs thrown at me, so I will explain this point, and try to convince you well. But before that, lemme introduce myself.

-->

---
layout: author
presenterImage: https://www.puruvj.dev/photos/puru-profile.jpg
---

# Puru Vijay

- B.Tech undergrad student by day, intern [@stackblitz](https://stackblitz.com/) by evening, and open sourceror by night.

- Blog @ [puruvj.dev](https://puruvj.dev)

<!--

I am Puru Vijay. I am from Jaipur, India!

I am a B.Tech student currently, but by evening I put on my hacker hoodie and get to work on Stackblitz and open source stuff. I also write blogs, which you can find at my website puruvj.dev

-->

---
layout: author
presenterImage: /puru-cat-pic.jpeg
---

# Puru Vijay

- B.Tech undergrad student by day, intern [@stackblitz](https://stackblitz.com/) by evening, and open sourceror by night.

- Blog @ [puruvj.dev](https://puruvj.dev)

<!--

Those of you who know me from discord, would recognise me as this black and white sideways-turned disgruntled cat.

So, with the intro out of the way, let's get to the whole song and dance.

-->

---
layout: quote
---

# React's ecosystem is big. Svelte's is not.

<!--

Now, coming back to this statement. This is sort of the consensus on internet. Svelte's ecosystem, is small. Not very small, but not as big as the competitors like React and Vue.

A counterargument to this is that React's ecosystem exists to fill in the flaws of React, to fill in the chunks missing in React.

-->

---

# <logos-react class="text-6xl" />

<v-clicks>

- **Styling**: CSS Modules, styled-components, jss, emotion, vanilla-extract, goober
- **Animation**: Framer Motion, React Spring, Remotion
- **State Management**: Redux(Toolkit), Jotai, Zustand
- **Dynamic Class**: clsx, classnames
- **Form**: react-hook-form

</v-clicks>

<!--

For styling, you got to pick between CSS Modules, or one of the CSS in JS alternatives, like styled-components, jss, emotion, vanilla extract, goober, etc.

For animation, you got framer motion, react spring, remotion.

And, for state management, you got Redux, or redux toolkit effectively, cuz lets face it, anyone starting a new redux project won't really go for plain redux. You got Jotai(Which is my absolute favorite choice out of any state management library in React ecosystem) and finally zustand, and some more.

And, ofc, you ultimately end up dynamically adding and removing classes for styles, and for that you use `clsx`, made by our very own Luke Edwards.

And finally, forms in React are an absolute pain! Regular old forms which require clicking on submit button are fine, but when you venture into real time territory in React, it is pain squared! And for that, you use react-hook-form.

-->

---

# <logos-svelte-icon class="text-6xl" />

- **Styling**: `<style>`
- **Animation**: `transition:`, `in:`, `out:`, `tweened()`, `spring()`
- **State Management**: `let`, `writable`, `readable`, `derived`
- **Dynamic Class**: `class:`
- **Form**: `bind:`

<!--

In Svelte, you got all of this built in. Styling? Just use the style tag. Animations? All built in! State management? `let` is your friend! And stores give you global state superpowers. Dynamic classes? Not even a big concern in svelte, you just use the `class:` syntax and you're done! And real time forms are a breeze thanks to 2-way data binding.

Svelte has the whole package built in! So what exactly is missing here that ecosystem needs to fill in?

-->

---
layout: quote
---

# What if you need to drag?

<!--

What if you need to make a draggable? Svelte doesn't have it built in.

-->

---

```svelte {2-25|28}
<script>
function draggable(node) {
  let moving = false;
  let left = 0;
  let top = 0;

  node.style.transform = `translate(${left}px, ${top}px)`;
  node.style.userSelect = "none";

  node.addEventListener("mousedown", () => {
    moving = true;
  });

  window.addEventListener("mousemove", (e) => {
    if (moving) {
      left += e.movementX;
      top += e.movementY;
      node.style.transform = `translate(${left}px, ${top}px)`;
    }
  });

  window.addEventListener("mouseup", () => {
    moving = false;
  });
}
</script>

<div use:draggable>I am draggable</div>
```

<style>
pre {
  --slidev-code-line-height: 1.414;
}

code {
  font-size: 0.7rem;
}
</style>

<!--

So, you write a little svelte action.

<click>

And apply it to the target element.

-->

---
layout: center
---

<Draggable />

<!--

And boom! You got draggable.

But what if, you want to limit the dragging to just one axis. Either horizontal, or vertical.

-->

---

```svelte {all|18}
<script>
function draggable(node) {
  let moving = false;
  let left = 0;
  let top = 0;

  node.style.transform = `translate(${left}px, ${top}px)`;
  node.style.userSelect = "none";

  node.addEventListener("mousedown", () => {
    moving = true;
  });

  window.addEventListener("mousemove", (e) => {
    if (moving) {
      left += e.movementX;
      top += e.movementY;
      node.style.transform = `translate(0, ${top}px)`;
    }
  });

  window.addEventListener("mouseup", () => {
    moving = false;
  });
}
</script>

<div use:draggable>I am draggable</div>
```

<style>
pre {
  --slidev-code-line-height: 1.414;
}

code {
  font-size: 0.7rem;
}
</style>

<!--

We change this line. Now, the x axis won't be changed, hence it will move in only y direction.

-->

---
layout: center
---

<Draggable axis="y" />

<!--

And we got the desired behavior with the changes required! But...

-->

---
layout: quote
---

# Some crazy stuff!

<!--

What if you wanna do some crazy stuff? Like, control the position of the draggable with your own state? Or change the axis based on user selected options? Or bind the draggable to a very limited area only. Have it emit events so you can listen to different drag events? Or you want your element to be draggable only using certain elements? And you gotta memoize stuff too because now you are doing way too many calculations.

Then you end up with code that looks somewhat like this: 

-->

---
layout: four-col
lineNumbers: false
---

::col1::

```ts
import memoize from './memoize';

export type DragBoundsCoords = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type DragAxis = 'both' | 'x' | 'y' | 'none';

export type DragBounds =
  | HTMLElement
  | Partial<DragBoundsCoords>
  | 'parent'
  | 'body'
  | (string & Record<never, never>);

export type DragEventData = {
  offsetX: number;
  offsetY: number;
  domRect: DOMRect;
};

export type DragOptions = {
  bounds?: DragBounds;
  axis?: DragAxis;
  gpuAcceleration?: boolean;
  applyUserSelectHack?: boolean;
  ignoreMultitouch?: boolean;
  disabled?: boolean;
  grid?: [number, number];
  position?: { x: number; y: number };
  cancel?: string | HTMLElement | HTMLElement[];
  handle?: string | HTMLElement | HTMLElement[];
  defaultClass?: string;
  defaultClassDragging?: string;
  defaultClassDragged?: string;
  defaultPosition?: { x: number; y: number };
  onDragStart?: (data: DragEventData) => void;
  onDrag?: (data: DragEventData) => void;
  onDragEnd?: (data: DragEventData) => void;
};

const enum DEFAULT_CLASS {
  MAIN = 'neodrag',
  DRAGGING = 'neodrag-dragging',
  DRAGGED = 'neodrag-dragged',
}

export const draggable = (node: HTMLElement, options: DragOptions = {}) => {
  let {
    bounds,
    axis = 'both',
    gpuAcceleration = true,
    applyUserSelectHack = true,
    disabled = false,
    ignoreMultitouch = false,
    grid,
    position,
    cancel,
    handle,
    defaultClass = DEFAULT_CLASS.MAIN,
    defaultClassDragging = DEFAULT_CLASS.DRAGGING,
    defaultClassDragged = DEFAULT_CLASS.DRAGGED,
    defaultPosition = { x: 0, y: 0 },
    onDragStart,
    onDrag,
    onDragEnd,
  } = options;

  const tick = new Promise(requestAnimationFrame);
  let active = false;

  let translateX = 0,
    translateY = 0;

  let initialX = 0,
    initialY = 0;

  // The offset of the client position relative to the node's top-left corner
  let clientToNodeOffsetX = 0,
    clientToNodeOffsetY = 0;

  let { x: xOffset, y: yOffset } = position
    ? { x: position?.x ?? 0, y: position?.y ?? 0 }
    : defaultPosition;

  setTranslate(xOffset, yOffset, node, gpuAcceleration);

  let canMoveInX: boolean;
  let canMoveInY: boolean;

  let bodyOriginalUserSelectVal = '';

  let computedBounds: DragBoundsCoords;
  let nodeRect: DOMRect;

  let dragEl: HTMLElement | HTMLElement[] | undefined;
  let cancelEl: HTMLElement | HTMLElement[] | undefined;
```

::col2::

```ts
  let isControlled = !!position;

  // Arbitrary constants for better minification
  const bodyStyle = document.body.style;
  const nodeClassList = node.classList;

  const getEventData: () => DragEventData = () => ({
    offsetX: translateX,
    offsetY: translateY,
    domRect: node.getBoundingClientRect(),
  });

  const callEvent = (eventName: 'neodrag:start' | 'neodrag' | 'neodrag:end', fn: typeof onDrag) => {
    const data = getEventData();
    node.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    fn?.(data);
  };

  function fireSvelteDragStartEvent() {
    callEvent('neodrag:start', onDragStart);
  }

  function fireSvelteDragEndEvent() {
    callEvent('neodrag:end', onDragEnd);
  }

  function fireSvelteDragEvent() {
    callEvent('neodrag', onDrag);
  }

  const listen = addEventListener;

  listen('touchstart', dragStart, false);
  listen('touchend', dragEnd, false);
  listen('touchmove', drag, false);

  listen('mousedown', dragStart, false);
  listen('mouseup', dragEnd, false);
  listen('mousemove', drag, false);

  // On mobile, touch can become extremely janky without it
  node.style.touchAction = 'none';

  const calculateInverseScale = () => {
    // Calculate the current scale of the node
    let inverseScale = node.offsetWidth / nodeRect.width;
    if (isNaN(inverseScale)) inverseScale = 1;
    return inverseScale;
  };

  function dragStart(e: TouchEvent | MouseEvent) {
    if (disabled) return;
    if (ignoreMultitouch && e.type === 'touchstart' && (e as TouchEvent).touches.length > 1) return;

    nodeClassList.add(defaultClass);

    dragEl = getHandleEl(handle, node);
    cancelEl = getCancelElement(cancel, node);

    canMoveInX = /(both|x)/.test(axis);
    canMoveInY = /(both|y)/.test(axis);

    // Compute bounds
    if (typeof bounds !== 'undefined') {
      computedBounds = computeBoundRect(bounds, node);
    }

    // Compute current node's bounding client Rectangle
    nodeRect = node.getBoundingClientRect();

    if (isString(handle) && isString(cancel) && handle === cancel)
      throw new Error("`handle` selector can't be same as `cancel` selector");

    if (cancelElementContains(cancelEl, dragEl))
      throw new Error(
        "Element being dragged can't be a child of the element on which `cancel` is applied"
      );

    if (
      (dragEl instanceof HTMLElement
        ? dragEl.contains(<HTMLElement>e.target)
        : dragEl.some((el) => el.contains(<HTMLElement>e.target))) &&
      !cancelElementContains(cancelEl, <HTMLElement>e.target)
    )
      active = true;

    if (!active) return;

    if (applyUserSelectHack) {
      // Apply user-select: none on body to prevent misbehavior
      bodyOriginalUserSelectVal = bodyStyle.userSelect;
      bodyStyle.userSelect = 'none';
    }

    // Dispatch custom event
    fireSvelteDragStartEvent();

    const { clientX, clientY } = isTouchEvent(e) ? e.touches[0] : e;
    const inverseScale = calculateInverseScale();

```

::col3::

```ts
  if (canMoveInX) initialX = clientX - xOffset / inverseScale;
    if (canMoveInY) initialY = clientY - yOffset / inverseScale;

    if (computedBounds) {
      clientToNodeOffsetX = clientX - nodeRect.left;
      clientToNodeOffsetY = clientY - nodeRect.top;
    }
  }

  function dragEnd() {
    if (!active) return;

    // Apply class defaultClassDragged
    nodeClassList.remove(defaultClassDragging);
    nodeClassList.add(defaultClassDragged);
    if (applyUserSelectHack) bodyStyle.userSelect = bodyOriginalUserSelectVal;
    fireSvelteDragEndEvent();

    if (canMoveInX) initialX = translateX;
    if (canMoveInX) initialY = translateY;

    active = false;
  }

  function drag(e: TouchEvent | MouseEvent) {
    if (!active) return;

    // Apply class defaultClassDragging
    nodeClassList.add(defaultClassDragging);

    e.preventDefault();

    nodeRect = node.getBoundingClientRect();

    const { clientX, clientY } = isTouchEvent(e) ? e.touches[0] : e;

    // Get final values for clamping
    let finalX = clientX,
      finalY = clientY;

    const inverseScale = calculateInverseScale();

    if (computedBounds) {
      // Client position is limited to this virtual boundary to prevent node going out of bounds
      const virtualClientBounds: DragBoundsCoords = {
        left: computedBounds.left + clientToNodeOffsetX,
        top: computedBounds.top + clientToNodeOffsetY,
        right: computedBounds.right + clientToNodeOffsetX - nodeRect.width,
        bottom: computedBounds.bottom + clientToNodeOffsetY - nodeRect.height,
      };

      finalX = clamp(finalX, virtualClientBounds.left, virtualClientBounds.right);
      finalY = clamp(finalY, virtualClientBounds.top, virtualClientBounds.bottom);
    }

    if (Array.isArray(grid)) {
      let [xSnap, ySnap] = grid;

      if (isNaN(+xSnap) || xSnap < 0)
        throw new Error('1st argument of `grid` must be a valid positive number');

      if (isNaN(+ySnap) || ySnap < 0)
        throw new Error('2nd argument of `grid` must be a valid positive number');

      let deltaX = finalX - initialX,
        deltaY = finalY - initialY;

      [deltaX, deltaY] = snapToGrid(
        [Math.floor(xSnap / inverseScale), Math.floor(ySnap / inverseScale)],
        deltaX,
        deltaY
      );

      finalX = initialX + deltaX;
      finalY = initialY + deltaY;
    }

    if (canMoveInX) translateX = (finalX - initialX) * inverseScale;
    if (canMoveInY) translateY = (finalY - initialY) * inverseScale;

    xOffset = translateX;
    yOffset = translateY;

    fireSvelteDragEvent();

    tick.then(() => setTranslate(translateX, translateY, node, gpuAcceleration));
    // Promise.resolve().then(() => setTranslate(translateX, translateY, node, gpuAcceleration));
  }

  return {
    destroy: () => {
      const unlisten = removeEventListener;

      unlisten('touchstart', dragStart, false);
      unlisten('touchend', dragEnd, false);
      unlisten('touchmove', drag, false);

      unlisten('mousedown', dragStart, false);
      unlisten('mouseup', dragEnd, false);
      unlisten('mousemove', drag, false);
```

::col4::

```ts
    },
    update: (options: DragOptions) => {
      axis = options.axis || 'both';
      disabled = options.disabled ?? false;
      ignoreMultitouch = options.ignoreMultitouch ?? false;
      handle = options.handle;
      bounds = options.bounds;
      cancel = options.cancel;
      applyUserSelectHack = options.applyUserSelectHack ?? true;
      grid = options.grid;
      gpuAcceleration = options.gpuAcceleration ?? true;
      const dragged = nodeClassList.contains(defaultClassDragged);
      nodeClassList.remove(defaultClass, defaultClassDragged);
      defaultClass = options.defaultClass ?? DEFAULT_CLASS.MAIN;
      defaultClassDragging = options.defaultClassDragging ?? DEFAULT_CLASS.DRAGGING;
      defaultClassDragged = options.defaultClassDragged ?? DEFAULT_CLASS.DRAGGED;
      nodeClassList.add(defaultClass);
      if (dragged) nodeClassList.add(defaultClassDragged);
      if (isControlled) {
        xOffset = translateX = options.position?.x ?? translateX;
        yOffset = translateY = options.position?.y ?? translateY;
        tick.then(() => setTranslate(translateX, translateY, node, gpuAcceleration));
      }
    },
  };
};
const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent =>
  !!(event as TouchEvent).touches?.length;
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const isString = (val: unknown): val is string => typeof val === 'string';
const snapToGrid = memoize(
  ([xSnap, ySnap]: [number, number], pendingX: number, pendingY: number): [number, number] => {
    const calc = (val: number, snap: number) => Math.round(val / snap) * snap;
    const x = calc(pendingX, xSnap);
    const y = calc(pendingY, ySnap);
    return [x, y];
  }
);

function getHandleEl(handle: DragOptions['handle'], node: HTMLElement) {
  if (!handle) return node;
  if (handle instanceof HTMLElement || Array.isArray(handle)) return handle;
  const handleEls = node.querySelectorAll<HTMLElement>(handle);
  if (handleEls === null)
    throw new Error(
      'Selector passed for `handle` option should be child of the element on which the action is applied'
    );
  return Array.from(handleEls.values());
}

function getCancelElement(cancel: DragOptions['cancel'], node: HTMLElement) {
  if (!cancel) return;
  if (cancel instanceof HTMLElement || Array.isArray(cancel)) return cancel;
  const cancelEls = node.querySelectorAll<HTMLElement>(cancel);
  if (cancelEls === null)
    throw new Error(
      'Selector passed for `cancel` option should be child of the element on which the action is applied'
    );
  return Array.from(cancelEls.values());
}

function cancelElementContains(
  cancelElement: HTMLElement | HTMLElement[] | undefined,
  element: HTMLElement | HTMLElement[]
): boolean {
  const dragElements = element instanceof HTMLElement ? [element] : element;
  if (cancelElement instanceof HTMLElement) {
    return dragElements.some((el) => cancelElement.contains(el));
  }
  if (Array.isArray(cancelElement)) {
    return cancelElement.some((cancelEl) => dragElements.some((el) => cancelEl.contains(el)));
  }
  return false;
}

function computeBoundRect(bounds: DragOptions['bounds'], rootNode: HTMLElement) {
  if (bounds instanceof HTMLElement) return bounds.getBoundingClientRect();
  if (typeof bounds === 'object') {
    // we have the left right etc
    const { top = 0, left = 0, right = 0, bottom = 0 } = bounds;
    const computedRight = window.innerWidth - right;
    const computedBottom = window.innerHeight - bottom;
    return { top, right: computedRight, bottom: computedBottom, left };
  }

  if (bounds === 'parent') return (<HTMLElement>rootNode.parentNode).getBoundingClientRect();
  const node = document.querySelector<HTMLElement>(<string>bounds);
  if (node === null)
    throw new Error("The selector provided for bound doesn't exists in the document.");
  const computedBounds = node.getBoundingClientRect();
  return computedBounds;
}

function setTranslate(xPos: number, yPos: number, el: HTMLElement, gpuAcceleration: boolean) {
  el.style.transform = gpuAcceleration
    ? `translate3d(${+xPos}px, ${+yPos}px, 0)`
    : `translate(${+xPos}px, ${+yPos}px)`;
}
```

<style>
pre {
  --slidev-code-line-height: 0.2;
}

code {
  font-size: 0.16rem;
}
</style>

<!--

This, is too big at this point. This could be a library at this point. And it makes the situation nicer to actually have a library that just works. This is a shameless plug of my library neodrag, a tiny 2kb library to make your elements draggable.

-->

---
layout: center
---

# [@neodrag/svelte](https://npmjs.com/@neodrag/svelte)

<br><br>

```bash
pnpm add @neodrag/svelte
```

<br>

```svelte
<script>
import { draggable } from '@neodrag/svelte';
</script>

<div use:draggable>I am draggable</div>
```

<!--

How is this relevant to the talk? This library is hand written port of the amazing react-draggable library. And the talk is about converting react libraries to svelte. So, it fits, and I get to shamelessly plug my own stuff.

-->

---
layout: fact
---

# 😅😅

---
layout: fact
---

## react-draggable &nbsp; <mono-arrow /> <logos-svelte-icon class="text-3xl" />

<!--

So, is this talk about moving react-draggable to svelte?

-->

---
layout: fact
---

## ~~react-draggable~~ &nbsp; <mono-arrow /> <logos-svelte-icon class="text-3xl" />

<!--

Not quite! As you saw before, the code for a draggable library is very very big. We could simplify it by cutting down on some options, but that would really make the whole thing uninteresting and trivial, and make this talk unnecessary.

And on top of that, dragging is boring. It just is. 

We are the Sveltians.

-->

---
layout: center
---

![](/this-is-sveltia.jpeg)

<!--

We don't like boring stuff. We like having some fun!

So, instead of some boring draggable, we are gonna throw around confetti!

-->

---
layout: fact
---

# 🎉🎉

<!-- This is dummy for slidev to trigger the confetti -->
<v-click>
  <span />
</v-click>

<div v-if="$slidev.nav.clicks === 1">
  <ConfettiDemo />
</div>


<!--

[CLICK]

Yepp! We're gonna take an existing confetti library and move it to svelte.

-->

---
layout: fact
---

## react-confetti-explosion &nbsp; <mono-arrow /> <logos-svelte-icon class="text-3xl" />

<!--

The library we're gonna be looking at is `react-confetti-explosion`.

-->

---

# react-confetti-explosion
By [Ethan Herr](https://github.com/herrethan)

## API

```jsx
<ConfettiExplosion
  particleCount={150}
  particleSize={12}
  duration={3500}
  colors={['#FFC700', '#FF0000', '#2E3191', '#41BBC7']}
  force={0.5}
  floorHeight={800}
  floorWidth={1600}
/>
```

<!--

Some info about this library. It's created by Ethan Herr. 

Here, we have all these props you can pass to ConfettiExplosion. We are gonna make sure to get all the props working in our version too!

-->

---

- Bundle size: <b class="text-red-300">17.1KB</b> min+br
- Dependencies: 
  - lodash (range, round, isEqual)
  - @material-ui/styles


<!--

And it is slightly on the heavier side with 17KB in brotli. Not really heavy, but I wanna see how small we can go with it.

This package relies on 2 packages, lodash, specifically for range, round and isEqual functions. I'll try to get rid of these if possible.

And it relies on @material-ui/styles. This we can definitely get rid of, as we'll be using svelte's built in scoped styles.

Now that we have got an overview of the weight of the package, let's actually look at the code. And before we check the code, we check the files first

-->

---
layout: center
lineNumbers: true
---

```txt
- src
  - index.tsx						
  - styles.ts						
  - utils.ts						
```

<!--

We only have 3 source files to work with. That's nice!. As is the custom, lets start with the index.tsx.

-->

---

```tsx {all|6-12|14-22|24-30|32-40} {maxHeight:'60vh'}
import * as React from 'react';
import range from 'lodash/range';

import useStyles, { IParticle, IStyleClasses } from './styles';

const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
const SIZE = 12; // max height for particle rectangles, diameter for particle circles
const FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
const FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
const PARTICLE_COUNT = 150;
const DURATION = 3500;
const COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];

interface IConfetti {
  particleCount?: number;
  duration?: number;
  colors?: string[];
  particleSize?: number;
  force?: number;
  floorHeight?: number;
  floorWidth?: number;
}

const createParticles = (count: number, colors: string[]): IParticle[] => {
  const increment = 360 / count;
  return range(count).map(index => ({
    color: colors[index % colors.length],
    degree: increment * index
  }));
};

function ConfettiExplosion({
  particleCount = PARTICLE_COUNT,
  duration = DURATION,
  colors = COLORS,
  particleSize = SIZE,
  force = FORCE,
  floorHeight = FLOOR_HEIGHT,
  floorWidth = FLOOR_WIDTH
}: IConfetti) {
  const particles = createParticles(particleCount, colors);
  const classes: IStyleClasses = useStyles({ particles, duration, particleSize, force, floorWidth, floorHeight })();

  return (
    <div className={classes.container}>
      {particles.map((particle, i) => (
        <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
          <div></div>
        </div>
      ))}
    </div>
  );
}

export default ConfettiExplosion;
```

<style>

pre {
  --slidev-code-line-height: 1.2;
}

.slidev-code {
  border-radius: 0 !important;
}

code {
  font-size: 0.6rem;
}
</style>

<!--

This is index.tsx. 

As you can notice we have a bunch of constants here.
[Click]
Then if you go down you have an interface. 
[CLick]
This is for the props you pass to the component.
[CLICK]
Now we got a function createParticles. Right now, I don't really know what it does. I'll have to look at where its used to know. So, moving on, we have the component, and its props.

Now, before we move on, let's convert some of what we saw into a svelte component. This helps keep the cognitive load down.
-->

---
layout: two-cols
---

### React

```tsx {6-12,14-22,32-40} {maxHeight:'60vh'}
import * as React from 'react';
import range from 'lodash/range';

import useStyles, { IParticle, IStyleClasses } from './styles';

const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
const SIZE = 12; // max height for particle rectangles, diameter for particle circles
const FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
const FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
const PARTICLE_COUNT = 150;
const DURATION = 3500;
const COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];

interface IConfetti {
  particleCount?: number;
  duration?: number;
  colors?: string[];
  particleSize?: number;
  force?: number;
  floorHeight?: number;
  floorWidth?: number;
}

const createParticles = (count: number, colors: string[]): IParticle[] => {
  const increment = 360 / count;
  return range(count).map(index => ({
    color: colors[index % colors.length],
    degree: increment * index
  }));
};

function ConfettiExplosion({
  particleCount = PARTICLE_COUNT,
  duration = DURATION,
  colors = COLORS,
  particleSize = SIZE,
  force = FORCE,
  floorHeight = FLOOR_HEIGHT,
  floorWidth = FLOOR_WIDTH
}: IConfetti) {
  const particles = createParticles(particleCount, colors);
  const classes: IStyleClasses = useStyles({ particles, duration, particleSize, force, floorWidth, floorHeight })();

  return (
    <div className={classes.container}>
      {particles.map((particle, i) => (
        <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
          <div></div>
        </div>
      ))}
    </div>
  );
}

export default ConfettiExplosion;
```

::right::

### Svelte

```svelte
<script lang="ts">
  const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
  const SIZE = 12; // max height for particle rectangles, diameter for particle circles
  const FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
  const FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
  const PARTICLE_COUNT = 150;
  const DURATION = 3500;
  const COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];

  export let particleCount = PARTICLE_COUNT;
  export let particleSize = SIZE;
  export let duration = DURATION;
  export let particlesShape: ParticleShape = 'mix';
  export let colors = COLORS;
  export let force = FORCE;
  export let stageHeight = FLOOR_HEIGHT;
  export let stageWidth = FLOOR_WIDTH;
  export let shouldDestroyAfterDone = true;
</script>
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre {
  --slidev-code-line-height: 1.2;
}

.slidev-code {
  /* border-radius: 0 !important; */
}

code {
  font-size: 0.6rem;
}
</style>

<!--
This code on the right, contains only the props until now. Because svelte component definition is the name of the file itself, we don't have anything else here.

And just for some further clarity, lets get rid of the copied code on the left side.
-->

---
layout: two-cols
---

### React

```tsx {maxHeight:'60vh'}
import * as React from 'react';
import range from 'lodash/range';

import useStyles, { IParticle, IStyleClasses } from './styles';

const createParticles = (count: number, colors: string[]): IParticle[] => {
  const increment = 360 / count;
  return range(count).map(index => ({
    color: colors[index % colors.length],
    degree: increment * index
  }));
};

// Inside the component
const particles = createParticles(particleCount, colors);
const classes: IStyleClasses = useStyles({ particles, duration, particleSize, force, floorWidth, floorHeight })();

return (
  <div className={classes.container}>
    {particles.map((particle, i) => (
      <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
        <div></div>
      </div>
    ))}
  </div>
);
```

::right::

### Svelte

```svelte
<script lang="ts">
  const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
  const SIZE = 12; // max height for particle rectangles, diameter for particle circles
  const FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
  const FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
  const PARTICLE_COUNT = 150;
  const DURATION = 3500;
  const COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];

  export let particleCount = PARTICLE_COUNT;
  export let particleSize = SIZE;
  export let duration = DURATION;
  export let particlesShape: ParticleShape = 'mix';
  export let colors = COLORS;
  export let force = FORCE;
  export let stageHeight = FLOOR_HEIGHT;
  export let stageWidth = FLOOR_WIDTH;
  export let shouldDestroyAfterDone = true;
</script>
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre {
  --slidev-code-line-height: 1.2;
}

.slidev-code {
  /* border-radius: 0 !important; */
}

code {
  font-size: 0.6rem;
}
</style>

<!--

And now we have a little less stuff to work with. Let's see if there's something else we can move to svelte directly right now.

But before that, how do you determine what you move first? Where exactly do you start?

-->


---
layout: fact
---

## If it's not reactive, copy it!

<!--

As a rule of thumb, if I don't see some stuff using React's reactivity or lifecycle, or literally anything that React exports, I copy it without thinking. This is a way to get the most obvious stuff out of the way and develop some momentum in the refactoring process.

-->

---
layout: two-cols
---


### React

```tsx {all|6-12,15} {maxHeight:'60vh'}
import * as React from 'react';
import range from 'lodash/range';

import useStyles, { IParticle, IStyleClasses } from './styles';

const createParticles = (count: number, colors: string[]): IParticle[] => {
  const increment = 360 / count;
  return range(count).map(index => ({
    color: colors[index % colors.length],
    degree: increment * index
  }));
};

// Inside the component
const particles = createParticles(particleCount, colors);
const classes: IStyleClasses = useStyles({ particles, duration, particleSize, force, floorWidth, floorHeight })();

return (
  <div className={classes.container}>
    {particles.map((particle, i) => (
      <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
        <div></div>
      </div>
    ))}
  </div>
);
```

::right::

### Svelte

```svelte
<script lang="ts">
  const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
  const SIZE = 12; // max height for particle rectangles, diameter for particle circles
  const FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
  const FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
  const PARTICLE_COUNT = 150;
  const DURATION = 3500;
  const COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];

  export let particleCount = PARTICLE_COUNT;
  export let particleSize = SIZE;
  export let duration = DURATION;
  export let particlesShape: ParticleShape = 'mix';
  export let colors = COLORS;
  export let force = FORCE;
  export let stageHeight = FLOOR_HEIGHT;
  export let stageWidth = FLOOR_WIDTH;
  export let shouldDestroyAfterDone = true;
</script>
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre {
  --slidev-code-line-height: 1.2;
}

.slidev-code {
  /* border-radius: 0 !important; */
}

code {
  font-size: 0.6rem;
}
</style>

<!--

Following that rule, I see `createParticles` [CLICK] is just a pure function that takes in two arguments and returns an array. No JSX, nothing. So, I will directly copy paste it as it is.

-->

---
layout: two-cols
---


### React

```tsx {maxHeight:'60vh'}
import * as React from 'react';

import useStyles, { IParticle, IStyleClasses } from './styles';

// Inside the component
const classes: IStyleClasses = useStyles({ particles, duration, particleSize, force, floorWidth, floorHeight })();

return (
  <div className={classes.container}>
    {particles.map((particle, i) => (
      <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
        <div></div>
      </div>
    ))}
  </div>
);
```

::right::

### Svelte

```svelte {|21-27}
<script lang="ts">
  import range from 'lodash/range';

  const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
  const SIZE = 12; // max height for particle rectangles, diameter for particle circles
  const FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
  const FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
  const PARTICLE_COUNT = 150;
  const DURATION = 3500;
  const COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];

  export let particleCount = PARTICLE_COUNT;
  export let particleSize = SIZE;
  export let duration = DURATION;
  export let particlesShape: ParticleShape = 'mix';
  export let colors = COLORS;
  export let force = FORCE;
  export let stageHeight = FLOOR_HEIGHT;
  export let stageWidth = FLOOR_WIDTH;
  export let shouldDestroyAfterDone = true;

  const createParticles = (count: number, colors: string[]) => {
    const increment = 360 / count;
    return range(count).map(index => ({
      color: colors[index % colors.length],
      degree: increment * index
    }));
  };

  $: particles = createParticles(particleCount, colors);
</script>
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre {
  --slidev-code-line-height: 1.2;
}

.slidev-code {
  /* border-radius: 0 !important; */
}

code {
  font-size: 0.6rem;
}
</style>

<!--

As you can see, I moved createParticles to svelte side [CLICK]

And particles computed with props is now a reactive variable [CLICK]

Now, we have very little code left on the left side. But here's where we 

-->