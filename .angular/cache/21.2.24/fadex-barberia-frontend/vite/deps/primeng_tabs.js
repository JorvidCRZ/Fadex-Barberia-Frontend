import {
  Ripple,
  RippleModule
} from "./chunk-YMDHHTAC.js";
import {
  ChevronLeftIcon,
  ChevronRightIcon
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
  K,
  Q,
  Rt,
  V,
  bt,
  k2 as k,
  s3 as s,
  v,
  z
} from "./chunk-HEA754HI.js";
import {
  CommonModule,
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
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  contentChild,
  input,
  model,
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
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
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
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵviewQuery
} from "./chunk-FR73ZBHC.js";
import {
  InjectionToken,
  computed,
  effect,
  forwardRef,
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
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/tabs/index.mjs
var style = "\n    .p-tabs {\n        display: flex;\n        flex-direction: column;\n    }\n\n    .p-tablist {\n        display: flex;\n        position: relative;\n        overflow: hidden;\n        background: dt('tabs.tablist.background');\n    }\n\n    .p-tablist-viewport {\n        overflow-x: auto;\n        overflow-y: hidden;\n        scroll-behavior: smooth;\n        scrollbar-width: none;\n        overscroll-behavior: contain auto;\n    }\n\n    .p-tablist-viewport::-webkit-scrollbar {\n        display: none;\n    }\n\n    .p-tablist-tab-list {\n        position: relative;\n        display: flex;\n        border-style: solid;\n        border-color: dt('tabs.tablist.border.color');\n        border-width: dt('tabs.tablist.border.width');\n    }\n\n    .p-tablist-content {\n        flex-grow: 1;\n    }\n\n    .p-tablist-nav-button {\n        all: unset;\n        position: absolute !important;\n        flex-shrink: 0;\n        inset-block-start: 0;\n        z-index: 2;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: dt('tabs.nav.button.background');\n        color: dt('tabs.nav.button.color');\n        width: dt('tabs.nav.button.width');\n        transition:\n            color dt('tabs.transition.duration'),\n            outline-color dt('tabs.transition.duration'),\n            box-shadow dt('tabs.transition.duration');\n        box-shadow: dt('tabs.nav.button.shadow');\n        outline-color: transparent;\n        cursor: pointer;\n    }\n\n    .p-tablist-nav-button:focus-visible {\n        z-index: 1;\n        box-shadow: dt('tabs.nav.button.focus.ring.shadow');\n        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');\n        outline-offset: dt('tabs.nav.button.focus.ring.offset');\n    }\n\n    .p-tablist-nav-button:hover {\n        color: dt('tabs.nav.button.hover.color');\n    }\n\n    .p-tablist-prev-button {\n        inset-inline-start: 0;\n    }\n\n    .p-tablist-next-button {\n        inset-inline-end: 0;\n    }\n\n    .p-tablist-prev-button:dir(rtl),\n    .p-tablist-next-button:dir(rtl) {\n        transform: rotate(180deg);\n    }\n\n    .p-tab {\n        flex-shrink: 0;\n        cursor: pointer;\n        user-select: none;\n        position: relative;\n        border-style: solid;\n        white-space: nowrap;\n        gap: dt('tabs.tab.gap');\n        background: dt('tabs.tab.background');\n        border-width: dt('tabs.tab.border.width');\n        border-color: dt('tabs.tab.border.color');\n        color: dt('tabs.tab.color');\n        padding: dt('tabs.tab.padding');\n        font-weight: dt('tabs.tab.font.weight');\n        transition:\n            background dt('tabs.transition.duration'),\n            border-color dt('tabs.transition.duration'),\n            color dt('tabs.transition.duration'),\n            outline-color dt('tabs.transition.duration'),\n            box-shadow dt('tabs.transition.duration');\n        margin: dt('tabs.tab.margin');\n        outline-color: transparent;\n    }\n\n    .p-tab:not(.p-disabled):focus-visible {\n        z-index: 1;\n        box-shadow: dt('tabs.tab.focus.ring.shadow');\n        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');\n        outline-offset: dt('tabs.tab.focus.ring.offset');\n    }\n\n    .p-tab:not(.p-tab-active):not(.p-disabled):hover {\n        background: dt('tabs.tab.hover.background');\n        border-color: dt('tabs.tab.hover.border.color');\n        color: dt('tabs.tab.hover.color');\n    }\n\n    .p-tab-active {\n        background: dt('tabs.tab.active.background');\n        border-color: dt('tabs.tab.active.border.color');\n        color: dt('tabs.tab.active.color');\n    }\n\n    .p-tabpanels {\n        background: dt('tabs.tabpanel.background');\n        color: dt('tabs.tabpanel.color');\n        padding: dt('tabs.tabpanel.padding');\n        outline: 0 none;\n    }\n\n    .p-tabpanel:focus-visible {\n        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');\n        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');\n        outline-offset: dt('tabs.tabpanel.focus.ring.offset');\n    }\n\n    .p-tablist-active-bar {\n        z-index: 1;\n        display: block;\n        position: absolute;\n        inset-block-end: dt('tabs.active.bar.bottom');\n        height: dt('tabs.active.bar.height');\n        background: dt('tabs.active.bar.background');\n        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);\n    }\n";

// node_modules/primeng/fesm2022/primeng-tabs.mjs
var _c0 = ["*"];
var _c1 = ["previcon"];
var _c2 = ["nexticon"];
var _c3 = ["content"];
var _c4 = ["prevButton"];
var _c5 = ["nextButton"];
var _c6 = ["inkbar"];
var _c7 = ["tabs"];
function TabList_Conditional_0_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TabList_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabList_Conditional_0_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 11);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.prevIconTemplate || ctx_r1._prevIconTemplate);
  }
}
function TabList_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 10);
  }
}
function TabList_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 9, 3);
    ɵɵlistener("click", function TabList_Conditional_0_Template_button_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onPrevButtonClick());
    });
    ɵɵconditionalCreate(2, TabList_Conditional_0_Conditional_2_Template, 1, 1, "ng-container")(3, TabList_Conditional_0_Conditional_3_Template, 1, 0, ":svg:svg", 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("prevButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("prevButton"));
    ɵɵattribute("aria-label", ctx_r1.prevButtonAriaLabel)("tabindex", ctx_r1.tabindex())("data-pc-group-section", "navigator");
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.prevIconTemplate || ctx_r1._prevIconTemplate ? 2 : 3);
  }
}
function TabList_Conditional_8_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TabList_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabList_Conditional_8_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 11);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nextIconTemplate || ctx_r1._nextIconTemplate);
  }
}
function TabList_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 12);
  }
}
function TabList_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 9, 4);
    ɵɵlistener("click", function TabList_Conditional_8_Template_button_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNextButtonClick());
    });
    ɵɵconditionalCreate(2, TabList_Conditional_8_Conditional_2_Template, 1, 1, "ng-container")(3, TabList_Conditional_8_Conditional_3_Template, 1, 0, ":svg:svg", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("nextButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("nextButton"));
    ɵɵattribute("aria-label", ctx_r1.nextButtonAriaLabel)("tabindex", ctx_r1.tabindex())("data-pc-group-section", "navigator");
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.nextIconTemplate || ctx_r1._nextIconTemplate ? 2 : 3);
  }
}
function TabPanel_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function TabPanel_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TabPanel_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabPanel_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const defaultContent_r2 = ɵɵreference(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.content() ? ctx_r0.content() : defaultContent_r2);
  }
}
var classes$4 = {
  root: ({
    instance
  }) => ["p-tabs p-component", {
    "p-tabs-scrollable": instance.scrollable()
  }]
};
var TabsStyle = class _TabsStyle extends BaseStyle {
  name = "tabs";
  style = style;
  classes = classes$4;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabsStyle_BaseFactory;
    return function TabsStyle_Factory(__ngFactoryType__) {
      return (ɵTabsStyle_BaseFactory || (ɵTabsStyle_BaseFactory = ɵɵgetInheritedFactory(_TabsStyle)))(__ngFactoryType__ || _TabsStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TabsStyle,
    factory: _TabsStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsStyle, [{
    type: Injectable
  }], null, null);
})();
var TabsClasses;
(function(TabsClasses2) {
  TabsClasses2["root"] = "p-tabs";
  TabsClasses2["list"] = "p-tablist";
  TabsClasses2["content"] = "p-tablist-content";
  TabsClasses2["tablist"] = "p-tablist-tab-list";
  TabsClasses2["tab"] = "p-tab";
  TabsClasses2["inkbar"] = "p-tablist-active-bar";
  TabsClasses2["button"] = "p-tablist-nav-button";
  TabsClasses2["tabpanels"] = "p-tabpanels";
  TabsClasses2["tabpanel"] = "p-tabs-panel";
})(TabsClasses || (TabsClasses = {}));
var TABS_INSTANCE = new InjectionToken("TABS_INSTANCE");
var Tabs = class _Tabs extends BaseComponent {
  $pcTabs = inject(TABS_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Value of the active tab.
   * @defaultValue undefined
   * @group Props
   */
  value = model(void 0, ...ngDevMode ? [{
    debugName: "value"
  }] : []);
  /**
   * When specified, enables horizontal and/or vertical scrolling.
   * @type boolean
   * @defaultValue false
   * @group Props
   */
  scrollable = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "scrollable"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * When enabled, tabs are not rendered until activation.
   * @type boolean
   * @defaultValue false
   * @group Props
   */
  lazy = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "lazy"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * When enabled, the focused tab is activated.
   * @type boolean
   * @defaultValue false
   * @group Props
   */
  selectOnFocus = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "selectOnFocus"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * Whether to display navigation buttons in container when scrollable is enabled.
   * @type boolean
   * @defaultValue true
   * @group Props
   */
  showNavigators = input(true, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "showNavigators"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * Tabindex of the tab buttons.
   * @type number
   * @defaultValue 0
   * @group Props
   */
  tabindex = input(0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "tabindex"
  } : {}), {
    transform: numberAttribute
  }));
  id = signal(s("pn_id_"), ...ngDevMode ? [{
    debugName: "id"
  }] : []);
  _componentStyle = inject(TabsStyle);
  updateValue(newValue) {
    this.value.update(() => newValue);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabs_BaseFactory;
    return function Tabs_Factory(__ngFactoryType__) {
      return (ɵTabs_BaseFactory || (ɵTabs_BaseFactory = ɵɵgetInheritedFactory(_Tabs)))(__ngFactoryType__ || _Tabs);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Tabs,
    selectors: [["p-tabs"]],
    hostVars: 3,
    hostBindings: function Tabs_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("id", ctx.id());
        ɵɵclassMap(ctx.cx("root"));
      }
    },
    inputs: {
      value: [1, "value"],
      scrollable: [1, "scrollable"],
      lazy: [1, "lazy"],
      selectOnFocus: [1, "selectOnFocus"],
      showNavigators: [1, "showNavigators"],
      tabindex: [1, "tabindex"]
    },
    outputs: {
      value: "valueChange"
    },
    features: [ɵɵProvidersFeature([TabsStyle, {
      provide: TABS_INSTANCE,
      useExisting: _Tabs
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Tabs
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function Tabs_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tabs, [{
    type: Component,
    args: [{
      selector: "p-tabs",
      standalone: true,
      imports: [CommonModule, BindModule],
      template: ` <ng-content></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [TabsStyle, {
        provide: TABS_INSTANCE,
        useExisting: Tabs
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Tabs
      }],
      host: {
        "[class]": 'cx("root")',
        "[attr.id]": "id()"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    value: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: false
      }]
    }, {
      type: Output,
      args: ["valueChange"]
    }],
    scrollable: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "scrollable",
        required: false
      }]
    }],
    lazy: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "lazy",
        required: false
      }]
    }],
    selectOnFocus: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "selectOnFocus",
        required: false
      }]
    }],
    showNavigators: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "showNavigators",
        required: false
      }]
    }],
    tabindex: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "tabindex",
        required: false
      }]
    }]
  });
})();
var classes$3 = {
  root: ({
    instance
  }) => ["p-tab", {
    "p-tab-active": instance.active(),
    "p-disabled": instance.disabled()
  }]
};
var TabStyle = class _TabStyle extends BaseStyle {
  name = "tab";
  classes = classes$3;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabStyle_BaseFactory;
    return function TabStyle_Factory(__ngFactoryType__) {
      return (ɵTabStyle_BaseFactory || (ɵTabStyle_BaseFactory = ɵɵgetInheritedFactory(_TabStyle)))(__ngFactoryType__ || _TabStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TabStyle,
    factory: _TabStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabStyle, [{
    type: Injectable
  }], null, null);
})();
var TabClasses;
(function(TabClasses2) {
  TabClasses2["tab"] = "p-tab";
})(TabClasses || (TabClasses = {}));
var classes$2 = {
  root: "p-tablist",
  content: "p-tablist-content p-tablist-viewport",
  tabList: "p-tablist-tab-list",
  activeBar: "p-tablist-active-bar",
  prevButton: "p-tablist-prev-button p-tablist-nav-button",
  nextButton: "p-tablist-next-button p-tablist-nav-button"
};
var TabListStyle = class _TabListStyle extends BaseStyle {
  name = "tablist";
  classes = classes$2;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabListStyle_BaseFactory;
    return function TabListStyle_Factory(__ngFactoryType__) {
      return (ɵTabListStyle_BaseFactory || (ɵTabListStyle_BaseFactory = ɵɵgetInheritedFactory(_TabListStyle)))(__ngFactoryType__ || _TabListStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TabListStyle,
    factory: _TabListStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabListStyle, [{
    type: Injectable
  }], null, null);
})();
var TabListClasses;
(function(TabListClasses2) {
  TabListClasses2["root"] = "p-tablist";
  TabListClasses2["content"] = "p-tablist-content";
  TabListClasses2["tabList"] = "p-tablist-tab-list";
  TabListClasses2["activeBar"] = "p-tablist-active-bar";
  TabListClasses2["prevButton"] = "p-tablist-prev-button";
  TabListClasses2["nextButton"] = "p-tablist-next-button";
})(TabListClasses || (TabListClasses = {}));
var TABLIST_INSTANCE = new InjectionToken("TABLIST_INSTANCE");
var TabList = class _TabList extends BaseComponent {
  $pcTabList = inject(TABLIST_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * A template reference variable that represents the previous icon in a UI component.
   * @type {TemplateRef<any> | undefined}
   * @group Templates
   */
  prevIconTemplate;
  /**
   * A template reference variable that represents the next icon in a UI component.
   * @type {TemplateRef<any> | undefined}
   * @group Templates
   */
  nextIconTemplate;
  templates;
  content;
  prevButton;
  nextButton;
  inkbar;
  tabs;
  pcTabs = inject(forwardRef(() => Tabs));
  isPrevButtonEnabled = signal(false, ...ngDevMode ? [{
    debugName: "isPrevButtonEnabled"
  }] : []);
  isNextButtonEnabled = signal(false, ...ngDevMode ? [{
    debugName: "isNextButtonEnabled"
  }] : []);
  resizeObserver;
  showNavigators = computed(() => this.pcTabs.showNavigators(), ...ngDevMode ? [{
    debugName: "showNavigators"
  }] : []);
  tabindex = computed(() => this.pcTabs.tabindex(), ...ngDevMode ? [{
    debugName: "tabindex"
  }] : []);
  scrollable = computed(() => this.pcTabs.scrollable(), ...ngDevMode ? [{
    debugName: "scrollable"
  }] : []);
  _componentStyle = inject(TabListStyle);
  constructor() {
    super();
    effect(() => {
      this.pcTabs.value();
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.updateInkBar();
        });
      }
    });
  }
  get prevButtonAriaLabel() {
    return this.config?.translation?.aria?.previous;
  }
  get nextButtonAriaLabel() {
    return this.config?.translation?.aria?.next;
  }
  onAfterViewInit() {
    if (this.showNavigators() && isPlatformBrowser(this.platformId)) {
      this.updateButtonState();
      this.bindResizeObserver();
    }
  }
  _prevIconTemplate;
  _nextIconTemplate;
  onAfterContentInit() {
    this.templates?.forEach((t) => {
      switch (t.getType()) {
        case "previcon":
          this._prevIconTemplate = t.template;
          break;
        case "nexticon":
          this._nextIconTemplate = t.template;
          break;
      }
    });
  }
  onDestroy() {
    this.unbindResizeObserver();
  }
  onScroll(event) {
    this.showNavigators() && this.updateButtonState();
    event.preventDefault();
  }
  onPrevButtonClick() {
    const _content = this.content.nativeElement;
    const width = Rt(_content);
    const pos = Math.abs(_content.scrollLeft) - width;
    const scrollLeft = pos <= 0 ? 0 : pos;
    _content.scrollLeft = V(_content) ? -1 * scrollLeft : scrollLeft;
  }
  onNextButtonClick() {
    const _content = this.content.nativeElement;
    const width = Rt(_content) - this.getVisibleButtonWidths();
    const pos = _content.scrollLeft + width;
    const lastPos = _content.scrollWidth - width;
    const scrollLeft = pos >= lastPos ? lastPos : pos;
    _content.scrollLeft = V(_content) ? -1 * scrollLeft : scrollLeft;
  }
  updateButtonState() {
    const _content = this.content?.nativeElement;
    const _list = this.el?.nativeElement;
    const {
      scrollWidth,
      offsetWidth
    } = _content;
    const scrollLeft = Math.abs(_content.scrollLeft);
    const width = Rt(_content);
    this.isPrevButtonEnabled.set(scrollLeft !== 0);
    this.isNextButtonEnabled.set(_list.offsetWidth >= offsetWidth && Math.abs(scrollLeft - scrollWidth + width) > 1);
  }
  updateInkBar() {
    const _content = this.content?.nativeElement;
    const _inkbar = this.inkbar?.nativeElement;
    const _tabs = this.tabs?.nativeElement;
    const activeTab = z(_content, '[data-pc-name="tab"][data-p-active="true"]');
    if (_inkbar) {
      _inkbar.style.width = v(activeTab) + "px";
      _inkbar.style.left = K(activeTab).left - K(_tabs).left + "px";
    }
  }
  getVisibleButtonWidths() {
    const _prevBtn = this.prevButton?.nativeElement;
    const _nextBtn = this.nextButton?.nativeElement;
    return [_prevBtn, _nextBtn].reduce((acc, el) => el ? acc + Rt(el) : acc, 0);
  }
  bindResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => this.updateButtonState());
    this.resizeObserver.observe(this.el.nativeElement);
  }
  unbindResizeObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.el.nativeElement);
      this.resizeObserver = null;
    }
  }
  static ɵfac = function TabList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TabList)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _TabList,
    selectors: [["p-tablist"]],
    contentQueries: function TabList_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c1, 4)(dirIndex, _c2, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.prevIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nextIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function TabList_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c3, 5)(_c4, 5)(_c5, 5)(_c6, 5)(_c7, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.content = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.prevButton = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nextButton = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.inkbar = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabs = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function TabList_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("root"));
      }
    },
    features: [ɵɵProvidersFeature([TabListStyle, {
      provide: TABLIST_INSTANCE,
      useExisting: _TabList
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _TabList
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 9,
    vars: 11,
    consts: [["content", ""], ["tabs", ""], ["inkbar", ""], ["prevButton", ""], ["nextButton", ""], ["type", "button", "pRipple", "", 3, "pBind", "class"], [3, "scroll", "pBind"], ["role", "tablist", 3, "pBind"], ["role", "presentation", 3, "pBind"], ["type", "button", "pRipple", "", 3, "click", "pBind"], ["data-p-icon", "chevron-left"], [4, "ngTemplateOutlet"], ["data-p-icon", "chevron-right"]],
    template: function TabList_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵconditionalCreate(0, TabList_Conditional_0_Template, 4, 7, "button", 5);
        ɵɵelementStart(1, "div", 6, 0);
        ɵɵlistener("scroll", function TabList_Template_div_scroll_1_listener($event) {
          return ctx.onScroll($event);
        });
        ɵɵelementStart(3, "div", 7, 1);
        ɵɵprojection(5);
        ɵɵelement(6, "span", 8, 2);
        ɵɵelementEnd()();
        ɵɵconditionalCreate(8, TabList_Conditional_8_Template, 4, 7, "button", 5);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.showNavigators() && ctx.isPrevButtonEnabled() ? 0 : -1);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("content"));
        ɵɵproperty("pBind", ctx.ptm("content"));
        ɵɵadvance(2);
        ɵɵclassMap(ctx.cx("tabList"));
        ɵɵproperty("pBind", ctx.ptm("tabList"));
        ɵɵadvance(3);
        ɵɵclassMap(ctx.cx("activeBar"));
        ɵɵproperty("pBind", ctx.ptm("activeBar"));
        ɵɵadvance(2);
        ɵɵconditional(ctx.showNavigators() && ctx.isNextButtonEnabled() ? 8 : -1);
      }
    },
    dependencies: [CommonModule, NgTemplateOutlet, ChevronLeftIcon, ChevronRightIcon, RippleModule, Ripple, SharedModule, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabList, [{
    type: Component,
    args: [{
      selector: "p-tablist",
      standalone: true,
      imports: [CommonModule, ChevronLeftIcon, ChevronRightIcon, RippleModule, SharedModule, BindModule],
      template: `
        @if (showNavigators() && isPrevButtonEnabled()) {
            <button
                type="button"
                #prevButton
                pRipple
                [pBind]="ptm('prevButton')"
                [class]="cx('prevButton')"
                [attr.aria-label]="prevButtonAriaLabel"
                [attr.tabindex]="tabindex()"
                [attr.data-pc-group-section]="'navigator'"
                (click)="onPrevButtonClick()"
            >
                @if (prevIconTemplate || _prevIconTemplate) {
                    <ng-container *ngTemplateOutlet="prevIconTemplate || _prevIconTemplate" />
                } @else {
                    <svg data-p-icon="chevron-left" />
                }
            </button>
        }
        <div #content [pBind]="ptm('content')" [class]="cx('content')" (scroll)="onScroll($event)">
            <div #tabs [pBind]="ptm('tabList')" [class]="cx('tabList')" role="tablist">
                <ng-content />
                <span #inkbar [pBind]="ptm('activeBar')" role="presentation" [class]="cx('activeBar')"></span>
            </div>
        </div>
        @if (showNavigators() && isNextButtonEnabled()) {
            <button
                type="button"
                #nextButton
                pRipple
                [pBind]="ptm('nextButton')"
                [class]="cx('nextButton')"
                [attr.aria-label]="nextButtonAriaLabel"
                [attr.tabindex]="tabindex()"
                [attr.data-pc-group-section]="'navigator'"
                (click)="onNextButtonClick()"
            >
                @if (nextIconTemplate || _nextIconTemplate) {
                    <ng-container *ngTemplateOutlet="nextIconTemplate || _nextIconTemplate" />
                } @else {
                    <svg data-p-icon="chevron-right" />
                }
            </button>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("root")'
      },
      providers: [TabListStyle, {
        provide: TABLIST_INSTANCE,
        useExisting: TabList
      }, {
        provide: PARENT_INSTANCE,
        useExisting: TabList
      }],
      hostDirectives: [Bind]
    }]
  }], () => [], {
    prevIconTemplate: [{
      type: ContentChild,
      args: ["previcon", {
        descendants: false
      }]
    }],
    nextIconTemplate: [{
      type: ContentChild,
      args: ["nexticon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    content: [{
      type: ViewChild,
      args: ["content"]
    }],
    prevButton: [{
      type: ViewChild,
      args: ["prevButton"]
    }],
    nextButton: [{
      type: ViewChild,
      args: ["nextButton"]
    }],
    inkbar: [{
      type: ViewChild,
      args: ["inkbar"]
    }],
    tabs: [{
      type: ViewChild,
      args: ["tabs"]
    }]
  });
})();
var TAB_INSTANCE = new InjectionToken("TAB_INSTANCE");
var Tab = class _Tab extends BaseComponent {
  $pcTab = inject(TAB_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Value of tab.
   * @defaultValue undefined
   * @group Props
   */
  value = model(...ngDevMode ? [void 0, {
    debugName: "value"
  }] : []);
  /**
   * Whether the tab is disabled.
   * @defaultValue false
   * @group Props
   */
  disabled = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "disabled"
  } : {}), {
    transform: booleanAttribute
  }));
  pcTabs = inject(forwardRef(() => Tabs));
  pcTabList = inject(forwardRef(() => TabList));
  el = inject(ElementRef);
  _componentStyle = inject(TabStyle);
  ripple = computed(() => this.config.ripple(), ...ngDevMode ? [{
    debugName: "ripple"
  }] : []);
  id = computed(() => `${this.pcTabs.id()}_tab_${this.value()}`, ...ngDevMode ? [{
    debugName: "id"
  }] : []);
  ariaControls = computed(() => `${this.pcTabs.id()}_tabpanel_${this.value()}`, ...ngDevMode ? [{
    debugName: "ariaControls"
  }] : []);
  active = computed(() => k(this.pcTabs.value(), this.value()), ...ngDevMode ? [{
    debugName: "active"
  }] : []);
  tabindex = computed(() => this.disabled() ? -1 : this.active() ? this.pcTabs.tabindex() : -1, ...ngDevMode ? [{
    debugName: "tabindex"
  }] : []);
  mutationObserver;
  onFocus(event) {
    if (!this.disabled()) {
      this.pcTabs.selectOnFocus() && this.changeActiveValue();
    }
  }
  onClick(event) {
    if (!this.disabled()) {
      this.changeActiveValue();
    }
  }
  onKeyDown(event) {
    switch (event.code) {
      case "ArrowRight":
        this.onArrowRightKey(event);
        break;
      case "ArrowLeft":
        this.onArrowLeftKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "PageDown":
        this.onPageDownKey(event);
        break;
      case "PageUp":
        this.onPageUpKey(event);
        break;
      case "Enter":
      case "NumpadEnter":
      case "Space":
        this.onEnterKey(event);
        break;
      default:
        break;
    }
    event.stopPropagation();
  }
  onAfterViewInit() {
    this.bindMutationObserver();
  }
  onArrowRightKey(event) {
    const nextTab = this.findNextTab(event.currentTarget);
    nextTab ? this.changeFocusedTab(event, nextTab) : this.onHomeKey(event);
    event.preventDefault();
  }
  onArrowLeftKey(event) {
    const prevTab = this.findPrevTab(event.currentTarget);
    prevTab ? this.changeFocusedTab(event, prevTab) : this.onEndKey(event);
    event.preventDefault();
  }
  onHomeKey(event) {
    const firstTab = this.findFirstTab();
    this.changeFocusedTab(event, firstTab);
    event.preventDefault();
  }
  onEndKey(event) {
    const lastTab = this.findLastTab();
    this.changeFocusedTab(event, lastTab);
    event.preventDefault();
  }
  onPageDownKey(event) {
    this.scrollInView(this.findLastTab());
    event.preventDefault();
  }
  onPageUpKey(event) {
    this.scrollInView(this.findFirstTab());
    event.preventDefault();
  }
  onEnterKey(event) {
    if (!this.disabled()) {
      this.changeActiveValue();
    }
    event.preventDefault();
  }
  findNextTab(tabElement, selfCheck = false) {
    const element = selfCheck ? tabElement : tabElement.nextElementSibling;
    return element ? Q(element, "data-p-disabled") || Q(element, "data-pc-section") === "activebar" ? this.findNextTab(element) : element : null;
  }
  findPrevTab(tabElement, selfCheck = false) {
    const element = selfCheck ? tabElement : tabElement.previousElementSibling;
    return element ? Q(element, "data-p-disabled") || Q(element, "data-pc-section") === "activebar" ? this.findPrevTab(element) : element : null;
  }
  findFirstTab() {
    return this.findNextTab(this.pcTabList?.tabs?.nativeElement?.firstElementChild, true);
  }
  findLastTab() {
    return this.findPrevTab(this.pcTabList?.tabs?.nativeElement?.lastElementChild, true);
  }
  changeActiveValue() {
    this.pcTabs.updateValue(this.value());
  }
  changeFocusedTab(event, element) {
    bt(element);
    this.scrollInView(element);
  }
  scrollInView(element) {
    element?.scrollIntoView?.({
      block: "nearest"
    });
  }
  bindMutationObserver() {
    if (isPlatformBrowser(this.platformId)) {
      this.mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(() => {
          if (this.active()) {
            this.pcTabList?.updateInkBar();
          }
        });
      });
      this.mutationObserver.observe(this.el.nativeElement, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }
  unbindMutationObserver() {
    this.mutationObserver?.disconnect();
  }
  onDestroy() {
    if (this.mutationObserver) {
      this.unbindMutationObserver();
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTab_BaseFactory;
    return function Tab_Factory(__ngFactoryType__) {
      return (ɵTab_BaseFactory || (ɵTab_BaseFactory = ɵɵgetInheritedFactory(_Tab)))(__ngFactoryType__ || _Tab);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Tab,
    selectors: [["p-tab"]],
    hostVars: 10,
    hostBindings: function Tab_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("focus", function Tab_focus_HostBindingHandler($event) {
          return ctx.onFocus($event);
        })("click", function Tab_click_HostBindingHandler($event) {
          return ctx.onClick($event);
        })("keydown", function Tab_keydown_HostBindingHandler($event) {
          return ctx.onKeyDown($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("id", ctx.id())("aria-controls", ctx.ariaControls())("role", "tab")("aria-selected", ctx.active())("aria-disabled", ctx.disabled())("data-p-disabled", ctx.disabled())("data-p-active", ctx.active())("tabindex", ctx.tabindex());
        ɵɵclassMap(ctx.cx("root"));
      }
    },
    inputs: {
      value: [1, "value"],
      disabled: [1, "disabled"]
    },
    outputs: {
      value: "valueChange"
    },
    features: [ɵɵProvidersFeature([TabStyle, {
      provide: TAB_INSTANCE,
      useExisting: _Tab
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Tab
    }]), ɵɵHostDirectivesFeature([Ripple, Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function Tab_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule, SharedModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tab, [{
    type: Component,
    args: [{
      selector: "p-tab",
      standalone: true,
      imports: [CommonModule, SharedModule, BindModule],
      template: ` <ng-content></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("root")',
        "[attr.id]": "id()",
        "[attr.aria-controls]": "ariaControls()",
        "[attr.role]": '"tab"',
        "[attr.aria-selected]": "active()",
        "[attr.aria-disabled]": "disabled()",
        "[attr.data-p-disabled]": "disabled()",
        "[attr.data-p-active]": "active()",
        "[attr.tabindex]": "tabindex()"
      },
      hostDirectives: [Ripple, Bind],
      providers: [TabStyle, {
        provide: TAB_INSTANCE,
        useExisting: Tab
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Tab
      }]
    }]
  }], null, {
    value: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: false
      }]
    }, {
      type: Output,
      args: ["valueChange"]
    }],
    disabled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    onFocus: [{
      type: HostListener,
      args: ["focus", ["$event"]]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var classes$1 = {
  root: ({
    instance
  }) => ["p-tabpanel", {
    "p-tabpanel-active": instance.active()
  }]
};
var TabPanelStyle = class _TabPanelStyle extends BaseStyle {
  name = "tabpanel";
  classes = classes$1;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabPanelStyle_BaseFactory;
    return function TabPanelStyle_Factory(__ngFactoryType__) {
      return (ɵTabPanelStyle_BaseFactory || (ɵTabPanelStyle_BaseFactory = ɵɵgetInheritedFactory(_TabPanelStyle)))(__ngFactoryType__ || _TabPanelStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TabPanelStyle,
    factory: _TabPanelStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabPanelStyle, [{
    type: Injectable
  }], null, null);
})();
var TabPanelClasses;
(function(TabPanelClasses2) {
  TabPanelClasses2["root"] = "p-tabpanel";
})(TabPanelClasses || (TabPanelClasses = {}));
var TABPANEL_INSTANCE = new InjectionToken("TABPANEL_INSTANCE");
var TabPanel = class _TabPanel extends BaseComponent {
  $pcTabPanel = inject(TABPANEL_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  pcTabs = inject(forwardRef(() => Tabs));
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * When enabled, tab is not rendered until activation.
   * @type boolean
   * @defaultValue false
   * @group Props
   */
  lazy = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "lazy"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * Value of the active tab.
   * @defaultValue undefined
   * @group Props
   */
  value = model(void 0, ...ngDevMode ? [{
    debugName: "value"
  }] : []);
  /**
   * Template for initializing complex content when lazy is enabled.
   * @group Templates
   */
  content = contentChild("content", ...ngDevMode ? [{
    debugName: "content"
  }] : []);
  id = computed(() => `${this.pcTabs.id()}_tabpanel_${this.value()}`, ...ngDevMode ? [{
    debugName: "id"
  }] : []);
  ariaLabelledby = computed(() => `${this.pcTabs.id()}_tab_${this.value()}`, ...ngDevMode ? [{
    debugName: "ariaLabelledby"
  }] : []);
  active = computed(() => k(this.pcTabs.value(), this.value()), ...ngDevMode ? [{
    debugName: "active"
  }] : []);
  isLazyEnabled = computed(() => this.pcTabs.lazy() || this.lazy(), ...ngDevMode ? [{
    debugName: "isLazyEnabled"
  }] : []);
  hasBeenRendered = false;
  shouldRender = computed(() => {
    if (!this.isLazyEnabled() || this.hasBeenRendered) {
      return true;
    }
    if (this.active()) {
      this.hasBeenRendered = true;
      return true;
    }
    return false;
  }, ...ngDevMode ? [{
    debugName: "shouldRender"
  }] : []);
  _componentStyle = inject(TabPanelStyle);
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabPanel_BaseFactory;
    return function TabPanel_Factory(__ngFactoryType__) {
      return (ɵTabPanel_BaseFactory || (ɵTabPanel_BaseFactory = ɵɵgetInheritedFactory(_TabPanel)))(__ngFactoryType__ || _TabPanel);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _TabPanel,
    selectors: [["p-tabpanel"]],
    contentQueries: function TabPanel_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuerySignal(dirIndex, ctx.content, _c3, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    },
    hostVars: 7,
    hostBindings: function TabPanel_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵdomProperty("hidden", !ctx.active());
        ɵɵattribute("id", ctx.id())("role", "tabpanel")("aria-labelledby", ctx.ariaLabelledby())("data-p-active", ctx.active());
        ɵɵclassMap(ctx.cx("root"));
      }
    },
    inputs: {
      lazy: [1, "lazy"],
      value: [1, "value"]
    },
    outputs: {
      value: "valueChange"
    },
    features: [ɵɵProvidersFeature([TabPanelStyle, {
      provide: TABPANEL_INSTANCE,
      useExisting: _TabPanel
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _TabPanel
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 3,
    vars: 1,
    consts: [["defaultContent", ""], [4, "ngTemplateOutlet"]],
    template: function TabPanel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, TabPanel_ng_template_0_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        ɵɵconditionalCreate(2, TabPanel_Conditional_2_Template, 1, 1, "ng-container");
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵconditional(ctx.shouldRender() ? 2 : -1);
      }
    },
    dependencies: [NgTemplateOutlet, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabPanel, [{
    type: Component,
    args: [{
      selector: "p-tabpanel",
      standalone: true,
      imports: [NgTemplateOutlet, BindModule],
      template: `
        <ng-template #defaultContent>
            <ng-content />
        </ng-template>

        @if (shouldRender()) {
            <ng-container *ngTemplateOutlet="content() ? content() : defaultContent" />
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [TabPanelStyle, {
        provide: TABPANEL_INSTANCE,
        useExisting: TabPanel
      }, {
        provide: PARENT_INSTANCE,
        useExisting: TabPanel
      }],
      host: {
        "[class]": 'cx("root")',
        "[attr.id]": "id()",
        "[attr.role]": '"tabpanel"',
        "[attr.aria-labelledby]": "ariaLabelledby()",
        "[attr.data-p-active]": "active()",
        "[hidden]": "!active()"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    lazy: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "lazy",
        required: false
      }]
    }],
    value: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: false
      }]
    }, {
      type: Output,
      args: ["valueChange"]
    }],
    content: [{
      type: ContentChild,
      args: ["content", {
        isSignal: true
      }]
    }]
  });
})();
var classes = {
  root: "p-tabpanels"
};
var TabPanelsStyle = class _TabPanelsStyle extends BaseStyle {
  name = "tabpanels";
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabPanelsStyle_BaseFactory;
    return function TabPanelsStyle_Factory(__ngFactoryType__) {
      return (ɵTabPanelsStyle_BaseFactory || (ɵTabPanelsStyle_BaseFactory = ɵɵgetInheritedFactory(_TabPanelsStyle)))(__ngFactoryType__ || _TabPanelsStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TabPanelsStyle,
    factory: _TabPanelsStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabPanelsStyle, [{
    type: Injectable
  }], null, null);
})();
var TabPanelsClasses;
(function(TabPanelsClasses2) {
  TabPanelsClasses2["root"] = "p-tabpanels";
})(TabPanelsClasses || (TabPanelsClasses = {}));
var TABPANELS_INSTANCE = new InjectionToken("TABPANELS_INSTANCE");
var TabPanels = class _TabPanels extends BaseComponent {
  $pcTabPanels = inject(TABPANELS_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  _componentStyle = inject(TabPanelsStyle);
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabPanels_BaseFactory;
    return function TabPanels_Factory(__ngFactoryType__) {
      return (ɵTabPanels_BaseFactory || (ɵTabPanels_BaseFactory = ɵɵgetInheritedFactory(_TabPanels)))(__ngFactoryType__ || _TabPanels);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _TabPanels,
    selectors: [["p-tabpanels"]],
    hostVars: 3,
    hostBindings: function TabPanels_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("role", "presentation");
        ɵɵclassMap(ctx.cx("root"));
      }
    },
    features: [ɵɵProvidersFeature([TabPanelsStyle, {
      provide: TABPANELS_INSTANCE,
      useExisting: _TabPanels
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _TabPanels
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function TabPanels_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabPanels, [{
    type: Component,
    args: [{
      selector: "p-tabpanels",
      standalone: true,
      imports: [CommonModule, BindModule],
      template: ` <ng-content></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("root")',
        "[attr.role]": '"presentation"'
      },
      providers: [TabPanelsStyle, {
        provide: TABPANELS_INSTANCE,
        useExisting: TabPanels
      }, {
        provide: PARENT_INSTANCE,
        useExisting: TabPanels
      }],
      hostDirectives: [Bind]
    }]
  }], null, null);
})();
var TabsModule = class _TabsModule {
  static ɵfac = function TabsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TabsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TabsModule,
    imports: [Tabs, TabPanels, TabPanel, TabList, Tab, BindModule],
    exports: [Tabs, TabPanels, TabPanel, TabList, Tab, BindModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Tabs, TabPanels, TabPanel, TabList, Tab, BindModule, BindModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsModule, [{
    type: NgModule,
    args: [{
      imports: [Tabs, TabPanels, TabPanel, TabList, Tab, BindModule],
      exports: [Tabs, TabPanels, TabPanel, TabList, Tab, BindModule]
    }]
  }], null, null);
})();
export {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsClasses,
  TabsModule,
  TabsStyle
};
//# sourceMappingURL=primeng_tabs.js.map
