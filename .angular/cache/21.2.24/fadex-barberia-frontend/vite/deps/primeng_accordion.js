import {
  transformToBoolean
} from "./chunk-OHFYJZH5.js";
import {
  Motion,
  MotionModule
} from "./chunk-CQDTUEQU.js";
import {
  Ripple
} from "./chunk-YMDHHTAC.js";
import {
  ChevronDownIcon,
  ChevronUpIcon
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
  SharedModule
} from "./chunk-SKV3H6PS.js";
import {
  Q,
  bt,
  s3 as s,
  z
} from "./chunk-HEA754HI.js";
import {
  CommonModule,
  NgIf,
  NgTemplateOutlet
} from "./chunk-LFUJRON5.js";
import "./chunk-JAJ76GOU.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewEncapsulation,
  input,
  model,
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
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵstyleProp,
  ɵɵtemplate
} from "./chunk-FR73ZBHC.js";
import {
  EventEmitter,
  InjectionToken,
  computed,
  forwardRef,
  inject,
  signal,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵnamespaceSVG
} from "./chunk-EGORNBH2.js";
import "./chunk-Y72XGDAT.js";
import "./chunk-HSWANC32.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/accordion/index.mjs
var style = "\n    .p-accordionpanel {\n        display: flex;\n        flex-direction: column;\n        border-style: solid;\n        border-width: dt('accordion.panel.border.width');\n        border-color: dt('accordion.panel.border.color');\n    }\n\n    .p-accordionheader {\n        all: unset;\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: dt('accordion.header.padding');\n        color: dt('accordion.header.color');\n        background: dt('accordion.header.background');\n        border-style: solid;\n        border-width: dt('accordion.header.border.width');\n        border-color: dt('accordion.header.border.color');\n        font-weight: dt('accordion.header.font.weight');\n        border-radius: dt('accordion.header.border.radius');\n        transition:\n            background dt('accordion.transition.duration'),\n            color dt('accordion.transition.duration'),\n            outline-color dt('accordion.transition.duration'),\n            box-shadow dt('accordion.transition.duration');\n        outline-color: transparent;\n    }\n\n    .p-accordionpanel:first-child > .p-accordionheader {\n        border-width: dt('accordion.header.first.border.width');\n        border-start-start-radius: dt('accordion.header.first.top.border.radius');\n        border-start-end-radius: dt('accordion.header.first.top.border.radius');\n    }\n\n    .p-accordionpanel:last-child > .p-accordionheader {\n        border-end-start-radius: dt('accordion.header.last.bottom.border.radius');\n        border-end-end-radius: dt('accordion.header.last.bottom.border.radius');\n    }\n\n    .p-accordionpanel:last-child.p-accordionpanel-active > .p-accordionheader {\n        border-end-start-radius: dt('accordion.header.last.active.bottom.border.radius');\n        border-end-end-radius: dt('accordion.header.last.active.bottom.border.radius');\n    }\n\n    .p-accordionheader-toggle-icon {\n        color: dt('accordion.header.toggle.icon.color');\n    }\n\n    .p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {\n        box-shadow: dt('accordion.header.focus.ring.shadow');\n        outline: dt('accordion.header.focus.ring.width') dt('accordion.header.focus.ring.style') dt('accordion.header.focus.ring.color');\n        outline-offset: dt('accordion.header.focus.ring.offset');\n    }\n\n    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {\n        background: dt('accordion.header.hover.background');\n        color: dt('accordion.header.hover.color');\n    }\n\n    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) .p-accordionheader:hover .p-accordionheader-toggle-icon {\n        color: dt('accordion.header.toggle.icon.hover.color');\n    }\n\n    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {\n        background: dt('accordion.header.active.background');\n        color: dt('accordion.header.active.color');\n    }\n\n    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {\n        color: dt('accordion.header.toggle.icon.active.color');\n    }\n\n    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover {\n        background: dt('accordion.header.active.hover.background');\n        color: dt('accordion.header.active.hover.color');\n    }\n\n    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover .p-accordionheader-toggle-icon {\n        color: dt('accordion.header.toggle.icon.active.hover.color');\n    }\n\n    .p-accordioncontent {\n        display: grid;\n        grid-template-rows: 1fr;\n    }\n\n    .p-accordioncontent-wrapper {\n        min-height: 0;\n    }\n\n    .p-accordioncontent-content {\n        border-style: solid;\n        border-width: dt('accordion.content.border.width');\n        border-color: dt('accordion.content.border.color');\n        background-color: dt('accordion.content.background');\n        color: dt('accordion.content.color');\n        padding: dt('accordion.content.padding');\n    }\n";

// node_modules/primeng/fesm2022/primeng-accordion.mjs
var _c0 = ["*"];
var _c1 = ["toggleicon"];
var _c2 = (a0) => ({
  active: a0
});
function AccordionHeader_Conditional_1_0_ng_template_0_Template(rf, ctx) {
}
function AccordionHeader_Conditional_1_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, AccordionHeader_Conditional_1_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function AccordionHeader_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, AccordionHeader_Conditional_1_0_Template, 1, 0, null, 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.toggleicon)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c2, ctx_r0.active()));
  }
}
function AccordionHeader_Conditional_2_ng_container_0_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 4);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("toggleicon"), ctx_r0.pcAccordion.collapseIcon));
    ɵɵproperty("pBind", ctx_r0.ptm("toggleicon"));
    ɵɵattribute("aria-hidden", true);
  }
}
function AccordionHeader_Conditional_2_ng_container_0__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("toggleicon"));
    ɵɵproperty("pBind", ctx_r0.ptm("toggleicon"));
    ɵɵattribute("aria-hidden", true);
  }
}
function AccordionHeader_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, AccordionHeader_Conditional_2_ng_container_0_span_1_Template, 1, 4, "span", 2)(2, AccordionHeader_Conditional_2_ng_container_0__svg_svg_2_Template, 1, 4, "svg", 3);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.pcAccordion.collapseIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.pcAccordion.collapseIcon);
  }
}
function AccordionHeader_Conditional_2_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 4);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("toggleicon"), ctx_r0.pcAccordion.expandIcon));
    ɵɵproperty("pBind", ctx_r0.ptm("toggleicon"));
    ɵɵattribute("aria-hidden", true);
  }
}
function AccordionHeader_Conditional_2_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("pBind", ctx_r0.ptm("toggleicon"));
    ɵɵattribute("aria-hidden", true);
  }
}
function AccordionHeader_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, AccordionHeader_Conditional_2_ng_container_1_span_1_Template, 1, 4, "span", 2)(2, AccordionHeader_Conditional_2_ng_container_1__svg_svg_2_Template, 1, 2, "svg", 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.pcAccordion.expandIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.pcAccordion.expandIcon);
  }
}
function AccordionHeader_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, AccordionHeader_Conditional_2_ng_container_0_Template, 3, 2, "ng-container", 1)(1, AccordionHeader_Conditional_2_ng_container_1_Template, 3, 2, "ng-container", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r0.active());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.active());
  }
}
var style2 = (
  /*css*/
  `
${style}

/* For PrimeNG */
.p-accordionheader-toggle-icon.icon-start {
    order: -1;
}

.p-accordionheader:has(.p-accordionheader-toggle-icon.icon-start) {
    justify-content: flex-start;
    gap: dt('accordion.header.padding');
}

.p-accordionheader.p-ripple {
    overflow: hidden;
    position: relative;
}

.p-accordioncontent .p-motion {
    display: grid;
    grid-template-rows: 1fr;
}
`
);
var classes = {
  root: "p-accordion p-component",
  panel: ({
    instance
  }) => ["p-accordionpanel", {
    "p-accordionpanel-active": instance.active(),
    "p-disabled": instance.disabled()
  }],
  header: "p-accordionheader",
  toggleicon: "p-accordionheader-toggle-icon",
  contentContainer: "p-accordioncontent",
  contentWrapper: "p-accordioncontent-wrapper",
  content: "p-accordioncontent-content"
};
var AccordionStyle = class _AccordionStyle extends BaseStyle {
  name = "accordion";
  style = style2;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵAccordionStyle_BaseFactory;
    return function AccordionStyle_Factory(__ngFactoryType__) {
      return (ɵAccordionStyle_BaseFactory || (ɵAccordionStyle_BaseFactory = ɵɵgetInheritedFactory(_AccordionStyle)))(__ngFactoryType__ || _AccordionStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _AccordionStyle,
    factory: _AccordionStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionStyle, [{
    type: Injectable
  }], null, null);
})();
var AccordionClasses;
(function(AccordionClasses2) {
  AccordionClasses2["root"] = "p-accordion";
  AccordionClasses2["contentwrapper"] = "p-accordioncontent";
  AccordionClasses2["content"] = "p-accordioncontent-content";
  AccordionClasses2["header"] = "p-accordionheader";
  AccordionClasses2["toggleicon"] = "p-accordionheader-toggle-icon";
  AccordionClasses2["panel"] = "p-accordionpanel";
})(AccordionClasses || (AccordionClasses = {}));
var ACCORDION_PANEL_INSTANCE = new InjectionToken("ACCORDION_PANEL_INSTANCE");
var ACCORDION_HEADER_INSTANCE = new InjectionToken("ACCORDION_HEADER_INSTANCE");
var ACCORDION_CONTENT_INSTANCE = new InjectionToken("ACCORDION_CONTENT_INSTANCE");
var ACCORDION_INSTANCE = new InjectionToken("ACCORDION_INSTANCE");
var AccordionPanel = class _AccordionPanel extends BaseComponent {
  $pcAccordionPanel = inject(ACCORDION_PANEL_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("root"));
  }
  pcAccordion = inject(forwardRef(() => Accordion));
  /**
   * Value of the active tab.
   * @defaultValue undefined
   * @group Props
   */
  value = model(void 0, ...ngDevMode ? [{
    debugName: "value"
  }] : []);
  /**
   * Disables the tab when enabled.
   * @defaultValue false
   * @group Props
   */
  disabled = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "disabled"
  } : {}), {
    transform: (v) => transformToBoolean(v)
  }));
  active = computed(() => this.pcAccordion.multiple() ? this.valueEquals(this.pcAccordion.value(), this.value()) : this.pcAccordion.value() === this.value(), ...ngDevMode ? [{
    debugName: "active"
  }] : []);
  valueEquals(currentValue, value) {
    if (Array.isArray(currentValue)) {
      return currentValue.includes(value);
    }
    return currentValue === value;
  }
  _componentStyle = inject(AccordionStyle);
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵAccordionPanel_BaseFactory;
    return function AccordionPanel_Factory(__ngFactoryType__) {
      return (ɵAccordionPanel_BaseFactory || (ɵAccordionPanel_BaseFactory = ɵɵgetInheritedFactory(_AccordionPanel)))(__ngFactoryType__ || _AccordionPanel);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _AccordionPanel,
    selectors: [["p-accordion-panel"], ["p-accordionpanel"]],
    hostVars: 4,
    hostBindings: function AccordionPanel_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-p-disabled", ctx.disabled())("data-p-active", ctx.active());
        ɵɵclassMap(ctx.cx("panel"));
      }
    },
    inputs: {
      value: [1, "value"],
      disabled: [1, "disabled"]
    },
    outputs: {
      value: "valueChange"
    },
    features: [ɵɵProvidersFeature([AccordionStyle, {
      provide: ACCORDION_PANEL_INSTANCE,
      useExisting: _AccordionPanel
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _AccordionPanel
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AccordionPanel_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionPanel, [{
    type: Component,
    args: [{
      selector: "p-accordion-panel, p-accordionpanel",
      imports: [CommonModule, BindModule],
      standalone: true,
      template: `<ng-content />`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("panel")',
        "[attr.data-p-disabled]": "disabled()",
        "[attr.data-p-active]": "active()"
      },
      hostDirectives: [Bind],
      providers: [AccordionStyle, {
        provide: ACCORDION_PANEL_INSTANCE,
        useExisting: AccordionPanel
      }, {
        provide: PARENT_INSTANCE,
        useExisting: AccordionPanel
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
    }]
  });
})();
var AccordionHeader = class _AccordionHeader extends BaseComponent {
  $pcAccordionHeader = inject(ACCORDION_HEADER_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("root"));
  }
  pcAccordion = inject(forwardRef(() => Accordion));
  pcAccordionPanel = inject(forwardRef(() => AccordionPanel));
  id = computed(() => `${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`, ...ngDevMode ? [{
    debugName: "id"
  }] : []);
  active = computed(() => this.pcAccordionPanel.active(), ...ngDevMode ? [{
    debugName: "active"
  }] : []);
  disabled = computed(() => this.pcAccordionPanel.disabled(), ...ngDevMode ? [{
    debugName: "disabled"
  }] : []);
  ariaControls = computed(() => `${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`, ...ngDevMode ? [{
    debugName: "ariaControls"
  }] : []);
  /**
   * Toggle icon template.
   * @type {TemplateRef<AccordionToggleIconTemplateContext>} context - Context of the template
   * @example
   * ```html
   * <ng-template #toggleicon let-active="active"> </ng-template>
   * ```
   * @see {@link AccordionToggleIconTemplateContext}
   * @group Templates
   */
  toggleicon;
  onClick(event) {
    if (this.disabled()) {
      return;
    }
    const wasActive = this.active();
    this.changeActiveValue();
    const isActive = this.active();
    const index = this.pcAccordionPanel.value();
    if (!wasActive && isActive) {
      this.pcAccordion.onOpen.emit({
        originalEvent: event,
        index
      });
    } else if (wasActive && !isActive) {
      this.pcAccordion.onClose.emit({
        originalEvent: event,
        index
      });
    }
  }
  onFocus() {
    if (!this.disabled() && this.pcAccordion.selectOnFocus()) {
      this.changeActiveValue();
    }
  }
  onKeydown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.arrowDownKey(event);
        break;
      case "ArrowUp":
        this.arrowUpKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "Enter":
      case "Space":
      case "NumpadEnter":
        this.onEnterKey(event);
        break;
      default:
        break;
    }
  }
  _componentStyle = inject(AccordionStyle);
  changeActiveValue() {
    this.pcAccordion.updateValue(this.pcAccordionPanel.value());
  }
  findPanel(headerElement) {
    return headerElement?.closest('[data-pc-name="accordionpanel"]');
  }
  findHeader(panelElement) {
    return z(panelElement, '[data-pc-name="accordionheader"]');
  }
  findNextPanel(panelElement, selfCheck = false) {
    const element = selfCheck ? panelElement : panelElement.nextElementSibling;
    return element ? Q(element, "data-p-disabled") ? this.findNextPanel(element) : this.findHeader(element) : null;
  }
  findPrevPanel(panelElement, selfCheck = false) {
    const element = selfCheck ? panelElement : panelElement.previousElementSibling;
    return element ? Q(element, "data-p-disabled") ? this.findPrevPanel(element) : this.findHeader(element) : null;
  }
  findFirstPanel() {
    return this.findNextPanel(this.pcAccordion.el.nativeElement.firstElementChild, true);
  }
  findLastPanel() {
    return this.findPrevPanel(this.pcAccordion.el.nativeElement.lastElementChild, true);
  }
  changeFocusedPanel(event, element) {
    bt(element);
  }
  arrowDownKey(event) {
    const nextPanel = this.findNextPanel(this.findPanel(event.currentTarget));
    nextPanel ? this.changeFocusedPanel(event, nextPanel) : this.onHomeKey(event);
    event.preventDefault();
  }
  arrowUpKey(event) {
    const prevPanel = this.findPrevPanel(this.findPanel(event.currentTarget));
    prevPanel ? this.changeFocusedPanel(event, prevPanel) : this.onEndKey(event);
    event.preventDefault();
  }
  onHomeKey(event) {
    const firstPanel = this.findFirstPanel();
    this.changeFocusedPanel(event, firstPanel);
    event.preventDefault();
  }
  onEndKey(event) {
    const lastPanel = this.findLastPanel();
    this.changeFocusedPanel(event, lastPanel);
    event.preventDefault();
  }
  onEnterKey(event) {
    if (!this.disabled()) {
      this.changeActiveValue();
    }
    event.preventDefault();
  }
  get dataP() {
    return this.cn({
      active: this.active()
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵAccordionHeader_BaseFactory;
    return function AccordionHeader_Factory(__ngFactoryType__) {
      return (ɵAccordionHeader_BaseFactory || (ɵAccordionHeader_BaseFactory = ɵɵgetInheritedFactory(_AccordionHeader)))(__ngFactoryType__ || _AccordionHeader);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _AccordionHeader,
    selectors: [["p-accordion-header"], ["p-accordionheader"]],
    contentQueries: function AccordionHeader_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c1, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.toggleicon = _t.first);
      }
    },
    hostVars: 13,
    hostBindings: function AccordionHeader_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function AccordionHeader_click_HostBindingHandler($event) {
          return ctx.onClick($event);
        })("focus", function AccordionHeader_focus_HostBindingHandler() {
          return ctx.onFocus();
        })("keydown", function AccordionHeader_keydown_HostBindingHandler($event) {
          return ctx.onKeydown($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("id", ctx.id())("aria-expanded", ctx.active())("aria-controls", ctx.ariaControls())("aria-disabled", ctx.disabled())("role", "button")("tabindex", ctx.disabled() ? "-1" : "0")("data-p-active", ctx.active())("data-p-disabled", ctx.disabled())("data-p", ctx.dataP);
        ɵɵclassMap(ctx.cx("header"));
        ɵɵstyleProp("user-select", "none");
      }
    },
    features: [ɵɵProvidersFeature([AccordionStyle, {
      provide: ACCORDION_HEADER_INSTANCE,
      useExisting: _AccordionHeader
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _AccordionHeader
    }]), ɵɵHostDirectivesFeature([Ripple, Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 3,
    vars: 1,
    consts: [[4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngIf"], [3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "chevron-up", 3, "class", "pBind", 4, "ngIf"], [3, "pBind"], ["data-p-icon", "chevron-up", 3, "pBind"], ["data-p-icon", "chevron-down", 3, "pBind", 4, "ngIf"], ["data-p-icon", "chevron-down", 3, "pBind"]],
    template: function AccordionHeader_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
        ɵɵconditionalCreate(1, AccordionHeader_Conditional_1_Template, 1, 4)(2, AccordionHeader_Conditional_2_Template, 2, 2);
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵconditional(ctx.toggleicon ? 1 : 2);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, ChevronDownIcon, ChevronUpIcon, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionHeader, [{
    type: Component,
    args: [{
      selector: "p-accordion-header, p-accordionheader",
      imports: [CommonModule, ChevronDownIcon, ChevronUpIcon, BindModule],
      standalone: true,
      template: `
        <ng-content />
        @if (toggleicon) {
            <ng-template *ngTemplateOutlet="toggleicon; context: { active: active() }"></ng-template>
        } @else {
            <ng-container *ngIf="active()">
                <span *ngIf="pcAccordion.collapseIcon" [class]="cn(cx('toggleicon'), pcAccordion.collapseIcon)" [attr.aria-hidden]="true" [pBind]="ptm('toggleicon')"></span>
                <svg data-p-icon="chevron-up" *ngIf="!pcAccordion.collapseIcon" [class]="cx('toggleicon')" [pBind]="ptm('toggleicon')" [attr.aria-hidden]="true" />
            </ng-container>
            <ng-container *ngIf="!active()">
                <span *ngIf="pcAccordion.expandIcon" [class]="cn(cx('toggleicon'), pcAccordion.expandIcon)" [attr.aria-hidden]="true" [pBind]="ptm('toggleicon')"></span>
                <svg data-p-icon="chevron-down" *ngIf="!pcAccordion.expandIcon" [attr.aria-hidden]="true" [pBind]="ptm('toggleicon')" />
            </ng-container>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": "cx('header')",
        "[attr.id]": "id()",
        "[attr.aria-expanded]": "active()",
        "[attr.aria-controls]": "ariaControls()",
        "[attr.aria-disabled]": "disabled()",
        "[attr.role]": '"button"',
        "[attr.tabindex]": 'disabled()?"-1":"0"',
        "[attr.data-p-active]": "active()",
        "[attr.data-p-disabled]": "disabled()",
        "[style.user-select]": '"none"',
        "[attr.data-p]": "dataP"
      },
      hostDirectives: [Ripple, Bind],
      providers: [AccordionStyle, {
        provide: ACCORDION_HEADER_INSTANCE,
        useExisting: AccordionHeader
      }, {
        provide: PARENT_INSTANCE,
        useExisting: AccordionHeader
      }]
    }]
  }], null, {
    toggleicon: [{
      type: ContentChild,
      args: ["toggleicon"]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    onFocus: [{
      type: HostListener,
      args: ["focus"]
    }],
    onKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var AccordionContent = class _AccordionContent extends BaseComponent {
  $pcAccordionContent = inject(ACCORDION_CONTENT_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("root"));
  }
  pcAccordion = inject(forwardRef(() => Accordion));
  pcAccordionPanel = inject(forwardRef(() => AccordionPanel));
  active = computed(() => this.pcAccordionPanel.active(), ...ngDevMode ? [{
    debugName: "active"
  }] : []);
  ariaLabelledby = computed(() => `${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`, ...ngDevMode ? [{
    debugName: "ariaLabelledby"
  }] : []);
  id = computed(() => `${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`, ...ngDevMode ? [{
    debugName: "id"
  }] : []);
  _componentStyle = inject(AccordionStyle);
  ptParams = computed(() => ({
    context: this.active()
  }), ...ngDevMode ? [{
    debugName: "ptParams"
  }] : []);
  computedMotionOptions = computed(() => {
    return __spreadValues(__spreadValues({}, this.ptm("motion", this.ptParams())), this.pcAccordion.computedMotionOptions());
  }, ...ngDevMode ? [{
    debugName: "computedMotionOptions"
  }] : []);
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵAccordionContent_BaseFactory;
    return function AccordionContent_Factory(__ngFactoryType__) {
      return (ɵAccordionContent_BaseFactory || (ɵAccordionContent_BaseFactory = ɵɵgetInheritedFactory(_AccordionContent)))(__ngFactoryType__ || _AccordionContent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _AccordionContent,
    selectors: [["p-accordion-content"], ["p-accordioncontent"]],
    hostVars: 6,
    hostBindings: function AccordionContent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("id", ctx.id())("role", "region")("data-p-active", ctx.active())("aria-labelledby", ctx.ariaLabelledby());
        ɵɵclassMap(ctx.cx("contentContainer"));
      }
    },
    features: [ɵɵProvidersFeature([AccordionStyle, {
      provide: ACCORDION_CONTENT_INSTANCE,
      useExisting: _AccordionContent
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _AccordionContent
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 4,
    vars: 10,
    consts: [["name", "p-collapsible", "hideStrategy", "visibility", 3, "visible", "mountOnEnter", "unmountOnLeave", "options"], [3, "pBind"]],
    template: function AccordionContent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "p-motion", 0)(1, "div", 1)(2, "div", 1);
        ɵɵprojection(3);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        ɵɵproperty("visible", ctx.active())("mountOnEnter", false)("unmountOnLeave", false)("options", ctx.computedMotionOptions());
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("contentWrapper"));
        ɵɵproperty("pBind", ctx.ptm("contentWrapper", ctx.ptParams()));
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("content"));
        ɵɵproperty("pBind", ctx.ptm("content", ctx.ptParams()));
      }
    },
    dependencies: [CommonModule, BindModule, Bind, MotionModule, Motion],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionContent, [{
    type: Component,
    args: [{
      selector: "p-accordion-content, p-accordioncontent",
      imports: [CommonModule, BindModule, MotionModule],
      standalone: true,
      template: `
        <p-motion [visible]="active()" name="p-collapsible" hideStrategy="visibility" [mountOnEnter]="false" [unmountOnLeave]="false" [options]="computedMotionOptions()">
            <div [pBind]="ptm('contentWrapper', ptParams())" [class]="cx('contentWrapper')">
                <div [pBind]="ptm('content', ptParams())" [class]="cx('content')">
                    <ng-content />
                </div>
            </div>
        </p-motion>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("contentContainer")',
        "[attr.id]": "id()",
        "[attr.role]": '"region"',
        "[attr.data-p-active]": "active()",
        "[attr.aria-labelledby]": "ariaLabelledby()"
      },
      hostDirectives: [Bind],
      providers: [AccordionStyle, {
        provide: ACCORDION_CONTENT_INSTANCE,
        useExisting: AccordionContent
      }, {
        provide: PARENT_INSTANCE,
        useExisting: AccordionContent
      }]
    }]
  }], null, null);
})();
var Accordion = class _Accordion extends BaseComponent {
  $pcAccordion = inject(ACCORDION_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("root"));
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
   * When enabled, multiple tabs can be activated at the same time.
   * @defaultValue false
   * @group Props
   */
  multiple = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "multiple"
  } : {}), {
    transform: (v) => transformToBoolean(v)
  }));
  /**
   * Class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Icon of a collapsed tab.
   * @group Props
   */
  expandIcon;
  /**
   * Icon of an expanded tab.
   * @group Props
   */
  collapseIcon;
  /**
   * When enabled, the focused tab is activated.
   * @defaultValue false
   * @group Props
   */
  selectOnFocus = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "selectOnFocus"
  } : {}), {
    transform: (v) => transformToBoolean(v)
  }));
  /**
   * Transition options of the animation.
   * @group Props
   * @deprecated since v21.0.0, use `motionOptions` instead.
   */
  transitionOptions = "400ms cubic-bezier(0.86, 0, 0.07, 1)";
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
   * Callback to invoke when an active tab is collapsed by clicking on the header.
   * @param {AccordionTabCloseEvent} event - Custom tab close event.
   * @group Emits
   */
  onClose = new EventEmitter();
  /**
   * Callback to invoke when a tab gets expanded.
   * @param {AccordionTabOpenEvent} event - Custom tab open event.
   * @group Emits
   */
  onOpen = new EventEmitter();
  id = signal(s("pn_id_"), ...ngDevMode ? [{
    debugName: "id"
  }] : []);
  _componentStyle = inject(AccordionStyle);
  onKeydown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.onTabArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onTabArrowUpKey(event);
        break;
      case "Home":
        if (!event.shiftKey) {
          this.onTabHomeKey(event);
        }
        break;
      case "End":
        if (!event.shiftKey) {
          this.onTabEndKey(event);
        }
        break;
    }
  }
  onTabArrowDownKey(event) {
    const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement);
    nextHeaderAction ? this.changeFocusedTab(nextHeaderAction) : this.onTabHomeKey(event);
    event.preventDefault();
  }
  onTabArrowUpKey(event) {
    const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement);
    prevHeaderAction ? this.changeFocusedTab(prevHeaderAction) : this.onTabEndKey(event);
    event.preventDefault();
  }
  onTabHomeKey(event) {
    const firstHeaderAction = this.findFirstHeaderAction();
    this.changeFocusedTab(firstHeaderAction);
    event.preventDefault();
  }
  changeFocusedTab(element) {
    if (element) {
      bt(element);
    }
  }
  findNextHeaderAction(tabElement, selfCheck = false) {
    const nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
    const headerElement = z(nextTabElement, '[data-pc-section="accordionheader"]');
    return headerElement ? Q(headerElement, "data-p-disabled") ? this.findNextHeaderAction(headerElement.parentElement) : z(headerElement.parentElement, '[data-pc-section="accordionheader"]') : null;
  }
  findPrevHeaderAction(tabElement, selfCheck = false) {
    const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
    const headerElement = z(prevTabElement, '[data-pc-section="accordionheader"]');
    return headerElement ? Q(headerElement, "data-p-disabled") ? this.findPrevHeaderAction(headerElement.parentElement) : z(headerElement.parentElement, '[data-pc-section="accordionheader"]') : null;
  }
  findFirstHeaderAction() {
    const firstEl = this.el.nativeElement.firstElementChild;
    return this.findNextHeaderAction(firstEl, true);
  }
  findLastHeaderAction() {
    const lastEl = this.el.nativeElement.lastElementChild;
    return this.findPrevHeaderAction(lastEl, true);
  }
  onTabEndKey(event) {
    const lastHeaderAction = this.findLastHeaderAction();
    this.changeFocusedTab(lastHeaderAction);
    event.preventDefault();
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  updateValue(value) {
    const currentValue = this.value();
    if (this.multiple()) {
      const newValue = Array.isArray(currentValue) ? [...currentValue] : [];
      const index = newValue.indexOf(value);
      if (index !== -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(value);
      }
      this.value.set(newValue);
    } else {
      if (currentValue === value) {
        this.value.set(void 0);
      } else {
        this.value.set(value);
      }
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵAccordion_BaseFactory;
    return function Accordion_Factory(__ngFactoryType__) {
      return (ɵAccordion_BaseFactory || (ɵAccordion_BaseFactory = ɵɵgetInheritedFactory(_Accordion)))(__ngFactoryType__ || _Accordion);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Accordion,
    selectors: [["p-accordion"]],
    hostVars: 2,
    hostBindings: function Accordion_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keydown", function Accordion_keydown_HostBindingHandler($event) {
          return ctx.onKeydown($event);
        });
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      value: [1, "value"],
      multiple: [1, "multiple"],
      styleClass: "styleClass",
      expandIcon: "expandIcon",
      collapseIcon: "collapseIcon",
      selectOnFocus: [1, "selectOnFocus"],
      transitionOptions: "transitionOptions",
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      value: "valueChange",
      onClose: "onClose",
      onOpen: "onOpen"
    },
    features: [ɵɵProvidersFeature([AccordionStyle, {
      provide: ACCORDION_INSTANCE,
      useExisting: _Accordion
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Accordion
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function Accordion_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Accordion, [{
    type: Component,
    args: [{
      selector: "p-accordion",
      standalone: true,
      imports: [CommonModule, SharedModule, BindModule],
      template: ` <ng-content />`,
      host: {
        "[class]": "cn(cx('root'), styleClass)"
      },
      hostDirectives: [Bind],
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [AccordionStyle, {
        provide: ACCORDION_INSTANCE,
        useExisting: Accordion
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Accordion
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
    multiple: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "multiple",
        required: false
      }]
    }],
    styleClass: [{
      type: Input
    }],
    expandIcon: [{
      type: Input
    }],
    collapseIcon: [{
      type: Input
    }],
    selectOnFocus: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "selectOnFocus",
        required: false
      }]
    }],
    transitionOptions: [{
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
    onClose: [{
      type: Output
    }],
    onOpen: [{
      type: Output
    }],
    onKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var AccordionModule = class _AccordionModule {
  static ɵfac = function AccordionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccordionModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AccordionModule,
    imports: [Accordion, SharedModule, AccordionPanel, AccordionHeader, AccordionContent, BindModule],
    exports: [Accordion, SharedModule, AccordionPanel, AccordionHeader, AccordionContent, BindModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Accordion, SharedModule, AccordionPanel, AccordionHeader, AccordionContent, BindModule, SharedModule, BindModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionModule, [{
    type: NgModule,
    args: [{
      imports: [Accordion, SharedModule, AccordionPanel, AccordionHeader, AccordionContent, BindModule],
      exports: [Accordion, SharedModule, AccordionPanel, AccordionHeader, AccordionContent, BindModule]
    }]
  }], null, null);
})();
export {
  Accordion,
  AccordionClasses,
  AccordionContent,
  AccordionHeader,
  AccordionModule,
  AccordionPanel,
  AccordionStyle
};
//# sourceMappingURL=primeng_accordion.js.map
