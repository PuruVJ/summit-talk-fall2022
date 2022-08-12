<script setup lang="ts">
import { vDraggable } from '@neodrag/vue';

declare type DragBoundsCoords = {
  /** Number of pixels from left of the document */
  left: number;
  /** Number of pixels from top of the document */
  top: number;
  /** Number of pixels from the right side of document */
  right: number;
  /** Number of pixels from the bottom of the document */
  bottom: number;
};
declare type DragAxis = 'both' | 'x' | 'y' | 'none';
declare type DragBounds =
  | HTMLElement
  | Partial<DragBoundsCoords>
  | 'parent'
  | 'body'
  | (string & Record<never, never>);
declare type DragEventData = {
  offsetX: number;
  offsetY: number;
  domRect: DOMRect;
};
declare type DragOptions = {
  /**
   * Optionally limit the drag area
   *
   * Accepts `parent` as prefixed value, and limits it to its parent.
   *
   * Or, you can specify any selector and it will be bound to that.
   *
   * **Note**: We don't check whether the selector is bigger than the node element.
   * You yourself will have to make sure of that, or it may lead to strange behavior
   *
   * Or, finally, you can pass an object of type `{ top: number; right: number; bottom: number; left: number }`.
   * These mimic the css `top`, `right`, `bottom` and `left`, in the sense that `bottom` starts from the bottom of the window, and `right` from right of window.
   * If any of these properties are unspecified, they are assumed to be `0`.
   */
  bounds?: DragBounds;
  /**
   * Axis on which the element can be dragged on. Valid values: `both`, `x`, `y`, `none`.
   *
   * - `both` - Element can move in any direction
   * - `x` - Only horizontal movement possible
   * - `y` - Only vertical movement possible
   * - `none` - No movement at all
   *
   * @default 'both'
   */
  axis?: DragAxis;
  /**
   * If true, uses `translate3d` instead of `translate` to move the element around, and the hardware acceleration kicks in.
   *
   * `true` by default, but can be set to `false` if [blurry text issue](https://developpaper.com/question/why-does-the-use-of-css3-translate3d-result-in-blurred-display/) occur
   *
   * @default true
   */
  gpuAcceleration?: boolean;
  /**
   * Applies `user-select: none` on `<body />` element when dragging,
   * to prevent the irritating effect where dragging doesn't happen and the text is selected.
   * Applied when dragging starts and removed when it stops.
   *
   * Can be disabled using this option
   *
   * @default true
   */
  applyUserSelectHack?: boolean;
  /**
   * Ignores touch events with more than 1 touch.
   * This helps when you have multiple elements on a canvas where you want to implement
   * pinch-to-zoom behaviour.
   *
   * @default false
   *
   */
  ignoreMultitouch?: boolean;
  /**
   * Disables dragging altogether.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Applies a grid on the page to which the element snaps to when dragging, rather than the default continuous grid.
   *
   * `Note`: If you're programmatically creating the grid, do not set it to [0, 0] ever, that will stop drag at all. Set it to `undefined`.
   *
   * @default undefined
   */
  grid?: [number, number];
  /**
   * Control the position manually with your own state
   *
   * By default, the element will be draggable by mouse/finger, and all options will work as default while dragging.
   *
   * But changing the `position` option will also move the draggable around. These parameters are reactive,
   * so using Svelte's reactive variables as values for position will work like a charm.
   *
   *
   * Note: If you set `disabled: true`, you'll still be able to move the draggable through state variables. Only the user interactions won't work
   *
   */
  position?: {
    x: number;
    y: number;
  };
  /**
   * CSS Selector of an element or multiple elements inside the parent node(on which `use:draggable` is applied).
   *
   * Can be an element or elements too. If it is provided, Trying to drag inside the `cancel` element(s) will prevent dragging.
   *
   * @default undefined
   */
  cancel?: string | HTMLElement | HTMLElement[];
  /**
   * CSS Selector of an element or multiple elements inside the parent node(on which `use:draggable` is applied). Can be an element or elements too.
   *
   * If it is provided, Only clicking and dragging on this element will allow the parent to drag, anywhere else on the parent won't work.
   *
   * @default undefined
   */
  handle?: string | HTMLElement | HTMLElement[];
  /**
   * Class to apply on the element on which `use:draggable` is applied.
   * Note that if `handle` is provided, it will still apply class on the element to which this action is applied, **NOT** the handle
   *
   */
  defaultClass?: string;
  /**
   * Class to apply on the element when it is dragging
   *
   * @default 'neodrag-dragging'
   */
  defaultClassDragging?: string;
  /**
   * Class to apply on the element if it has been dragged at least once.
   *
   * @default 'neodrag-dragged'
   */
  defaultClassDragged?: string;
  /**
   * Offsets your element to the position you specify in the very beginning.
   * `x` and `y` should be in pixels
   *
   */
  defaultPosition?: {
    x: number;
    y: number;
  };
  /**
   * Fires when dragging start
   */
  onDragStart?: (data: DragEventData) => void;
  /**
   * Fires when dragging is going on
   */
  onDrag?: (data: DragEventData) => void;
  /**
   * Fires when dragging ends
   */
  onDragEnd?: (data: DragEventData) => void;
};

const props = defineProps<DragOptions>();
</script>

<template>
  <div v-draggable="props">
    <slot>I am draggable</slot>
  </div>
</template>

<style scoped>
div {
  width: 150px;
  height: 150px;

  color: black;

  background: aquamarine;

  display: grid;
  place-items: center;
}
</style>
