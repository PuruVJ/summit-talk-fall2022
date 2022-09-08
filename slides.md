---
theme: default
background: /thumbnail-new.png
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
title: How to migrate react libraries to svelte
---

<!--prettier-disable-->

# How to migrate <br/> React libraries to Svelte

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/puruvj" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--

Hi! Hope ur all enjoying Svelte Summit! So, my talk is about migrating react libraries to Svelte. I will show you step by step how I converted an existing React library to Svelte. And made it smaller and faster.

So, first question: All the svelte devs?
2nd question: All who have been react developers in the past, and don't do react anymore
3rd question: Still do React?

-->

---
layout: fact
---

# What is the problem?

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

# React's ecosystem is big. Svelte is not.

<!--
Now, I know that many of you are gonna disagree with that. And I don't wanna get eggs thrown at me, so I will explain this point, and try to convince you well. But before that, lemme introduce myself.
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
- **State Management**: Redux (Toolkit), Jotai, Zustand
- **Dynamic Class**: clsx, classnames
- **Form**: react-hook-form

</v-clicks>

<!--
[CLICK] For styling, you got to pick between CSS Modules, or one of the CSS in JS alternatives, like styled-components, jss, emotion, vanilla extract, goober, etc.
[CLICK]

For animation, you got framer motion, react spring, remotion.
[CLICK]

And, for state management, you got Redux, or redux toolkit effectively, cuz lets face it, anyone starting a new redux project won't really go for plain redux. You got Jotai(Which is my absolute favorite choice out of any state management library in React ecosystem) and finally zustand, and some more.
[CLICK]

And, ofc, you ultimately end up dynamically adding and removing classes for styles, and for that you use `clsx`, made by our very own Luke Edwards.
[CLICk]

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

[CLICK]

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
This, is too big. This could be a library at this point. And it makes the situation nicer to actually have a library that just works.
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
This is a shameless plug of my library neodrag, a tiny 2kb library to make your elements draggable.

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

So, instead of some boring draggable, we are gonna throw a party!
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
Props to Ethan Herr for creating this amazing library. Ethan Herr,  If you are watching this, stop.

So, Here, we have all these props you can pass to ConfettiExplosion. We are gonna make sure to get all the props working in our version too!
-->

---

- Bundle size: <b class="text-red-300">17.1KB</b> min+br
- Dependencies: 
  - lodash (range, round, isEqual)
  - @material-ui/styles

<!--
And some more info about it it. It is slightly on the heavier side with 17KB in brotli. Not really heavy, but I wanna see how small we can go with it.

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

[Click] As you can notice we have a bunch of constants here.

[CLICK]
Then if you go down you have an interface. 
This is for the props you pass to the component.

[CLICK]
Now we got a function createParticles. Right now, I don't really know what it does. I'll have to look at where its used to understand. 

[CLICK]So, moving on, we have the component, and its props.

Now, before we go ahead, let's convert some of what we saw until now into a svelte component. This helps keep the cognitive load down.
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

```svelte {|21-27|30}
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

Now, we have very little code on the left side. But here's where our hurdles begin. You can see the `useStyles`. We don't need to check its codebase to see if it uses React specific features or not. It starts with a `use`, so ofc it does.

So, should we go deeper into the rabbit hole of react specific parts? Into the useStyles function? Not yet!

We still should check around for some constants and helpers
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

Remember we have a file named `utils`? There are high chances we can find more copy-pasteable code in there. So let's check it!

-->

---

## `utils.ts`

<br/>

```ts
import isEqual from 'lodash/isEqual';

type Rotate3dTransform = [number, number, number];

export const mapRange = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const rotate = (degree: number, amount: number) => {
  const result = degree + amount;
  return result > 360 ? result - 360 : result;
};

export const coinFlip = () => Math.random() > 0.5;

// avoid this for circles, as it will have no visual effect
const zAxisRotation: Rotate3dTransform = [0, 0, 1];

export const rotationTransforms: Rotate3dTransform[] = [
  // dual axis rotations (a bit more realistic)
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
  // single axis rotations (a bit dumber)
  [1, 0, 0],
  [0, 1, 0],
  zAxisRotation,
];

export const shouldBeCircle = (rotationIndex: number) => {
  return !isEqual(rotationTransforms[rotationIndex], zAxisRotation) && coinFlip();
};
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}

.slidev-code {
  /* border-radius: 0 !important; */
}

pre code {
  font-size: 0.6rem;
}
</style>

<!--
Scanning this file, we can see there is no JSX code or any other react specific code. So, we can safely copy paste it. The whole thing. For simplicity, we'll put it in our one single .svelte file.
-->

---

```svelte {all|35-41}
<script context="module" lang="ts">
  import isEqual from 'lodash/isEqual';
  import range from 'lodash/range';

  type Rotate3dTransform = [number, number, number];

  export const mapRange = (value: number, x1: number, y1: number, x2: number, y2: number) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

  export const rotate = (degree: number, amount: number) => {
    const result = degree + amount;
    return result > 360 ? result - 360 : result;
  };

  export const coinFlip = () => Math.random() > 0.5;

  // avoid this for circles, as it will have no visual effect
  const zAxisRotation: Rotate3dTransform = [0, 0, 1];

  export const rotationTransforms: Rotate3dTransform[] = [
    // dual axis rotations (a bit more realistic)
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 1],
    // single axis rotations (a bit dumber)
    [1, 0, 0],
    [0, 1, 0],
    zAxisRotation,
  ];

  export const shouldBeCircle = (rotationIndex: number) => {
    return !isEqual(rotationTransforms[rotationIndex], zAxisRotation) && coinFlip();
  };

  const createParticles = (count: number, colors: string[]) => {
    const increment = 360 / count;
    return range(count).map(index => ({
      color: colors[index % colors.length],
      degree: increment * index
    }));
  };
</script>

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

  $: particles = createParticles(particleCount, colors);
</script>
```

<v-click>
  <span class="text-8xl fixed top-4 right-8">😅</span>
</v-click>

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 0.6;
}

.slidev-code {
  /* border-radius: 0 !important; */
}

pre code {
  font-size: 0.35rem;
}
</style>

<!--
So here is our component with the new utils added in. You can see, I put all that code in the `<script context="module"`. Why? Simple, I like to keep my svelte specific code in regular script, and the other stuff, like constant variables, pure functions etc in script context module for better organisation.

[CLICK]

I also moved createParticles up in the module context. As it's just a pure function, it is better suited to the context module according to the mental model.

I know you really can't read this code properly, its too small.

[CLICK]

This slide doesn't really require reading the code in its entirety, it iss there more to get a feel of it. In some of the future slides, the font will be bigger while I explain some of the code.
-->

---
layout: fact
---

# style.ts

<!--

Now should we move on to the `style.ts` file? 

-->

---
layout: fact
---

# ~~style.ts~~

<!--

Not yet. We still have some more stuff to analyse, which is the HTML elements. So lets analyse it first.

-->

---

```tsx {9-16|9}
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

<!--
So, this is the markup. 
[CLICK] First, we have an opening div, with a dynamic class. My experience with this is that `classes.container` gives you a string, a hashed string. And with that string, are styles attached as CSS. Basically, standard JSX.

Something like this: [click]
-->

---
layout: center
---

```css
._gh7g7_container_7hgv7 {
  position: absolute;
  top:0;
  bottom:0;

  /* Insert styles */
}
```


---
layout: two-cols
---

## React

```tsx {1}
<div className={classes.container}>
  {particles.map((particle, i) => (
    <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
      <div></div>
    </div>
  ))}
</div>
```

::right::

## Svelte

```svelte
<div class="container">

</div>

<style>
  .container {}
</style>
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.4;
}


pre code {
  font-size: 0.6rem;
}
</style>

<!--
So coming back, let's analyse the 1st line. Because this is svelte, we can just use its built-in scoped styling. So, this would just become a regular old class="container".

Next up, on the left I see an array map.
-->

---
layout: two-cols
---

## React

```tsx {2}
<div className={classes.container}>
  {particles.map((particle, i) => (
    <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
      <div></div>
    </div>
  ))}
</div>
```

::right::

## Svelte

```svelte
<div class="container">
  {#each particles as particle}

  {/each}
</div>

<style>
  .container {}
</style>
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.4;
}


pre code {
  font-size: 0.6rem;
}
</style>

<!--

So I can directly convert it to an each block.

-->

---
layout: two-cols
---

## React

```tsx {3-5}
<div className={classes.container}>
  {particles.map((particle, i) => (
    <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
      <div></div>
    </div>
  ))}
</div>
```

::right::

## Svelte

```svelte
<div class="container">
  {#each particles as particle}

  {/each}
</div>

<style>
  .container {}
</style>
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.4;
}


pre code {
  font-size: 0.6rem;
}
</style>

<!--

Now I see a div, with a dynamic id, a class named particle, and a key. And it has a div as a child. So turning it into svelte is just this.

-->

---
layout: two-cols
---

## React

```tsx {3-5}
<div className={classes.container}>
  {particles.map((particle, i) => (
    <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
      <div></div>
    </div>
  ))}
</div>
```

::right::

## Svelte

```svelte
<div class="container">
  {#each particles as particle, i}
    <div id="confetti-particle-{i}" class="particle">
      <div></div>
    </div>
  {/each}
</div>

<style>
  .container {}

  .particle {}
</style>
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.4;
}


pre code {
  font-size: 0.6rem;
}
</style>

<!--
Notice I didn't put a key on that each block. Simple reason: In React, because of the virtual DOM, you need keys for React to be able to make sense of the different elements. In svelte, that problem just isn't there. If I was running svelte transitions here, I would definitely use keys though.

Have to say, I am really liking the svelte version right now.
-->

---

# `styles.ts`

```ts {all|6-10|12-29|31-40} {maxHeight:'55vh'}
import makeStyles from '@material-ui/styles/makeStyles';
import round from 'lodash/round';

import { coinFlip, mapRange, rotate, rotationTransforms, shouldBeCircle } from './utils';

const ROTATION_SPEED_MIN = 200; // minimum possible duration of single particle full rotation
const ROTATION_SPEED_MAX = 800; // maximum possible duration of single particle full rotation
const CRAZY_PARTICLES_FREQUENCY = 0.1; // 0-1 frequency of crazy curvy unpredictable particles
const CRAZY_PARTICLE_CRAZINESS = 0.3; // 0-1 how crazy these crazy particles are
const BEZIER_MEDIAN = 0.5; // utility for mid-point bezier curves, to ensure smooth motion paths

export interface IStyleClasses {
  container: string;
  particle: string;
}

export interface IParticle {
  color: string; // color of particle
  degree: number; // vector direction, between 0-360 (0 being straight up ↑)
}

interface IParticlesProps {
  particles: IParticle[];
  duration: number;
  particleSize: number;
  force: number;
  floorHeight: number;
  floorWidth: number;
}

const rotationKeyframes = rotationTransforms.reduce((acc, xyz, i) => {
  return {
    ...acc,
    [`@keyframes rotation-${i}`]: {
      to: {
        transform: `rotate3d(${xyz.join()}, 360deg)`
      }
    }
  };
}, {});

const confettiKeyframes = (degrees: number[], floorHeight: number, floorWidth: number) => {
  const xLandingPoints = degrees.reduce((acc, degree, i) => {
    const landingPoint = mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -floorWidth / 2, floorWidth / 2);
    return {
      ...acc,
      [`@keyframes x-axis-${i}`]: {
        to: {
          transform: `translateX(${landingPoint}px)`
        }
      }
    };
  }, {});

  return {
    '@keyframes y-axis': {
      to: {
        transform: `translateY(${floorHeight}px)`
      }
    },
    ...xLandingPoints
  };
};

const confettoStyle = (particle: IParticle, duration: number, force: number, size: number, i: number) => {
  const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  // x-axis disturbance, roughly the distance the particle will initially deviate from its target
  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = x1 * -1;
  const x3 = x1;
  // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
  const x4 = round(Math.abs(mapRange(Math.abs(rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);

  // roughly how fast particle reaches end of its explosion curve
  const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
  // roughly maps to the distance particle goes before reaching free-fall
  const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
  // roughly how soon the particle transitions from explosion to free-fall
  const y3 = BEZIER_MEDIAN;
  // roughly the ease of free-fall
  const y4 = round(Math.max(mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);

  return {
    [`&#confetti-particle-${i}`]: {
      animation: `$x-axis-${i} ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, ${x4})`,
      '& > div': {
        width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
        height: isCircle ? size : Math.round(Math.random() * 2) + size,
        animation: `$y-axis ${durationChaos}ms forwards cubic-bezier(${y1}, ${y2}, ${y3}, ${y4})`,
        '&:after': {
          backgroundColor: particle.color,
          animation: `$rotation-${rotationIndex} ${rotation}ms infinite linear`,
          ...(isCircle ? { borderRadius: '50%' } : {})
        }
      }
    }
  };
};

const useStyles = ({ particles, duration, floorHeight, floorWidth, force, particleSize }: IParticlesProps) =>
  makeStyles(
    () => {
      const confettiStyles = particles.reduce(
        (acc, particle, i) => ({ ...acc, ...confettoStyle(particle, duration, force, particleSize, i) }),
        {}
      );

      return {
        ...rotationKeyframes,
        ...confettiKeyframes(
          particles.map(particle => particle.degree),
          floorHeight,
          floorWidth
        ),
        container: {
          width: 0,
          height: 0,
          position: 'relative',
          overflow: 'visible',
          zIndex: 1200
        },
        particle: {
          ...confettiStyles,
          '& > div': {
            position: 'absolute',
            left: 0,
            top: 0,
            '&:after': {
              content: `''`,
              display: 'block',
              width: '100%',
              height: '100%'
            }
          }
        }
      };
    },
    { name: 'ConfettiExplosion' }
  );

export default useStyles;
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--
Ok, that... is a lot of code there. Let's try to understand. [CLICK]

We got some constants here. We'll copy-paste these as is in our svelte file. [CLICK]

A bunch of Typescript interfaces. We actually don't need these, as first interface is the classes that `useStyles` exports. We're not bothering with that in svelte. 2nd interface is the color and particle. We haven't really seen at the code where it is used, but I can guarantee you that we won't need it, so this is gone too. And 3rd interface is to be passed to the `useStyles`, which is not gonna be there in our codebase.

[CLICK]

Now this is a little rough. It is taking the array of rotations that we copied from utils file, and applying reduce on it. 

And this is how it is gonna look.
-->

---
layout: center
---

```js
{
  "@keyframes rotation-0": {
    to: { transform: "rotate3d(1,1,0, 360deg)" },
  },
  "@keyframes rotation-1": {
    to: { transform: "rotate3d(1,0,1, 360deg)" },
  },
  "@keyframes rotation-2": {
    to: { transform: "rotate3d(0,1,1, 360deg)" },
  },
  "@keyframes rotation-3": {
    to: { transform: "rotate3d(1,0,0, 360deg)" },
  },
  "@keyframes rotation-4": {
    to: { transform: "rotate3d(0,1,0, 360deg)" },
  },
  "@keyframes rotation-5": {
    to: { transform: "rotate3d(0,0,1, 360deg)" },
  },
};
```

<v-click>

```ts
const zAxisRotation = [0, 0, 1];

const rotationTransforms = [
  // dual axis rotations (a bit more realistic)
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
  // single axis rotations (a bit dumber)
  [1, 0, 0],
  [0, 1, 0],
  zAxisRotation,
];
```

</v-click>

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.2;
}


pre code {
  font-size: 0.6rem;
}
</style>

<!--

How did I get this? Because I already know the array being used, we had that predefined. [CLICK]

So, mentally I can make sense of how this is gonna look. But that's not always the case, as you'll see in a second.

-->

---

# `styles.ts`

```ts {31-40|42-64} {maxHeight:'55vh'}
import makeStyles from '@material-ui/styles/makeStyles';
import round from 'lodash/round';

import { coinFlip, mapRange, rotate, rotationTransforms, shouldBeCircle } from './utils';

const ROTATION_SPEED_MIN = 200; // minimum possible duration of single particle full rotation
const ROTATION_SPEED_MAX = 800; // maximum possible duration of single particle full rotation
const CRAZY_PARTICLES_FREQUENCY = 0.1; // 0-1 frequency of crazy curvy unpredictable particles
const CRAZY_PARTICLE_CRAZINESS = 0.3; // 0-1 how crazy these crazy particles are
const BEZIER_MEDIAN = 0.5; // utility for mid-point bezier curves, to ensure smooth motion paths

export interface IStyleClasses {
  container: string;
  particle: string;
}

export interface IParticle {
  color: string; // color of particle
  degree: number; // vector direction, between 0-360 (0 being straight up ↑)
}

interface IParticlesProps {
  particles: IParticle[];
  duration: number;
  particleSize: number;
  force: number;
  floorHeight: number;
  floorWidth: number;
}

const rotationKeyframes = rotationTransforms.reduce((acc, xyz, i) => {
  return {
    ...acc,
    [`@keyframes rotation-${i}`]: {
      to: {
        transform: `rotate3d(${xyz.join()}, 360deg)`
      }
    }
  };
}, {});

const confettiKeyframes = (degrees: number[], floorHeight: number, floorWidth: number) => {
  const xLandingPoints = degrees.reduce((acc, degree, i) => {
    const landingPoint = mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -floorWidth / 2, floorWidth / 2);
    return {
      ...acc,
      [`@keyframes x-axis-${i}`]: {
        to: {
          transform: `translateX(${landingPoint}px)`
        }
      }
    };
  }, {});

  return {
    '@keyframes y-axis': {
      to: {
        transform: `translateY(${floorHeight}px)`
      }
    },
    ...xLandingPoints
  };
};

const confettoStyle = (particle: IParticle, duration: number, force: number, size: number, i: number) => {
  const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  // x-axis disturbance, roughly the distance the particle will initially deviate from its target
  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = x1 * -1;
  const x3 = x1;
  // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
  const x4 = round(Math.abs(mapRange(Math.abs(rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);

  // roughly how fast particle reaches end of its explosion curve
  const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
  // roughly maps to the distance particle goes before reaching free-fall
  const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
  // roughly how soon the particle transitions from explosion to free-fall
  const y3 = BEZIER_MEDIAN;
  // roughly the ease of free-fall
  const y4 = round(Math.max(mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);

  return {
    [`&#confetti-particle-${i}`]: {
      animation: `$x-axis-${i} ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, ${x4})`,
      '& > div': {
        width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
        height: isCircle ? size : Math.round(Math.random() * 2) + size,
        animation: `$y-axis ${durationChaos}ms forwards cubic-bezier(${y1}, ${y2}, ${y3}, ${y4})`,
        '&:after': {
          backgroundColor: particle.color,
          animation: `$rotation-${rotationIndex} ${rotation}ms infinite linear`,
          ...(isCircle ? { borderRadius: '50%' } : {})
        }
      }
    }
  };
};

const useStyles = ({ particles, duration, floorHeight, floorWidth, force, particleSize }: IParticlesProps) =>
  makeStyles(
    () => {
      const confettiStyles = particles.reduce(
        (acc, particle, i) => ({ ...acc, ...confettoStyle(particle, duration, force, particleSize, i) }),
        {}
      );

      return {
        ...rotationKeyframes,
        ...confettiKeyframes(
          particles.map(particle => particle.degree),
          floorHeight,
          floorWidth
        ),
        container: {
          width: 0,
          height: 0,
          position: 'relative',
          overflow: 'visible',
          zIndex: 1200
        },
        particle: {
          ...confettiStyles,
          '& > div': {
            position: 'absolute',
            left: 0,
            top: 0,
            '&:after': {
              content: `''`,
              display: 'block',
              width: '100%',
              height: '100%'
            }
          }
        }
      };
    },
    { name: 'ConfettiExplosion' }
  );

export default useStyles;
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--
Let's come back to styles.ts. So, we made some sense of rotationKeyFrames. We don't know where it's being used yet, but it looks like styles in a JS object, it must definitely be for JSS styles. Then [CLICK]

And here, we are doing something similar. But this time we have a reduce inside a function being merged with a separate object. Man, I hate reduce! Anyways, this will give us a JS object of different x and y transform keyframes.
-->

---

```js
{
  "@keyframes x-axis-0": {
    to: {
      transform: `translateX(9px)`
    }
  },
  "@keyframes x-axis-1": {
    to: {
      transform: `translateX(20px)`
    }
  },
  "@keyframes x-axis-2": {
    to: {
      transform: `translateX(9px)`
    }
  },
  "@keyframes x-axis-3": {
    to: {
      transform: `translateX(9px)`
    }
  },
  .
  .
  .
  "@keyframes y-axis": {
    to: {
      transform: `translateY(900px)`
    }
  }
}
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.4;
}


pre code {
  font-size: 0.6rem;
}
</style>

<!--

Like this. the x-axis keyframes go on for who knows how long. And then we have an individual y keyframe that is just translating to the floor height, aka to the bottom of the stage.

However, this is where realities of refactoring someone else's code comes in. I didn't come to this conclusion that this is how this object would look initially. I was much closer to panicking.

-->

---
layout: center
---

<img src="/ptsd-doggo.jpg" class="h-70" />

<!--
Yeah, I sort of looked like Private from Madagascar this point, really traumatised
-->

---

```ts {42-64|65-103} {maxHeight:'59vh'}
import makeStyles from '@material-ui/styles/makeStyles';
import round from 'lodash/round';

import { coinFlip, mapRange, rotate, rotationTransforms, shouldBeCircle } from './utils';

const ROTATION_SPEED_MIN = 200; // minimum possible duration of single particle full rotation
const ROTATION_SPEED_MAX = 800; // maximum possible duration of single particle full rotation
const CRAZY_PARTICLES_FREQUENCY = 0.1; // 0-1 frequency of crazy curvy unpredictable particles
const CRAZY_PARTICLE_CRAZINESS = 0.3; // 0-1 how crazy these crazy particles are
const BEZIER_MEDIAN = 0.5; // utility for mid-point bezier curves, to ensure smooth motion paths

export interface IStyleClasses {
  container: string;
  particle: string;
}

export interface IParticle {
  color: string; // color of particle
  degree: number; // vector direction, between 0-360 (0 being straight up ↑)
}

interface IParticlesProps {
  particles: IParticle[];
  duration: number;
  particleSize: number;
  force: number;
  floorHeight: number;
  floorWidth: number;
}

const rotationKeyframes = rotationTransforms.reduce((acc, xyz, i) => {
  return {
    ...acc,
    [`@keyframes rotation-${i}`]: {
      to: {
        transform: `rotate3d(${xyz.join()}, 360deg)`
      }
    }
  };
}, {});

const confettiKeyframes = (degrees: number[], floorHeight: number, floorWidth: number) => {
  const xLandingPoints = degrees.reduce((acc, degree, i) => {
    const landingPoint = mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -floorWidth / 2, floorWidth / 2);
    return {
      ...acc,
      [`@keyframes x-axis-${i}`]: {
        to: {
          transform: `translateX(${landingPoint}px)`
        }
      }
    };
  }, {});

  return {
    '@keyframes y-axis': {
      to: {
        transform: `translateY(${floorHeight}px)`
      }
    },
    ...xLandingPoints
  };
};

const confettoStyle = (particle: IParticle, duration: number, force: number, size: number, i: number) => {
  const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  // x-axis disturbance, roughly the distance the particle will initially deviate from its target
  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = x1 * -1;
  const x3 = x1;
  // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
  const x4 = round(Math.abs(mapRange(Math.abs(rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);

  // roughly how fast particle reaches end of its explosion curve
  const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
  // roughly maps to the distance particle goes before reaching free-fall
  const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
  // roughly how soon the particle transitions from explosion to free-fall
  const y3 = BEZIER_MEDIAN;
  // roughly the ease of free-fall
  const y4 = round(Math.max(mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);

  return {
    [`&#confetti-particle-${i}`]: {
      animation: `$x-axis-${i} ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, ${x4})`,
      '& > div': {
        width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
        height: isCircle ? size : Math.round(Math.random() * 2) + size,
        animation: `$y-axis ${durationChaos}ms forwards cubic-bezier(${y1}, ${y2}, ${y3}, ${y4})`,
        '&:after': {
          backgroundColor: particle.color,
          animation: `$rotation-${rotationIndex} ${rotation}ms infinite linear`,
          ...(isCircle ? { borderRadius: '50%' } : {})
        }
      }
    }
  };
};

const useStyles = ({ particles, duration, floorHeight, floorWidth, force, particleSize }: IParticlesProps) =>
  makeStyles(
    () => {
      const confettiStyles = particles.reduce(
        (acc, particle, i) => ({ ...acc, ...confettoStyle(particle, duration, force, particleSize, i) }),
        {}
      );

      return {
        ...rotationKeyframes,
        ...confettiKeyframes(
          particles.map(particle => particle.degree),
          floorHeight,
          floorWidth
        ),
        container: {
          width: 0,
          height: 0,
          position: 'relative',
          overflow: 'visible',
          zIndex: 1200
        },
        particle: {
          ...confettiStyles,
          '& > div': {
            position: 'absolute',
            left: 0,
            top: 0,
            '&:after': {
              content: `''`,
              display: 'block',
              width: '100%',
              height: '100%'
            }
          }
        }
      };
    },
    { name: 'ConfettiExplosion' }
  );

export default useStyles;
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--

So, I don't really understand what this is doing. No worries, I move on to other code because that might help me understand it later, you know. Give me some context.

So I move on the next piece of code. [CLICK] And....


Yeah, now I am more traumatised.

-->

---
layout: center
---

<img src="/ptsd-doggo.jpg" class="h-140" />

---


```ts {65-103|66-87|89-101|105-144|120-140} {maxHeight:'59vh'}
import makeStyles from '@material-ui/styles/makeStyles';
import round from 'lodash/round';

import { coinFlip, mapRange, rotate, rotationTransforms, shouldBeCircle } from './utils';

const ROTATION_SPEED_MIN = 200; // minimum possible duration of single particle full rotation
const ROTATION_SPEED_MAX = 800; // maximum possible duration of single particle full rotation
const CRAZY_PARTICLES_FREQUENCY = 0.1; // 0-1 frequency of crazy curvy unpredictable particles
const CRAZY_PARTICLE_CRAZINESS = 0.3; // 0-1 how crazy these crazy particles are
const BEZIER_MEDIAN = 0.5; // utility for mid-point bezier curves, to ensure smooth motion paths

export interface IStyleClasses {
  container: string;
  particle: string;
}

export interface IParticle {
  color: string; // color of particle
  degree: number; // vector direction, between 0-360 (0 being straight up ↑)
}

interface IParticlesProps {
  particles: IParticle[];
  duration: number;
  particleSize: number;
  force: number;
  floorHeight: number;
  floorWidth: number;
}

const rotationKeyframes = rotationTransforms.reduce((acc, xyz, i) => {
  return {
    ...acc,
    [`@keyframes rotation-${i}`]: {
      to: {
        transform: `rotate3d(${xyz.join()}, 360deg)`
      }
    }
  };
}, {});

const confettiKeyframes = (degrees: number[], floorHeight: number, floorWidth: number) => {
  const xLandingPoints = degrees.reduce((acc, degree, i) => {
    const landingPoint = mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -floorWidth / 2, floorWidth / 2);
    return {
      ...acc,
      [`@keyframes x-axis-${i}`]: {
        to: {
          transform: `translateX(${landingPoint}px)`
        }
      }
    };
  }, {});

  return {
    '@keyframes y-axis': {
      to: {
        transform: `translateY(${floorHeight}px)`
      }
    },
    ...xLandingPoints
  };
};

const confettoStyle = (particle: IParticle, duration: number, force: number, size: number, i: number) => {
  const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  // x-axis disturbance, roughly the distance the particle will initially deviate from its target
  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = x1 * -1;
  const x3 = x1;
  // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
  const x4 = round(Math.abs(mapRange(Math.abs(rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);

  // roughly how fast particle reaches end of its explosion curve
  const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
  // roughly maps to the distance particle goes before reaching free-fall
  const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
  // roughly how soon the particle transitions from explosion to free-fall
  const y3 = BEZIER_MEDIAN;
  // roughly the ease of free-fall
  const y4 = round(Math.max(mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);

  return {
    [`&#confetti-particle-${i}`]: {
      animation: `$x-axis-${i} ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, ${x4})`,
      '& > div': {
        width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
        height: isCircle ? size : Math.round(Math.random() * 2) + size,
        animation: `$y-axis ${durationChaos}ms forwards cubic-bezier(${y1}, ${y2}, ${y3}, ${y4})`,
        '&:after': {
          backgroundColor: particle.color,
          animation: `$rotation-${rotationIndex} ${rotation}ms infinite linear`,
          ...(isCircle ? { borderRadius: '50%' } : {})
        }
      }
    }
  };
};

const useStyles = ({ particles, duration, floorHeight, floorWidth, force, particleSize }: IParticlesProps) =>
  makeStyles(
    () => {
      const confettiStyles = particles.reduce(
        (acc, particle, i) => ({ ...acc, ...confettoStyle(particle, duration, force, particleSize, i) }),
        {}
      );

      return {
        ...rotationKeyframes,
        ...confettiKeyframes(
          particles.map(particle => particle.degree),
          floorHeight,
          floorWidth
        ),
        container: {
          width: 0,
          height: 0,
          position: 'relative',
          overflow: 'visible',
          zIndex: 1200
        },
        particle: {
          ...confettiStyles,
          '& > div': {
            position: 'absolute',
            left: 0,
            top: 0,
            '&:after': {
              content: `''`,
              display: 'block',
              width: '100%',
              height: '100%'
            }
          }
        }
      };
    },
    { name: 'ConfettiExplosion' }
  );

export default useStyles;
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--

So yeah, I try to make some sense of it. We got a lot of math up here [CLICK]. Now, I don't really understand this part. And that's fine. It's just some math. I'm not trying to change the logic of this library, Im just trying to replicate the code part of it. Hence, I will successfully ignore this part and focus on the styles being returned under it.

[CLICK]

Now this is some CSS in JS code. Now, we're referencing some keyframes, setting some bezier curves, setting width and height etc. Still, this is...very confusing for a developer who's been looking at this code for only like half an hour or something. At this point I'm very close to taking a break. Which, in developer speak, means putting this project in the unfinished projects graveyard.

Anyways, I still don't understand it. So I move on, yet again. [CLICK]

This part, as I start scanning makes no sense to me, again. However, as I go down to this section right here: [CLICk]

This starts making sense. A lot of sense. it's just plain old CSS! I can directly copy it as is!

-->

---
layout: two-cols
---

## React

```ts {120-140} {maxHeight:'59vh'}
import makeStyles from '@material-ui/styles/makeStyles';
import round from 'lodash/round';

import { coinFlip, mapRange, rotate, rotationTransforms, shouldBeCircle } from './utils';

const ROTATION_SPEED_MIN = 200; // minimum possible duration of single particle full rotation
const ROTATION_SPEED_MAX = 800; // maximum possible duration of single particle full rotation
const CRAZY_PARTICLES_FREQUENCY = 0.1; // 0-1 frequency of crazy curvy unpredictable particles
const CRAZY_PARTICLE_CRAZINESS = 0.3; // 0-1 how crazy these crazy particles are
const BEZIER_MEDIAN = 0.5; // utility for mid-point bezier curves, to ensure smooth motion paths

export interface IStyleClasses {
  container: string;
  particle: string;
}

export interface IParticle {
  color: string; // color of particle
  degree: number; // vector direction, between 0-360 (0 being straight up ↑)
}

interface IParticlesProps {
  particles: IParticle[];
  duration: number;
  particleSize: number;
  force: number;
  floorHeight: number;
  floorWidth: number;
}

const rotationKeyframes = rotationTransforms.reduce((acc, xyz, i) => {
  return {
    ...acc,
    [`@keyframes rotation-${i}`]: {
      to: {
        transform: `rotate3d(${xyz.join()}, 360deg)`
      }
    }
  };
}, {});

const confettiKeyframes = (degrees: number[], floorHeight: number, floorWidth: number) => {
  const xLandingPoints = degrees.reduce((acc, degree, i) => {
    const landingPoint = mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -floorWidth / 2, floorWidth / 2);
    return {
      ...acc,
      [`@keyframes x-axis-${i}`]: {
        to: {
          transform: `translateX(${landingPoint}px)`
        }
      }
    };
  }, {});

  return {
    '@keyframes y-axis': {
      to: {
        transform: `translateY(${floorHeight}px)`
      }
    },
    ...xLandingPoints
  };
};

const confettoStyle = (particle: IParticle, duration: number, force: number, size: number, i: number) => {
  const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  // x-axis disturbance, roughly the distance the particle will initially deviate from its target
  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = x1 * -1;
  const x3 = x1;
  // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
  const x4 = round(Math.abs(mapRange(Math.abs(rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);

  // roughly how fast particle reaches end of its explosion curve
  const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
  // roughly maps to the distance particle goes before reaching free-fall
  const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
  // roughly how soon the particle transitions from explosion to free-fall
  const y3 = BEZIER_MEDIAN;
  // roughly the ease of free-fall
  const y4 = round(Math.max(mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);

  return {
    [`&#confetti-particle-${i}`]: {
      animation: `$x-axis-${i} ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, ${x4})`,
      '& > div': {
        width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
        height: isCircle ? size : Math.round(Math.random() * 2) + size,
        animation: `$y-axis ${durationChaos}ms forwards cubic-bezier(${y1}, ${y2}, ${y3}, ${y4})`,
        '&:after': {
          backgroundColor: particle.color,
          animation: `$rotation-${rotationIndex} ${rotation}ms infinite linear`,
          ...(isCircle ? { borderRadius: '50%' } : {})
        }
      }
    }
  };
};

const useStyles = ({ particles, duration, floorHeight, floorWidth, force, particleSize }: IParticlesProps) =>
  makeStyles(
    () => {
      const confettiStyles = particles.reduce(
        (acc, particle, i) => ({ ...acc, ...confettoStyle(particle, duration, force, particleSize, i) }),
        {}
      );

      return {
        ...rotationKeyframes,
        ...confettiKeyframes(
          particles.map(particle => particle.degree),
          floorHeight,
          floorWidth
        ),
        container: {
          width: 0,
          height: 0,
          position: 'relative',
          overflow: 'visible',
          zIndex: 1200
        },
        particle: {
          ...confettiStyles,
          '& > div': {
            position: 'absolute',
            left: 0,
            top: 0,
            '&:after': {
              content: `''`,
              display: 'block',
              width: '100%',
              height: '100%'
            }
          }
        }
      };
    },
    { name: 'ConfettiExplosion' }
  );

export default useStyles;
```

::right::

## Svelte

```svelte {10-32} {maxHeight:'59vh'}
<div class="container">
  {#each particles as particle, i}
    <div id="confetti-particle-{i}" class="particle">
      <div></div>
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    width: 0;
    height: 0;
    overflow: visible;
    position: relative;
    z-index: 1200;
  }

  .particle {
    & > div {
      position: absolute;
      top: 0;
      left: 0;

      &:before {
        display: block;
        height: 100%;
        width: 100%;
        content: '';
      }
    }
  }
</style>
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--

So, I take these styles, and copy them as CSS to the svelte version. I also use SCSS just for the indentation niceties.

OFC, this isn't enough. It doesn't really show anything on the screen. We need to go back to the useStyles function to understand that and implement it here. So let's go back to it.

-->

---

```ts {all} {maxHeight:'59vh'}
const confettiKeyframes = (degrees: number[], floorHeight: number, floorWidth: number) => {
  const xLandingPoints = degrees.reduce((acc, degree, i) => {
    const landingPoint = mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -floorWidth / 2, floorWidth / 2);
    return {
      ...acc,
      [`@keyframes x-axis-${i}`]: {
        to: {
          transform: `translateX(${landingPoint}px)`
        }
      }
    };
  }, {});

  return {
    '@keyframes y-axis': {
      to: {
        transform: `translateY(${floorHeight}px)`
      }
    },
    ...xLandingPoints
  };
};

const confettoStyle = (particle: IParticle, duration: number, force: number, size: number, i: number) => {
  const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  // x-axis disturbance, roughly the distance the particle will initially deviate from its target
  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = x1 * -1;
  const x3 = x1;
  // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
  const x4 = round(Math.abs(mapRange(Math.abs(rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);

  // roughly how fast particle reaches end of its explosion curve
  const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
  // roughly maps to the distance particle goes before reaching free-fall
  const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
  // roughly how soon the particle transitions from explosion to free-fall
  const y3 = BEZIER_MEDIAN;
  // roughly the ease of free-fall
  const y4 = round(Math.max(mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);

  return {
    [`&#confetti-particle-${i}`]: {
      animation: `$x-axis-${i} ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, ${x4})`,
      '& > div': {
        width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
        height: isCircle ? size : Math.round(Math.random() * 2) + size,
        animation: `$y-axis ${durationChaos}ms forwards cubic-bezier(${y1}, ${y2}, ${y3}, ${y4})`,
        '&:after': {
          backgroundColor: particle.color,
          animation: `$rotation-${rotationIndex} ${rotation}ms infinite linear`,
          ...(isCircle ? { borderRadius: '50%' } : {})
        }
      }
    }
  };
};

const useStyles = ({ particles, duration, floorHeight, floorWidth, force, particleSize }: IParticlesProps) =>
  makeStyles(
    () => {
      const confettiStyles = particles.reduce(
        (acc, particle, i) => ({ ...acc, ...confettoStyle(particle, duration, force, particleSize, i) }),
        {}
      );

      return {
        ...rotationKeyframes,
        ...confettiKeyframes(
          particles.map(particle => particle.degree),
          floorHeight,
          floorWidth
        ),
        container: {
          width: 0,
          height: 0,
          position: 'relative',
          overflow: 'visible',
          zIndex: 1200
        },
        particle: {
          ...confettiStyles,
          '& > div': {
            position: 'absolute',
            left: 0,
            top: 0,
            '&:after': {
              content: `''`,
              display: 'block',
              width: '100%',
              height: '100%'
            }
          }
        }
      };
    },
    { name: 'ConfettiExplosion' }
  );
```

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--
Now I am staring at this for 10 minutes and I still can't make sense of what is going on. I know there are keyframes being generated, dynamic properties being applied, but... how? In what manner, and how do I emulate that in svelte. So, tired from all this, I go to a pre-built codesandbox demo, and watch confetti explode, and analyze the DOM elements. And guess what I find there.
-->

---

```css {all|0} {maxHeight:'59vh'}
@-webkit-keyframes ConfettiExplosion-keyframes-rotation-0-1 {
  to {
    transform: rotate3d(1,1,0, 360deg);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-rotation-1-2 {
  to {
    transform: rotate3d(1,0,1, 360deg);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-rotation-2-3 {
  to {
    transform: rotate3d(0,1,1, 360deg);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-rotation-3-4 {
  to {
    transform: rotate3d(1,0,0, 360deg);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-rotation-4-5 {
  to {
    transform: rotate3d(0,1,0, 360deg);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-rotation-5-6 {
  to {
    transform: rotate3d(0,0,1, 360deg);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-y-axis-7 {
  to {
    transform: translateY(500px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-0-8 {
  to {
    transform: translateX(0px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-1-9 {
  to {
    transform: translateX(-20px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-2-10 {
  to {
    transform: translateX(-40px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-3-11 {
  to {
    transform: translateX(-60px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-4-12 {
  to {
    transform: translateX(-80px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-5-13 {
  to {
    transform: translateX(-100px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-6-14 {
  to {
    transform: translateX(-120px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-7-15 {
  to {
    transform: translateX(-140px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-8-16 {
  to {
    transform: translateX(-140px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-9-17 {
  to {
    transform: translateX(-120px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-10-18 {
  to {
    transform: translateX(-100px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-11-19 {
  to {
    transform: translateX(-80px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-12-20 {
  to {
    transform: translateX(-60px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-13-21 {
  to {
    transform: translateX(-40px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-14-22 {
  to {
    transform: translateX(-20px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-15-23 {
  to {
    transform: translateX(0px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-16-24 {
  to {
    transform: translateX(20px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-17-25 {
  to {
    transform: translateX(40px);
  }
}
@-webkit-keyframes ConfettiExplosion-keyframes-x-axis-18-26 {
  to {
    transform: translateX(60px);
  }
}
```

<div v-if="$slidev.nav.clicks === 1">
  <img src="/light-on.png" class="h-140 fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]" />
</div>

<style>
.slidev-layout {
  gap: 0.5rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--

Mostly keyframes. And that's not all! This is only a fifth of what was actually there. And that's only with 30 particles. Default is 200, and the keyframes and styles for that amount to around 3000 lines of generated CSS code. 3000 folks, 3000! For a measly 200 particles.

And if you closely analyze this code, they are not even different keyframes actually. They are all just one keyframe animation, only with a different value.

This is when I finally understood how to bring it all together [CLICK]

All that code to generate keyframes and styles, that all applies to every single particle node. And most of it is highly redundant. It is generating 2 new keyframes for every single particle. We don't need separate keyframes for every particle. We just need to generate the original keyframes once, and give them different values using CSS variables. So, first, let's just try to recreate the dynamic CSS with CSS variables.

-->

---
layout: two-cols
---

```ts
const rotationKeyframes = rotationTransforms.reduce((acc, xyz, i) => {
  return {
    ...acc,
    [`@keyframes rotation-${i}`]: {
      to: {
        transform: `rotate3d(${xyz.join()}, 360deg)`
      }
    }
  };
}, {});
```

::right::

```css
@keyframes rotation {
  to {
    transform: rotate3d(var(--rotation), 360deg);
  }
}
```

<style>
.slidev-layout {
  gap: 0.7rem;
}

pre  {
  --slidev-code-line-height: 1.3;
}


pre code {
  font-size: 0.6rem;
}
</style>

<!--

The simplest one, the rotation keyframes, I will copy just as is. The --rotation variable, we will pass it later.

-->

---
layout: two-cols
---

```ts
const confettiKeyframes = (degrees: number[], floorHeight: number, floorWidth: number) => {
  const xLandingPoints = degrees.reduce((acc, degree, i) => {
    const landingPoint = mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -floorWidth / 2, floorWidth / 2);
    return {
      ...acc,
      [`@keyframes x-axis-${i}`]: {
        to: {
          transform: `translateX(${landingPoint}px)`
        }
      }
    };
  }, {});

  return {
    '@keyframes y-axis': {
      to: {
        transform: `translateY(${floorHeight}px)`
      }
    },
    ...xLandingPoints
  };
};
```

::right::

```css
@keyframes x-axis {
  to {
    transform: translate3d(var(--x-landing-point), 0, 0);
  }
}

@keyframes y-axis {
  to {
    transform: translate3d(0, var(--floor-height), 0);
  }
}
```

<style>
.slidev-layout {
  gap: 0.7rem;
}

pre  {
  --slidev-code-line-height: 1.3;
}


pre code {
  font-size: 0.6rem;
}
</style>

<!--

The x and y axis keyframes, I will also copy them as is. Also, I will convert the translateX and translateY to translate3d, for some hardware acceleration. Again, variables I will pass later. Just look at how much simpler it looks.

-->

---
layout: two-cols
---

```ts {25-37} {maxHeight:'59vh'}
const confettoStyle = (particle: IParticle, duration: number, force: number, size: number, i: number) => {
  const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  // x-axis disturbance, roughly the distance the particle will initially deviate from its target
  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = x1 * -1;
  const x3 = x1;
  // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
  const x4 = round(Math.abs(mapRange(Math.abs(rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);

  // roughly how fast particle reaches end of its explosion curve
  const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
  // roughly maps to the distance particle goes before reaching free-fall
  const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
  // roughly how soon the particle transitions from explosion to free-fall
  const y3 = BEZIER_MEDIAN;
  // roughly the ease of free-fall
  const y4 = round(Math.max(mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);

  return {
    [`&#confetti-particle-${i}`]: {
      animation: `$x-axis-${i} ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, ${x4})`,
      '& > div': {
        width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
        height: isCircle ? size : Math.round(Math.random() * 2) + size,
        animation: `$y-axis ${durationChaos}ms forwards cubic-bezier(${y1}, ${y2}, ${y3}, ${y4})`,
        '&:after': {
          backgroundColor: particle.color,
          animation: `$rotation-${rotationIndex} ${rotation}ms infinite linear`,
          ...(isCircle ? { borderRadius: '50%' } : {})
        }
      }
    }
  };
};
```

::right::

```scss {2-3,9-12,19-21}
.particle {
  animation: x-axis var(--duration-chaos) forwards
    cubic-bezier(var(--x1), var(--x2), var(--x3), var(--x4));

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    animation: y-axis var(--duration-chaos) forwards
      cubic-bezier(var(--y1), var(--y2), var(--y3), var(--y4));
    width: var(--width);
    height: var(--height);

    &:before {
      display: block;
      height: 100%;
      width: 100%;
      content: '';
      background-color: var(--bgcolor);
      animation: rotation var(--rotation-duration) infinite linear;
      border-radius: var(--border-radius);
    }
  }
}
```

<style>
.slidev-layout {
  gap: 0.7rem;
}

pre  {
  --slidev-code-line-height: 1.3;
}


pre code {
  font-size: 0.6rem;
}
</style>

<!--
And the styles on the left, the dynamic ones, we copied as it is to the right, and replaced the dynamic parts with CSS variables. Look, simple!
-->

---
layout: full
---

```scss {all} {maxHeight:'59vh'}
@keyframes y-axis {
  to {
    transform: translate3d(0, var(--floor-height), 0);
  }
}

@keyframes x-axis {
  to {
    transform: translate3d(var(--x-landing-point), 0, 0);
  }
}

@keyframes rotation {
  to {
    transform: rotate3d(var(--rotation), 360deg);
  }
}

.particle {
  animation: x-axis var(--duration-chaos) forwards
    cubic-bezier(var(--x1), var(--x2), var(--x3), var(--x4));

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    animation: y-axis var(--duration-chaos) forwards
      cubic-bezier(var(--y1), var(--y2), var(--y3), var(--y4));
    width: var(--width);
    height: var(--height);

    &:before {
      display: block;
      height: 100%;
      width: 100%;
      content: '';
      background-color: var(--bgcolor);
      animation: rotation var(--rotation-duration) infinite linear;
      border-radius: var(--border-radius);
    }
  }
}
```

<style>
.slidev-layout {
  gap: 0.7rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--
This is how our complete CSS looks now. This actually looks sane and parseable now, compared to the CSS-in-JS hot mess we saw in the original codebase. This is just better. Now its time to provide all these CSS Variables to our elements so our confetti can work. Now, how do we do that?
-->

---
layout: center
---

<img src="/use-to-rescue.webp" class="w-100" />

<!--

Svelte action to the rescue!

-->

---

```svelte
<script lang="ts">
  function confettiStyles(node: HTMLDivElement) {

  }
</script>

<div class="container">
  {#each particles as particle}
    <div class="particle" use:confettiStyles>
      <div />
    </div>
  {/each}
</div>
```

<style>
.slidev-layout {
  gap: 0.7rem;
}
</style>

<!--
Lets modify our code to use svelte action. Right now, this is a barebones empty action. Let's fill it up with all the CSS variables we saw. Before that, we need all the math.
-->

---

```svelte
<script lang="ts">
  function confettiStyles(node: HTMLDivElement) {
    // Get x landing point for it
    const landingPoint = mapRange(
      Math.abs(rotate(degree, 90) - 180),
      0,
      180,
      -stageWidth / 2,
      stageWidth / 2
    );

    // Crazy calculations for generating styles
    const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
    const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
    const durationChaos = duration - Math.round(Math.random() * 1000);
    const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
    const isCircle =
      particlesShape !== 'rectangles' &&
      (particlesShape === 'circles' || shouldBeCircle(rotationIndex));

    // x-axis disturbance, roughly the distance the particle will initially deviate from its target
    const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
    const x2 = x1 * -1;
    const x3 = x1;
    // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
    const x4 = round(Math.abs(mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -1, 1)), 4);

    // roughly how fast particle reaches end of its explosion curve
    const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
    // roughly maps to the distance particle goes before reaching free-fall
    const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
    // roughly how soon the particle transitions from explosion to free-fall
    const y3 = BEZIER_MEDIAN;
    // roughly the ease of free-fall
    const y4 = round(Math.max(mapRange(Math.abs(degree - 180), 0, 180, force, -force), 0), 4);
  }
</script>

<div class="container">
  {#each particles as particle}
    <div class="particle" use:confettiStyles>
      <div />
    </div>
  {/each}
</div>
```

<style>
.slidev-layout {
  gap: 0.7rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--
And we have the math now. but now we are getting some red squiggles.
-->

---

<img src="/degree-red-squiggle.png" />

<!--
So our math relies on the degree variable. and where do we get that from?

Remember the HTML markup we wrote? The each loop in it?
-->

---
layout: center
---

```svelte {all|2}
<div class="container">
  {#each particles as particle}
    <div class="particle" use:confettiStyles>
      <div />
    </div>
  {/each}
</div>
```

<!--
Do you see the particle? That is actually an object with the properties - colour and degree.
-->

---
layout: center
---

```svelte {2}
<div class="container">
  {#each particles as { color, degree }}
    <div class="particle" use:confettiStyles>
      <div />
    </div>
  {/each}
</div>
```

<!--

Basically every single particle has its own degree. So we can pass that to the confetti styles action. So this becomes:

-->

---
layout: center
---

```svelte {3}
<div class="container">
  {#each particles as { color, degree }}
    <div class="particle" use:confettiStyles={degree}>
      <div />
    </div>
  {/each}
</div>
```

<!--

And our action now accepts a second parameter - degree of type number. 

-->

---

```svelte {2} {maxHeight:'59vh'}
<script lang="ts">
  function confettiStyles(node: HTMLDivElement, degree: number) {
    // Get x landing point for it
    const landingPoint = mapRange(
      Math.abs(rotate(degree, 90) - 180),
      0,
      180,
      -stageWidth / 2,
      stageWidth / 2
    );

    // Crazy calculations for generating styles
    const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
    const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
    const durationChaos = duration - Math.round(Math.random() * 1000);
    const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
    const isCircle =
      particlesShape !== 'rectangles' &&
      (particlesShape === 'circles' || shouldBeCircle(rotationIndex));

    // x-axis disturbance, roughly the distance the particle will initially deviate from its target
    const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
    const x2 = x1 * -1;
    const x3 = x1;
    // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
    const x4 = round(Math.abs(mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -1, 1)), 4);

    // roughly how fast particle reaches end of its explosion curve
    const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
    // roughly maps to the distance particle goes before reaching free-fall
    const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
    // roughly how soon the particle transitions from explosion to free-fall
    const y3 = BEZIER_MEDIAN;
    // roughly the ease of free-fall
    const y4 = round(Math.max(mapRange(Math.abs(degree - 180), 0, 180, force, -force), 0), 4);
  }
</script>
```

<style>
.slidev-layout {
  gap: 0.7rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--

Now finally, all we need to do is set the CSS variables that we provided already in the CSS, that our CSS expects.

-->

---

```ts
const setCSSVar = (key: string, val: string | number) => node.style.setProperty(key, val + '');

setCSSVar('--x-landing-point', `${landingPoint}px`);

setCSSVar('--duration-chaos', `${durationChaos}ms`);

setCSSVar('--x1', x1);
setCSSVar('--x2', x2);
setCSSVar('--x3', x3);
setCSSVar('--x4', x4);

setCSSVar('--y1', y1);
setCSSVar('--y2', y2);
setCSSVar('--y3', y3);
setCSSVar('--y4', y4);

// set --width and --height here
setCSSVar(
  '--width',
  `${isCircle ? particleSize : Math.round(Math.random() * 4) + particleSize / 2}px`
);
setCSSVar(
  '--height',
  (isCircle ? particleSize : Math.round(Math.random() * 2) + particleSize) + 'px'
);

setCSSVar('--rotation', `${rotationTransforms[rotationIndex].join()}`);
setCSSVar('--rotation-duration', `${rotation}ms`);
setCSSVar('--border-radius', `${isCircle ? '50%' : '0'}`);
```

<style>
.slidev-layout {
  gap: 0.7rem;
}

pre  {
  --slidev-code-line-height: 1.1;
}


pre code {
  font-size: 0.5rem;
}
</style>

<!--
And now, all our variables are set.
-->

---

```svelte {1,4}
<div class="container" style:--floor-height="{stageHeight}px">
  {#each particles as { color, degree }}
    <div class="particle" use:confettiStyles={degree}>
      <div style:--bgcolor={color} />
    </div>
  {/each}
</div>
```

<!--
and here are some final CSS variables settings that we are gonna do right in our markup. And, we're done! Our confetti now works!

Also, really love the style: syntax. Its a life saver. Thank you Svelte team a lot for this addition.
-->

---

<!-- This is dummy for slidev to trigger the confetti -->
<v-click>
  <span />
</v-click>

<div v-if="$slidev.nav.clicks === 1">
  <ConfettiDemo2 />
</div>

<!--
Our confetti is done!!

[CLICk]
-->

---
layout: fact
---

# Getting rid of `lodash`

<style>

h1 {
  line-height: 1.6 !important;
}

</style>

<!--

SO, our package is now fully functional. BUt it's still not dependency free. Material UI was eliminated automatically, but we still have lodash to get rid of. And for that, it's very very easy. I'm gonna create some small functions myself for this specific package. 

-->

---
layout: quote
---

# `round`, `isEqual`

<!--

We only have two lodash functions left now. Initially we had range too, but we got rid of it during the `createParticles` function. Now, round just rounds off a number with specific precision. I found a nice code for it on Stackoverflow.

-->

---
layout: center
---

```ts
// From here: https://stackoverflow.com/a/11832950
function round(num: number, precision: number = 2) {
  return Math.round((num + Number.EPSILON) * 10 ** precision) / 10 ** precision;
}
```

<v-click>

```ts
function arraysEqual<ItemType>(a: ItemType[], b: ItemType[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;

  return true;
}
```

</v-click>

<!--
And for the isEqual, [CLICK] we're only comparing arrays of numbers, so this code was more than enough.

And lodash is out! Now our package is 100% dependency free!
-->

---
layout: fact
---

# <span text="green-400"> 0 Dependencies</span>

<!-- This is dummy for slidev to trigger the confetti -->
<v-click>
  <span />
</v-click>

<div v-if="$slidev.nav.clicks === 1">
  <ConfettiDemo />
</div>

<!--
[CLICK] 

And what about the bundle size?
-->

---
layout: fact
---

# <span text="red-400">17.1KB</span> min+br

<!--
Remember the original's size? That was 17.1KB. Can I get any guesses how much the current size may be, after you compile the svelte file, and bundle it separately? Any guesses?

[Wait 5 seconds]
-->

---
layout: fact
---

# <span text="green-400">2.46KB</span> min+br

<v-click>

## 7x Smaller

</v-click>

<!-- This is dummy for slidev to trigger the confetti -->
<v-click>
  <span />
</v-click>

<div v-if="$slidev.nav.clicks === 2">
  <ConfettiDemo />
</div>

<!--
It's less than 2.5KB now. Yepp, that is almost 7x times smaller! [CLICK] And its faster too, as there's no Virtual DOM, no CSS in JS, very little runtime, and most importantly, we are not generating thousands of lines of CSS in the browser.

I would say this occassion calls for some confetti.
-->

---
layout: fact
---

## `pnpm add svelte-confetti-explosion`

<!--

I published this little package on npm, you can find this as `svelte-confetti-explosion`

And, that was my talk!

-->


---
layout: center
---

<img src="/and-thats-all.png"  />

<!-- This is dummy for slidev to trigger the confetti -->
<v-click>
  <span />
</v-click>

<div v-if="$slidev.nav.clicks === 1">
  <ConfettiEnd />
</div>

<!--

Thank you! 

-->
