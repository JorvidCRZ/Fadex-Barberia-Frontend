import {
  FocusTrap
} from "./chunk-PBERNHWM.js";
import {
  zindexutils
} from "./chunk-OHFYJZH5.js";
import {
  MotionDirective,
  MotionModule
} from "./chunk-CQDTUEQU.js";
import {
  blockBodyScroll,
  unblockBodyScroll
} from "./chunk-VKUYHHYD.js";
import {
  Ripple
} from "./chunk-YMDHHTAC.js";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  TimesIcon
} from "./chunk-34VLFIXD.js";
import "./chunk-3WBGCZC6.js";
import {
  BaseComponent,
  PARENT_INSTANCE
} from "./chunk-CFVD6AOW.js";
import {
  BaseStyle
} from "./chunk-7LUITJS5.js";
import {
  Bind,
  BindModule
} from "./chunk-RFX47YJQ.js";
import {
  PrimeTemplate,
  SharedModule
} from "./chunk-SKV3H6PS.js";
import {
  P,
  Q,
  W,
  Y,
  _t,
  bt,
  s3 as s,
  z
} from "./chunk-HEA754HI.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-LFUJRON5.js";
import "./chunk-JAJ76GOU.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostListener,
  Injectable,
  Input,
  KeyValueDiffers,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  input,
  numberAttribute,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresolveDocument,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵviewQuery
} from "./chunk-FR73ZBHC.js";
import {
  EventEmitter,
  InjectionToken,
  computed,
  inject,
  signal,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵnamespaceSVG,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-EGORNBH2.js";
import "./chunk-Y72XGDAT.js";
import "./chunk-HSWANC32.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/galleria/index.mjs
var style = "\n    .p-galleria {\n        overflow: hidden;\n        border-style: solid;\n        border-width: dt('galleria.border.width');\n        border-color: dt('galleria.border.color');\n        border-radius: dt('galleria.border.radius');\n    }\n\n    .p-galleria-content {\n        display: flex;\n        flex-direction: column;\n    }\n\n    .p-galleria-items-container {\n        display: flex;\n        flex-direction: column;\n        position: relative;\n    }\n\n    .p-galleria-items {\n        position: relative;\n        display: flex;\n        height: 100%;\n    }\n\n    .p-galleria-nav-button {\n        position: absolute !important;\n        top: 50%;\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        background: dt('galleria.nav.button.background');\n        color: dt('galleria.nav.button.color');\n        width: dt('galleria.nav.button.size');\n        height: dt('galleria.nav.button.size');\n        transition:\n            background dt('galleria.transition.duration'),\n            color dt('galleria.transition.duration'),\n            outline-color dt('galleria.transition.duration'),\n            box-shadow dt('galleria.transition.duration');\n        margin: calc(-1 * calc(dt('galleria.nav.button.size')) / 2) dt('galleria.nav.button.gutter') 0 dt('galleria.nav.button.gutter');\n        padding: 0;\n        user-select: none;\n        border: 0 none;\n        cursor: pointer;\n        outline-color: transparent;\n    }\n\n    .p-galleria-nav-button:not(.p-disabled):hover {\n        background: dt('galleria.nav.button.hover.background');\n        color: dt('galleria.nav.button.hover.color');\n    }\n\n    .p-galleria-nav-button:not(.p-disabled):focus-visible {\n        box-shadow: dt('galleria.nav.button.focus.ring.shadow');\n        outline: dt('galleria.nav.button.focus.ring.width') dt('galleria.nav.button.focus.ring.style') dt('galleria.nav.button.focus.ring.color');\n        outline-offset: dt('galleria.nav.button.focus.ring.offset');\n    }\n\n    .p-galleria-next-icon,\n    .p-galleria-prev-icon {\n        font-size: dt('galleria.nav.icon.size');\n        width: dt('galleria.nav.icon.size');\n        height: dt('galleria.nav.icon.size');\n    }\n\n    .p-galleria-prev-button {\n        border-radius: dt('galleria.nav.button.prev.border.radius');\n        left: 0;\n    }\n\n    .p-galleria-next-button {\n        border-radius: dt('galleria.nav.button.next.border.radius');\n        right: 0;\n    }\n\n    .p-galleria-prev-button:dir(rtl) {\n        left: auto;\n        right: 0;\n        transform: rotate(180deg);\n    }\n\n    .p-galleria-next-button:dir(rtl) {\n        right: auto;\n        left: 0;\n        transform: rotate(180deg);\n    }\n\n    .p-galleria-item {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        height: 100%;\n        width: 100%;\n    }\n\n    .p-galleria-hover-navigators .p-galleria-nav-button {\n        pointer-events: none;\n        opacity: 0;\n        transition: opacity dt('galleria.transition.duration') ease-in-out;\n    }\n\n    .p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button {\n        pointer-events: all;\n        opacity: 1;\n    }\n\n    .p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button.p-disabled {\n        pointer-events: none;\n    }\n\n    .p-galleria-caption {\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        background: dt('galleria.caption.background');\n        color: dt('galleria.caption.color');\n        padding: dt('galleria.caption.padding');\n    }\n\n    .p-galleria-thumbnails {\n        display: flex;\n        flex-direction: column;\n        overflow: auto;\n        flex-shrink: 0;\n    }\n\n    .p-galleria-thumbnail-nav-button {\n        align-self: center;\n        flex: 0 0 auto;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n        margin: 0 dt('galleria.thumbnail.nav.button.gutter');\n        padding: 0;\n        border: none;\n        user-select: none;\n        cursor: pointer;\n        background: transparent;\n        color: dt('galleria.thumbnail.nav.button.color');\n        width: dt('galleria.thumbnail.nav.button.size');\n        height: dt('galleria.thumbnail.nav.button.size');\n        transition:\n            background dt('galleria.transition.duration'),\n            color dt('galleria.transition.duration'),\n            outline-color dt('galleria.transition.duration');\n        outline-color: transparent;\n        border-radius: dt('galleria.thumbnail.nav.button.border.radius');\n    }\n\n    .p-galleria-thumbnail-nav-button:hover {\n        background: dt('galleria.thumbnail.nav.button.hover.background');\n        color: dt('galleria.thumbnail.nav.button.hover.color');\n    }\n\n    .p-galleria-thumbnail-nav-button:focus-visible {\n        box-shadow: dt('galleria.thumbnail.nav.button.focus.ring.shadow');\n        outline: dt('galleria.thumbnail.nav.button.focus.ring.width') dt('galleria.thumbnail.nav.button.focus.ring.style') dt('galleria.thumbnail.nav.button.focus.ring.color');\n        outline-offset: dt('galleria.thumbnail.nav.button.focus.ring.offset');\n    }\n\n    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-next-icon,\n    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-prev-icon {\n        font-size: dt('galleria.thumbnail.nav.button.icon.size');\n        width: dt('galleria.thumbnail.nav.button.icon.size');\n        height: dt('galleria.thumbnail.nav.button.icon.size');\n    }\n\n    .p-galleria-thumbnails-content {\n        display: flex;\n        flex-direction: row;\n        background: dt('galleria.thumbnails.content.background');\n        padding: dt('galleria.thumbnails.content.padding');\n    }\n\n    .p-galleria-thumbnails-viewport {\n        overflow: hidden;\n        width: 100%;\n    }\n\n    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-prev-button:dir(rtl),\n    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-next-button:dir(rtl) {\n        transform: rotate(180deg);\n    }\n\n    .p-galleria-thumbnail-items {\n        display: flex;\n    }\n\n    .p-galleria-thumbnail-items:dir(rtl) {\n        flex-direction: row-reverse;\n    }\n\n    .p-galleria-thumbnail-item {\n        overflow: auto;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        opacity: 0.5;\n    }\n\n    .p-galleria-thumbnail {\n        outline-color: transparent;\n    }\n\n    .p-galleria-thumbnail-item:hover {\n        opacity: 1;\n        transition: opacity 0.3s;\n    }\n\n    .p-galleria-thumbnail-item-current {\n        opacity: 1;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-content,\n    .p-galleria-thumbnails-right .p-galleria-content {\n        flex-direction: row;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-items-container,\n    .p-galleria-thumbnails-right .p-galleria-items-container {\n        flex-direction: row;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-items-container,\n    .p-galleria-thumbnails-top .p-galleria-items-container {\n        order: 2;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-thumbnails,\n    .p-galleria-thumbnails-top .p-galleria-thumbnails {\n        order: 1;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-thumbnails-content,\n    .p-galleria-thumbnails-right .p-galleria-thumbnails-content {\n        flex-direction: column;\n        flex-grow: 1;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-thumbnail-items,\n    .p-galleria-thumbnails-right .p-galleria-thumbnail-items {\n        flex-direction: column;\n        height: 100%;\n    }\n\n    .p-galleria-indicator-list {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        padding: dt('galleria.indicator.list.padding');\n        gap: dt('galleria.indicator.list.gap');\n        margin: 0;\n        list-style: none;\n    }\n\n    .p-galleria-indicator-button {\n        display: inline-flex;\n        align-items: center;\n        background: dt('galleria.indicator.button.background');\n        width: dt('galleria.indicator.button.width');\n        height: dt('galleria.indicator.button.height');\n        transition:\n            background dt('galleria.transition.duration'),\n            color dt('galleria.transition.duration'),\n            outline-color dt('galleria.transition.duration'),\n            box-shadow dt('galleria.transition.duration');\n        outline-color: transparent;\n        border-radius: dt('galleria.indicator.button.border.radius');\n        margin: 0;\n        padding: 0;\n        border: none;\n        user-select: none;\n        cursor: pointer;\n    }\n\n    .p-galleria-indicator-button:hover {\n        background: dt('galleria.indicator.button.hover.background');\n    }\n\n    .p-galleria-indicator-button:focus-visible {\n        box-shadow: dt('galleria.indicator.button.focus.ring.shadow');\n        outline: dt('galleria.indicator.button.focus.ring.width') dt('galleria.indicator.button.focus.ring.style') dt('galleria.indicator.button.focus.ring.color');\n        outline-offset: dt('galleria.indicator.button.focus.ring.offset');\n    }\n\n    .p-galleria-indicator-active .p-galleria-indicator-button {\n        background: dt('galleria.indicator.button.active.background');\n    }\n\n    .p-galleria-indicators-left .p-galleria-items-container,\n    .p-galleria-indicators-right .p-galleria-items-container {\n        flex-direction: row;\n        align-items: center;\n    }\n\n    .p-galleria-indicators-left .p-galleria-items,\n    .p-galleria-indicators-top .p-galleria-items {\n        order: 2;\n    }\n\n    .p-galleria-indicators-left .p-galleria-indicator-list,\n    .p-galleria-indicators-top .p-galleria-indicator-list {\n        order: 1;\n    }\n\n    .p-galleria-indicators-left .p-galleria-indicator-list,\n    .p-galleria-indicators-right .p-galleria-indicator-list {\n        flex-direction: column;\n    }\n\n    .p-galleria-inset-indicators .p-galleria-indicator-list {\n        position: absolute;\n        display: flex;\n        z-index: 1;\n        background: dt('galleria.inset.indicator.list.background');\n    }\n\n    .p-galleria-inset-indicators .p-galleria-indicator-button {\n        background: dt('galleria.inset.indicator.button.background');\n    }\n\n    .p-galleria-inset-indicators .p-galleria-indicator-button:hover {\n        background: dt('galleria.inset.indicator.button.hover.background');\n    }\n\n    .p-galleria-inset-indicators .p-galleria-indicator-active .p-galleria-indicator-button {\n        background: dt('galleria.inset.indicator.button.active.background');\n    }\n\n    .p-galleria-inset-indicators.p-galleria-indicators-top .p-galleria-indicator-list {\n        top: 0;\n        left: 0;\n        width: 100%;\n        align-items: flex-start;\n    }\n\n    .p-galleria-inset-indicators.p-galleria-indicators-right .p-galleria-indicator-list {\n        right: 0;\n        top: 0;\n        height: 100%;\n        align-items: flex-end;\n    }\n\n    .p-galleria-inset-indicators.p-galleria-indicators-bottom .p-galleria-indicator-list {\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        align-items: flex-end;\n    }\n\n    .p-galleria-inset-indicators.p-galleria-indicators-left .p-galleria-indicator-list {\n        left: 0;\n        top: 0;\n        height: 100%;\n        align-items: flex-start;\n    }\n\n    .p-galleria-mask {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-galleria-close-button {\n        position: absolute !important;\n        top: 0;\n        right: 0;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        margin: dt('galleria.close.button.gutter');\n        background: dt('galleria.close.button.background');\n        color: dt('galleria.close.button.color');\n        width: dt('galleria.close.button.size');\n        height: dt('galleria.close.button.size');\n        padding: 0;\n        border: none;\n        user-select: none;\n        cursor: pointer;\n        border-radius: dt('galleria.close.button.border.radius');\n        outline-color: transparent;\n        transition:\n            background dt('galleria.transition.duration'),\n            color dt('galleria.transition.duration'),\n            outline-color dt('galleria.transition.duration');\n    }\n\n    .p-galleria-close-icon {\n        font-size: dt('galleria.close.button.icon.size');\n        width: dt('galleria.close.button.icon.size');\n        height: dt('galleria.close.button.icon.size');\n    }\n\n    .p-galleria-close-button:hover {\n        background: dt('galleria.close.button.hover.background');\n        color: dt('galleria.close.button.hover.color');\n    }\n\n    .p-galleria-close-button:focus-visible {\n        box-shadow: dt('galleria.close.button.focus.ring.shadow');\n        outline: dt('galleria.close.button.focus.ring.width') dt('galleria.close.button.focus.ring.style') dt('galleria.close.button.focus.ring.color');\n        outline-offset: dt('galleria.close.button.focus.ring.offset');\n    }\n\n    .p-galleria-mask .p-galleria-nav-button {\n        position: fixed;\n        top: 50%;\n    }\n\n       .p-items-hidden .p-galleria-thumbnail-item {\n        visibility: hidden;\n    }\n\n    .p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active {\n        visibility: visible;\n    }\n\n    .p-galleria-enter-active {\n        animation: p-animate-galleria-enter 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    .p-galleria-leave-active {\n        animation: p-animate-galleria-leave 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    .p-galleria-enter-active .p-galleria-nav-button {\n        opacity: 0;\n    }\n\n    @keyframes p-animate-galleria-enter {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-galleria-leave {\n        from {\n            opacity: 1;\n            transform: scale(1);\n        }\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-galleria.mjs
var _c0 = ["header"];
var _c1 = ["footer"];
var _c2 = ["indicator"];
var _c3 = ["caption"];
var _c4 = ["closeicon"];
var _c5 = ["previousthumbnailicon"];
var _c6 = ["nextthumbnailicon"];
var _c7 = ["itempreviousicon"];
var _c8 = ["itemnexticon"];
var _c9 = ["item"];
var _c10 = ["thumbnail"];
var _c11 = ["container"];
function Galleria_div_0_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 6);
    ɵɵlistener("pMotionOnBeforeEnter", function Galleria_div_0_Conditional_2_Conditional_1_Template_div_pMotionOnBeforeEnter_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onBeforeEnter($event));
    })("pMotionOnBeforeLeave", function Galleria_div_0_Conditional_2_Conditional_1_Template_div_pMotionOnBeforeLeave_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onBeforeLeave());
    })("pMotionOnAfterLeave", function Galleria_div_0_Conditional_2_Conditional_1_Template_div_pMotionOnAfterLeave_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onAfterLeave());
    })("maskHide", function Galleria_div_0_Conditional_2_Conditional_1_Template_div_maskHide_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onMaskHide());
    })("activeItemChange", function Galleria_div_0_Conditional_2_Conditional_1_Template_div_activeItemChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onActiveItemChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("pMotion", ctx_r1.visible)("pMotionAppear", true)("pMotionName", "p-galleria")("pMotionOptions", ctx_r1.computedMotionOptions())("value", ctx_r1.value)("activeIndex", ctx_r1.activeIndex)("numVisible", ctx_r1.numVisibleLimit || ctx_r1.numVisible)("ngStyle", ctx_r1.containerStyle)("fullScreen", ctx_r1.fullScreen)("pt", ctx_r1.pt())("pFocusTrapDisabled", !ctx_r1.fullScreen)("unstyled", ctx_r1.unstyled());
  }
}
function Galleria_div_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4);
    ɵɵlistener("pMotionOnAfterLeave", function Galleria_div_0_Conditional_2_Template_div_pMotionOnAfterLeave_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onMaskAfterLeave());
    })("click", function Galleria_div_0_Conditional_2_Template_div_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onMaskHide($event));
    });
    ɵɵconditionalCreate(1, Galleria_div_0_Conditional_2_Conditional_1_Template, 1, 12, "div", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.maskClass);
    ɵɵproperty("pBind", ctx_r1.ptm("mask"))("pMotion", ctx_r1.maskVisible)("pMotionAppear", true)("pMotionEnterActiveClass", ctx_r1.fullScreen ? "p-overlay-mask-enter-active" : "")("pMotionLeaveActiveClass", ctx_r1.fullScreen ? "p-overlay-mask-leave-active" : "")("pMotionOptions", ctx_r1.computedMaskMotionOptions())("ngClass", ctx_r1.cx("mask"));
    ɵɵattribute("role", ctx_r1.fullScreen ? "dialog" : "region")("aria-modal", ctx_r1.fullScreen ? "true" : void 0);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.renderContent() ? 1 : -1);
  }
}
function Galleria_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", null, 1);
    ɵɵconditionalCreate(2, Galleria_div_0_Conditional_2_Template, 2, 12, "div", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.renderMask() ? 2 : -1);
  }
}
function Galleria_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7);
    ɵɵlistener("activeItemChange", function Galleria_ng_template_1_Template_div_activeItemChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onActiveItemChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("pt", ctx_r1.pt())("unstyled", ctx_r1.unstyled())("value", ctx_r1.value)("activeIndex", ctx_r1.activeIndex)("numVisible", ctx_r1.numVisibleLimit || ctx_r1.numVisible);
  }
}
var _c12 = ["closeButton"];
var _c13 = () => ({});
var _c14 = ["pGalleriaContent", ""];
function GalleriaContent_ng_container_0_button_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 10);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.cx("closeIcon"));
    ɵɵproperty("pBind", ctx_r2.getPTOptions("closeIcon"));
  }
}
function GalleriaContent_ng_container_0_button_1_2_ng_template_0_Template(rf, ctx) {
}
function GalleriaContent_ng_container_0_button_1_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, GalleriaContent_ng_container_0_button_1_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function GalleriaContent_ng_container_0_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 7);
    ɵɵlistener("click", function GalleriaContent_ng_container_0_button_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.maskHide.emit());
    });
    ɵɵtemplate(1, GalleriaContent_ng_container_0_button_1__svg_svg_1_Template, 1, 3, "svg", 8)(2, GalleriaContent_ng_container_0_button_1_2_Template, 1, 0, null, 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("closeButton"));
    ɵɵproperty("pBind", ctx_r2.getPTOptions("closeButton"));
    ɵɵattribute("aria-label", ctx_r2.closeAriaLabel());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.galleria.closeIconTemplate && !ctx_r2.galleria._closeIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.galleria.closeIconTemplate || ctx_r2.galleria._closeIconTemplate);
  }
}
function GalleriaContent_ng_container_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 11);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("header"));
    ɵɵproperty("unstyled", ctx_r2.unstyled())("templates", ctx_r2.galleria.templates)("pBind", ctx_r2.getPTOptions("header"));
  }
}
function GalleriaContent_ng_container_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 12);
    ɵɵlistener("onActiveIndexChange", function GalleriaContent_ng_container_0_div_5_Template_div_onActiveIndexChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onActiveIndexChange($event));
    })("stopSlideShow", function GalleriaContent_ng_container_0_div_5_Template_div_stopSlideShow_0_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.stopSlideShow());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("containerId", ctx_r2.id)("value", ctx_r2.value)("activeIndex", ctx_r2.activeIndex)("templates", ctx_r2.galleria.templates)("numVisible", ctx_r2.numVisible)("responsiveOptions", ctx_r2.galleria.responsiveOptions)("circular", ctx_r2.galleria.circular)("isVertical", ctx_r2.isVertical())("contentHeight", ctx_r2.galleria.verticalThumbnailViewPortHeight)("showThumbnailNavigators", ctx_r2.galleria.showThumbnailNavigators)("slideShowActive", ctx_r2.slideShowActive)("pt", ctx_r2.pt())("unstyled", ctx_r2.unstyled());
  }
}
function GalleriaContent_ng_container_0_div_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 13);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("footer"));
    ɵɵproperty("pBind", ctx_r2.getPTOptions("footer"))("templates", ctx_r2.galleria.templates)("unstyled", ctx_r2.unstyled());
  }
}
function GalleriaContent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, GalleriaContent_ng_container_0_button_1_Template, 3, 6, "button", 1)(2, GalleriaContent_ng_container_0_div_2_Template, 1, 5, "div", 2);
    ɵɵelementStart(3, "div", 3)(4, "div", 4);
    ɵɵlistener("onActiveIndexChange", function GalleriaContent_ng_container_0_Template_div_onActiveIndexChange_4_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onActiveIndexChange($event));
    })("startSlideShow", function GalleriaContent_ng_container_0_Template_div_startSlideShow_4_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.startSlideShow());
    })("stopSlideShow", function GalleriaContent_ng_container_0_Template_div_stopSlideShow_4_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.stopSlideShow());
    });
    ɵɵelementEnd();
    ɵɵtemplate(5, GalleriaContent_ng_container_0_div_5_Template, 1, 13, "div", 5);
    ɵɵelementEnd();
    ɵɵtemplate(6, GalleriaContent_ng_container_0_div_6_Template, 1, 5, "div", 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.galleria.fullScreen);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.galleria.templates && (ctx_r2.galleria.headerFacet || ctx_r2.galleria.headerTemplate));
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.cx("content"));
    ɵɵproperty("pBind", ctx_r2.getPTOptions("content"));
    ɵɵattribute("aria-live", ctx_r2.galleria.autoPlay ? "polite" : "off");
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.cx("itemsContainer"));
    ɵɵproperty("id", ctx_r2.id)("value", ctx_r2.value)("activeIndex", ctx_r2.activeIndex)("circular", ctx_r2.galleria.circular)("templates", ctx_r2.galleria.templates)("showIndicators", ctx_r2.galleria.showIndicators)("changeItemOnIndicatorHover", ctx_r2.galleria.changeItemOnIndicatorHover)("indicatorFacet", ctx_r2.galleria.indicatorFacet)("captionFacet", ctx_r2.galleria.captionFacet)("showItemNavigators", ctx_r2.galleria.showItemNavigators)("autoPlay", ctx_r2.galleria.autoPlay)("slideShowActive", ctx_r2.slideShowActive)("pt", ctx_r2.pt())("unstyled", ctx_r2.unstyled());
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.galleria.showThumbnails);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.shouldRenderFooter());
  }
}
var _c15 = ["pGalleriaItemSlot", ""];
function GalleriaItemSlot_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function GalleriaItemSlot_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, GalleriaItemSlot_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate)("ngTemplateOutletContext", ctx_r0.context);
  }
}
var _c16 = ["pGalleriaItem", ""];
var _c17 = (a0) => ({
  index: a0
});
function GalleriaItem_button_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 8);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("prevIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("prevIcon"));
  }
}
function GalleriaItem_button_1_2_ng_template_0_Template(rf, ctx) {
}
function GalleriaItem_button_1_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, GalleriaItem_button_1_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function GalleriaItem_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 5);
    ɵɵlistener("click", function GalleriaItem_button_1_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.navBackward($event));
    })("focus", function GalleriaItem_button_1_Template_button_focus_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onButtonFocus("left"));
    })("blur", function GalleriaItem_button_1_Template_button_blur_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onButtonBlur("left"));
    });
    ɵɵtemplate(1, GalleriaItem_button_1__svg_svg_1_Template, 1, 3, "svg", 6)(2, GalleriaItem_button_1_2_Template, 1, 0, null, 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("prevButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("prevButton"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.galleria.itemPreviousIconTemplate && !ctx_r1.galleria._itemPreviousIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.galleria.itemPreviousIconTemplate || ctx_r1.galleria._itemPreviousIconTemplate);
  }
}
function GalleriaItem_button_3__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 10);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("nextIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("nextIcon"));
  }
}
function GalleriaItem_button_3_2_ng_template_0_Template(rf, ctx) {
}
function GalleriaItem_button_3_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, GalleriaItem_button_3_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function GalleriaItem_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 5);
    ɵɵlistener("click", function GalleriaItem_button_3_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.navForward($event));
    })("focus", function GalleriaItem_button_3_Template_button_focus_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onButtonFocus("right"));
    })("blur", function GalleriaItem_button_3_Template_button_blur_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onButtonBlur("right"));
    });
    ɵɵtemplate(1, GalleriaItem_button_3__svg_svg_1_Template, 1, 3, "svg", 9)(2, GalleriaItem_button_3_2_Template, 1, 0, null, 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("nextButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("nextButton"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.galleria.itemNextIconTemplate && !ctx_r1.galleria._itemNextIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.galleria.itemNextIconTemplate || ctx_r1.galleria._itemNextIconTemplate);
  }
}
function GalleriaItem_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 11);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("caption"));
    ɵɵproperty("pBind", ctx_r1.ptm("caption"))("unstyled", ctx_r1.unstyled())("item", ctx_r1.activeItem)("templates", ctx_r1.templates);
  }
}
function GalleriaItem_ul_5_li_1_button_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "button", 16);
  }
  if (rf & 2) {
    const index_r5 = ɵɵnextContext().index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("indicatorButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("indicatorButton", ctx_r1.getIndicatorPTOptions(index_r5)));
  }
}
function GalleriaItem_ul_5_li_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "div", 17);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const index_r5 = ɵɵnextContext().index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("index", index_r5)("templates", ctx_r1.templates)("pBind", ctx_r1.ptm("item"))("unstyled", ctx_r1.unstyled());
  }
}
function GalleriaItem_ul_5_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 13);
    ɵɵlistener("click", function GalleriaItem_ul_5_li_1_Template_li_click_0_listener() {
      const index_r5 = ɵɵrestoreView(_r4).index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onIndicatorClick(index_r5));
    })("mouseenter", function GalleriaItem_ul_5_li_1_Template_li_mouseenter_0_listener() {
      const index_r5 = ɵɵrestoreView(_r4).index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onIndicatorMouseEnter(index_r5));
    })("keydown", function GalleriaItem_ul_5_li_1_Template_li_keydown_0_listener($event) {
      const index_r5 = ɵɵrestoreView(_r4).index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onIndicatorKeyDown($event, index_r5));
    });
    ɵɵtemplate(1, GalleriaItem_ul_5_li_1_button_1_Template, 1, 3, "button", 14)(2, GalleriaItem_ul_5_li_1_ng_container_2_Template, 2, 4, "ng-container", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const index_r5 = ctx.index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("indicator", ɵɵpureFunction1(10, _c17, index_r5)));
    ɵɵproperty("pBind", ctx_r1.getIndicatorPTOptions(index_r5))("pBind", ctx_r1.ptm("indicator", ctx_r1.getIndicatorPTOptions(index_r5)));
    ɵɵattribute("aria-label", ctx_r1.ariaPageLabel(index_r5 + 1))("aria-selected", ctx_r1.activeIndex === index_r5)("aria-controls", ctx_r1.id + "_item_" + index_r5)("data-p-active", ctx_r1.isIndicatorItemActive(index_r5));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.indicatorFacet && !ctx_r1.galleria.indicatorTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.indicatorFacet || ctx_r1.galleria.indicatorTemplate);
  }
}
function GalleriaItem_ul_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 0);
    ɵɵtemplate(1, GalleriaItem_ul_5_li_1_Template, 3, 12, "li", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("indicatorList"));
    ɵɵproperty("pBind", ctx_r1.ptm("indicatorList"));
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.value);
  }
}
var _c18 = ["itemsContainer"];
var _c19 = ["pGalleriaThumbnails", ""];
var _c20 = (a0) => ({
  height: a0
});
var _c21 = (a0, a1) => ({
  index: a0,
  activeIndex: a1
});
function GalleriaThumbnails_button_1_ng_container_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 11);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("thumbnailPrevIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("thumbnailPrevIcon"));
  }
}
function GalleriaThumbnails_button_1_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 12);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("thumbnailPrevIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("thumbnailPrevIcon"));
  }
}
function GalleriaThumbnails_button_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, GalleriaThumbnails_button_1_ng_container_1__svg_svg_1_Template, 1, 3, "svg", 9)(2, GalleriaThumbnails_button_1_ng_container_1__svg_svg_2_Template, 1, 3, "svg", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.isVertical);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.isVertical);
  }
}
function GalleriaThumbnails_button_1_2_ng_template_0_Template(rf, ctx) {
}
function GalleriaThumbnails_button_1_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, GalleriaThumbnails_button_1_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function GalleriaThumbnails_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 6);
    ɵɵlistener("click", function GalleriaThumbnails_button_1_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.navBackward($event));
    });
    ɵɵtemplate(1, GalleriaThumbnails_button_1_ng_container_1_Template, 3, 2, "ng-container", 7)(2, GalleriaThumbnails_button_1_2_Template, 1, 0, null, 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("thumbnailPrevButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("thumbnailPrevButton"));
    ɵɵattribute("aria-label", ctx_r1.ariaPrevButtonLabel());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.galleria.previousThumbnailIconTemplate && !ctx_r1.galleria._previousThumbnailIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.galleria.previousThumbnailIconTemplate || ctx_r1.galleria._previousThumbnailIconTemplate);
  }
}
function GalleriaThumbnails_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 13);
    ɵɵlistener("keydown", function GalleriaThumbnails_div_5_Template_div_keydown_0_listener($event) {
      const index_r4 = ɵɵrestoreView(_r3).index;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onThumbnailKeydown($event, index_r4));
    });
    ɵɵelementStart(1, "div", 14);
    ɵɵlistener("click", function GalleriaThumbnails_div_5_Template_div_click_1_listener() {
      const index_r4 = ɵɵrestoreView(_r3).index;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onItemClick(index_r4));
    })("touchend", function GalleriaThumbnails_div_5_Template_div_touchend_1_listener() {
      const index_r4 = ɵɵrestoreView(_r3).index;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onItemClick(index_r4));
    })("keydown.enter", function GalleriaThumbnails_div_5_Template_div_keydown_enter_1_listener() {
      const index_r4 = ɵɵrestoreView(_r3).index;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onItemClick(index_r4));
    });
    ɵɵelement(2, "div", 15);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const index_r4 = ctx.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("thumbnailItem", ɵɵpureFunction2(16, _c21, index_r4, ctx_r1.activeIndex)));
    ɵɵproperty("pBind", ctx_r1.ptm("thumbnailItem"));
    ɵɵattribute("aria-selected", ctx_r1.activeIndex === index_r4)("aria-controls", ctx_r1.containerId + "_item_" + index_r4)("data-p-active", ctx_r1.activeIndex === index_r4);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("thumbnail"));
    ɵɵproperty("pBind", ctx_r1.ptm("thumbnail"));
    ɵɵattribute("tabindex", ctx_r1.activeIndex === index_r4 ? 0 : -1)("aria-current", ctx_r1.activeIndex === index_r4 ? "page" : void 0)("aria-label", ctx_r1.ariaPageLabel(index_r4 + 1));
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r1.ptm("thumbnailItem"))("item", item_r5)("templates", ctx_r1.templates)("unstyled", ctx_r1.unstyled());
  }
}
function GalleriaThumbnails_button_6_ng_container_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 18);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("thumbnailNextIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("thumbnailNextIcon"));
  }
}
function GalleriaThumbnails_button_6_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 19);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("thumbnailNextIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("thumbnailNextIcon"));
  }
}
function GalleriaThumbnails_button_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, GalleriaThumbnails_button_6_ng_container_1__svg_svg_1_Template, 1, 3, "svg", 16)(2, GalleriaThumbnails_button_6_ng_container_1__svg_svg_2_Template, 1, 3, "svg", 17);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.isVertical);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.isVertical);
  }
}
function GalleriaThumbnails_button_6_2_ng_template_0_Template(rf, ctx) {
}
function GalleriaThumbnails_button_6_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, GalleriaThumbnails_button_6_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function GalleriaThumbnails_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 6);
    ɵɵlistener("click", function GalleriaThumbnails_button_6_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.navForward($event));
    });
    ɵɵtemplate(1, GalleriaThumbnails_button_6_ng_container_1_Template, 3, 2, "ng-container", 7)(2, GalleriaThumbnails_button_6_2_Template, 1, 0, null, 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("thumbnailNextButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("thumbnailNextButton"));
    ɵɵattribute("aria-label", ctx_r1.ariaNextButtonLabel());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.galleria.nextThumbnailIconTemplate && !ctx_r1.galleria._nextThumbnailIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.galleria.nextThumbnailIconTemplate || ctx_r1.galleria._nextThumbnailIconTemplate);
  }
}
var classes = {
  mask: "p-galleria-mask p-overlay-mask",
  root: ({
    instance
  }) => {
    const thumbnailsPosClass = instance.galleria.showThumbnails && instance.getPositionClass("p-galleria-thumbnails", instance.galleria.thumbnailsPosition);
    const indicatorPosClass = instance.galleria.showIndicators && instance.getPositionClass("p-galleria-indicators", instance.galleria.indicatorsPosition);
    return ["p-galleria p-component", {
      "p-galleria-fullscreen": instance.galleria.fullScreen,
      "p-galleria-inset-indicators": instance.galleria.showIndicatorsOnItem,
      "p-galleria-hover-navigators": instance.galleria.showItemNavigatorsOnHover && !instance.galleria.fullScreen
    }, thumbnailsPosClass, indicatorPosClass];
  },
  closeButton: "p-galleria-close-button",
  closeIcon: "p-galleria-close-icon",
  header: "p-galleria-header",
  content: "p-galleria-content",
  footer: "p-galleria-footer",
  itemsContainer: "p-galleria-items-container",
  items: "p-galleria-items",
  prevButton: ({
    instance
  }) => ["p-galleria-prev-button p-galleria-nav-button", {
    "p-disabled": instance.isNavBackwardDisabled()
  }],
  prevIcon: "p-galleria-prev-icon",
  item: "p-galleria-item",
  nextButton: ({
    instance
  }) => ["p-galleria-next-button p-galleria-nav-button", {
    "p-disabled": instance.isNavForwardDisabled()
  }],
  nextIcon: "p-galleria-next-icon",
  caption: "p-galleria-caption",
  indicatorList: "p-galleria-indicator-list",
  indicator: ({
    instance,
    index
  }) => ["p-galleria-indicator", {
    "p-galleria-indicator-active": instance.isIndicatorItemActive(index)
  }],
  indicatorButton: "p-galleria-indicator-button",
  thumbnails: "p-galleria-thumbnails",
  thumbnailContent: "p-galleria-thumbnails-content",
  thumbnailPrevButton: ({
    instance
  }) => ["p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button", {
    "p-disabled": instance.isNavBackwardDisabled()
  }],
  thumbnailPrevIcon: "p-galleria-thumbnail-prev-icon",
  thumbnailsViewport: "p-galleria-thumbnails-viewport",
  thumbnailItems: "p-galleria-thumbnail-items",
  thumbnailItem: ({
    instance,
    index,
    activeIndex
  }) => ["p-galleria-thumbnail-item", {
    "p-galleria-thumbnail-item-current": activeIndex === index,
    "p-galleria-thumbnail-item-active": instance.isItemActive(index),
    "p-galleria-thumbnail-item-start": instance.firstItemAciveIndex() === index,
    "p-galleria-thumbnail-item-end": instance.lastItemActiveIndex() === index
  }],
  thumbnail: "p-galleria-thumbnail",
  thumbnailNextButton: ({
    instance
  }) => ["p-galleria-thumbnail-next-button  p-galleria-thumbnail-nav-button", {
    "p-disabled": instance.isNavForwardDisabled()
  }],
  thumbnailNextIcon: "p-galleria-thumbnail-next-icon"
};
var GalleriaStyle = class _GalleriaStyle extends BaseStyle {
  name = "galleria";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGalleriaStyle_BaseFactory;
    return function GalleriaStyle_Factory(__ngFactoryType__) {
      return (ɵGalleriaStyle_BaseFactory || (ɵGalleriaStyle_BaseFactory = ɵɵgetInheritedFactory(_GalleriaStyle)))(__ngFactoryType__ || _GalleriaStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GalleriaStyle,
    factory: _GalleriaStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GalleriaStyle, [{
    type: Injectable
  }], null, null);
})();
var GalleriaClasses;
(function(GalleriaClasses2) {
  GalleriaClasses2["mask"] = "p-galleria-mask";
  GalleriaClasses2["root"] = "p-galleria";
  GalleriaClasses2["closeButton"] = "p-galleria-close-button";
  GalleriaClasses2["closeIcon"] = "p-galleria-close-icon";
  GalleriaClasses2["header"] = "p-galleria-header";
  GalleriaClasses2["content"] = "p-galleria-content";
  GalleriaClasses2["footer"] = "p-galleria-footer";
  GalleriaClasses2["itemsContainer"] = "p-galleria-items-container";
  GalleriaClasses2["items"] = "p-galleria-items";
  GalleriaClasses2["prevButton"] = "p-galleria-prev-button";
  GalleriaClasses2["prevIcon"] = "p-galleria-prev-icon";
  GalleriaClasses2["item"] = "p-galleria-item";
  GalleriaClasses2["nextButton"] = "p-galleria-next-button";
  GalleriaClasses2["nextIcon"] = "p-galleria-next-icon";
  GalleriaClasses2["caption"] = "p-galleria-caption";
  GalleriaClasses2["indicatorList"] = "p-galleria-indicator-list";
  GalleriaClasses2["indicator"] = "p-galleria-indicator";
  GalleriaClasses2["indicatorButton"] = "p-galleria-indicator-button";
  GalleriaClasses2["thumbnails"] = "p-galleria-thumbnails";
  GalleriaClasses2["thumbnailContent"] = "p-galleria-thumbnails-content";
  GalleriaClasses2["previousThumbnailButton"] = "p-galleria-thumbnail-prev-button";
  GalleriaClasses2["previousThumbnailIcon"] = "p-galleria-thumbnail-prev-icon";
  GalleriaClasses2["thumbnailsViewport"] = "p-galleria-thumbnails-viewport";
  GalleriaClasses2["thumbnailItems"] = "p-galleria-thumbnail-items";
  GalleriaClasses2["thumbnailItem"] = "p-galleria-thumbnail-item";
  GalleriaClasses2["thumbnail"] = "p-galleria-thumbnail";
  GalleriaClasses2["nextThumbnailButton"] = "p-galleria-thumbnail-next-button";
  GalleriaClasses2["nextThumbnailIcon"] = "p-galleria-thumbnail-next-icon";
})(GalleriaClasses || (GalleriaClasses = {}));
var GALLERIA_INSTANCE = new InjectionToken("GALLERIA_INSTANCE");
var Galleria = class _Galleria extends BaseComponent {
  element;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcGalleria = inject(GALLERIA_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("host"));
  }
  /**
   * Index of the first item.
   * @group Props
   */
  get activeIndex() {
    return this._activeIndex;
  }
  set activeIndex(activeIndex) {
    this._activeIndex = activeIndex;
  }
  /**
   * Whether to display the component on fullscreen.
   * @group Props
   */
  fullScreen = false;
  /**
   * Unique identifier of the element.
   * @group Props
   */
  id;
  /**
   * An array of objects to display.
   * @group Props
   */
  value;
  /**
   * Number of items per page.
   * @group Props
   */
  numVisible = 3;
  /**
   * An array of options for responsive design.
   * @see {GalleriaResponsiveOptions}
   * @group Props
   */
  responsiveOptions;
  /**
   * Whether to display navigation buttons in item section.
   * @group Props
   */
  showItemNavigators = false;
  /**
   * Whether to display navigation buttons in thumbnail container.
   * @group Props
   */
  showThumbnailNavigators = true;
  /**
   * Whether to display navigation buttons on item hover.
   * @group Props
   */
  showItemNavigatorsOnHover = false;
  /**
   * When enabled, item is changed on indicator hover.
   * @group Props
   */
  changeItemOnIndicatorHover = false;
  /**
   * Defines if scrolling would be infinite.
   * @group Props
   */
  circular = false;
  /**
   * Items are displayed with a slideshow in autoPlay mode.
   * @group Props
   */
  autoPlay = false;
  /**
   * When enabled, autorun should stop by click.
   * @group Props
   */
  shouldStopAutoplayByClick = true;
  /**
   * Time in milliseconds to scroll items.
   * @group Props
   */
  transitionInterval = 4e3;
  /**
   * Whether to display thumbnail container.
   * @group Props
   */
  showThumbnails = true;
  /**
   * Position of thumbnails.
   * @group Props
   */
  thumbnailsPosition = "bottom";
  /**
   * Height of the viewport in vertical thumbnail.
   * @group Props
   */
  verticalThumbnailViewPortHeight = "300px";
  /**
   * Whether to display indicator container.
   * @group Props
   */
  showIndicators = false;
  /**
   * When enabled, indicator container is displayed on item container.
   * @group Props
   */
  showIndicatorsOnItem = false;
  /**
   * Position of indicators.
   * @group Props
   */
  indicatorsPosition = "bottom";
  /**
   * Base zIndex value to use in layering.
   * @group Props
   */
  baseZIndex = 0;
  /**
   * Style class of the mask on fullscreen mode.
   * @group Props
   */
  maskClass;
  /**
   * Style class of the component on fullscreen mode. Otherwise, the 'class' property can be used.
   * @group Props
   */
  containerClass;
  /**
   * Inline style of the component on fullscreen mode. Otherwise, the 'style' property can be used.
   * @group Props
   */
  containerStyle;
  /**
   * Transition options of the show animation.
   * @deprecated since v21.0.0. Use `motionOptions` instead.
   * @group Props
   */
  showTransitionOptions = "150ms cubic-bezier(0, 0, 0.2, 1)";
  /**
   * Transition options of the hide animation.
   * @deprecated since v21.0.0. Use `motionOptions` instead.
   * @group Props
   */
  hideTransitionOptions = "150ms cubic-bezier(0, 0, 0.2, 1)";
  /**
   * The motion options.
   * @group Props
   */
  motionOptions = input(void 0, ...ngDevMode ? [{
    debugName: "motionOptions"
  }] : []);
  computedMotionOptions = computed(() => {
    return __spreadValues(__spreadValues({}, this.ptm("motion")), this.motionOptions());
  }, ...ngDevMode ? [{
    debugName: "computedMotionOptions"
  }] : []);
  /**
   * The mask motion options.
   * @group Props
   */
  maskMotionOptions = input(void 0, ...ngDevMode ? [{
    debugName: "maskMotionOptions"
  }] : []);
  computedMaskMotionOptions = computed(() => {
    return __spreadValues(__spreadValues({}, this.ptm("maskMotion")), this.maskMotionOptions());
  }, ...ngDevMode ? [{
    debugName: "computedMaskMotionOptions"
  }] : []);
  /**
   * Specifies the visibility of the mask on fullscreen mode.
   * @group Props
   */
  get visible() {
    return this._visible;
  }
  set visible(visible) {
    this._visible = visible;
    if (this._visible && !this.maskVisible) {
      this.maskVisible = true;
      this.renderMask.set(true);
      this.renderContent.set(true);
    } else if (!this._visible && this.maskVisible) {
      this.maskVisible = false;
    }
  }
  renderMask = signal(false, ...ngDevMode ? [{
    debugName: "renderMask"
  }] : []);
  renderContent = signal(false, ...ngDevMode ? [{
    debugName: "renderContent"
  }] : []);
  /**
   * Callback to invoke on active index change.
   * @param {number} number - Active index.
   * @group Emits
   */
  activeIndexChange = new EventEmitter();
  /**
   * Callback to invoke on visiblity change.
   * @param {boolean} boolean - Visible value.
   * @group Emits
   */
  visibleChange = new EventEmitter();
  container;
  _visible = false;
  _activeIndex = 0;
  /**
   * Custom header template.
   * @group Templates
   */
  headerTemplate;
  headerFacet;
  /**
   * Custom footer template.
   * @group Templates
   */
  footerTemplate;
  footerFacet;
  /**
   * Custom indicator template.
   * @group Templates
   */
  indicatorTemplate;
  indicatorFacet;
  /**
   * Custom caption template.
   * @group Templates
   */
  captionTemplate;
  captionFacet;
  /**
   * Custom close icon template.
   * @group Templates
   */
  _closeIconTemplate;
  closeIconTemplate;
  /**
   * Custom previous thumbnail icon template.
   * @group Templates
   */
  _previousThumbnailIconTemplate;
  previousThumbnailIconTemplate;
  /**
   * Custom next thumbnail icon template.
   * @group Templates
   */
  _nextThumbnailIconTemplate;
  nextThumbnailIconTemplate;
  /**
   * Custom item previous icon template.
   * @group Templates
   */
  _itemPreviousIconTemplate;
  itemPreviousIconTemplate;
  /**
   * Custom item next icon template.
   * @group Templates
   */
  _itemNextIconTemplate;
  itemNextIconTemplate;
  /**
   * Custom item template.
   * @group Templates
   */
  _itemTemplate;
  itemTemplate;
  /**
   * Custom thumbnail template.
   * @group Templates
   */
  _thumbnailTemplate;
  thumbnailTemplate;
  maskVisible = false;
  numVisibleLimit = 0;
  _componentStyle = inject(GalleriaStyle);
  mask;
  templates;
  constructor(element) {
    super();
    this.element = element;
  }
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this.headerFacet = item.template;
          break;
        case "footer":
          this.footerFacet = item.template;
          break;
        case "indicator":
          this.indicatorFacet = item.template;
          break;
        case "closeicon":
          this.closeIconTemplate = item.template;
          break;
        case "itemnexticon":
          this.itemNextIconTemplate = item.template;
          break;
        case "itempreviousicon":
          this.itemPreviousIconTemplate = item.template;
          break;
        case "previousthumbnailicon":
          this.previousThumbnailIconTemplate = item.template;
          break;
        case "nextthumbnailicon":
          this.nextThumbnailIconTemplate = item.template;
          break;
        case "caption":
          this.captionFacet = item.template;
          break;
        case "item":
          this.itemTemplate = item.template;
          break;
        case "thumbnail":
          this.thumbnailTemplate = item.template;
          break;
      }
    });
  }
  onChanges(simpleChanges) {
    if (simpleChanges.value && simpleChanges.value.currentValue?.length < this.numVisible) {
      this.numVisibleLimit = simpleChanges.value.currentValue.length;
    } else {
      this.numVisibleLimit = 0;
    }
  }
  onMaskHide(event) {
    if (!event || event.target === event.currentTarget) {
      this.visible = false;
      this.visibleChange.emit(false);
    }
  }
  onActiveItemChange(index) {
    if (this.activeIndex !== index) {
      this.activeIndex = index;
      this.activeIndexChange.emit(index);
    }
  }
  onBeforeEnter(event) {
    this.mask = event.element?.parentElement;
    this.enableModality();
    setTimeout(() => {
      const focusTarget = z(this.container?.nativeElement, '[data-pc-section="closebutton"]');
      if (focusTarget) bt(focusTarget);
    }, 25);
  }
  onBeforeLeave() {
    if (this.mask) {
      this.maskVisible = false;
    }
  }
  onAfterLeave() {
    this.disableModality();
    this.renderContent.set(false);
  }
  onMaskAfterLeave() {
    if (!this.renderContent()) {
      this.renderMask.set(false);
    }
  }
  enableModality() {
    blockBodyScroll();
    this.cd.markForCheck();
    if (this.mask) {
      zindexutils.set("modal", this.mask, this.baseZIndex || this.config.zIndex.modal);
    }
  }
  disableModality() {
    unblockBodyScroll();
    this.cd.markForCheck();
    if (this.mask) {
      zindexutils.clear(this.mask);
    }
  }
  onDestroy() {
    if (this.fullScreen) {
      P(this.document.body, "p-overflow-hidden");
    }
    if (this.mask) {
      this.disableModality();
    }
  }
  static ɵfac = function Galleria_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Galleria)(ɵɵdirectiveInject(ElementRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Galleria,
    selectors: [["p-galleria"]],
    contentQueries: function Galleria_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4)(dirIndex, _c1, 4)(dirIndex, _c2, 4)(dirIndex, _c3, 4)(dirIndex, _c4, 4)(dirIndex, _c5, 4)(dirIndex, _c6, 4)(dirIndex, _c7, 4)(dirIndex, _c8, 4)(dirIndex, _c9, 4)(dirIndex, _c10, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t2;
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.headerTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.footerTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.indicatorTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.captionTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx._closeIconTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx._previousThumbnailIconTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx._nextThumbnailIconTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx._itemPreviousIconTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx._itemNextIconTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx._itemTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx._thumbnailTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.templates = _t2);
      }
    },
    viewQuery: function Galleria_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c11, 5);
      }
      if (rf & 2) {
        let _t2;
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.container = _t2.first);
      }
    },
    inputs: {
      activeIndex: "activeIndex",
      fullScreen: [2, "fullScreen", "fullScreen", booleanAttribute],
      id: "id",
      value: "value",
      numVisible: [2, "numVisible", "numVisible", numberAttribute],
      responsiveOptions: "responsiveOptions",
      showItemNavigators: [2, "showItemNavigators", "showItemNavigators", booleanAttribute],
      showThumbnailNavigators: [2, "showThumbnailNavigators", "showThumbnailNavigators", booleanAttribute],
      showItemNavigatorsOnHover: [2, "showItemNavigatorsOnHover", "showItemNavigatorsOnHover", booleanAttribute],
      changeItemOnIndicatorHover: [2, "changeItemOnIndicatorHover", "changeItemOnIndicatorHover", booleanAttribute],
      circular: [2, "circular", "circular", booleanAttribute],
      autoPlay: [2, "autoPlay", "autoPlay", booleanAttribute],
      shouldStopAutoplayByClick: [2, "shouldStopAutoplayByClick", "shouldStopAutoplayByClick", booleanAttribute],
      transitionInterval: [2, "transitionInterval", "transitionInterval", numberAttribute],
      showThumbnails: [2, "showThumbnails", "showThumbnails", booleanAttribute],
      thumbnailsPosition: "thumbnailsPosition",
      verticalThumbnailViewPortHeight: "verticalThumbnailViewPortHeight",
      showIndicators: [2, "showIndicators", "showIndicators", booleanAttribute],
      showIndicatorsOnItem: [2, "showIndicatorsOnItem", "showIndicatorsOnItem", booleanAttribute],
      indicatorsPosition: "indicatorsPosition",
      baseZIndex: [2, "baseZIndex", "baseZIndex", numberAttribute],
      maskClass: "maskClass",
      containerClass: "containerClass",
      containerStyle: "containerStyle",
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      motionOptions: [1, "motionOptions"],
      maskMotionOptions: [1, "maskMotionOptions"],
      visible: "visible"
    },
    outputs: {
      activeIndexChange: "activeIndexChange",
      visibleChange: "visibleChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([GalleriaStyle, {
      provide: GALLERIA_INSTANCE,
      useExisting: _Galleria
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Galleria
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 3,
    vars: 2,
    consts: [["windowed", ""], ["container", ""], [4, "ngIf", "ngIfElse"], [3, "pBind", "pMotion", "pMotionAppear", "pMotionEnterActiveClass", "pMotionLeaveActiveClass", "pMotionOptions", "ngClass", "class"], [3, "pMotionOnAfterLeave", "click", "pBind", "pMotion", "pMotionAppear", "pMotionEnterActiveClass", "pMotionLeaveActiveClass", "pMotionOptions", "ngClass"], ["pGalleriaContent", "", "pFocusTrap", "", 3, "pMotion", "pMotionAppear", "pMotionName", "pMotionOptions", "value", "activeIndex", "numVisible", "ngStyle", "fullScreen", "pt", "pFocusTrapDisabled", "unstyled"], ["pGalleriaContent", "", "pFocusTrap", "", 3, "pMotionOnBeforeEnter", "pMotionOnBeforeLeave", "pMotionOnAfterLeave", "maskHide", "activeItemChange", "pMotion", "pMotionAppear", "pMotionName", "pMotionOptions", "value", "activeIndex", "numVisible", "ngStyle", "fullScreen", "pt", "pFocusTrapDisabled", "unstyled"], ["pGalleriaContent", "", 3, "activeItemChange", "pt", "unstyled", "value", "activeIndex", "numVisible"]],
    template: function Galleria_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, Galleria_div_0_Template, 3, 1, "div", 2)(1, Galleria_ng_template_1_Template, 1, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      }
      if (rf & 2) {
        const windowed_r5 = ɵɵreference(2);
        ɵɵproperty("ngIf", ctx.fullScreen)("ngIfElse", windowed_r5);
      }
    },
    dependencies: () => [NgClass, NgIf, NgStyle, FocusTrap, Bind, MotionDirective, GalleriaContent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Galleria, [{
    type: Component,
    args: [{
      selector: "p-galleria",
      standalone: false,
      template: `
        <div *ngIf="fullScreen; else windowed" #container>
            @if (renderMask()) {
                <div
                    [pBind]="ptm('mask')"
                    [pMotion]="maskVisible"
                    [pMotionAppear]="true"
                    [pMotionEnterActiveClass]="fullScreen ? 'p-overlay-mask-enter-active' : ''"
                    [pMotionLeaveActiveClass]="fullScreen ? 'p-overlay-mask-leave-active' : ''"
                    [pMotionOptions]="computedMaskMotionOptions()"
                    (pMotionOnAfterLeave)="onMaskAfterLeave()"
                    [ngClass]="cx('mask')"
                    [class]="maskClass"
                    [attr.role]="fullScreen ? 'dialog' : 'region'"
                    [attr.aria-modal]="fullScreen ? 'true' : undefined"
                    (click)="onMaskHide($event)"
                >
                    @if (renderContent()) {
                        <div
                            pGalleriaContent
                            [pMotion]="visible"
                            [pMotionAppear]="true"
                            [pMotionName]="'p-galleria'"
                            [pMotionOptions]="computedMotionOptions()"
                            (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                            (pMotionOnBeforeLeave)="onBeforeLeave()"
                            (pMotionOnAfterLeave)="onAfterLeave()"
                            [value]="value"
                            [activeIndex]="activeIndex"
                            [numVisible]="numVisibleLimit || numVisible"
                            (maskHide)="onMaskHide()"
                            (activeItemChange)="onActiveItemChange($event)"
                            [ngStyle]="containerStyle"
                            [fullScreen]="fullScreen"
                            [pt]="pt()"
                            pFocusTrap
                            [pFocusTrapDisabled]="!fullScreen"
                            [unstyled]="unstyled()"
                        ></div>
                    }
                </div>
            }
        </div>

        <ng-template #windowed>
            <div pGalleriaContent [pt]="pt()" [unstyled]="unstyled()" [value]="value" [activeIndex]="activeIndex" [numVisible]="numVisibleLimit || numVisible" (activeItemChange)="onActiveItemChange($event)"></div>
        </ng-template>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [GalleriaStyle, {
        provide: GALLERIA_INSTANCE,
        useExisting: Galleria
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Galleria
      }],
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: ElementRef
  }], {
    activeIndex: [{
      type: Input
    }],
    fullScreen: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    id: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    numVisible: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    responsiveOptions: [{
      type: Input
    }],
    showItemNavigators: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showThumbnailNavigators: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showItemNavigatorsOnHover: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    changeItemOnIndicatorHover: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    circular: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoPlay: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    shouldStopAutoplayByClick: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    transitionInterval: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    showThumbnails: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    thumbnailsPosition: [{
      type: Input
    }],
    verticalThumbnailViewPortHeight: [{
      type: Input
    }],
    showIndicators: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showIndicatorsOnItem: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    indicatorsPosition: [{
      type: Input
    }],
    baseZIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    maskClass: [{
      type: Input
    }],
    containerClass: [{
      type: Input
    }],
    containerStyle: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    motionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "motionOptions",
        required: false
      }]
    }],
    maskMotionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "maskMotionOptions",
        required: false
      }]
    }],
    visible: [{
      type: Input
    }],
    activeIndexChange: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    container: [{
      type: ViewChild,
      args: ["container"]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false,
        static: false
      }]
    }],
    indicatorTemplate: [{
      type: ContentChild,
      args: ["indicator", {
        descendants: false
      }]
    }],
    captionTemplate: [{
      type: ContentChild,
      args: ["caption", {
        descendants: false
      }]
    }],
    _closeIconTemplate: [{
      type: ContentChild,
      args: ["closeicon", {
        descendants: false
      }]
    }],
    _previousThumbnailIconTemplate: [{
      type: ContentChild,
      args: ["previousthumbnailicon", {
        descendants: false
      }]
    }],
    _nextThumbnailIconTemplate: [{
      type: ContentChild,
      args: ["nextthumbnailicon", {
        descendants: false
      }]
    }],
    _itemPreviousIconTemplate: [{
      type: ContentChild,
      args: ["itempreviousicon", {
        descendants: false
      }]
    }],
    _itemNextIconTemplate: [{
      type: ContentChild,
      args: ["itemnexticon", {
        descendants: false
      }]
    }],
    _itemTemplate: [{
      type: ContentChild,
      args: ["item", {
        descendants: false
      }]
    }],
    _thumbnailTemplate: [{
      type: ContentChild,
      args: ["thumbnail", {
        descendants: false,
        static: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var GalleriaContent = class _GalleriaContent extends BaseComponent {
  galleria;
  differs;
  hostName = "Galleria";
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.getPTOptions("root"));
  }
  get activeIndex() {
    return this._activeIndex;
  }
  set activeIndex(activeIndex) {
    this._activeIndex = activeIndex;
  }
  value = [];
  numVisible;
  fullScreen;
  maskHide = new EventEmitter();
  activeItemChange = new EventEmitter();
  closeButton;
  _componentStyle = inject(GalleriaStyle);
  $pcGalleria = inject(GALLERIA_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  id;
  _activeIndex = 0;
  slideShowActive = true;
  interval;
  styleClass;
  differ;
  constructor(galleria, differs) {
    super();
    this.galleria = galleria;
    this.differs = differs;
    this.id = this.galleria.id || s("pn_id_");
    this.differ = this.differs.find(this.galleria).create();
  }
  // For custom fullscreen
  handleFullscreenChange(event) {
    if (document?.fullscreenElement === this.el.nativeElement?.children[0]) {
      this.fullScreen = true;
    } else {
      this.fullScreen = false;
    }
  }
  onDoCheck() {
    if (isPlatformBrowser(this.galleria.platformId)) {
      const changes = this.differ.diff(this.galleria);
      if (changes && changes.forEachItem.length > 0) {
        this.cd.markForCheck();
      }
    }
  }
  shouldRenderFooter() {
    return this.galleria.footerFacet && this.galleria.templates && this.galleria.templates.toArray().length > 0 || this.galleria.footerTemplate;
  }
  startSlideShow() {
    if (isPlatformBrowser(this.galleria.platformId)) {
      this.interval = setInterval(() => {
        let activeIndex = this.galleria.circular && this.value.length - 1 === this.activeIndex ? 0 : this.activeIndex + 1;
        this.onActiveIndexChange(activeIndex);
        this.activeIndex = activeIndex;
      }, this.galleria.transitionInterval);
      this.slideShowActive = true;
    }
  }
  stopSlideShow() {
    if (this.galleria.autoPlay && !this.galleria.shouldStopAutoplayByClick) {
      return;
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.slideShowActive = false;
  }
  getPositionClass(preClassName, position) {
    const positions = ["top", "left", "bottom", "right"];
    const pos = positions.find((item) => item === position);
    return pos ? `${preClassName}-${pos}` : "";
  }
  isVertical() {
    return this.galleria.thumbnailsPosition === "left" || this.galleria.thumbnailsPosition === "right";
  }
  onActiveIndexChange(index) {
    if (this.activeIndex !== index) {
      this.activeIndex = index;
      this.activeItemChange.emit(this.activeIndex);
    }
  }
  closeAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.close : void 0;
  }
  getPTOptions(key) {
    return this.ptm(key, {
      context: {
        pt: this.pt(),
        unstyled: this.unstyled()
      }
    });
  }
  static ɵfac = function GalleriaContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GalleriaContent)(ɵɵdirectiveInject(Galleria), ɵɵdirectiveInject(KeyValueDiffers));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _GalleriaContent,
    selectors: [["div", "pGalleriaContent", ""]],
    viewQuery: function GalleriaContent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c12, 5);
      }
      if (rf & 2) {
        let _t2;
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.closeButton = _t2.first);
      }
    },
    hostVars: 7,
    hostBindings: function GalleriaContent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("fullscreenchange", function GalleriaContent_fullscreenchange_HostBindingHandler($event) {
          return ctx.handleFullscreenChange($event);
        }, ɵɵresolveDocument);
      }
      if (rf & 2) {
        ɵɵattribute("id", ctx.id)("role", "region");
        ɵɵstyleMap(!ctx.galleria.fullScreen ? ctx.galleria.containerStyle : ɵɵpureFunction0(6, _c13));
        ɵɵclassMap(ctx.cn(ctx.cx("root")));
      }
    },
    inputs: {
      activeIndex: "activeIndex",
      value: "value",
      numVisible: [2, "numVisible", "numVisible", numberAttribute],
      fullScreen: [2, "fullScreen", "fullScreen", booleanAttribute]
    },
    outputs: {
      maskHide: "maskHide",
      activeItemChange: "activeItemChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([GalleriaStyle]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    attrs: _c14,
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"], ["type", "button", 3, "pBind", "class", "click", 4, "ngIf"], ["pGalleriaItemSlot", "", "type", "header", 3, "unstyled", "templates", "pBind", "class", 4, "ngIf"], [3, "pBind"], ["pGalleriaItem", "", 3, "onActiveIndexChange", "startSlideShow", "stopSlideShow", "id", "value", "activeIndex", "circular", "templates", "showIndicators", "changeItemOnIndicatorHover", "indicatorFacet", "captionFacet", "showItemNavigators", "autoPlay", "slideShowActive", "pt", "unstyled"], ["pGalleriaThumbnails", "", 3, "containerId", "value", "activeIndex", "templates", "numVisible", "responsiveOptions", "circular", "isVertical", "contentHeight", "showThumbnailNavigators", "slideShowActive", "pt", "unstyled", "onActiveIndexChange", "stopSlideShow", 4, "ngIf"], ["pGalleriaItemSlot", "", "type", "footer", 3, "pBind", "class", "templates", "unstyled", 4, "ngIf"], ["type", "button", 3, "click", "pBind"], ["data-p-icon", "times", 3, "pBind", "class", 4, "ngIf"], [4, "ngTemplateOutlet"], ["data-p-icon", "times", 3, "pBind"], ["pGalleriaItemSlot", "", "type", "header", 3, "unstyled", "templates", "pBind"], ["pGalleriaThumbnails", "", 3, "onActiveIndexChange", "stopSlideShow", "containerId", "value", "activeIndex", "templates", "numVisible", "responsiveOptions", "circular", "isVertical", "contentHeight", "showThumbnailNavigators", "slideShowActive", "pt", "unstyled"], ["pGalleriaItemSlot", "", "type", "footer", 3, "pBind", "templates", "unstyled"]],
    template: function GalleriaContent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, GalleriaContent_ng_container_0_Template, 7, 24, "ng-container", 0);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", ctx.value && ctx.value.length > 0);
      }
    },
    dependencies: () => [NgIf, NgTemplateOutlet, TimesIcon, Bind, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GalleriaContent, [{
    type: Component,
    args: [{
      selector: "div[pGalleriaContent]",
      standalone: false,
      template: `
        <ng-container *ngIf="value && value.length > 0">
            <button *ngIf="galleria.fullScreen" type="button" [pBind]="getPTOptions('closeButton')" [class]="cx('closeButton')" (click)="maskHide.emit()" [attr.aria-label]="closeAriaLabel()">
                <svg data-p-icon="times" *ngIf="!galleria.closeIconTemplate && !galleria._closeIconTemplate" [pBind]="getPTOptions('closeIcon')" [class]="cx('closeIcon')" />
                <ng-template *ngTemplateOutlet="galleria.closeIconTemplate || galleria._closeIconTemplate"></ng-template>
            </button>
            <div *ngIf="galleria.templates && (galleria.headerFacet || galleria.headerTemplate)" pGalleriaItemSlot [unstyled]="unstyled()" type="header" [templates]="galleria.templates" [pBind]="getPTOptions('header')" [class]="cx('header')"></div>
            <div [pBind]="getPTOptions('content')" [class]="cx('content')" [attr.aria-live]="galleria.autoPlay ? 'polite' : 'off'">
                <div
                    pGalleriaItem
                    [id]="id"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [circular]="galleria.circular"
                    [templates]="galleria.templates"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [showIndicators]="galleria.showIndicators"
                    [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover"
                    [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet"
                    [showItemNavigators]="galleria.showItemNavigators"
                    [autoPlay]="galleria.autoPlay"
                    [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()"
                    (stopSlideShow)="stopSlideShow()"
                    [pt]="pt()"
                    [unstyled]="unstyled()"
                    [class]="cx('itemsContainer')"
                ></div>

                <div
                    pGalleriaThumbnails
                    *ngIf="galleria.showThumbnails"
                    [containerId]="id"
                    [value]="value"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [activeIndex]="activeIndex"
                    [templates]="galleria.templates"
                    [numVisible]="numVisible"
                    [responsiveOptions]="galleria.responsiveOptions"
                    [circular]="galleria.circular"
                    [isVertical]="isVertical()"
                    [contentHeight]="galleria.verticalThumbnailViewPortHeight"
                    [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive"
                    (stopSlideShow)="stopSlideShow()"
                    [pt]="pt()"
                    [unstyled]="unstyled()"
                ></div>
            </div>
            <div *ngIf="shouldRenderFooter()" pGalleriaItemSlot [pBind]="getPTOptions('footer')" [class]="cx('footer')" type="footer" [templates]="galleria.templates" [unstyled]="unstyled()"></div>
        </ng-container>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [GalleriaStyle],
      host: {
        "[attr.id]": "id",
        "[attr.role]": '"region"',
        "[style]": "!galleria.fullScreen ? galleria.containerStyle : {}",
        "[class]": "cn(cx('root'))"
      },
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: Galleria
  }, {
    type: KeyValueDiffers
  }], {
    activeIndex: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    numVisible: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    fullScreen: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    maskHide: [{
      type: Output
    }],
    activeItemChange: [{
      type: Output
    }],
    closeButton: [{
      type: ViewChild,
      args: ["closeButton"]
    }],
    handleFullscreenChange: [{
      type: HostListener,
      args: ["document:fullscreenchange", ["$event"]]
    }]
  });
})();
var GalleriaItemSlot = class _GalleriaItemSlot extends BaseComponent {
  hostName = "Galleria";
  templates;
  index;
  get item() {
    return this._item;
  }
  shouldRender() {
    return this.contentTemplate || this.galleria._itemTemplate || this.galleria.itemTemplate || this.galleria.captionTemplate || this.galleria.captionTemplate || this.galleria.captionFacet || this.galleria.thumbnailTemplate || this.galleria._thumbnailTemplate || this.galleria.footerTemplate;
  }
  galleria = inject(Galleria);
  $pcGalleria = inject(GALLERIA_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  set item(item) {
    this._item = item;
    if (this.templates && this.templates?.toArray().length > 0) {
      this.templates.forEach((item2) => {
        if (item2.getType() === this.type) {
          switch (this.type) {
            case "item":
            case "caption":
            case "thumbnail":
              this.context = {
                $implicit: this.item
              };
              this.contentTemplate = item2.template;
              break;
            case "footer":
              this.context = {
                $implicit: this.item
              };
              this.contentTemplate = item2.template;
              break;
          }
        }
      });
    } else {
      this.getContentTemplate();
    }
  }
  getTemplateFromQueryList(type) {
    return this.galleria.templates?.find((item) => item.getType() === type)?.template;
  }
  getContentTemplate() {
    switch (this.type) {
      case "item":
        this.context = {
          $implicit: this.item
        };
        this.contentTemplate = this.galleria._itemTemplate || this.getTemplateFromQueryList("item");
        break;
      case "caption":
        this.context = {
          $implicit: this.item
        };
        this.contentTemplate = this.galleria.captionTemplate || this.getTemplateFromQueryList("caption");
        break;
      case "thumbnail":
        this.context = {
          $implicit: this.item
        };
        this.contentTemplate = this.galleria._thumbnailTemplate || this.getTemplateFromQueryList("thumbnail");
        break;
      case "indicator":
        this.context = {
          $implicit: this.index
        };
        this.contentTemplate = this.galleria.indicatorTemplate || this.getTemplateFromQueryList("indicator");
        break;
      case "footer":
        this.context = {
          $implicit: this.item
        };
        this.contentTemplate = this.galleria.footerTemplate || this.getTemplateFromQueryList("footer");
        break;
      default:
        this.context = {
          $implicit: this.item
        };
        this.contentTemplate = this.galleria._itemTemplate || this.getTemplateFromQueryList("item");
    }
  }
  type;
  contentTemplate;
  context;
  _item;
  onAfterContentInit() {
    if (this.templates && this.templates.toArray().length > 0) {
      this.templates?.forEach((item) => {
        if (item.getType() === this.type) {
          switch (this.type) {
            case "item":
            case "caption":
            case "thumbnail":
              this.context = {
                $implicit: this.item
              };
              this.contentTemplate = item.template;
              break;
            case "indicator":
              this.context = {
                $implicit: this.index
              };
              this.contentTemplate = item.template;
              break;
            case "footer":
              this.context = {
                $implicit: this.item
              };
              this.contentTemplate = item.template;
              break;
            default:
              this.context = {
                $implicit: this.item
              };
              this.contentTemplate = item.template;
              break;
          }
        }
      });
    } else {
      this.getContentTemplate();
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGalleriaItemSlot_BaseFactory;
    return function GalleriaItemSlot_Factory(__ngFactoryType__) {
      return (ɵGalleriaItemSlot_BaseFactory || (ɵGalleriaItemSlot_BaseFactory = ɵɵgetInheritedFactory(_GalleriaItemSlot)))(__ngFactoryType__ || _GalleriaItemSlot);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _GalleriaItemSlot,
    selectors: [["div", "pGalleriaItemSlot", ""]],
    inputs: {
      templates: "templates",
      index: [2, "index", "index", numberAttribute],
      item: "item",
      type: "type"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    attrs: _c15,
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function GalleriaItemSlot_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, GalleriaItemSlot_ng_container_0_Template, 2, 2, "ng-container", 0);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", ctx.shouldRender());
      }
    },
    dependencies: [NgIf, NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GalleriaItemSlot, [{
    type: Component,
    args: [{
      selector: "div[pGalleriaItemSlot]",
      standalone: false,
      template: `
        <ng-container *ngIf="shouldRender()">
            <ng-container *ngTemplateOutlet="contentTemplate; context: context"></ng-container>
        </ng-container>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    templates: [{
      type: Input
    }],
    index: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    item: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var GalleriaItem = class _GalleriaItem extends BaseComponent {
  galleria;
  hostName = "Galleria";
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("itemsContainer"));
  }
  id;
  circular = false;
  value;
  showItemNavigators = false;
  showIndicators = true;
  slideShowActive = true;
  changeItemOnIndicatorHover = true;
  autoPlay = false;
  templates;
  indicatorFacet;
  captionFacet;
  startSlideShow = new EventEmitter();
  stopSlideShow = new EventEmitter();
  onActiveIndexChange = new EventEmitter();
  _componentStyle = inject(GalleriaStyle);
  get activeIndex() {
    return this._activeIndex;
  }
  set activeIndex(activeIndex) {
    this._activeIndex = activeIndex;
  }
  get activeItem() {
    return this.value && this.value[this._activeIndex];
  }
  _activeIndex = 0;
  leftButtonFocused = false;
  rightButtonFocused = false;
  constructor(galleria) {
    super();
    this.galleria = galleria;
  }
  getIndicatorPTOptions(index) {
    return this.ptm("indicator", {
      context: {
        highlighted: this.activeIndex === index
      }
    });
  }
  onChanges({
    autoPlay
  }) {
    if (autoPlay?.currentValue) {
      this.startSlideShow.emit();
    }
    if (autoPlay && autoPlay.currentValue === false) {
      this.stopTheSlideShow();
    }
  }
  next() {
    let nextItemIndex = this.activeIndex + 1;
    let activeIndex = this.circular && this.value.length - 1 === this.activeIndex ? 0 : nextItemIndex;
    this.onActiveIndexChange.emit(activeIndex);
  }
  prev() {
    let prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
    let activeIndex = this.circular && this.activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
    this.onActiveIndexChange.emit(activeIndex);
  }
  onButtonFocus(pos) {
    if (pos === "left") {
      this.leftButtonFocused = true;
    } else this.rightButtonFocused = true;
  }
  onButtonBlur(pos) {
    if (pos === "left") {
      this.leftButtonFocused = false;
    } else this.rightButtonFocused = false;
  }
  stopTheSlideShow() {
    if (this.slideShowActive && this.stopSlideShow) {
      this.stopSlideShow.emit();
    }
  }
  navForward(e) {
    this.stopTheSlideShow();
    this.next();
    if (e && e.cancelable) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  navBackward(e) {
    this.stopTheSlideShow();
    this.prev();
    if (e && e.cancelable) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  onIndicatorClick(index) {
    this.stopTheSlideShow();
    this.onActiveIndexChange.emit(index);
  }
  onIndicatorMouseEnter(index) {
    if (this.changeItemOnIndicatorHover) {
      this.stopTheSlideShow();
      this.onActiveIndexChange.emit(index);
    }
  }
  onIndicatorKeyDown(event, index) {
    switch (event.code) {
      case "Enter":
      case "Space":
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
        event.preventDefault();
        break;
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        break;
      default:
        break;
    }
  }
  isNavForwardDisabled() {
    return !this.circular && this.activeIndex === this.value.length - 1;
  }
  isNavBackwardDisabled() {
    return !this.circular && this.activeIndex === 0;
  }
  isIndicatorItemActive(index) {
    return this.activeIndex === index;
  }
  ariaSlideLabel() {
    return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.slide : void 0;
  }
  ariaSlideNumber(value) {
    return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.slideNumber?.replace(/{slideNumber}/g, value) : void 0;
  }
  ariaPageLabel(value) {
    return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.pageLabel?.replace(/{page}/g, value) : void 0;
  }
  static ɵfac = function GalleriaItem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GalleriaItem)(ɵɵdirectiveInject(Galleria));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _GalleriaItem,
    selectors: [["div", "pGalleriaItem", ""]],
    inputs: {
      id: "id",
      circular: [2, "circular", "circular", booleanAttribute],
      value: "value",
      showItemNavigators: [2, "showItemNavigators", "showItemNavigators", booleanAttribute],
      showIndicators: [2, "showIndicators", "showIndicators", booleanAttribute],
      slideShowActive: [2, "slideShowActive", "slideShowActive", booleanAttribute],
      changeItemOnIndicatorHover: [2, "changeItemOnIndicatorHover", "changeItemOnIndicatorHover", booleanAttribute],
      autoPlay: [2, "autoPlay", "autoPlay", booleanAttribute],
      templates: "templates",
      indicatorFacet: "indicatorFacet",
      captionFacet: "captionFacet",
      activeIndex: "activeIndex"
    },
    outputs: {
      startSlideShow: "startSlideShow",
      stopSlideShow: "stopSlideShow",
      onActiveIndexChange: "onActiveIndexChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([GalleriaStyle]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    attrs: _c16,
    decls: 6,
    vars: 16,
    consts: [[3, "pBind"], ["type", "button", "role", "navigation", "data-pc-group-section", "itemnavigator", 3, "pBind", "class", "click", "focus", "blur", 4, "ngIf"], ["pGalleriaItemSlot", "", "role", "group", 3, "pBind", "unstyled", "item", "templates", "id"], ["pGalleriaItemSlot", "", "type", "caption", 3, "pBind", "unstyled", "class", "item", "templates", 4, "ngIf"], [3, "pBind", "class", 4, "ngIf"], ["type", "button", "role", "navigation", "data-pc-group-section", "itemnavigator", 3, "click", "focus", "blur", "pBind"], ["data-p-icon", "chevron-left", 3, "pBind", "class", 4, "ngIf"], [4, "ngTemplateOutlet"], ["data-p-icon", "chevron-left", 3, "pBind"], ["data-p-icon", "chevron-right", 3, "pBind", "class", 4, "ngIf"], ["data-p-icon", "chevron-right", 3, "pBind"], ["pGalleriaItemSlot", "", "type", "caption", 3, "pBind", "unstyled", "item", "templates"], ["tabindex", "0", 3, "pBind", "class", "click", "mouseenter", "keydown", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "click", "mouseenter", "keydown", "pBind"], ["type", "button", "tabIndex", "-1", 3, "pBind", "class", 4, "ngIf"], [4, "ngIf"], ["type", "button", "tabIndex", "-1", 3, "pBind"], ["pGalleriaItemSlot", "", "type", "indicator", 3, "index", "templates", "pBind", "unstyled"]],
    template: function GalleriaItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, GalleriaItem_button_1_Template, 3, 5, "button", 1);
        ɵɵelement(2, "div", 2);
        ɵɵtemplate(3, GalleriaItem_button_3_Template, 3, 5, "button", 1)(4, GalleriaItem_div_4_Template, 1, 6, "div", 3);
        ɵɵelementEnd();
        ɵɵtemplate(5, GalleriaItem_ul_5_Template, 2, 4, "ul", 4);
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("items"));
        ɵɵproperty("pBind", ctx.ptm("items"));
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showItemNavigators);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("item"));
        ɵɵproperty("pBind", ctx.ptm("item"))("unstyled", ctx.unstyled())("item", ctx.activeItem)("templates", ctx.templates)("id", ctx.id + "_item_" + ctx.activeIndex);
        ɵɵattribute("aria-label", ctx.ariaSlideNumber(ctx.activeIndex + 1))("aria-roledescription", ctx.ariaSlideLabel());
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showItemNavigators);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.captionFacet || ctx.galleria.captionTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showIndicators);
      }
    },
    dependencies: () => [NgForOf, NgIf, NgTemplateOutlet, ChevronRightIcon, ChevronLeftIcon, Bind, GalleriaItemSlot],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GalleriaItem, [{
    type: Component,
    args: [{
      selector: "div[pGalleriaItem]",
      standalone: false,
      template: `
        <div [pBind]="ptm('items')" [class]="cx('items')">
            <button
                *ngIf="showItemNavigators"
                type="button"
                role="navigation"
                [pBind]="ptm('prevButton')"
                [class]="cx('prevButton')"
                (click)="navBackward($event)"
                (focus)="onButtonFocus('left')"
                (blur)="onButtonBlur('left')"
                data-pc-group-section="itemnavigator"
            >
                <svg data-p-icon="chevron-left" *ngIf="!galleria.itemPreviousIconTemplate && !galleria._itemPreviousIconTemplate" [pBind]="ptm('prevIcon')" [class]="cx('prevIcon')" />
                <ng-template *ngTemplateOutlet="galleria.itemPreviousIconTemplate || galleria._itemPreviousIconTemplate"></ng-template>
            </button>
            <div
                pGalleriaItemSlot
                [pBind]="ptm('item')"
                [unstyled]="unstyled()"
                [class]="cx('item')"
                [item]="activeItem"
                [templates]="templates"
                [id]="id + '_item_' + activeIndex"
                role="group"
                [class]="cx('item')"
                [attr.aria-label]="ariaSlideNumber(activeIndex + 1)"
                [attr.aria-roledescription]="ariaSlideLabel()"
            ></div>
            <button
                *ngIf="showItemNavigators"
                type="button"
                [pBind]="ptm('nextButton')"
                [class]="cx('nextButton')"
                (click)="navForward($event)"
                role="navigation"
                (focus)="onButtonFocus('right')"
                (blur)="onButtonBlur('right')"
                data-pc-group-section="itemnavigator"
            >
                <svg data-p-icon="chevron-right" *ngIf="!galleria.itemNextIconTemplate && !galleria._itemNextIconTemplate" [pBind]="ptm('nextIcon')" [class]="cx('nextIcon')" />
                <ng-template *ngTemplateOutlet="galleria.itemNextIconTemplate || galleria._itemNextIconTemplate"></ng-template>
            </button>
            <div *ngIf="captionFacet || galleria.captionTemplate" pGalleriaItemSlot [pBind]="ptm('caption')" [unstyled]="unstyled()" [class]="cx('caption')" type="caption" [item]="activeItem" [templates]="templates"></div>
        </div>
        <ul *ngIf="showIndicators" [pBind]="ptm('indicatorList')" [class]="cx('indicatorList')">
            <li
                *ngFor="let item of value; let index = index"
                [pBind]="getIndicatorPTOptions(index)"
                tabindex="0"
                (click)="onIndicatorClick(index)"
                (mouseenter)="onIndicatorMouseEnter(index)"
                (keydown)="onIndicatorKeyDown($event, index)"
                [class]="cx('indicator', { index })"
                [attr.aria-label]="ariaPageLabel(index + 1)"
                [attr.aria-selected]="activeIndex === index"
                [attr.aria-controls]="id + '_item_' + index"
                [pBind]="ptm('indicator', getIndicatorPTOptions(index))"
                [attr.data-p-active]="isIndicatorItemActive(index)"
            >
                <button *ngIf="!indicatorFacet && !galleria.indicatorTemplate" type="button" tabIndex="-1" [pBind]="ptm('indicatorButton', getIndicatorPTOptions(index))" [class]="cx('indicatorButton')"></button>
                <ng-container *ngIf="indicatorFacet || galleria.indicatorTemplate">
                    <div pGalleriaItemSlot type="indicator" [index]="index" [templates]="templates" [pBind]="ptm('item')" [unstyled]="unstyled()"></div>
                </ng-container>
            </li>
        </ul>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [GalleriaStyle],
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: Galleria
  }], {
    id: [{
      type: Input
    }],
    circular: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    value: [{
      type: Input
    }],
    showItemNavigators: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showIndicators: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    slideShowActive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    changeItemOnIndicatorHover: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoPlay: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    templates: [{
      type: Input
    }],
    indicatorFacet: [{
      type: Input
    }],
    captionFacet: [{
      type: Input
    }],
    startSlideShow: [{
      type: Output
    }],
    stopSlideShow: [{
      type: Output
    }],
    onActiveIndexChange: [{
      type: Output
    }],
    activeIndex: [{
      type: Input
    }]
  });
})();
var GalleriaThumbnails = class _GalleriaThumbnails extends BaseComponent {
  galleria;
  hostName = "Galleria";
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("thumbnails"));
  }
  containerId;
  value;
  isVertical = false;
  slideShowActive = false;
  circular = false;
  responsiveOptions;
  contentHeight = "300px";
  showThumbnailNavigators = true;
  templates;
  onActiveIndexChange = new EventEmitter();
  stopSlideShow = new EventEmitter();
  itemsContainer;
  get numVisible() {
    return this._numVisible;
  }
  set numVisible(numVisible) {
    this._numVisible = numVisible;
    this._oldNumVisible = this.d_numVisible;
    this.d_numVisible = numVisible;
  }
  get activeIndex() {
    return this._activeIndex;
  }
  set activeIndex(activeIndex) {
    this._oldactiveIndex = this._activeIndex;
    this._activeIndex = activeIndex;
  }
  index;
  startPos = null;
  thumbnailsStyle = null;
  sortedResponsiveOptions = null;
  totalShiftedItems = 0;
  page = 0;
  documentResizeListener;
  _numVisible = 0;
  d_numVisible = 0;
  _oldNumVisible = 0;
  _activeIndex = 0;
  _oldactiveIndex = 0;
  _componentStyle = inject(GalleriaStyle);
  constructor(galleria) {
    super();
    this.galleria = galleria;
  }
  onInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createStyle();
      if (this.responsiveOptions) {
        this.bindDocumentListeners();
      }
    }
  }
  onAfterContentChecked() {
    let totalShiftedItems = this.totalShiftedItems;
    if ((this._oldNumVisible !== this.d_numVisible || this._oldactiveIndex !== this._activeIndex) && this.itemsContainer) {
      if (this._activeIndex <= this.getMedianItemIndex()) {
        totalShiftedItems = 0;
      } else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this._activeIndex) {
        totalShiftedItems = this.d_numVisible - this.value.length;
      } else if (this.value.length - this.d_numVisible < this._activeIndex && this.d_numVisible % 2 === 0) {
        totalShiftedItems = this._activeIndex * -1 + this.getMedianItemIndex() + 1;
      } else {
        totalShiftedItems = this._activeIndex * -1 + this.getMedianItemIndex();
      }
      if (totalShiftedItems !== this.totalShiftedItems) {
        this.totalShiftedItems = totalShiftedItems;
      }
      if (this.itemsContainer && this.itemsContainer.nativeElement) {
        this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
      }
      if (this._oldactiveIndex !== this._activeIndex) {
        this.document.body.setAttribute("data-p-items-hidden", "false");
        !this.$unstyled() && P(this.itemsContainer.nativeElement, "p-items-hidden");
        this.itemsContainer.nativeElement.style.transition = "transform 500ms ease 0s";
      }
      this._oldactiveIndex = this._activeIndex;
      this._oldNumVisible = this.d_numVisible;
    }
  }
  onAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.calculatePosition();
    }
  }
  createStyle() {
    if (!this.thumbnailsStyle) {
      this.thumbnailsStyle = this.document.createElement("style");
      _t(this.thumbnailsStyle, "nonce", this.galleria.config?.csp()?.nonce);
      this.document.body.appendChild(this.thumbnailsStyle);
    }
    let innerHTML = `
            #${this.containerId} .p-galleria-thumbnail-item {
                flex: 1 0 ${100 / this.d_numVisible}%
            }
        `;
    if (this.responsiveOptions && !this.$unstyled()) {
      this.sortedResponsiveOptions = [...this.responsiveOptions];
      this.sortedResponsiveOptions.sort((data1, data2) => {
        const value1 = data1.breakpoint;
        const value2 = data2.breakpoint;
        let result;
        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === "string" && typeof value2 === "string") result = value1.localeCompare(value2, void 0, {
          numeric: true
        });
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return -1 * result;
      });
      for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
        let res = this.sortedResponsiveOptions[i];
        innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.containerId} .p-galleria-thumbnail-item {
                            flex: 1 0 ${100 / res.numVisible}%
                        }
                    }
                `;
      }
    }
    this.thumbnailsStyle.innerHTML = innerHTML;
    _t(this.thumbnailsStyle, "nonce", this.galleria.config?.csp()?.nonce);
  }
  calculatePosition() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.itemsContainer && this.sortedResponsiveOptions) {
        let windowWidth = window.innerWidth;
        let matchedResponsiveData = {
          numVisible: this._numVisible
        };
        for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
          let res = this.sortedResponsiveOptions[i];
          if (parseInt(res.breakpoint, 10) >= windowWidth) {
            matchedResponsiveData = res;
          }
        }
        if (this.d_numVisible !== matchedResponsiveData.numVisible) {
          this.d_numVisible = matchedResponsiveData.numVisible;
          this.cd.markForCheck();
        }
      }
    }
  }
  getTabIndex(index) {
    return this.isItemActive(index) ? 0 : null;
  }
  navForward(e) {
    this.stopTheSlideShow();
    let nextItemIndex = this._activeIndex + 1;
    if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && (-1 * this.totalShiftedItems < this.getTotalPageNumber() - 1 || this.circular)) {
      this.step(-1);
    }
    let activeIndex = this.circular && this.value.length - 1 === this._activeIndex ? 0 : nextItemIndex;
    this.onActiveIndexChange.emit(activeIndex);
    if (e.cancelable) {
      e.preventDefault();
    }
  }
  navBackward(e) {
    this.stopTheSlideShow();
    let prevItemIndex = this._activeIndex !== 0 ? this._activeIndex - 1 : 0;
    let diff = prevItemIndex + this.totalShiftedItems;
    if (this.d_numVisible - diff - 1 > this.getMedianItemIndex() && (-1 * this.totalShiftedItems !== 0 || this.circular)) {
      this.step(1);
    }
    let activeIndex = this.circular && this._activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
    this.onActiveIndexChange.emit(activeIndex);
    if (e.cancelable) {
      e.preventDefault();
    }
  }
  onItemClick(index) {
    this.stopTheSlideShow();
    let selectedItemIndex = index;
    if (selectedItemIndex !== this._activeIndex) {
      const diff = selectedItemIndex + this.totalShiftedItems;
      let dir = 0;
      if (selectedItemIndex < this._activeIndex) {
        dir = this.d_numVisible - diff - 1 - this.getMedianItemIndex();
        if (dir > 0 && -1 * this.totalShiftedItems !== 0) {
          this.step(dir);
        }
      } else {
        dir = this.getMedianItemIndex() - diff;
        if (dir < 0 && -1 * this.totalShiftedItems < this.getTotalPageNumber() - 1) {
          this.step(dir);
        }
      }
      this.activeIndex = selectedItemIndex;
      this.onActiveIndexChange.emit(this.activeIndex);
    }
  }
  onThumbnailKeydown(event, index) {
    if (event.code === "Enter" || event.code === "Space") {
      this.onItemClick(index);
      event.preventDefault();
    }
    switch (event.code) {
      case "ArrowRight":
        this.onRightKey();
        break;
      case "ArrowLeft":
        this.onLeftKey();
        break;
      case "Home":
        this.onHomeKey();
        event.preventDefault();
        break;
      case "End":
        this.onEndKey();
        event.preventDefault();
        break;
      case "ArrowUp":
      case "ArrowDown":
        event.preventDefault();
        break;
      case "Tab":
        this.onTabKey();
        break;
      default:
        break;
    }
  }
  onRightKey() {
    const indicators = Y(this.itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]');
    const activeIndex = this.findFocusedIndicatorIndex();
    this.changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
  }
  onLeftKey() {
    const activeIndex = this.findFocusedIndicatorIndex();
    this.changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
  }
  onHomeKey() {
    const activeIndex = this.findFocusedIndicatorIndex();
    this.changedFocusedIndicator(activeIndex, 0);
  }
  onEndKey() {
    const indicators = Y(this.itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]');
    const activeIndex = this.findFocusedIndicatorIndex();
    this.changedFocusedIndicator(activeIndex, indicators.length - 1);
  }
  onTabKey() {
    const indicators = [...Y(this.itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]')];
    const highlightedIndex = indicators.findIndex((ind) => Q(ind, "data-p-active") === true);
    const activeIndicator = z(this.itemsContainer?.nativeElement, '[tabindex="0"]');
    const activeIndex = indicators.findIndex((ind) => ind === activeIndicator?.parentElement);
    indicators[activeIndex].children[0].tabIndex = "-1";
    indicators[highlightedIndex].children[0].tabIndex = "0";
  }
  findFocusedIndicatorIndex() {
    const indicators = [...Y(this.itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]')];
    const activeIndicator = z(this.itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"] > [tabindex="0"]');
    return indicators.findIndex((ind) => ind === activeIndicator?.parentElement);
  }
  changedFocusedIndicator(prevInd, nextInd) {
    const indicators = Y(this.itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]');
    indicators[prevInd].children[0].tabIndex = "-1";
    indicators[nextInd].children[0].tabIndex = "0";
    indicators[nextInd].children[0].focus();
  }
  step(dir) {
    let totalShiftedItems = this.totalShiftedItems + dir;
    if (dir < 0 && -1 * totalShiftedItems + this.d_numVisible > this.value.length - 1) {
      totalShiftedItems = this.d_numVisible - this.value.length;
    } else if (dir > 0 && totalShiftedItems > 0) {
      totalShiftedItems = 0;
    }
    if (this.circular) {
      if (dir < 0 && this.value.length - 1 === this._activeIndex) {
        totalShiftedItems = 0;
      } else if (dir > 0 && this._activeIndex === 0) {
        totalShiftedItems = this.d_numVisible - this.value.length;
      }
    }
    if (this.itemsContainer) {
      this.document.body.setAttribute("data-p-items-hidden", "false");
      !this.$unstyled() && P(this.itemsContainer.nativeElement, "p-items-hidden");
      this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
      this.itemsContainer.nativeElement.style.transition = "transform 500ms ease 0s";
    }
    this.totalShiftedItems = totalShiftedItems;
  }
  stopTheSlideShow() {
    if (this.slideShowActive && this.stopSlideShow) {
      this.stopSlideShow.emit();
    }
  }
  changePageOnTouch(e, diff) {
    if (diff < 0) {
      this.navForward(e);
    } else {
      this.navBackward(e);
    }
  }
  getTotalPageNumber() {
    return this.value.length > this.d_numVisible ? this.value.length - this.d_numVisible + 1 : 0;
  }
  getMedianItemIndex() {
    let index = Math.floor(this.d_numVisible / 2);
    return this.d_numVisible % 2 ? index : index - 1;
  }
  onTransitionEnd() {
    if (this.itemsContainer && this.itemsContainer.nativeElement) {
      this.document.body.setAttribute("data-p-items-hidden", "true");
      !this.$unstyled() && W(this.itemsContainer.nativeElement, "p-items-hidden");
      this.itemsContainer.nativeElement.style.transition = "";
    }
  }
  onTouchEnd(e) {
    let touchobj = e.changedTouches[0];
    if (this.isVertical) {
      this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
    } else {
      this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
    }
  }
  onTouchMove(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }
  onTouchStart(e) {
    let touchobj = e.changedTouches[0];
    this.startPos = {
      x: touchobj.pageX,
      y: touchobj.pageY
    };
  }
  isNavBackwardDisabled() {
    return !this.circular && this._activeIndex === 0 || this.value.length <= this.d_numVisible;
  }
  isNavForwardDisabled() {
    return !this.circular && this._activeIndex === this.value.length - 1 || this.value.length <= this.d_numVisible;
  }
  firstItemAciveIndex() {
    return this.totalShiftedItems * -1;
  }
  lastItemActiveIndex() {
    return this.firstItemAciveIndex() + this.d_numVisible - 1;
  }
  isItemActive(index) {
    return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
  }
  bindDocumentListeners() {
    if (isPlatformBrowser(this.platformId)) {
      const window2 = this.document.defaultView || "window";
      this.documentResizeListener = this.renderer.listen(window2, "resize", () => {
        this.calculatePosition();
      });
    }
  }
  unbindDocumentListeners() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }
  onDestroy() {
    if (this.responsiveOptions) {
      this.unbindDocumentListeners();
    }
    if (this.thumbnailsStyle) {
      this.thumbnailsStyle.parentNode?.removeChild(this.thumbnailsStyle);
    }
  }
  ariaPrevButtonLabel() {
    return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.prevPageLabel : void 0;
  }
  ariaNextButtonLabel() {
    return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.nextPageLabel : void 0;
  }
  ariaPageLabel(value) {
    return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.pageLabel?.replace(/{page}/g, value) : void 0;
  }
  static ɵfac = function GalleriaThumbnails_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GalleriaThumbnails)(ɵɵdirectiveInject(Galleria));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _GalleriaThumbnails,
    selectors: [["div", "pGalleriaThumbnails", ""]],
    viewQuery: function GalleriaThumbnails_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c18, 5);
      }
      if (rf & 2) {
        let _t2;
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.itemsContainer = _t2.first);
      }
    },
    hostVars: 2,
    hostBindings: function GalleriaThumbnails_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("thumbnails"));
      }
    },
    inputs: {
      containerId: "containerId",
      value: "value",
      isVertical: [2, "isVertical", "isVertical", booleanAttribute],
      slideShowActive: [2, "slideShowActive", "slideShowActive", booleanAttribute],
      circular: [2, "circular", "circular", booleanAttribute],
      responsiveOptions: "responsiveOptions",
      contentHeight: "contentHeight",
      showThumbnailNavigators: "showThumbnailNavigators",
      templates: "templates",
      numVisible: "numVisible",
      activeIndex: "activeIndex"
    },
    outputs: {
      onActiveIndexChange: "onActiveIndexChange",
      stopSlideShow: "stopSlideShow"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([GalleriaStyle]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    attrs: _c19,
    decls: 7,
    vars: 15,
    consts: [["itemsContainer", ""], [3, "pBind"], ["type", "button", "pRipple", "", "data-pc-group-section", "thumbnailnavigator", 3, "pBind", "class", "click", 4, "ngIf"], [3, "pBind", "ngStyle"], ["role", "tablist", 3, "transitionend", "touchstart", "touchmove", "pBind"], [3, "pBind", "class", "keydown", 4, "ngFor", "ngForOf"], ["type", "button", "pRipple", "", "data-pc-group-section", "thumbnailnavigator", 3, "click", "pBind"], [4, "ngIf"], [4, "ngTemplateOutlet"], ["data-p-icon", "chevron-left", 3, "pBind", "class", 4, "ngIf"], ["data-p-icon", "chevron-up", 3, "pBind", "class", 4, "ngIf"], ["data-p-icon", "chevron-left", 3, "pBind"], ["data-p-icon", "chevron-up", 3, "pBind"], [3, "keydown", "pBind"], [3, "click", "touchend", "keydown.enter", "pBind"], ["pGalleriaItemSlot", "", "type", "thumbnail", 3, "pBind", "item", "templates", "unstyled"], ["data-p-icon", "chevron-right", 3, "pBind", "class", 4, "ngIf"], ["data-p-icon", "chevron-down", 3, "pBind", "class", 4, "ngIf"], ["data-p-icon", "chevron-right", 3, "pBind"], ["data-p-icon", "chevron-down", 3, "pBind"]],
    template: function GalleriaThumbnails_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 1);
        ɵɵtemplate(1, GalleriaThumbnails_button_1_Template, 3, 6, "button", 2);
        ɵɵelementStart(2, "div", 3)(3, "div", 4, 0);
        ɵɵlistener("transitionend", function GalleriaThumbnails_Template_div_transitionend_3_listener() {
          return ctx.onTransitionEnd();
        })("touchstart", function GalleriaThumbnails_Template_div_touchstart_3_listener($event) {
          return ctx.onTouchStart($event);
        })("touchmove", function GalleriaThumbnails_Template_div_touchmove_3_listener($event) {
          return ctx.onTouchMove($event);
        });
        ɵɵtemplate(5, GalleriaThumbnails_div_5_Template, 3, 19, "div", 5);
        ɵɵelementEnd()();
        ɵɵtemplate(6, GalleriaThumbnails_button_6_Template, 3, 6, "button", 2);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("thumbnailContent"));
        ɵɵproperty("pBind", ctx.ptm("thumbnailContent"));
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showThumbnailNavigators);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("thumbnailsViewport"));
        ɵɵproperty("pBind", ctx.ptm("thumbnailsViewport"))("ngStyle", ɵɵpureFunction1(13, _c20, ctx.isVertical ? ctx.contentHeight : ""));
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("thumbnailItems"));
        ɵɵproperty("pBind", ctx.ptm("thumbnailItems"));
        ɵɵadvance(2);
        ɵɵproperty("ngForOf", ctx.value);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showThumbnailNavigators);
      }
    },
    dependencies: () => [NgForOf, NgIf, NgTemplateOutlet, NgStyle, Ripple, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, Bind, GalleriaItemSlot],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GalleriaThumbnails, [{
    type: Component,
    args: [{
      selector: "div[pGalleriaThumbnails]",
      standalone: false,
      template: `
        <div [pBind]="ptm('thumbnailContent')" [class]="cx('thumbnailContent')">
            <button
                *ngIf="showThumbnailNavigators"
                type="button"
                [pBind]="ptm('thumbnailPrevButton')"
                [class]="cx('thumbnailPrevButton')"
                (click)="navBackward($event)"
                pRipple
                [attr.aria-label]="ariaPrevButtonLabel()"
                data-pc-group-section="thumbnailnavigator"
            >
                <ng-container *ngIf="!galleria.previousThumbnailIconTemplate && !galleria._previousThumbnailIconTemplate">
                    <svg data-p-icon="chevron-left" *ngIf="!isVertical" [pBind]="ptm('thumbnailPrevIcon')" [class]="cx('thumbnailPrevIcon')" />
                    <svg data-p-icon="chevron-up" *ngIf="isVertical" [pBind]="ptm('thumbnailPrevIcon')" [class]="cx('thumbnailPrevIcon')" />
                </ng-container>
                <ng-template *ngTemplateOutlet="galleria.previousThumbnailIconTemplate || galleria._previousThumbnailIconTemplate"></ng-template>
            </button>
            <div [pBind]="ptm('thumbnailsViewport')" [class]="cx('thumbnailsViewport')" [ngStyle]="{ height: isVertical ? contentHeight : '' }">
                <div #itemsContainer [pBind]="ptm('thumbnailItems')" [class]="cx('thumbnailItems')" (transitionend)="onTransitionEnd()" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" role="tablist">
                    <div
                        *ngFor="let item of value; let index = index"
                        [pBind]="ptm('thumbnailItem')"
                        [class]="cx('thumbnailItem', { index, activeIndex })"
                        [attr.aria-selected]="activeIndex === index"
                        [attr.aria-controls]="containerId + '_item_' + index"
                        (keydown)="onThumbnailKeydown($event, index)"
                        [attr.data-p-active]="activeIndex === index"
                    >
                        <div
                            [pBind]="ptm('thumbnail')"
                            [class]="cx('thumbnail')"
                            [attr.tabindex]="activeIndex === index ? 0 : -1"
                            [attr.aria-current]="activeIndex === index ? 'page' : undefined"
                            [attr.aria-label]="ariaPageLabel(index + 1)"
                            (click)="onItemClick(index)"
                            (touchend)="onItemClick(index)"
                            (keydown.enter)="onItemClick(index)"
                        >
                            <div pGalleriaItemSlot type="thumbnail" [pBind]="ptm('thumbnailItem')" [item]="item" [templates]="templates" [unstyled]="unstyled()"></div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                *ngIf="showThumbnailNavigators"
                type="button"
                [pBind]="ptm('thumbnailNextButton')"
                [class]="cx('thumbnailNextButton')"
                (click)="navForward($event)"
                pRipple
                [attr.aria-label]="ariaNextButtonLabel()"
                data-pc-group-section="thumbnailnavigator"
            >
                <ng-container *ngIf="!galleria.nextThumbnailIconTemplate && !galleria._nextThumbnailIconTemplate">
                    <svg data-p-icon="chevron-right" *ngIf="!isVertical" [pBind]="ptm('thumbnailNextIcon')" [class]="cx('thumbnailNextIcon')" />
                    <svg data-p-icon="chevron-down" *ngIf="isVertical" [pBind]="ptm('thumbnailNextIcon')" [class]="cx('thumbnailNextIcon')" />
                </ng-container>
                <ng-template *ngTemplateOutlet="galleria.nextThumbnailIconTemplate || galleria._nextThumbnailIconTemplate"></ng-template>
            </button>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [GalleriaStyle],
      host: {
        "[class]": 'cx("thumbnails")'
      },
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: Galleria
  }], {
    containerId: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    isVertical: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    slideShowActive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    circular: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    responsiveOptions: [{
      type: Input
    }],
    contentHeight: [{
      type: Input
    }],
    showThumbnailNavigators: [{
      type: Input
    }],
    templates: [{
      type: Input
    }],
    onActiveIndexChange: [{
      type: Output
    }],
    stopSlideShow: [{
      type: Output
    }],
    itemsContainer: [{
      type: ViewChild,
      args: ["itemsContainer"]
    }],
    numVisible: [{
      type: Input
    }],
    activeIndex: [{
      type: Input
    }]
  });
})();
var GalleriaModule = class _GalleriaModule {
  static ɵfac = function GalleriaModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GalleriaModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _GalleriaModule,
    declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails],
    imports: [CommonModule, SharedModule, Ripple, TimesIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, FocusTrap, BindModule, MotionModule],
    exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, SharedModule, TimesIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, BindModule, MotionModule, CommonModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GalleriaModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SharedModule, Ripple, TimesIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, FocusTrap, BindModule, MotionModule],
      exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule],
      declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails]
    }]
  }], null, null);
})();
export {
  Galleria,
  GalleriaClasses,
  GalleriaContent,
  GalleriaItem,
  GalleriaItemSlot,
  GalleriaModule,
  GalleriaStyle,
  GalleriaThumbnails
};
//# sourceMappingURL=primeng_galleria.js.map
