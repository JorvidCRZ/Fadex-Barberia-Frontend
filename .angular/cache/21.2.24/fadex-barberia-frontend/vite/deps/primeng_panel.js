import {
  MotionDirective,
  MotionModule
} from "./chunk-CQDTUEQU.js";
import {
  Button,
  ButtonModule
} from "./chunk-CD2MPJWB.js";
import "./chunk-LNLEKQ2Z.js";
import "./chunk-TONGHQ5F.js";
import "./chunk-VKUYHHYD.js";
import "./chunk-YMDHHTAC.js";
import {
  PlusIcon
} from "./chunk-34VLFIXD.js";
import {
  MinusIcon
} from "./chunk-3WBGCZC6.js";
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
  Footer,
  PrimeTemplate,
  SharedModule
} from "./chunk-SKV3H6PS.js";
import {
  s3 as s
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
  ContentChildren,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  input,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵdomProperty,
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
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
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

// node_modules/@primeuix/styles/dist/panel/index.mjs
var style = "\n    .p-panel {\n        display: block;\n        border: 1px solid dt('panel.border.color');\n        border-radius: dt('panel.border.radius');\n        background: dt('panel.background');\n        color: dt('panel.color');\n    }\n\n    .p-panel-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        padding: dt('panel.header.padding');\n        background: dt('panel.header.background');\n        color: dt('panel.header.color');\n        border-style: solid;\n        border-width: dt('panel.header.border.width');\n        border-color: dt('panel.header.border.color');\n        border-radius: dt('panel.header.border.radius');\n    }\n\n    .p-panel-toggleable .p-panel-header {\n        padding: dt('panel.toggleable.header.padding');\n    }\n\n    .p-panel-title {\n        line-height: 1;\n        font-weight: dt('panel.title.font.weight');\n    }\n\n    .p-panel-content-container {\n        display: grid;\n        grid-template-rows: 1fr;\n    }\n\n    .p-panel-content-wrapper {\n        min-height: 0;\n    }\n\n    .p-panel-content {\n        padding: dt('panel.content.padding');\n    }\n\n    .p-panel-footer {\n        padding: dt('panel.footer.padding');\n    }\n";

// node_modules/primeng/fesm2022/primeng-panel.mjs
var _c0 = ["header"];
var _c1 = ["icons"];
var _c2 = ["content"];
var _c3 = ["footer"];
var _c4 = ["headericons"];
var _c5 = ["contentWrapper"];
var _c6 = ["*", [["p-header"]], [["p-footer"]]];
var _c7 = ["*", "p-header", "p-footer"];
var _c8 = (a0) => ({
  $implicit: a0
});
function Panel_div_0_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 4);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("title"));
    ɵɵproperty("pBind", ctx_r1.ptm("title"));
    ɵɵattribute("id", ctx_r1.id + "_header");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1._header);
  }
}
function Panel_div_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Panel_div_0_5_ng_template_0_Template(rf, ctx) {
}
function Panel_div_0_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Panel_div_0_5_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Panel_div_0_p_button_6_ng_template_1_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵnamespaceSVG();
    ɵɵelement(1, "svg", 12);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r1.ptm("pcToggleButton.icon"));
  }
}
function Panel_div_0_p_button_6_ng_template_1_ng_container_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵnamespaceSVG();
    ɵɵelement(1, "svg", 13);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r1.ptm("pcToggleButton.icon"));
  }
}
function Panel_div_0_p_button_6_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Panel_div_0_p_button_6_ng_template_1_ng_container_0_ng_container_1_Template, 2, 1, "ng-container", 10)(2, Panel_div_0_p_button_6_ng_template_1_ng_container_0_ng_container_2_Template, 2, 1, "ng-container", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.collapsed);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.collapsed);
  }
}
function Panel_div_0_p_button_6_ng_template_1_1_ng_template_0_Template(rf, ctx) {
}
function Panel_div_0_p_button_6_ng_template_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Panel_div_0_p_button_6_ng_template_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Panel_div_0_p_button_6_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Panel_div_0_p_button_6_ng_template_1_ng_container_0_Template, 3, 2, "ng-container", 10)(1, Panel_div_0_p_button_6_ng_template_1_1_Template, 1, 0, null, 11);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", !ctx_r1.headerIconsTemplate && !ctx_r1._headerIconsTemplate && !(ctx_r1.toggleButtonProps == null ? null : ctx_r1.toggleButtonProps.icon));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerIconsTemplate || ctx_r1._headerIconsTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(3, _c8, ctx_r1.collapsed));
  }
}
function Panel_div_0_p_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 9);
    ɵɵlistener("click", function Panel_div_0_p_button_6_Template_p_button_click_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onIconClick($event));
    })("keydown", function Panel_div_0_p_button_6_Template_p_button_keydown_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onKeyDown($event));
    });
    ɵɵtemplate(1, Panel_div_0_p_button_6_ng_template_1_Template, 2, 5, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("text", true)("rounded", true)("styleClass", ctx_r1.cx("pcToggleButton"))("buttonProps", ctx_r1.toggleButtonProps)("pt", ctx_r1.ptm("pcToggleButton"))("unstyled", ctx_r1.unstyled());
    ɵɵattribute("id", ctx_r1.id + "_header")("aria-label", ctx_r1.buttonAriaLabel)("aria-controls", ctx_r1.id + "_content")("aria-expanded", !ctx_r1.collapsed);
  }
}
function Panel_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7);
    ɵɵlistener("click", function Panel_div_0_Template_div_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onHeaderClick($event));
    });
    ɵɵtemplate(1, Panel_div_0_span_1_Template, 2, 5, "span", 6);
    ɵɵprojection(2, 1);
    ɵɵtemplate(3, Panel_div_0_ng_container_3_Template, 1, 0, "ng-container", 5);
    ɵɵelementStart(4, "div", 4);
    ɵɵtemplate(5, Panel_div_0_5_Template, 1, 0, null, 5)(6, Panel_div_0_p_button_6_Template, 3, 10, "p-button", 8);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("header"));
    ɵɵproperty("pBind", ctx_r1.ptm("header"));
    ɵɵattribute("id", ctx_r1.id + "-titlebar")("data-p", ctx_r1.dataP);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1._header);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate || ctx_r1._headerTemplate);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("headerActions"));
    ɵɵproperty("pBind", ctx_r1.ptm("headerActions"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.iconTemplate || ctx_r1._iconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.toggleable);
  }
}
function Panel_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Panel_div_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Panel_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵprojection(1, 2);
    ɵɵtemplate(2, Panel_div_7_ng_container_2_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("footer"));
    ɵɵproperty("pBind", ctx_r1.ptm("footer"));
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.footerTemplate || ctx_r1._footerTemplate);
  }
}
var classes = {
  root: ({
    instance
  }) => ["p-panel p-component", {
    "p-panel-toggleable": instance.toggleable,
    "p-panel-expanded": !instance._collapsed && instance.toggleable,
    "p-panel-collapsed": instance._collapsed && instance.toggleable
  }],
  header: "p-panel-header",
  title: "p-panel-title",
  headerActions: ({
    instance
  }) => ["p-panel-header-actions", {
    "p-panel-icons-start": instance.iconPos === "start",
    "p-panel-icons-end": instance.iconPos === "end",
    "p-panel-icons-center": instance.iconPos === "center"
  }],
  pcToggleButton: "p-panel-toggle-button",
  contentContainer: "p-panel-content-container",
  contentWrapper: "p-panel-content-wrapper",
  content: "p-panel-content",
  footer: "p-panel-footer"
};
var PanelStyle = class _PanelStyle extends BaseStyle {
  name = "panel";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPanelStyle_BaseFactory;
    return function PanelStyle_Factory(__ngFactoryType__) {
      return (ɵPanelStyle_BaseFactory || (ɵPanelStyle_BaseFactory = ɵɵgetInheritedFactory(_PanelStyle)))(__ngFactoryType__ || _PanelStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _PanelStyle,
    factory: _PanelStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanelStyle, [{
    type: Injectable
  }], null, null);
})();
var PanelClasses;
(function(PanelClasses2) {
  PanelClasses2["root"] = "p-panel";
  PanelClasses2["header"] = "p-panel-header";
  PanelClasses2["title"] = "p-panel-title";
  PanelClasses2["headerActions"] = "p-panel-header-actions";
  PanelClasses2["pcToggleButton"] = "p-panel-toggle-button";
  PanelClasses2["contentContainer"] = "p-panel-content-container";
  PanelClasses2["contentWrapper"] = "p-panel-content-wrapper";
  PanelClasses2["content"] = "p-panel-content";
  PanelClasses2["footer"] = "p-panel-footer";
})(PanelClasses || (PanelClasses = {}));
var PANEL_INSTANCE = new InjectionToken("PANEL_INSTANCE");
var Panel = class _Panel extends BaseComponent {
  $pcPanel = inject(PANEL_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  _componentStyle = inject(PanelStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Id of the component.
   */
  id = s("pn_id_");
  /**
   * Defines if content of panel can be expanded and collapsed.
   * @group Props
   */
  toggleable;
  /**
   * Header text of the panel.
   * @group Props
   */
  _header;
  /**
   * Internal collapsed state
   */
  _collapsed;
  /**
   * Defines the initial state of panel content, supports one or two-way binding as well.
   * @group Props
   */
  get collapsed() {
    return this._collapsed;
  }
  set collapsed(value) {
    this._collapsed = value;
  }
  /**
   * Style class of the component.
   * @group Props
   * @deprecated since v20.0.0, use `class` instead.
   */
  styleClass;
  /**
   * Position of the icons.
   * @group Props
   */
  iconPos = "end";
  /**
   * Specifies if header of panel cannot be displayed.
   * @group Props
   */
  showHeader = true;
  /**
   * Specifies the toggler element to toggle the panel content.
   * @group Props
   */
  toggler = "icon";
  /**
   * Transition options of the animation.
   * @group Props
   * @deprecated since v21.0.0, use `motionOptions` instead.
   */
  transitionOptions = "400ms cubic-bezier(0.86, 0, 0.07, 1)";
  /**
   * Used to pass all properties of the ButtonProps to the Button component.
   * @group Props
   */
  toggleButtonProps;
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
   * Emitted when the collapsed changes.
   * @param {boolean} value - New Value.
   * @group Emits
   */
  collapsedChange = new EventEmitter();
  /**
   * Callback to invoke before panel toggle.
   * @param {PanelBeforeToggleEvent} event - Custom panel toggle event
   * @group Emits
   */
  onBeforeToggle = new EventEmitter();
  /**
   * Callback to invoke after panel toggle.
   * @param {PanelAfterToggleEvent} event - Custom panel toggle event
   * @group Emits
   */
  onAfterToggle = new EventEmitter();
  footerFacet;
  /**
   * Defines template option for header.
   * @group Templates
   */
  headerTemplate;
  /**
   * Defines template option for icon.
   * @example
   * ```html
   * <ng-template #icon> </ng-template>
   * ```
   * @group Templates
   */
  iconTemplate;
  /**
   * Defines template option for content.
   * @example
   * ```html
   * <ng-template #content> </ng-template>
   * ```
   * @group Templates
   */
  contentTemplate;
  /**
   * Defines template option for footer.
   * @example
   * ```html
   * <ng-template #footer> </ng-template>
   * ```
   * @group Templates
   */
  footerTemplate;
  /**
   * Defines template option for headerIcon.
   * @param {PanelHeaderIconsTemplateContext} context - context of the template.
   * @example
   * ```html
   * <ng-template #headericons let-collapsed> </ng-template>
   * ```
   * @see {@link PanelHeaderIconsTemplateContext}
   * @group Templates
   */
  headerIconsTemplate;
  _headerTemplate;
  _iconTemplate;
  _contentTemplate;
  _footerTemplate;
  _headerIconsTemplate;
  contentWrapperViewChild;
  get buttonAriaLabel() {
    return this._header;
  }
  onHeaderClick(event) {
    if (this.toggler === "header") {
      this.toggle(event);
    }
  }
  onIconClick(event) {
    if (this.toggler === "icon") {
      this.toggle(event);
    }
  }
  toggle(event) {
    this.onBeforeToggle.emit({
      originalEvent: event,
      collapsed: this.collapsed
    });
    if (this.collapsed) this.expand();
    else this.collapse();
    event.preventDefault();
  }
  expand() {
    this._collapsed = false;
    this.collapsedChange.emit(false);
    this.updateTabIndex();
  }
  collapse() {
    this._collapsed = true;
    this.collapsedChange.emit(true);
    this.updateTabIndex();
  }
  getBlockableElement() {
    return this.el.nativeElement;
  }
  updateTabIndex() {
    if (this.contentWrapperViewChild) {
      const focusableElements = this.contentWrapperViewChild.nativeElement.querySelectorAll("input, button, select, a, textarea, [tabindex]");
      focusableElements.forEach((element) => {
        if (this.collapsed) {
          element.setAttribute("tabindex", "-1");
        } else {
          element.removeAttribute("tabindex");
        }
      });
    }
  }
  onKeyDown(event) {
    if (event.code === "Enter" || event.code === "Space") {
      this.toggle(event);
      event.preventDefault();
    }
  }
  onToggleDone(event) {
    this.onAfterToggle.emit({
      originalEvent: event,
      collapsed: this.collapsed
    });
  }
  templates;
  onAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this._headerTemplate = item.template;
          break;
        case "content":
          this._contentTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        case "icons":
          this._iconTemplate = item.template;
          break;
        case "headericons":
          this._headerIconsTemplate = item.template;
          break;
        default:
          this._contentTemplate = item.template;
          break;
      }
    });
  }
  get dataP() {
    return this.cn({
      toggleable: this.toggleable
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPanel_BaseFactory;
    return function Panel_Factory(__ngFactoryType__) {
      return (ɵPanel_BaseFactory || (ɵPanel_BaseFactory = ɵɵgetInheritedFactory(_Panel)))(__ngFactoryType__ || _Panel);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Panel,
    selectors: [["p-panel"]],
    contentQueries: function Panel_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, Footer, 5)(dirIndex, _c0, 4)(dirIndex, _c1, 4)(dirIndex, _c2, 4)(dirIndex, _c3, 4)(dirIndex, _c4, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.iconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerIconsTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Panel_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c5, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentWrapperViewChild = _t.first);
      }
    },
    hostVars: 4,
    hostBindings: function Panel_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵdomProperty("id", ctx.id);
        ɵɵattribute("data-p", ctx.dataP);
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      id: "id",
      toggleable: [2, "toggleable", "toggleable", booleanAttribute],
      _header: [0, "header", "_header"],
      collapsed: [2, "collapsed", "collapsed", booleanAttribute],
      styleClass: "styleClass",
      iconPos: "iconPos",
      showHeader: [2, "showHeader", "showHeader", booleanAttribute],
      toggler: "toggler",
      transitionOptions: "transitionOptions",
      toggleButtonProps: "toggleButtonProps",
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      collapsedChange: "collapsedChange",
      onBeforeToggle: "onBeforeToggle",
      onAfterToggle: "onAfterToggle"
    },
    features: [ɵɵProvidersFeature([PanelStyle, {
      provide: PANEL_INSTANCE,
      useExisting: _Panel
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Panel
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c7,
    decls: 8,
    vars: 18,
    consts: [["contentWrapper", ""], ["icon", ""], [3, "pBind", "class", "click", 4, "ngIf"], ["pMotionName", "p-collapsible", "role", "region", 3, "pMotionOnAfterEnter", "pBind", "pMotion", "pMotionOptions", "id"], [3, "pBind"], [4, "ngTemplateOutlet"], [3, "pBind", "class", 4, "ngIf"], [3, "click", "pBind"], ["severity", "secondary", "type", "button", "role", "button", 3, "text", "rounded", "styleClass", "buttonProps", "pt", "unstyled", "click", "keydown", 4, "ngIf"], ["severity", "secondary", "type", "button", "role", "button", 3, "click", "keydown", "text", "rounded", "styleClass", "buttonProps", "pt", "unstyled"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["data-p-icon", "minus", 3, "pBind"], ["data-p-icon", "plus", 3, "pBind"]],
    template: function Panel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c6);
        ɵɵtemplate(0, Panel_div_0_Template, 7, 12, "div", 2);
        ɵɵelementStart(1, "div", 3);
        ɵɵlistener("pMotionOnAfterEnter", function Panel_Template_div_pMotionOnAfterEnter_1_listener($event) {
          return ctx.onToggleDone($event);
        });
        ɵɵelementStart(2, "div", 4)(3, "div", 4, 0);
        ɵɵprojection(5);
        ɵɵtemplate(6, Panel_ng_container_6_Template, 1, 0, "ng-container", 5);
        ɵɵelementEnd();
        ɵɵtemplate(7, Panel_div_7_Template, 3, 4, "div", 6);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", ctx.showHeader);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("contentContainer"));
        ɵɵproperty("pBind", ctx.ptm("contentContainer"))("pMotion", !ctx.toggleable || ctx.toggleable && !ctx.collapsed)("pMotionOptions", ctx.computedMotionOptions())("id", ctx.id + "_content");
        ɵɵattribute("aria-labelledby", ctx.id + "_header")("aria-hidden", ctx.collapsed)("tabindex", ctx.collapsed ? "-1" : void 0);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("contentWrapper"));
        ɵɵproperty("pBind", ctx.ptm("contentWrapper"));
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("content"));
        ɵɵproperty("pBind", ctx.ptm("content"));
        ɵɵadvance(3);
        ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate || ctx._contentTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.footerFacet || ctx.footerTemplate || ctx._footerTemplate);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, PlusIcon, MinusIcon, ButtonModule, Button, SharedModule, BindModule, Bind, MotionModule, MotionDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Panel, [{
    type: Component,
    args: [{
      selector: "p-panel",
      standalone: true,
      imports: [CommonModule, PlusIcon, MinusIcon, ButtonModule, SharedModule, BindModule, MotionModule],
      template: `
        <div [pBind]="ptm('header')" [class]="cx('header')" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'" [attr.data-p]="dataP">
            <span [pBind]="ptm('title')" [class]="cx('title')" *ngIf="_header" [attr.id]="id + '_header'">{{ _header }}</span>
            <ng-content select="p-header"></ng-content>
            <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
            <div [pBind]="ptm('headerActions')" [class]="cx('headerActions')">
                <ng-template *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-template>
                <p-button
                    *ngIf="toggleable"
                    [attr.id]="id + '_header'"
                    severity="secondary"
                    [text]="true"
                    [rounded]="true"
                    type="button"
                    role="button"
                    [styleClass]="cx('pcToggleButton')"
                    [attr.aria-label]="buttonAriaLabel"
                    [attr.aria-controls]="id + '_content'"
                    [attr.aria-expanded]="!collapsed"
                    (click)="onIconClick($event)"
                    (keydown)="onKeyDown($event)"
                    [buttonProps]="toggleButtonProps"
                    [pt]="ptm('pcToggleButton')"
                    [unstyled]="unstyled()"
                >
                    <ng-template #icon>
                        <ng-container *ngIf="!headerIconsTemplate && !_headerIconsTemplate && !toggleButtonProps?.icon">
                            <ng-container *ngIf="!collapsed">
                                <svg data-p-icon="minus" [pBind]="ptm('pcToggleButton.icon')" />
                            </ng-container>

                            <ng-container *ngIf="collapsed">
                                <svg data-p-icon="plus" [pBind]="ptm('pcToggleButton.icon')" />
                            </ng-container>
                        </ng-container>

                        <ng-template *ngTemplateOutlet="headerIconsTemplate || _headerIconsTemplate; context: { $implicit: collapsed }"></ng-template>
                    </ng-template>
                </p-button>
            </div>
        </div>
        <div
            [pBind]="ptm('contentContainer')"
            [pMotion]="!toggleable || (toggleable && !collapsed)"
            pMotionName="p-collapsible"
            [pMotionOptions]="computedMotionOptions()"
            [class]="cx('contentContainer')"
            [id]="id + '_content'"
            role="region"
            [attr.aria-labelledby]="id + '_header'"
            [attr.aria-hidden]="collapsed"
            [attr.tabindex]="collapsed ? '-1' : undefined"
            (pMotionOnAfterEnter)="onToggleDone($event)"
        >
            <div [pBind]="ptm('contentWrapper')" [class]="cx('contentWrapper')">
                <div [pBind]="ptm('content')" [class]="cx('content')" #contentWrapper>
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
                </div>

                <div [pBind]="ptm('footer')" [class]="cx('footer')" *ngIf="footerFacet || footerTemplate || _footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [PanelStyle, {
        provide: PANEL_INSTANCE,
        useExisting: Panel
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Panel
      }],
      host: {
        "[id]": "id",
        "[class]": "cn(cx('root'), styleClass)",
        "[attr.data-p]": "dataP"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    id: [{
      type: Input
    }],
    toggleable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    _header: [{
      type: Input,
      args: ["header"]
    }],
    collapsed: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    styleClass: [{
      type: Input
    }],
    iconPos: [{
      type: Input
    }],
    showHeader: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    toggler: [{
      type: Input
    }],
    transitionOptions: [{
      type: Input
    }],
    toggleButtonProps: [{
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
    collapsedChange: [{
      type: Output
    }],
    onBeforeToggle: [{
      type: Output
    }],
    onAfterToggle: [{
      type: Output
    }],
    footerFacet: [{
      type: ContentChild,
      args: [Footer]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    iconTemplate: [{
      type: ContentChild,
      args: ["icons", {
        descendants: false
      }]
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false
      }]
    }],
    headerIconsTemplate: [{
      type: ContentChild,
      args: ["headericons", {
        descendants: false
      }]
    }],
    contentWrapperViewChild: [{
      type: ViewChild,
      args: ["contentWrapper"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var PanelModule = class _PanelModule {
  static ɵfac = function PanelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PanelModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _PanelModule,
    imports: [Panel, SharedModule, BindModule],
    exports: [Panel, SharedModule, BindModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Panel, SharedModule, BindModule, SharedModule, BindModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanelModule, [{
    type: NgModule,
    args: [{
      imports: [Panel, SharedModule, BindModule],
      exports: [Panel, SharedModule, BindModule]
    }]
  }], null, null);
})();
export {
  Panel,
  PanelClasses,
  PanelModule,
  PanelStyle
};
//# sourceMappingURL=primeng_panel.js.map
