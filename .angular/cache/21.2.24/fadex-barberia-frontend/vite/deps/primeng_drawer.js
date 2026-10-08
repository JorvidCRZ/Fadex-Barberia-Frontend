import {
  FocusTrap,
  FocusTrapModule
} from "./chunk-PBERNHWM.js";
import {
  zindexutils
} from "./chunk-OHFYJZH5.js";
import {
  MotionDirective,
  MotionModule
} from "./chunk-CQDTUEQU.js";
import {
  Button
} from "./chunk-CD2MPJWB.js";
import "./chunk-LNLEKQ2Z.js";
import "./chunk-TONGHQ5F.js";
import {
  blockBodyScroll,
  unblockBodyScroll
} from "./chunk-VKUYHHYD.js";
import "./chunk-YMDHHTAC.js";
import {
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
  Bind
} from "./chunk-RFX47YJQ.js";
import {
  PrimeTemplate,
  SharedModule
} from "./chunk-SKV3H6PS.js";
import {
  P,
  W,
  _t,
  ut
} from "./chunk-HEA754HI.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgTemplateOutlet
} from "./chunk-LFUJRON5.js";
import "./chunk-JAJ76GOU.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Injectable,
  Input,
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
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-FR73ZBHC.js";
import {
  EventEmitter,
  InjectionToken,
  computed,
  inject,
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

// node_modules/@primeuix/styles/dist/drawer/index.mjs
var style = "\n    .p-drawer {\n        display: flex;\n        flex-direction: column;\n        transform: translate3d(0px, 0px, 0px);\n        position: relative;\n        transition: transform 0.3s;\n        background: dt('drawer.background');\n        color: dt('drawer.color');\n        border-style: solid;\n        border-color: dt('drawer.border.color');\n        box-shadow: dt('drawer.shadow');\n    }\n\n    .p-drawer-content {\n        overflow-y: auto;\n        flex-grow: 1;\n        padding: dt('drawer.content.padding');\n    }\n\n    .p-drawer-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-shrink: 0;\n        padding: dt('drawer.header.padding');\n    }\n\n    .p-drawer-footer {\n        padding: dt('drawer.footer.padding');\n    }\n\n    .p-drawer-title {\n        font-weight: dt('drawer.title.font.weight');\n        font-size: dt('drawer.title.font.size');\n    }\n\n    .p-drawer-full .p-drawer {\n        transition: none;\n        transform: none;\n        width: 100vw !important;\n        height: 100vh !important;\n        max-height: 100%;\n        top: 0px !important;\n        left: 0px !important;\n        border-width: 1px;\n    }\n\n    .p-drawer-left .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-left .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n\n    .p-drawer-right .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-right .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n\n    .p-drawer-top .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-top .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n\n    .p-drawer-bottom .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-bottom .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n\n    .p-drawer-full .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-full .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    \n    .p-drawer-left .p-drawer {\n        width: 20rem;\n        height: 100%;\n        border-inline-end-width: 1px;\n    }\n\n    .p-drawer-right .p-drawer {\n        width: 20rem;\n        height: 100%;\n        border-inline-start-width: 1px;\n    }\n\n    .p-drawer-top .p-drawer {\n        height: 10rem;\n        width: 100%;\n        border-block-end-width: 1px;\n    }\n\n    .p-drawer-bottom .p-drawer {\n        height: 10rem;\n        width: 100%;\n        border-block-start-width: 1px;\n    }\n\n    .p-drawer-left .p-drawer-content,\n    .p-drawer-right .p-drawer-content,\n    .p-drawer-top .p-drawer-content,\n    .p-drawer-bottom .p-drawer-content {\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-drawer-open {\n        display: flex;\n    }\n\n    .p-drawer-mask:dir(rtl) {\n        flex-direction: row-reverse;\n    }\n\n    @keyframes p-animate-drawer-enter-left {\n        from {\n            transform: translate3d(-100%, 0px, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-left {\n        to {\n            transform: translate3d(-100%, 0px, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-enter-right {\n        from {\n            transform: translate3d(100%, 0px, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-right {\n        to {\n            transform: translate3d(100%, 0px, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-enter-top {\n        from {\n            transform: translate3d(0px, -100%, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-top {\n        to {\n            transform: translate3d(0px, -100%, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-enter-bottom {\n        from {\n            transform: translate3d(0px, 100%, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-bottom {\n        to {\n            transform: translate3d(0px, 100%, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-enter-full {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-full {\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-drawer.mjs
var _c0 = ["header"];
var _c1 = ["footer"];
var _c2 = ["content"];
var _c3 = ["closeicon"];
var _c4 = ["headless"];
var _c5 = ["container"];
var _c6 = ["closeButton"];
var _c7 = ["*"];
function Drawer_Conditional_0_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Drawer_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Drawer_Conditional_0_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headlessTemplate || ctx_r1._headlessTemplate);
  }
}
function Drawer_Conditional_0_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Drawer_Conditional_0_Conditional_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("title"));
    ɵɵproperty("pBind", ctx_r1.ptm("title"));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.header);
  }
}
function Drawer_Conditional_0_Conditional_3_p_button_3_ng_template_1__svg_svg_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 12);
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "closeicon");
  }
}
function Drawer_Conditional_0_Conditional_3_p_button_3_ng_template_1_1_ng_template_0_Template(rf, ctx) {
}
function Drawer_Conditional_0_Conditional_3_p_button_3_ng_template_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Drawer_Conditional_0_Conditional_3_p_button_3_ng_template_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Drawer_Conditional_0_Conditional_3_p_button_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Drawer_Conditional_0_Conditional_3_p_button_3_ng_template_1__svg_svg_0_Template, 1, 1, "svg", 11)(1, Drawer_Conditional_0_Conditional_3_p_button_3_ng_template_1_1_Template, 1, 0, null, 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngIf", !ctx_r1.closeIconTemplate && !ctx_r1._closeIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.closeIconTemplate || ctx_r1._closeIconTemplate);
  }
}
function Drawer_Conditional_0_Conditional_3_p_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 10);
    ɵɵlistener("onClick", function Drawer_Conditional_0_Conditional_3_p_button_3_Template_p_button_onClick_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.close($event));
    })("keydown.enter", function Drawer_Conditional_0_Conditional_3_p_button_3_Template_p_button_keydown_enter_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.close($event));
    });
    ɵɵtemplate(1, Drawer_Conditional_0_Conditional_3_p_button_3_ng_template_1_Template, 2, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("pt", ctx_r1.ptm("pcCloseButton"))("ngClass", ctx_r1.cx("pcCloseButton"))("buttonProps", ctx_r1.closeButtonProps)("ariaLabel", ctx_r1.ariaCloseLabel)("unstyled", ctx_r1.unstyled());
    ɵɵattribute("data-pc-group-section", "iconcontainer");
  }
}
function Drawer_Conditional_0_Conditional_3_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Drawer_Conditional_0_Conditional_3_ng_container_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Drawer_Conditional_0_Conditional_3_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 5);
    ɵɵtemplate(2, Drawer_Conditional_0_Conditional_3_ng_container_7_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r1.ptm("footer"))("ngClass", ctx_r1.cx("footer"));
    ɵɵattribute("data-pc-section", "footer");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.footerTemplate || ctx_r1._footerTemplate);
  }
}
function Drawer_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵtemplate(1, Drawer_Conditional_0_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 4)(2, Drawer_Conditional_0_Conditional_3_div_2_Template, 2, 4, "div", 6)(3, Drawer_Conditional_0_Conditional_3_p_button_3_Template, 3, 6, "p-button", 7);
    ɵɵelementEnd();
    ɵɵelementStart(4, "div", 5);
    ɵɵprojection(5);
    ɵɵtemplate(6, Drawer_Conditional_0_Conditional_3_ng_container_6_Template, 1, 0, "ng-container", 4);
    ɵɵelementEnd();
    ɵɵtemplate(7, Drawer_Conditional_0_Conditional_3_ng_container_7_Template, 3, 4, "ng-container", 8);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("pBind", ctx_r1.ptm("header"))("ngClass", ctx_r1.cx("header"));
    ɵɵattribute("data-pc-section", "header");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate || ctx_r1._headerTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.header);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showCloseIcon && ctx_r1.closable);
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r1.ptm("content"))("ngClass", ctx_r1.cx("content"));
    ɵɵattribute("data-pc-section", "content");
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.contentTemplate || ctx_r1._contentTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.footerTemplate || ctx_r1._footerTemplate);
  }
}
function Drawer_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3, 0);
    ɵɵlistener("pMotionOnBeforeEnter", function Drawer_Conditional_0_Template_div_pMotionOnBeforeEnter_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onBeforeEnter($event));
    })("pMotionOnAfterLeave", function Drawer_Conditional_0_Template_div_pMotionOnAfterLeave_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onAfterLeave($event));
    })("keydown", function Drawer_Conditional_0_Template_div_keydown_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onKeyDown($event));
    });
    ɵɵconditionalCreate(2, Drawer_Conditional_0_Conditional_2_Template, 1, 1, "ng-container")(3, Drawer_Conditional_0_Conditional_3_Template, 8, 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r1.style);
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("root"), ctx_r1.styleClass));
    ɵɵproperty("pBind", ctx_r1.ptm("root"))("pMotion", ctx_r1.visible)("pMotionAppear", true)("pMotionEnterActiveClass", ctx_r1.$enterAnimation())("pMotionLeaveActiveClass", ctx_r1.$leaveAnimation())("pMotionOptions", ctx_r1.computedMotionOptions());
    ɵɵattribute("data-p", ctx_r1.dataP)("data-p-open", ctx_r1.visible);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.headlessTemplate || ctx_r1._headlessTemplate ? 2 : 3);
  }
}
var style2 = (
  /*css*/
  `
${style}

/** For PrimeNG **/
.p-drawer {
    position: fixed;
}

.p-drawer-left {
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    border-inline-end-width: 1px;
}

.p-drawer-right {
    top: 0;
    right: 0;
    width: 20rem;
    height: 100%;
    border-inline-start-width: 1px;
}

.p-drawer-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-end-width: 1px;
}

.p-drawer-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-start-width: 1px;
}

.p-drawer-full {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: none;
    transition: none;
}

/* Animations */
.p-drawer-enter-left {
    animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-left {
    animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-right {
    animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-right {
    animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-top {
    animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-top {
    animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-bottom {
    animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-bottom {
    animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-full {
    animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-full {
    animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
`
);
var classes = {
  mask: ({
    instance
  }) => ["p-drawer-mask", {
    [`p-overlay-mask p-overlay-mask-enter-active`]: instance.modal
  }, {
    "p-drawer-full": instance.fullScreen()
  }],
  root: ({
    instance
  }) => ["p-drawer p-component", {
    "p-drawer-full": instance.fullScreen(),
    "p-drawer-open": instance.visible
  }, `p-drawer-${instance.position()}`],
  header: "p-drawer-header",
  title: "p-drawer-title",
  pcCloseButton: "p-drawer-close-button",
  content: "p-drawer-content",
  footer: "p-drawer-footer"
};
var DrawerStyle = class _DrawerStyle extends BaseStyle {
  name = "drawer";
  style = style2;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDrawerStyle_BaseFactory;
    return function DrawerStyle_Factory(__ngFactoryType__) {
      return (ɵDrawerStyle_BaseFactory || (ɵDrawerStyle_BaseFactory = ɵɵgetInheritedFactory(_DrawerStyle)))(__ngFactoryType__ || _DrawerStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _DrawerStyle,
    factory: _DrawerStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DrawerStyle, [{
    type: Injectable
  }], null, null);
})();
var DrawerClasses;
(function(DrawerClasses2) {
  DrawerClasses2["mask"] = "p-drawer-mask";
  DrawerClasses2["root"] = "p-drawer";
  DrawerClasses2["header"] = "p-drawer-header";
  DrawerClasses2["title"] = "p-drawer-title";
  DrawerClasses2["pcCloseButton"] = "p-drawer-close-button";
  DrawerClasses2["content"] = "p-drawer-content";
})(DrawerClasses || (DrawerClasses = {}));
var DRAWER_INSTANCE = new InjectionToken("DRAWER_INSTANCE");
var Drawer = class _Drawer extends BaseComponent {
  $pcDrawer = inject(DRAWER_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("host"));
  }
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(void 0, ...ngDevMode ? [{
    debugName: "appendTo"
  }] : []);
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
   * Whether to block scrolling of the document when drawer is active.
   * @group Props
   */
  blockScroll = false;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Aria label of the close icon.
   * @group Props
   */
  ariaCloseLabel;
  /**
   * Whether to automatically manage layering.
   * @group Props
   */
  autoZIndex = true;
  /**
   * Base zIndex value to use in layering.
   * @group Props
   */
  baseZIndex = 0;
  /**
   * Whether an overlay mask is displayed behind the drawer.
   * @group Props
   */
  modal = true;
  /**
   * Used to pass all properties of the ButtonProps to the Button component.
   * @group Props
   */
  closeButtonProps = {
    severity: "secondary",
    text: true,
    rounded: true
  };
  /**
   * Whether to dismiss drawer on click of the mask.
   * @group Props
   */
  dismissible = true;
  /**
   * Whether to display the close icon.
   * @group Props
   * @deprecated use 'closable' instead.
   */
  showCloseIcon = true;
  /**
   * Specifies if pressing escape key should hide the drawer.
   * @group Props
   */
  closeOnEscape = true;
  /**
   * Transition options of the animation.
   * @group Props
   * @deprecated since v21.0.0. Use `motionOptions` instead.
   */
  transitionOptions = "150ms cubic-bezier(0, 0, 0.2, 1)";
  /**
   * The visible property is an input that determines the visibility of the component.
   * @defaultValue false
   * @group Props
   */
  get visible() {
    return this._visible ?? false;
  }
  set visible(value) {
    this._visible = value;
    if (this._visible && !this.modalVisible) {
      this.modalVisible = true;
    }
  }
  /**
   * Specifies the position of the drawer, valid values are "left", "right", "bottom" and "top".
   * @defaultValue 'left'
   * @group Props
   */
  position = input("left", ...ngDevMode ? [{
    debugName: "position"
  }] : []);
  /**
   * Adds a close icon to the header to hide the dialog.
   * @defaultValue false
   * @group Props
   */
  fullScreen = input(false, ...ngDevMode ? [{
    debugName: "fullScreen"
  }] : []);
  $enterAnimation = computed(() => this.fullScreen() ? "p-drawer-enter-full" : `p-drawer-enter-${this.position()}`, ...ngDevMode ? [{
    debugName: "$enterAnimation"
  }] : []);
  $leaveAnimation = computed(() => this.fullScreen() ? "p-drawer-leave-full" : `p-drawer-leave-${this.position()}`, ...ngDevMode ? [{
    debugName: "$leaveAnimation"
  }] : []);
  /**
   * Title content of the dialog.
   * @group Props
   */
  header;
  /**
   * Style of the mask.
   * @group Props
   */
  maskStyle;
  /**
   * Whether to display close button.
   * @group Props
   * @defaultValue true
   */
  closable = true;
  /**
   * Callback to invoke when dialog is shown.
   * @group Emits
   */
  onShow = new EventEmitter();
  /**
   * Callback to invoke when dialog is hidden.
   * @group Emits
   */
  onHide = new EventEmitter();
  /**
   * Callback to invoke when dialog visibility is changed.
   * @param {boolean} value - Visible value.
   * @group Emits
   */
  visibleChange = new EventEmitter();
  containerViewChild;
  closeButtonViewChild;
  initialized;
  _visible;
  _position = "left";
  _fullScreen = false;
  modalVisible = false;
  container;
  mask;
  maskClickListener;
  documentEscapeListener;
  animationEndListener;
  _componentStyle = inject(DrawerStyle);
  onAfterViewInit() {
    this.initialized = true;
  }
  /**
   * Custom header template.
   * @group Templates
   */
  headerTemplate;
  /**
   * Custom footer template.
   * @group Templates
   */
  footerTemplate;
  /**
   * Custom content template.
   * @group Templates
   */
  contentTemplate;
  /**
   * Custom close icon template.
   * @group Templates
   */
  closeIconTemplate;
  /**
   * Custom headless template to replace the entire drawer content.
   * @group Templates
   */
  headlessTemplate;
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  _headerTemplate;
  _footerTemplate;
  _contentTemplate;
  _closeIconTemplate;
  _headlessTemplate;
  templates;
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
        case "header":
          this._headerTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        case "closeicon":
          this._closeIconTemplate = item.template;
          break;
        case "headless":
          this._headlessTemplate = item.template;
          break;
        default:
          this._contentTemplate = item.template;
          break;
      }
    });
  }
  onKeyDown(event) {
    if (event.code === "Escape") {
      this.hide(false);
    }
  }
  show() {
    this.container?.setAttribute(this.$attrSelector, "");
    if (this.autoZIndex) {
      zindexutils.set("modal", this.container, this.baseZIndex || this.config.zIndex.modal);
    }
    if (this.modal) {
      this.enableModality();
    }
    this.onShow.emit({});
    this.visibleChange.emit(true);
  }
  hide(emit = true) {
    if (emit) {
      this.onHide.emit({});
    }
    if (this.modal) {
      this.disableModality();
    }
  }
  close(event) {
    this.hide();
    this.visibleChange.emit(false);
    event.preventDefault();
  }
  enableModality() {
    const activeDrawers = this.document.querySelectorAll('[data-p-open="true"]');
    const activeDrawersLength = activeDrawers.length;
    const zIndex = activeDrawersLength == 1 ? String(parseInt(this.container.style.zIndex) - 1) : String(parseInt(activeDrawers[activeDrawersLength - 1].style.zIndex) - 1);
    if (!this.mask) {
      this.mask = this.renderer.createElement("div");
      if (this.mask) {
        const style3 = `z-index: ${zIndex};${this.getMaskStyle()}`;
        _t(this.mask, "style", style3);
        _t(this.mask, "data-p", this.dataP);
        W(this.mask, this.cx("mask"));
      }
      if (this.dismissible) {
        this.maskClickListener = this.renderer.listen(this.mask, "click", (event) => {
          if (this.dismissible) {
            this.close(event);
          }
        });
      }
      this.renderer.appendChild(this.document.body, this.mask);
      if (this.blockScroll) {
        blockBodyScroll();
      }
    }
  }
  getMaskStyle() {
    return this.maskStyle ? Object.entries(this.maskStyle).map(([key, value]) => `${key}: ${value}`).join("; ") : "";
  }
  disableModality() {
    if (this.mask) {
      !this.$unstyled() && P(this.mask, "p-overlay-mask-enter-active");
      !this.$unstyled() && W(this.mask, "p-overlay-mask-leave-active");
      this.animationEndListener = this.renderer.listen(this.mask, "animationend", this.destroyModal.bind(this));
    }
  }
  destroyModal() {
    this.unbindMaskClickListener();
    if (this.mask) {
      this.renderer.removeChild(this.document.body, this.mask);
    }
    if (this.blockScroll) {
      unblockBodyScroll();
    }
    this.unbindAnimationEndListener();
    this.mask = null;
  }
  onBeforeEnter(event) {
    this.container = event.element;
    this.appendContainer();
    this.show();
    if (this.closeOnEscape) {
      this.bindDocumentEscapeListener();
    }
  }
  onAfterLeave() {
    this.hide(false);
    zindexutils.clear(this.container);
    this.unbindGlobalListeners();
    this.modalVisible = false;
    this.container = null;
  }
  appendContainer() {
    if (this.$appendTo() && this.$appendTo() !== "self") {
      if (this.$appendTo() === "body") {
        ut(this.document.body, this.container);
      } else {
        ut(this.$appendTo(), this.container);
      }
    }
  }
  bindDocumentEscapeListener() {
    const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
    this.documentEscapeListener = this.renderer.listen(documentTarget, "keydown", (event) => {
      if (event.which == 27) {
        if (parseInt(this.container?.style.zIndex) === zindexutils.get(this.container)) {
          this.close(event);
        }
      }
    });
  }
  unbindDocumentEscapeListener() {
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
      this.documentEscapeListener = null;
    }
  }
  unbindMaskClickListener() {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = null;
    }
  }
  unbindGlobalListeners() {
    this.unbindMaskClickListener();
    this.unbindDocumentEscapeListener();
  }
  unbindAnimationEndListener() {
    if (this.animationEndListener && this.mask) {
      this.animationEndListener();
      this.animationEndListener = null;
    }
  }
  onDestroy() {
    this.initialized = false;
    if (this.visible && this.modal) {
      this.destroyModal();
    }
    if (this.$appendTo() && this.container) {
      this.renderer.appendChild(this.el.nativeElement, this.container);
    }
    if (this.container && this.autoZIndex) {
      zindexutils.clear(this.container);
    }
    this.container = null;
    this.unbindGlobalListeners();
    this.unbindAnimationEndListener();
  }
  get dataP() {
    return this.cn({
      "full-screen": this.position() === "full",
      [this.position()]: this.position(),
      open: this.visible,
      modal: this.modal
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDrawer_BaseFactory;
    return function Drawer_Factory(__ngFactoryType__) {
      return (ɵDrawer_BaseFactory || (ɵDrawer_BaseFactory = ɵɵgetInheritedFactory(_Drawer)))(__ngFactoryType__ || _Drawer);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Drawer,
    selectors: [["p-drawer"]],
    contentQueries: function Drawer_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4)(dirIndex, _c1, 4)(dirIndex, _c2, 4)(dirIndex, _c3, 4)(dirIndex, _c4, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t2;
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.headerTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.footerTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.contentTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.closeIconTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.headlessTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.templates = _t2);
      }
    },
    viewQuery: function Drawer_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c5, 5)(_c6, 5);
      }
      if (rf & 2) {
        let _t2;
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.containerViewChild = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.closeButtonViewChild = _t2.first);
      }
    },
    inputs: {
      appendTo: [1, "appendTo"],
      motionOptions: [1, "motionOptions"],
      blockScroll: [2, "blockScroll", "blockScroll", booleanAttribute],
      style: "style",
      styleClass: "styleClass",
      ariaCloseLabel: "ariaCloseLabel",
      autoZIndex: [2, "autoZIndex", "autoZIndex", booleanAttribute],
      baseZIndex: [2, "baseZIndex", "baseZIndex", numberAttribute],
      modal: [2, "modal", "modal", booleanAttribute],
      closeButtonProps: "closeButtonProps",
      dismissible: [2, "dismissible", "dismissible", booleanAttribute],
      showCloseIcon: [2, "showCloseIcon", "showCloseIcon", booleanAttribute],
      closeOnEscape: [2, "closeOnEscape", "closeOnEscape", booleanAttribute],
      transitionOptions: "transitionOptions",
      visible: "visible",
      position: [1, "position"],
      fullScreen: [1, "fullScreen"],
      header: "header",
      maskStyle: "maskStyle",
      closable: [2, "closable", "closable", booleanAttribute]
    },
    outputs: {
      onShow: "onShow",
      onHide: "onHide",
      visibleChange: "visibleChange"
    },
    features: [ɵɵProvidersFeature([DrawerStyle, {
      provide: DRAWER_INSTANCE,
      useExisting: _Drawer
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Drawer
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c7,
    decls: 1,
    vars: 1,
    consts: [["container", ""], ["icon", ""], ["role", "complementary", "pFocusTrap", "", 3, "pBind", "pMotion", "pMotionAppear", "pMotionEnterActiveClass", "pMotionLeaveActiveClass", "pMotionOptions", "class", "style"], ["role", "complementary", "pFocusTrap", "", 3, "pMotionOnBeforeEnter", "pMotionOnAfterLeave", "keydown", "pBind", "pMotion", "pMotionAppear", "pMotionEnterActiveClass", "pMotionLeaveActiveClass", "pMotionOptions"], [4, "ngTemplateOutlet"], [3, "pBind", "ngClass"], [3, "pBind", "class", 4, "ngIf"], [3, "pt", "ngClass", "buttonProps", "ariaLabel", "unstyled", "onClick", "keydown.enter", 4, "ngIf"], [4, "ngIf"], [3, "pBind"], [3, "onClick", "keydown.enter", "pt", "ngClass", "buttonProps", "ariaLabel", "unstyled"], ["data-p-icon", "times", 4, "ngIf"], ["data-p-icon", "times"]],
    template: function Drawer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵconditionalCreate(0, Drawer_Conditional_0_Template, 4, 13, "div", 2);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.modalVisible ? 0 : -1);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, Button, TimesIcon, SharedModule, Bind, FocusTrapModule, FocusTrap, MotionModule, MotionDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Drawer, [{
    type: Component,
    args: [{
      selector: "p-drawer",
      standalone: true,
      imports: [CommonModule, Button, TimesIcon, SharedModule, Bind, FocusTrapModule, MotionModule],
      providers: [DrawerStyle, {
        provide: DRAWER_INSTANCE,
        useExisting: Drawer
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Drawer
      }],
      hostDirectives: [Bind],
      template: `
        @if (modalVisible) {
            <div
                #container
                [pBind]="ptm('root')"
                [pMotion]="visible"
                [pMotionAppear]="true"
                [pMotionEnterActiveClass]="$enterAnimation()"
                [pMotionLeaveActiveClass]="$leaveAnimation()"
                [pMotionOptions]="computedMotionOptions()"
                (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                (pMotionOnAfterLeave)="onAfterLeave($event)"
                [class]="cn(cx('root'), styleClass)"
                [style]="style"
                role="complementary"
                (keydown)="onKeyDown($event)"
                pFocusTrap
                [attr.data-p]="dataP"
                [attr.data-p-open]="visible"
            >
                @if (headlessTemplate || _headlessTemplate) {
                    <ng-container *ngTemplateOutlet="headlessTemplate || _headlessTemplate"></ng-container>
                } @else {
                    <div [pBind]="ptm('header')" [ngClass]="cx('header')" [attr.data-pc-section]="'header'">
                        <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
                        <div *ngIf="header" [pBind]="ptm('title')" [class]="cx('title')">{{ header }}</div>
                        <p-button
                            *ngIf="showCloseIcon && closable"
                            [pt]="ptm('pcCloseButton')"
                            [ngClass]="cx('pcCloseButton')"
                            (onClick)="close($event)"
                            (keydown.enter)="close($event)"
                            [buttonProps]="closeButtonProps"
                            [ariaLabel]="ariaCloseLabel"
                            [attr.data-pc-group-section]="'iconcontainer'"
                            [unstyled]="unstyled()"
                        >
                            <ng-template #icon>
                                <svg data-p-icon="times" *ngIf="!closeIconTemplate && !_closeIconTemplate" [attr.data-pc-section]="'closeicon'" />
                                <ng-template *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-template>
                            </ng-template>
                        </p-button>
                    </div>

                    <div [pBind]="ptm('content')" [ngClass]="cx('content')" [attr.data-pc-section]="'content'">
                        <ng-content></ng-content>
                        <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
                    </div>

                    <ng-container *ngIf="footerTemplate || _footerTemplate">
                        <div [pBind]="ptm('footer')" [ngClass]="cx('footer')" [attr.data-pc-section]="'footer'">
                            <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                        </div>
                    </ng-container>
                }
            </div>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    appendTo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appendTo",
        required: false
      }]
    }],
    motionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "motionOptions",
        required: false
      }]
    }],
    blockScroll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    ariaCloseLabel: [{
      type: Input
    }],
    autoZIndex: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    baseZIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    modal: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    closeButtonProps: [{
      type: Input
    }],
    dismissible: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showCloseIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    closeOnEscape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    transitionOptions: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    position: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "position",
        required: false
      }]
    }],
    fullScreen: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "fullScreen",
        required: false
      }]
    }],
    header: [{
      type: Input
    }],
    maskStyle: [{
      type: Input
    }],
    closable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onShow: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    containerViewChild: [{
      type: ViewChild,
      args: ["container"]
    }],
    closeButtonViewChild: [{
      type: ViewChild,
      args: ["closeButton"]
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
        descendants: false
      }]
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    closeIconTemplate: [{
      type: ContentChild,
      args: ["closeicon", {
        descendants: false
      }]
    }],
    headlessTemplate: [{
      type: ContentChild,
      args: ["headless", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var DrawerModule = class _DrawerModule {
  static ɵfac = function DrawerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DrawerModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DrawerModule,
    imports: [Drawer, SharedModule],
    exports: [Drawer, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Drawer, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DrawerModule, [{
    type: NgModule,
    args: [{
      imports: [Drawer, SharedModule],
      exports: [Drawer, SharedModule]
    }]
  }], null, null);
})();
export {
  Drawer,
  DrawerClasses,
  DrawerModule,
  DrawerStyle
};
//# sourceMappingURL=primeng_drawer.js.map
