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
lineNumbers: true
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
presenterImage: /puru-cat-photo.jpeg
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
  font-size: 0.15rem;
}
</style>

---