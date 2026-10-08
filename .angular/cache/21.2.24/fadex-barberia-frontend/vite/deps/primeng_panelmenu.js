import {
  Tooltip,
  TooltipModule
} from "./chunk-IOOQBAGZ.js";
import "./chunk-OHFYJZH5.js";
import {
  MotionDirective,
  MotionModule
} from "./chunk-CQDTUEQU.js";
import "./chunk-VKUYHHYD.js";
import {
  ChevronDownIcon,
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
  RouterLink,
  RouterLinkActive,
  RouterModule
} from "./chunk-2NVHGDEZ.js";
import "./chunk-YQUWI6QA.js";
import {
  PrimeTemplate,
  SharedModule
} from "./chunk-SKV3H6PS.js";
import {
  J,
  Q,
  V2 as V,
  bt,
  k2 as k,
  l,
  m,
  s2 as s,
  s3 as s2,
  z
} from "./chunk-HEA754HI.js";
import "./chunk-EBO5324J.js";
import "./chunk-JBJ6NARH.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-LFUJRON5.js";
import "./chunk-JAJ76GOU.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
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
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
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
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/panelmenu/index.mjs
var style = "\n    .p-panelmenu {\n        display: flex;\n        flex-direction: column;\n        gap: dt('panelmenu.gap');\n    }\n\n    .p-panelmenu-panel {\n        background: dt('panelmenu.panel.background');\n        border-width: dt('panelmenu.panel.border.width');\n        border-style: solid;\n        border-color: dt('panelmenu.panel.border.color');\n        color: dt('panelmenu.panel.color');\n        border-radius: dt('panelmenu.panel.border.radius');\n        padding: dt('panelmenu.panel.padding');\n    }\n\n    .p-panelmenu-panel:first-child {\n        border-width: dt('panelmenu.panel.first.border.width');\n        border-start-start-radius: dt('panelmenu.panel.first.top.border.radius');\n        border-start-end-radius: dt('panelmenu.panel.first.top.border.radius');\n    }\n\n    .p-panelmenu-panel:last-child {\n        border-width: dt('panelmenu.panel.last.border.width');\n        border-end-start-radius: dt('panelmenu.panel.last.bottom.border.radius');\n        border-end-end-radius: dt('panelmenu.panel.last.bottom.border.radius');\n    }\n\n    .p-panelmenu-header {\n        outline: 0 none;\n    }\n\n    .p-panelmenu-header-content {\n        border-radius: dt('panelmenu.item.border.radius');\n        transition:\n            background dt('panelmenu.transition.duration'),\n            color dt('panelmenu.transition.duration'),\n            outline-color dt('panelmenu.transition.duration'),\n            box-shadow dt('panelmenu.transition.duration');\n        outline-color: transparent;\n        color: dt('panelmenu.item.color');\n    }\n\n    .p-panelmenu-header-link {\n        display: flex;\n        gap: dt('panelmenu.item.gap');\n        padding: dt('panelmenu.item.padding');\n        align-items: center;\n        user-select: none;\n        cursor: pointer;\n        position: relative;\n        text-decoration: none;\n        color: inherit;\n    }\n\n    .p-panelmenu-header-icon,\n    .p-panelmenu-item-icon {\n        color: dt('panelmenu.item.icon.color');\n    }\n\n    .p-panelmenu-submenu-icon {\n        color: dt('panelmenu.submenu.icon.color');\n    }\n\n    .p-panelmenu-submenu-icon:dir(rtl) {\n        transform: rotate(180deg);\n    }\n\n    .p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content {\n        background: dt('panelmenu.item.focus.background');\n        color: dt('panelmenu.item.focus.color');\n    }\n\n    .p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content .p-panelmenu-header-icon {\n        color: dt('panelmenu.item.icon.focus.color');\n    }\n\n    .p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content .p-panelmenu-submenu-icon {\n        color: dt('panelmenu.submenu.icon.focus.color');\n    }\n\n    .p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover {\n        background: dt('panelmenu.item.focus.background');\n        color: dt('panelmenu.item.focus.color');\n    }\n\n    .p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover .p-panelmenu-header-icon {\n        color: dt('panelmenu.item.icon.focus.color');\n    }\n\n    .p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover .p-panelmenu-submenu-icon {\n        color: dt('panelmenu.submenu.icon.focus.color');\n    }\n\n    .p-panelmenu-submenu {\n        margin: 0;\n        padding: 0 0 0 dt('panelmenu.submenu.indent');\n        outline: 0;\n        list-style: none;\n    }\n\n    .p-panelmenu-submenu:dir(rtl) {\n        padding: 0 dt('panelmenu.submenu.indent') 0 0;\n    }\n\n    .p-panelmenu-item-link {\n        display: flex;\n        gap: dt('panelmenu.item.gap');\n        padding: dt('panelmenu.item.padding');\n        align-items: center;\n        user-select: none;\n        cursor: pointer;\n        text-decoration: none;\n        color: inherit;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .p-panelmenu-item-label {\n        line-height: 1;\n    }\n\n    .p-panelmenu-item-content {\n        border-radius: dt('panelmenu.item.border.radius');\n        transition:\n            background dt('panelmenu.transition.duration'),\n            color dt('panelmenu.transition.duration'),\n            outline-color dt('panelmenu.transition.duration'),\n            box-shadow dt('panelmenu.transition.duration');\n        color: dt('panelmenu.item.color');\n        outline-color: transparent;\n    }\n\n    .p-panelmenu-item.p-focus > .p-panelmenu-item-content {\n        background: dt('panelmenu.item.focus.background');\n        color: dt('panelmenu.item.focus.color');\n    }\n\n    .p-panelmenu-item.p-focus > .p-panelmenu-item-content .p-panelmenu-item-icon {\n        color: dt('panelmenu.item.focus.color');\n    }\n\n    .p-panelmenu-item.p-focus > .p-panelmenu-item-content .p-panelmenu-submenu-icon {\n        color: dt('panelmenu.submenu.icon.focus.color');\n    }\n\n    .p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover {\n        background: dt('panelmenu.item.focus.background');\n        color: dt('panelmenu.item.focus.color');\n    }\n\n    .p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover .p-panelmenu-item-icon {\n        color: dt('panelmenu.item.icon.focus.color');\n    }\n\n    .p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover .p-panelmenu-submenu-icon {\n        color: dt('panelmenu.submenu.icon.focus.color');\n    }\n\n    .p-panelmenu-content-container {\n        display: grid;\n        grid-template-rows: 1fr;\n    }\n\n    .p-panelmenu-content-wrapper {\n        min-height: 0;\n    }\n";

// node_modules/primeng/fesm2022/primeng-panelmenu.mjs
var _c0 = ["pPanelMenuSub", ""];
var _c1 = (a0) => ({
  processedItem: a0
});
var _c2 = () => ({
  exact: false
});
var _c3 = (a0) => ({
  $implicit: a0
});
function PanelMenuSub_ng_template_0_li_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "li", 4);
  }
  if (rf & 2) {
    const processedItem_r1 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("separator"), ctx_r1.getItemProp(processedItem_r1, "styleClass")));
    ɵɵproperty("pBind", ctx_r1.ptm("separator"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_ng_container_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 19);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(6);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("submenuIcon"), ctx_r1.getItemProp(processedItem_r1, "icon")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "iconStyle"))("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "submenuIcon"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 20);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(6);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("submenuIcon"), ctx_r1.getItemProp(processedItem_r1, "icon")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "iconStyle"))("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "submenuIcon"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_ng_container_1__svg_svg_1_Template, 1, 4, "svg", 17)(2, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_ng_container_1__svg_svg_2_Template, 1, 4, "svg", 18);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const processedItem_r1 = ɵɵnextContext(5).$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.isItemActive(processedItem_r1));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.isItemActive(processedItem_r1));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_2_ng_template_0_Template(rf, ctx) {
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_ng_container_1_Template, 3, 2, "ng-container", 7)(2, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_2_Template, 1, 0, null, 16);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.panelMenu.submenuIconTemplate && !ctx_r1.panelMenu._submenuIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.panelMenu.submenuIconTemplate || ctx_r1.panelMenu._submenuIconTemplate);
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(4);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemIcon"), ctx_r1.getItemProp(processedItem_r1, "icon"), ctx_r1.getItemProp(processedItem_r1, "iconClass")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "iconStyle"))("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "itemIcon"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 21);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(4);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.getItemProp(processedItem_r1, "labelClass")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "labelStyle"))("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "itemLabel"));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.getItemProp(processedItem_r1, "label"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 22);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(4);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.getItemProp(processedItem_r1, "labelClass")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "labelStyle"))("innerHTML", ctx_r1.getItemProp(processedItem_r1, "label"), ɵɵsanitizeHtml)("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "itemLabel"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 13);
    ɵɵtemplate(1, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_container_1_Template, 3, 2, "ng-container", 7)(2, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_span_2_Template, 1, 4, "span", 14)(3, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_span_3_Template, 2, 5, "span", 15)(4, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_ng_template_4_Template, 1, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const htmlLabel_r6 = ɵɵreference(5);
    const ctx_r3 = ɵɵnextContext(3);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLink"), ctx_r1.getItemProp(processedItem_r1, "linkClass")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "linkStyle"))("target", ctx_r1.getItemProp(processedItem_r1, "target"))("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "itemLink"));
    ɵɵattribute("href", ctx_r1.getItemProp(processedItem_r1, "url"), ɵɵsanitizeUrl)("title", ctx_r1.getItemProp(processedItem_r1, "title"))("data-automationid", ctx_r1.getItemProp(processedItem_r1, "automationId"))("tabindex", !!ctx_r1.parentExpanded ? "0" : "-1");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.isItemGroup(processedItem_r1));
    ɵɵadvance();
    ɵɵproperty("ngIf", processedItem_r1.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", (processedItem_r1.item == null ? null : processedItem_r1.item.escape) !== false)("ngIfElse", htmlLabel_r6);
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_ng_container_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 19);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(6);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("submenuIcon"), ctx_r1.getItemProp(processedItem_r1, "icon")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "iconStyle"))("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "submenuIcon"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 20);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(6);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("submenuIcon"), ctx_r1.getItemProp(processedItem_r1, "icon")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "iconStyle"))("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "submenuIcon"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_ng_container_1__svg_svg_1_Template, 1, 4, "svg", 17)(2, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_ng_container_1__svg_svg_2_Template, 1, 4, "svg", 18);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const processedItem_r1 = ɵɵnextContext(5).$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.isItemActive(processedItem_r1));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.isItemActive(processedItem_r1));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_2_ng_template_0_Template(rf, ctx) {
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_ng_container_1_Template, 3, 2, "ng-container", 7)(2, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_2_Template, 1, 0, null, 16);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.panelMenu.submenuIconTemplate && !ctx_r1.panelMenu._submenuIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.panelMenu.submenuIconTemplate && ctx_r1.panelMenu._submenuIconTemplate);
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(4);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemIcon"), ctx_r1.getItemProp(processedItem_r1, "icon"), ctx_r1.getItemProp(processedItem_r1, "iconClass")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "iconStyle"))("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "itemIcon"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 22);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(4);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.getItemProp(processedItem_r1, "labelClass")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "labelStyle"))("innerHTML", ctx_r1.getItemProp(processedItem_r1, "label"), ɵɵsanitizeHtml)("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "itemLabel"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const processedItem_r1 = ɵɵnextContext(4).$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("badge"), ctx_r1.getItemProp(processedItem_r1, "badgeStyleClass")));
    ɵɵadvance();
    ɵɵtextInterpolate(processedItem_r1.badge);
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 23);
    ɵɵtemplate(1, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_ng_container_1_Template, 3, 2, "ng-container", 7)(2, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_span_2_Template, 1, 4, "span", 14)(3, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_span_3_Template, 1, 5, "span", 24)(4, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_span_4_Template, 2, 3, "span", 25);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(3);
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLink"), ctx_r1.getItemProp(processedItem_r1, "linkClass")));
    ɵɵproperty("routerLink", ctx_r1.getItemProp(processedItem_r1, "routerLink"))("queryParams", ctx_r1.getItemProp(processedItem_r1, "queryParams"))("routerLinkActive", "p-panelmenu-item-link-active")("routerLinkActiveOptions", ctx_r1.getItemProp(processedItem_r1, "routerLinkActiveOptions") || ɵɵpureFunction0(22, _c2))("ngStyle", ctx_r1.getItemProp(processedItem_r1, "linkStyle"))("target", ctx_r1.getItemProp(processedItem_r1, "target"))("fragment", ctx_r1.getItemProp(processedItem_r1, "fragment"))("queryParamsHandling", ctx_r1.getItemProp(processedItem_r1, "queryParamsHandling"))("preserveFragment", ctx_r1.getItemProp(processedItem_r1, "preserveFragment"))("skipLocationChange", ctx_r1.getItemProp(processedItem_r1, "skipLocationChange"))("replaceUrl", ctx_r1.getItemProp(processedItem_r1, "replaceUrl"))("state", ctx_r1.getItemProp(processedItem_r1, "state"))("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "itemLink"));
    ɵɵattribute("title", ctx_r1.getItemProp(processedItem_r1, "title"))("data-automationid", ctx_r1.getItemProp(processedItem_r1, "automationId"))("tabindex", !!ctx_r1.parentExpanded ? "0" : "-1");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.isItemGroup(processedItem_r1));
    ɵɵadvance();
    ɵɵproperty("ngIf", processedItem_r1.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.getItemProp(processedItem_r1, "label"));
    ɵɵadvance();
    ɵɵproperty("ngIf", processedItem_r1.badge);
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_1_Template, 6, 13, "a", 11)(2, PanelMenuSub_ng_template_0_li_1_ng_container_2_a_2_Template, 5, 23, "a", 12);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const processedItem_r1 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.getItemProp(processedItem_r1, "routerLink"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.getItemProp(processedItem_r1, "routerLink"));
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_3_1_ng_template_0_Template(rf, ctx) {
}
function PanelMenuSub_ng_template_0_li_1_ng_container_3_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PanelMenuSub_ng_template_0_li_1_ng_container_3_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PanelMenuSub_ng_template_0_li_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenuSub_ng_template_0_li_1_ng_container_3_1_Template, 1, 0, null, 26);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const processedItem_r1 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c3, processedItem_r1.item));
  }
}
function PanelMenuSub_ng_template_0_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 5)(1, "div", 6);
    ɵɵlistener("click", function PanelMenuSub_ng_template_0_li_1_Template_div_click_1_listener($event) {
      ɵɵrestoreView(_r3);
      const processedItem_r1 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onItemClick($event, processedItem_r1));
    });
    ɵɵtemplate(2, PanelMenuSub_ng_template_0_li_1_ng_container_2_Template, 3, 2, "ng-container", 7)(3, PanelMenuSub_ng_template_0_li_1_ng_container_3_Template, 2, 4, "ng-container", 7);
    ɵɵelementEnd();
    ɵɵelementStart(4, "div", 8)(5, "div", 9)(6, "ul", 10);
    ɵɵlistener("itemToggle", function PanelMenuSub_ng_template_0_li_1_Template_ul_itemToggle_6_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onItemToggle($event));
    });
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    const processedItem_r1 = ctx_r3.$implicit;
    const index_r5 = ctx_r3.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("item", ɵɵpureFunction1(39, _c1, processedItem_r1)), ctx_r1.getItemProp(processedItem_r1, "styleClass")));
    ɵɵproperty("ngStyle", ctx_r1.getItemProp(processedItem_r1, "style"))("pTooltip", ctx_r1.getItemProp(processedItem_r1, "tooltip"))("pTooltipUnstyled", ctx_r1.unstyled())("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "item"))("tooltipOptions", ctx_r1.getItemProp(processedItem_r1, "tooltipOptions"));
    ɵɵattribute("id", ctx_r1.getItemId(processedItem_r1))("aria-label", ctx_r1.getItemProp(processedItem_r1, "label"))("aria-expanded", ctx_r1.isItemGroup(processedItem_r1) ? ctx_r1.isItemActive(processedItem_r1) : void 0)("aria-level", ctx_r1.level + 1)("aria-setsize", ctx_r1.getAriaSetSize())("aria-posinset", ctx_r1.getAriaPosInset(index_r5))("data-p-disabled", ctx_r1.isItemDisabled(processedItem_r1))("data-p-focused", ctx_r1.isItemFocused(processedItem_r1));
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("itemContent"));
    ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, index_r5, "itemContent"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.itemTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.itemTemplate);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("contentContainer", ɵɵpureFunction1(41, _c1, processedItem_r1)));
    ɵɵproperty("pMotion", ctx_r1.isItemVisible(processedItem_r1) && ctx_r1.isItemGroup(processedItem_r1) && ctx_r1.isItemExpanded(processedItem_r1))("pMotionOptions", ctx_r1.motionOptions());
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("contentWrapper"));
    ɵɵproperty("pBind", ctx_r1.ptm("contentWrapper"));
    ɵɵadvance();
    ɵɵproperty("id", ctx_r1.getItemId(processedItem_r1) + "_list")("panelId", ctx_r1.panelId)("items", processedItem_r1 == null ? null : processedItem_r1.items)("itemTemplate", ctx_r1.itemTemplate)("transitionOptions", ctx_r1.transitionOptions)("focusedItemId", ctx_r1.focusedItemId)("activeItemPath", ctx_r1.activeItemPath)("level", ctx_r1.level + 1)("pt", ctx_r1.pt())("unstyled", ctx_r1.unstyled())("parentExpanded", !!ctx_r1.parentExpanded && ctx_r1.isItemExpanded(processedItem_r1))("motionOptions", ctx_r1.motionOptions());
  }
}
function PanelMenuSub_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PanelMenuSub_ng_template_0_li_0_Template, 1, 3, "li", 2)(1, PanelMenuSub_ng_template_0_li_1_Template, 7, 43, "li", 3);
  }
  if (rf & 2) {
    const processedItem_r1 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngIf", processedItem_r1.separator);
    ɵɵadvance();
    ɵɵproperty("ngIf", !processedItem_r1.separator && ctx_r1.isItemVisible(processedItem_r1));
  }
}
var _c4 = ["submenu"];
var _c5 = ["pPanelMenuList", ""];
var _c6 = ["submenuicon"];
var _c7 = ["headericon"];
var _c8 = ["item"];
var _c9 = ["container"];
var _c10 = (a0) => ({
  item: a0
});
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_ng_container_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 19);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(6);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cx("submenuIcon"));
    ɵɵproperty("pBind", ctx_r4.getPTOptions("submenuIcon", item_r3, i_r4));
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 20);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(6);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cx("submenuIcon"));
    ɵɵproperty("pBind", ctx_r4.getPTOptions("submenuIcon", item_r3, i_r4));
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_ng_container_1__svg_svg_1_Template, 1, 3, "svg", 17)(2, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_ng_container_1__svg_svg_2_Template, 1, 3, "svg", 18);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const item_r3 = ɵɵnextContext(5).$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r4.isItemActive(item_r3));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r4.isItemActive(item_r3));
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_2_ng_template_0_Template(rf, ctx) {
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_ng_container_1_Template, 3, 2, "ng-container", 7)(2, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_2_Template, 1, 0, null, 16);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r4.headerIconTemplate && !ctx_r4._headerIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r4.headerIconTemplate || ctx_r4._headerIconTemplate);
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("headerIcon"), item_r3.icon, ctx_r4.getItemProp(item_r3, "iconClass")));
    ɵɵproperty("ngStyle", ctx_r4.getItemProp(item_r3, "iconStyle"))("pBind", ctx_r4.getPTOptions("headerIcon", item_r3, i_r4));
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 4);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("headerLabel"), ctx_r4.getItemProp(item_r3, "labelClass")));
    ɵɵproperty("ngStyle", ctx_r4.getItemProp(item_r3, "labelStyle"))("pBind", ctx_r4.getPTOptions("headerLabel", item_r3, i_r4));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r4.getItemProp(item_r3, "label"));
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("headerLabel"), ctx_r4.getItemProp(item_r3, "labelClass")));
    ɵɵproperty("ngStyle", ctx_r4.getItemProp(item_r3, "labelStyle"))("innerHTML", ctx_r4.getItemProp(item_r3, "label"), ɵɵsanitizeHtml)("pBind", ctx_r4.getPTOptions("headerLabel", item_r3, i_r4));
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r3 = ɵɵnextContext(4).$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("badge"), ctx_r4.getItemProp(item_r3, "badgeStyleClass")));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r4.getItemProp(item_r3, "badge"));
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_a_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 13);
    ɵɵtemplate(1, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_container_1_Template, 3, 2, "ng-container", 7)(2, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_span_2_Template, 1, 4, "span", 3)(3, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_span_3_Template, 2, 5, "span", 14)(4, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_ng_template_4_Template, 1, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor)(6, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_span_6_Template, 2, 3, "span", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const htmlLabel_r6 = ɵɵreference(5);
    const ctx_r1 = ɵɵnextContext(3);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("headerLink"), ctx_r4.getItemProp(item_r3, "linkClass")));
    ɵɵproperty("target", ctx_r4.getItemProp(item_r3, "target"))("ngStyle", ctx_r4.getItemProp(item_r3, "linkStyle"))("pBind", ctx_r4.getPTOptions("headerLink", item_r3, i_r4));
    ɵɵattribute("href", ctx_r4.getItemProp(item_r3, "url"), ɵɵsanitizeUrl)("tabindex", -1)("title", ctx_r4.getItemProp(item_r3, "title"))("data-automationid", ctx_r4.getItemProp(item_r3, "automationId"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r4.isItemGroup(item_r3));
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r3.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r4.getItemProp(item_r3, "escape") !== false)("ngIfElse", htmlLabel_r6);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r4.getItemProp(item_r3, "badge"));
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenu_ng_container_0_div_1_ng_container_3_a_1_Template, 7, 14, "a", 12);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const item_r3 = ɵɵnextContext(2).$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r4.getItemProp(item_r3, "routerLink"));
  }
}
function PanelMenu_ng_container_0_div_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function PanelMenu_ng_container_0_div_1_a_5_ng_container_1_ng_container_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 19);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cx("submenuIcon"));
    ɵɵproperty("pBind", ctx_r4.getPTOptions("submenuIcon", item_r3, i_r4));
  }
}
function PanelMenu_ng_container_0_div_1_a_5_ng_container_1_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 20);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cx("submenuIcon"));
    ɵɵproperty("pBind", ctx_r4.getPTOptions("submenuIcon", item_r3, i_r4));
  }
}
function PanelMenu_ng_container_0_div_1_a_5_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenu_ng_container_0_div_1_a_5_ng_container_1_ng_container_1__svg_svg_1_Template, 1, 3, "svg", 17)(2, PanelMenu_ng_container_0_div_1_a_5_ng_container_1_ng_container_1__svg_svg_2_Template, 1, 3, "svg", 18);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const item_r3 = ɵɵnextContext(4).$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r4.isItemActive(item_r3));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r4.isItemActive(item_r3));
  }
}
function PanelMenu_ng_container_0_div_1_a_5_ng_container_1_2_ng_template_0_Template(rf, ctx) {
}
function PanelMenu_ng_container_0_div_1_a_5_ng_container_1_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PanelMenu_ng_container_0_div_1_a_5_ng_container_1_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PanelMenu_ng_container_0_div_1_a_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenu_ng_container_0_div_1_a_5_ng_container_1_ng_container_1_Template, 3, 2, "ng-container", 7)(2, PanelMenu_ng_container_0_div_1_a_5_ng_container_1_2_Template, 1, 0, null, 16);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r4.headerIconTemplate && !ctx_r4._headerIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r4.headerIconTemplate || ctx_r4._headerIconTemplate);
  }
}
function PanelMenu_ng_container_0_div_1_a_5_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("headerIcon"), item_r3.icon, ctx_r4.getItemProp(item_r3, "iconClass")));
    ɵɵproperty("ngStyle", ctx_r4.getItemProp(item_r3, "iconStyle"))("pBind", ctx_r4.getPTOptions("headerIcon", item_r3, i_r4));
  }
}
function PanelMenu_ng_container_0_div_1_a_5_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 4);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("headerLabel"), ctx_r4.getItemProp(item_r3, "labelClass")));
    ɵɵproperty("ngStyle", ctx_r4.getItemProp(item_r3, "labelStyle"))("pBind", ctx_r4.getPTOptions("headerLabel", item_r3, i_r4));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r4.getItemProp(item_r3, "label"));
  }
}
function PanelMenu_ng_container_0_div_1_a_5_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("headerLabel"), ctx_r4.getItemProp(item_r3, "labelClass")));
    ɵɵproperty("ngStyle", ctx_r4.getItemProp(item_r3, "labelStyle"))("innerHTML", ctx_r4.getItemProp(item_r3, "label"), ɵɵsanitizeHtml)("pBind", ctx_r4.getPTOptions("headerLabel", item_r3, i_r4));
  }
}
function PanelMenu_ng_container_0_div_1_a_5_span_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r3 = ɵɵnextContext(3).$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("badge"), ctx_r4.getItemProp(item_r3, "badgeStyleClass")));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r4.getItemProp(item_r3, "badge"));
  }
}
function PanelMenu_ng_container_0_div_1_a_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 22);
    ɵɵtemplate(1, PanelMenu_ng_container_0_div_1_a_5_ng_container_1_Template, 3, 2, "ng-container", 7)(2, PanelMenu_ng_container_0_div_1_a_5_span_2_Template, 1, 4, "span", 3)(3, PanelMenu_ng_container_0_div_1_a_5_span_3_Template, 2, 5, "span", 14)(4, PanelMenu_ng_container_0_div_1_a_5_ng_template_4_Template, 1, 5, "ng-template", null, 1, ɵɵtemplateRefExtractor)(6, PanelMenu_ng_container_0_div_1_a_5_span_6_Template, 2, 3, "span", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const htmlRouteLabel_r7 = ɵɵreference(5);
    const ctx_r1 = ɵɵnextContext(2);
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("headerLink"), ctx_r4.getItemProp(item_r3, "linkClass")));
    ɵɵproperty("routerLink", ctx_r4.getItemProp(item_r3, "routerLink"))("queryParams", ctx_r4.getItemProp(item_r3, "queryParams"))("routerLinkActive", "p-panelmenu-item-link-active")("routerLinkActiveOptions", ctx_r4.getItemProp(item_r3, "routerLinkActiveOptions") || ɵɵpureFunction0(23, _c2))("target", ctx_r4.getItemProp(item_r3, "target"))("ngStyle", ctx_r4.getItemProp(item_r3, "linkStyle"))("fragment", ctx_r4.getItemProp(item_r3, "fragment"))("queryParamsHandling", ctx_r4.getItemProp(item_r3, "queryParamsHandling"))("preserveFragment", ctx_r4.getItemProp(item_r3, "preserveFragment"))("skipLocationChange", ctx_r4.getItemProp(item_r3, "skipLocationChange"))("replaceUrl", ctx_r4.getItemProp(item_r3, "replaceUrl"))("state", ctx_r4.getItemProp(item_r3, "state"))("pBind", ctx_r4.getPTOptions("headerLink", item_r3, i_r4));
    ɵɵattribute("title", ctx_r4.getItemProp(item_r3, "title"))("data-automationid", ctx_r4.getItemProp(item_r3, "automationId"))("tabindex", -1);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r4.isItemGroup(item_r3));
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r3.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r4.getItemProp(item_r3, "escape") !== false)("ngIfElse", htmlRouteLabel_r7);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r4.getItemProp(item_r3, "badge"));
  }
}
function PanelMenu_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4)(1, "div", 5);
    ɵɵlistener("click", function PanelMenu_ng_container_0_div_1_Template_div_click_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      const item_r3 = ctx_r1.$implicit;
      const i_r4 = ctx_r1.index;
      const ctx_r4 = ɵɵnextContext();
      return ɵɵresetView(ctx_r4.onHeaderClick($event, item_r3, i_r4));
    })("keydown", function PanelMenu_ng_container_0_div_1_Template_div_keydown_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      const item_r3 = ctx_r1.$implicit;
      const i_r4 = ctx_r1.index;
      const ctx_r4 = ɵɵnextContext();
      return ɵɵresetView(ctx_r4.onHeaderKeyDown($event, item_r3, i_r4));
    });
    ɵɵelementStart(2, "div", 6);
    ɵɵtemplate(3, PanelMenu_ng_container_0_div_1_ng_container_3_Template, 2, 1, "ng-container", 7)(4, PanelMenu_ng_container_0_div_1_ng_container_4_Template, 1, 0, "ng-container", 8)(5, PanelMenu_ng_container_0_div_1_a_5_Template, 7, 24, "a", 9);
    ɵɵelementEnd()();
    ɵɵelementStart(6, "div", 10)(7, "div", 6)(8, "div", 6)(9, "ul", 11);
    ɵɵlistener("headerFocus", function PanelMenu_ng_container_0_div_1_Template_ul_headerFocus_9_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r4 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r4.updateFocusedHeader($event));
    });
    ɵɵelementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const item_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("panel"), ctx_r4.getItemProp(item_r3, "headerClass")));
    ɵɵproperty("ngStyle", ctx_r4.getItemProp(item_r3, "style"))("pBind", ctx_r4.ptm("panel"));
    ɵɵadvance();
    ɵɵclassMap(ctx_r4.cn(ctx_r4.cx("header", ɵɵpureFunction1(50, _c10, item_r3)), ctx_r4.getItemProp(item_r3, "styleClass")));
    ɵɵproperty("ngStyle", ctx_r4.getItemProp(item_r3, "style"))("pTooltip", ctx_r4.getItemProp(item_r3, "tooltip"))("pTooltipUnstyled", ctx_r4.unstyled())("tabindex", 0)("tooltipOptions", ctx_r4.getItemProp(item_r3, "tooltipOptions"))("pBind", ctx_r4.getPTOptions("header", item_r3, i_r4));
    ɵɵattribute("id", ctx_r4.getHeaderId(item_r3, i_r4))("aria-expanded", ctx_r4.isItemActive(item_r3))("aria-label", ctx_r4.getItemProp(item_r3, "label"))("aria-controls", ctx_r4.getContentId(item_r3, i_r4))("aria-disabled", ctx_r4.isItemDisabled(item_r3))("data-p-highlight", ctx_r4.isItemActive(item_r3))("data-p-disabled", ctx_r4.isItemDisabled(item_r3));
    ɵɵadvance();
    ɵɵclassMap(ctx_r4.cx("headerContent"));
    ɵɵproperty("pBind", ctx_r4.getPTOptions("headerContent", item_r3, i_r4));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r4.itemTemplate && !ctx_r4._itemTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r4.itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(52, _c3, item_r3));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r4.getItemProp(item_r3, "routerLink"));
    ɵɵadvance();
    ɵɵclassMap(ctx_r4.cx("contentContainer", ɵɵpureFunction1(54, _c1, item_r3)));
    ɵɵproperty("pBind", ctx_r4.ptm("contentContainer"))("pMotion", ctx_r4.isItemActive(item_r3))("pMotionOptions", ctx_r4.computedMotionOptions());
    ɵɵattribute("id", ctx_r4.getContentId(item_r3, i_r4))("aria-labelledby", ctx_r4.getHeaderId(item_r3, i_r4));
    ɵɵadvance();
    ɵɵclassMap(ctx_r4.cx("contentWrapper"));
    ɵɵproperty("pBind", ctx_r4.ptm("contentWrapper"));
    ɵɵadvance();
    ɵɵclassMap(ctx_r4.cx("content"));
    ɵɵproperty("pBind", ctx_r4.ptm("content"));
    ɵɵadvance();
    ɵɵproperty("panelId", ctx_r4.getPanelId(i_r4, item_r3))("items", ctx_r4.getItemProp(item_r3, "items"))("itemTemplate", ctx_r4.itemTemplate || ctx_r4._itemTemplate)("transitionOptions", ctx_r4.transitionOptions)("root", true)("activeItem", ctx_r4.activeItem())("tabindex", ctx_r4.tabindex)("parentExpanded", ctx_r4.isItemActive(item_r3))("pt", ctx_r4.pt())("unstyled", ctx_r4.unstyled())("motionOptions", ctx_r4.computedMotionOptions());
  }
}
function PanelMenu_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PanelMenu_ng_container_0_div_1_Template, 10, 56, "div", 3);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r4.isItemVisible(item_r3));
  }
}
var style2 = (
  /*css*/
  `
    ${style}
    /*For PrimeNG*/


    .p-panelmenu-root-list,
    .p-panelmenu-submenu,
    .p-panelmenu-item-link {
        outline: 0 none;
    }
`
);
var classes = {
  root: () => ["p-panelmenu p-component"],
  panel: "p-panelmenu-panel",
  header: ({
    instance,
    item
  }) => ["p-panelmenu-header", {
    "p-panelmenu-header-active": instance.isItemActive(item) && !!item.items,
    "p-disabled": instance.isItemDisabled(item)
  }],
  headerContent: "p-panelmenu-header-content",
  headerLink: "p-panelmenu-header-link",
  headerIcon: "p-panelmenu-header-icon",
  headerLabel: "p-panelmenu-header-label",
  contentContainer: ({
    instance,
    processedItem
  }) => ["p-panelmenu-content-container", {
    "p-panelmenu-expanded": instance.isItemActive(processedItem)
  }],
  contentWrapper: "p-panelmenu-content-wrapper",
  content: "p-panelmenu-content",
  rootList: "p-panelmenu-root-list",
  item: ({
    instance,
    processedItem
  }) => ["p-panelmenu-item", {
    "p-focus": instance.isItemFocused(processedItem) && !instance.isItemDisabled(processedItem),
    "p-disabled": instance.isItemDisabled(processedItem)
  }],
  itemContent: "p-panelmenu-item-content",
  itemLink: "p-panelmenu-item-link",
  itemIcon: "p-panelmenu-item-icon",
  itemLabel: "p-panelmenu-item-label",
  submenuIcon: "p-panelmenu-submenu-icon",
  submenu: "p-panelmenu-submenu",
  separator: "p-menuitem-separator",
  badge: "p-menuitem-badge"
};
var PanelMenuStyle = class _PanelMenuStyle extends BaseStyle {
  name = "panelmenu";
  style = style2;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPanelMenuStyle_BaseFactory;
    return function PanelMenuStyle_Factory(__ngFactoryType__) {
      return (ɵPanelMenuStyle_BaseFactory || (ɵPanelMenuStyle_BaseFactory = ɵɵgetInheritedFactory(_PanelMenuStyle)))(__ngFactoryType__ || _PanelMenuStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _PanelMenuStyle,
    factory: _PanelMenuStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanelMenuStyle, [{
    type: Injectable
  }], null, null);
})();
var PanelMenuClasses;
(function(PanelMenuClasses2) {
  PanelMenuClasses2["root"] = "p-panelmenu";
  PanelMenuClasses2["panel"] = "p-panelmenu-panel";
  PanelMenuClasses2["header"] = "p-panelmenu-header";
  PanelMenuClasses2["headerContent"] = "p-panelmenu-header-content";
  PanelMenuClasses2["headerLink"] = "p-panelmenu-header-link";
  PanelMenuClasses2["headerIcon"] = "p-panelmenu-header-icon";
  PanelMenuClasses2["headerLabel"] = "p-panelmenu-header-label";
  PanelMenuClasses2["contentContainer"] = "p-panelmenu-content-container";
  PanelMenuClasses2["content"] = "p-panelmenu-content";
  PanelMenuClasses2["rootList"] = "p-panelmenu-root-list";
  PanelMenuClasses2["item"] = "p-panelmenu-item";
  PanelMenuClasses2["itemContent"] = "p-panelmenu-item-content";
  PanelMenuClasses2["itemLink"] = "p-panelmenu-item-link";
  PanelMenuClasses2["itemIcon"] = "p-panelmenu-item-icon";
  PanelMenuClasses2["itemLabel"] = "p-panelmenu-item-label";
  PanelMenuClasses2["submenuIcon"] = "p-panelmenu-submenu-icon";
  PanelMenuClasses2["submenu"] = "p-panelmenu-submenu";
  PanelMenuClasses2["separator"] = "p-menuitem-separator";
})(PanelMenuClasses || (PanelMenuClasses = {}));
var PANELMENU_INSTANCE = new InjectionToken("PANELMENU_INSTANCE");
var PANELMENUSUB_INSTANCE = new InjectionToken("PANELMENUSUB_INSTANCE");
var PanelMenuSub = class _PanelMenuSub extends BaseComponent {
  panelId;
  focusedItemId;
  items;
  itemTemplate;
  level = 0;
  activeItemPath;
  root;
  tabindex;
  transitionOptions;
  parentExpanded;
  motionOptions = input(...ngDevMode ? [void 0, {
    debugName: "motionOptions"
  }] : []);
  itemToggle = new EventEmitter();
  menuFocus = new EventEmitter();
  menuBlur = new EventEmitter();
  menuKeyDown = new EventEmitter();
  listViewChild = inject(ElementRef);
  panelMenu = inject(forwardRef(() => PanelMenu));
  _componentStyle = inject(PanelMenuStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcPanelMenu = inject(PANELMENU_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm(this.root ? "rootList" : "submenu"));
  }
  getPTOptions(processedItem, index, key) {
    return this.ptm(key, {
      context: {
        item: processedItem.item,
        index,
        active: this.isItemActive(processedItem),
        focused: this.isItemFocused(processedItem),
        disabled: this.isItemDisabled(processedItem)
      }
    });
  }
  getItemId(processedItem) {
    return processedItem.item?.id ?? `${this.panelId}_${processedItem.key}`;
  }
  getItemKey(processedItem) {
    return this.getItemId(processedItem);
  }
  getItemClass(processedItem) {
    return {
      "p-panelmenu-item": true,
      "p-disabled": this.isItemDisabled(processedItem),
      "p-focus": this.isItemFocused(processedItem)
    };
  }
  getItemProp(processedItem, name, params) {
    return processedItem && processedItem.item ? m(processedItem.item[name], params) : void 0;
  }
  getItemLabel(processedItem) {
    return this.getItemProp(processedItem, "label");
  }
  isItemExpanded(processedItem) {
    return processedItem.expanded;
  }
  isItemActive(processedItem) {
    return this.isItemExpanded(processedItem) || this.activeItemPath.some((path) => path && path.key === processedItem.key);
  }
  isItemVisible(processedItem) {
    return this.getItemProp(processedItem, "visible") !== false;
  }
  isItemDisabled(processedItem) {
    return this.getItemProp(processedItem, "disabled");
  }
  isItemFocused(processedItem) {
    return this.focusedItemId === this.getItemId(processedItem);
  }
  isItemGroup(processedItem) {
    return s(processedItem.items);
  }
  getAriaSetSize() {
    return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, "separator")).length;
  }
  getAriaPosInset(index) {
    return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, "separator")).length + 1;
  }
  onItemClick(event, processedItem) {
    if (!this.isItemDisabled(processedItem)) {
      this.getItemProp(processedItem, "command", {
        originalEvent: event,
        item: processedItem.item
      });
      this.itemToggle.emit({
        processedItem,
        expanded: !this.isItemActive(processedItem)
      });
    }
  }
  onItemToggle(event) {
    this.itemToggle.emit(event);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPanelMenuSub_BaseFactory;
    return function PanelMenuSub_Factory(__ngFactoryType__) {
      return (ɵPanelMenuSub_BaseFactory || (ɵPanelMenuSub_BaseFactory = ɵɵgetInheritedFactory(_PanelMenuSub)))(__ngFactoryType__ || _PanelMenuSub);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PanelMenuSub,
    selectors: [["ul", "pPanelMenuSub", ""]],
    hostAttrs: ["role", "tree"],
    hostVars: 5,
    hostBindings: function PanelMenuSub_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("focusin", function PanelMenuSub_focusin_HostBindingHandler($event) {
          return ctx.menuFocus.emit($event);
        })("focusout", function PanelMenuSub_focusout_HostBindingHandler($event) {
          return ctx.menuBlur.emit($event);
        })("keydown", function PanelMenuSub_keydown_HostBindingHandler($event) {
          return ctx.menuKeyDown.emit($event);
        });
      }
      if (rf & 2) {
        ɵɵdomProperty("tabIndex", -1);
        ɵɵattribute("aria-activedescendant", ctx.focusedItemId)("aria-hidden", !ctx.parentExpanded);
        ɵɵclassMap(ctx.root ? ctx.cn(ctx.cx("rootList"), ctx.cx("submenu")) : ctx.cx("submenu"));
      }
    },
    inputs: {
      panelId: "panelId",
      focusedItemId: "focusedItemId",
      items: "items",
      itemTemplate: "itemTemplate",
      level: [2, "level", "level", numberAttribute],
      activeItemPath: "activeItemPath",
      root: [2, "root", "root", booleanAttribute],
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      transitionOptions: "transitionOptions",
      parentExpanded: [2, "parentExpanded", "parentExpanded", booleanAttribute],
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      itemToggle: "itemToggle",
      menuFocus: "menuFocus",
      menuBlur: "menuBlur",
      menuKeyDown: "menuKeyDown"
    },
    features: [ɵɵProvidersFeature([PanelMenuStyle, {
      provide: PANELMENUSUB_INSTANCE,
      useExisting: _PanelMenuSub
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _PanelMenuSub
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    attrs: _c0,
    decls: 1,
    vars: 1,
    consts: [["htmlLabel", ""], ["ngFor", "", 3, "ngForOf"], ["role", "separator", 3, "class", "pBind", 4, "ngIf"], ["role", "treeitem", 3, "class", "ngStyle", "pTooltip", "pTooltipUnstyled", "pBind", "tooltipOptions", 4, "ngIf"], ["role", "separator", 3, "pBind"], ["role", "treeitem", 3, "ngStyle", "pTooltip", "pTooltipUnstyled", "pBind", "tooltipOptions"], [3, "click", "pBind"], [4, "ngIf"], ["pMotionName", "p-collapsible", 3, "pMotion", "pMotionOptions"], [3, "pBind"], ["pPanelMenuSub", "", 3, "itemToggle", "id", "panelId", "items", "itemTemplate", "transitionOptions", "focusedItemId", "activeItemPath", "level", "pt", "unstyled", "parentExpanded", "motionOptions"], [3, "class", "ngStyle", "target", "pBind", 4, "ngIf"], [3, "routerLink", "queryParams", "routerLinkActive", "routerLinkActiveOptions", "class", "ngStyle", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind", 4, "ngIf"], [3, "ngStyle", "target", "pBind"], [3, "class", "ngStyle", "pBind", 4, "ngIf"], [3, "class", "ngStyle", "pBind", 4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet"], ["data-p-icon", "chevron-down", 3, "class", "ngStyle", "pBind", 4, "ngIf"], ["data-p-icon", "chevron-right", 3, "class", "ngStyle", "pBind", 4, "ngIf"], ["data-p-icon", "chevron-down", 3, "ngStyle", "pBind"], ["data-p-icon", "chevron-right", 3, "ngStyle", "pBind"], [3, "ngStyle", "pBind"], [3, "ngStyle", "innerHTML", "pBind"], [3, "routerLink", "queryParams", "routerLinkActive", "routerLinkActiveOptions", "ngStyle", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind"], [3, "class", "ngStyle", "innerHTML", "pBind", 4, "ngIf"], [3, "class", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function PanelMenuSub_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, PanelMenuSub_ng_template_0_Template, 2, 2, "ng-template", 1);
      }
      if (rf & 2) {
        ɵɵproperty("ngForOf", ctx.items);
      }
    },
    dependencies: [_PanelMenuSub, CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgStyle, RouterModule, RouterLink, RouterLinkActive, TooltipModule, Tooltip, Bind, ChevronDownIcon, ChevronRightIcon, SharedModule, BindModule, MotionModule, MotionDirective],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanelMenuSub, [{
    type: Component,
    args: [{
      selector: "ul[pPanelMenuSub]",
      imports: [CommonModule, RouterModule, TooltipModule, ChevronDownIcon, ChevronRightIcon, SharedModule, BindModule, MotionModule],
      standalone: true,
      template: `
        <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
            <li *ngIf="processedItem.separator" [class]="cn(cx('separator'), getItemProp(processedItem, 'styleClass'))" role="separator" [pBind]="ptm('separator')"></li>
            <li
                *ngIf="!processedItem.separator && isItemVisible(processedItem)"
                role="treeitem"
                [attr.id]="getItemId(processedItem)"
                [attr.aria-label]="getItemProp(processedItem, 'label')"
                [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                [attr.aria-level]="level + 1"
                [attr.aria-setsize]="getAriaSetSize()"
                [attr.aria-posinset]="getAriaPosInset(index)"
                [class]="cn(cx('item', { processedItem }), getItemProp(processedItem, 'styleClass'))"
                [ngStyle]="getItemProp(processedItem, 'style')"
                [pTooltip]="getItemProp(processedItem, 'tooltip')"
                [pTooltipUnstyled]="unstyled()"
                [pBind]="getPTOptions(processedItem, index, 'item')"
                [attr.data-p-disabled]="isItemDisabled(processedItem)"
                [attr.data-p-focused]="isItemFocused(processedItem)"
                [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
            >
                <div [class]="cx('itemContent')" [pBind]="getPTOptions(processedItem, index, 'itemContent')" (click)="onItemClick($event, processedItem)">
                    <ng-container *ngIf="!itemTemplate">
                        <a
                            *ngIf="!getItemProp(processedItem, 'routerLink')"
                            [attr.href]="getItemProp(processedItem, 'url')"
                            [attr.title]="getItemProp(processedItem, 'title')"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                            [ngStyle]="getItemProp(processedItem, 'linkStyle')"
                            [target]="getItemProp(processedItem, 'target')"
                            [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                        >
                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!panelMenu.submenuIconTemplate && !panelMenu._submenuIconTemplate">
                                    <svg
                                        data-p-icon="chevron-down"
                                        [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                        *ngIf="isItemActive(processedItem)"
                                        [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                        [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                    />
                                    <svg
                                        data-p-icon="chevron-right"
                                        [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                        *ngIf="!isItemActive(processedItem)"
                                        [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                        [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                    />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate || panelMenu._submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span
                                [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                *ngIf="processedItem.icon"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                            ></span>
                            <span
                                [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                [ngStyle]="getItemProp(processedItem, 'labelStyle')"
                                *ngIf="processedItem.item?.escape !== false; else htmlLabel"
                                [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                >{{ getItemProp(processedItem, 'label') }}</span
                            >
                            <ng-template #htmlLabel
                                ><span
                                    [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                    [ngStyle]="getItemProp(processedItem, 'labelStyle')"
                                    [innerHTML]="getItemProp(processedItem, 'label')"
                                    [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                ></span
                            ></ng-template>
                        </a>
                        <a
                            *ngIf="getItemProp(processedItem, 'routerLink')"
                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                            [routerLinkActive]="'p-panelmenu-item-link-active'"
                            [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                            [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                            [ngStyle]="getItemProp(processedItem, 'linkStyle')"
                            [target]="getItemProp(processedItem, 'target')"
                            [attr.title]="getItemProp(processedItem, 'title')"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [fragment]="getItemProp(processedItem, 'fragment')"
                            [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                            [state]="getItemProp(processedItem, 'state')"
                            [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                        >
                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!panelMenu.submenuIconTemplate && !panelMenu._submenuIconTemplate">
                                    <svg
                                        data-p-icon="chevron-down"
                                        *ngIf="isItemActive(processedItem)"
                                        [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                        [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                        [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                    />
                                    <svg
                                        data-p-icon="chevron-right"
                                        *ngIf="!isItemActive(processedItem)"
                                        [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                        [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                        [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                    />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate && panelMenu._submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span
                                [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                *ngIf="processedItem.icon"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                            ></span>
                            <span
                                *ngIf="getItemProp(processedItem, 'label')"
                                [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                [ngStyle]="getItemProp(processedItem, 'labelStyle')"
                                [innerHTML]="getItemProp(processedItem, 'label')"
                                [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                            ></span>

                            <span [class]="cn(cx('badge'), getItemProp(processedItem, 'badgeStyleClass'))" *ngIf="processedItem.badge">{{ processedItem.badge }}</span>
                        </a>
                    </ng-container>
                    <ng-container *ngIf="itemTemplate">
                        <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                    </ng-container>
                </div>

                <div
                    [class]="cx('contentContainer', { processedItem: processedItem })"
                    pMotionName="p-collapsible"
                    [pMotion]="isItemVisible(processedItem) && isItemGroup(processedItem) && isItemExpanded(processedItem)"
                    [pMotionOptions]="motionOptions()"
                >
                    <div [class]="cx('contentWrapper')" [pBind]="ptm('contentWrapper')">
                        <ul
                            pPanelMenuSub
                            [id]="getItemId(processedItem) + '_list'"
                            [panelId]="panelId"
                            [items]="processedItem?.items"
                            [itemTemplate]="itemTemplate"
                            [transitionOptions]="transitionOptions"
                            [focusedItemId]="focusedItemId"
                            [activeItemPath]="activeItemPath"
                            [level]="level + 1"
                            [pt]="pt()"
                            [unstyled]="unstyled()"
                            [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                            (itemToggle)="onItemToggle($event)"
                            [motionOptions]="motionOptions()"
                        ></ul>
                    </div>
                </div>
            </li>
        </ng-template>
    `,
      encapsulation: ViewEncapsulation.None,
      providers: [PanelMenuStyle, {
        provide: PANELMENUSUB_INSTANCE,
        useExisting: PanelMenuSub
      }, {
        provide: PARENT_INSTANCE,
        useExisting: PanelMenuSub
      }],
      host: {
        "[class]": 'root ? cn(cx("rootList"), cx("submenu")) : cx("submenu")',
        role: "tree",
        "[tabindex]": "-1",
        "[attr.aria-activedescendant]": "focusedItemId",
        "[attr.aria-hidden]": "!parentExpanded",
        "(focusin)": "menuFocus.emit($event)",
        "(focusout)": "menuBlur.emit($event)",
        "(keydown)": "menuKeyDown.emit($event)"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    panelId: [{
      type: Input
    }],
    focusedItemId: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    itemTemplate: [{
      type: Input
    }],
    level: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    activeItemPath: [{
      type: Input
    }],
    root: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    transitionOptions: [{
      type: Input
    }],
    parentExpanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
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
    itemToggle: [{
      type: Output
    }],
    menuFocus: [{
      type: Output
    }],
    menuBlur: [{
      type: Output
    }],
    menuKeyDown: [{
      type: Output
    }]
  });
})();
var PanelMenuList = class _PanelMenuList extends BaseComponent {
  panelId;
  id;
  items;
  itemTemplate;
  parentExpanded;
  expanded;
  transitionOptions;
  root;
  tabindex;
  activeItem;
  motionOptions = input(...ngDevMode ? [void 0, {
    debugName: "motionOptions"
  }] : []);
  itemToggle = new EventEmitter();
  headerFocus = new EventEmitter();
  subMenuViewChild;
  searchTimeout;
  searchValue;
  focused;
  focusedItem = signal(null, ...ngDevMode ? [{
    debugName: "focusedItem"
  }] : []);
  activeItemPath = signal([], ...ngDevMode ? [{
    debugName: "activeItemPath"
  }] : []);
  processedItems = signal([], ...ngDevMode ? [{
    debugName: "processedItems"
  }] : []);
  visibleItems = computed(() => {
    const processedItems = this.processedItems();
    return this.flatItems(processedItems);
  }, ...ngDevMode ? [{
    debugName: "visibleItems"
  }] : []);
  get focusedItemId() {
    const focusedItem = this.focusedItem();
    return focusedItem && focusedItem.item?.id ? focusedItem.item.id : s(this.focusedItem()) ? `${this.panelId}_${this.focusedItem().key}` : void 0;
  }
  onChanges(changes) {
    this.processedItems.set(this.createProcessedItems(changes?.items?.currentValue || this.items || []));
  }
  getItemProp(processedItem, name) {
    return processedItem && processedItem.item ? m(processedItem.item[name]) : void 0;
  }
  getItemLabel(processedItem) {
    return this.getItemProp(processedItem, "label");
  }
  isItemVisible(processedItem) {
    return this.getItemProp(processedItem, "visible") !== false;
  }
  isItemDisabled(processedItem) {
    return this.getItemProp(processedItem, "disabled");
  }
  isItemActive(processedItem) {
    return this.activeItemPath().some((path) => path.key === processedItem.parentKey);
  }
  isItemGroup(processedItem) {
    return s(processedItem.items);
  }
  isElementInPanel(event, element) {
    const panel = event.currentTarget.closest('[data-pc-name="panelmenu"]');
    return panel && panel.contains(element);
  }
  isItemMatched(processedItem) {
    return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
  }
  isVisibleItem(processedItem) {
    return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
  }
  isValidItem(processedItem) {
    return !!processedItem && !this.isItemDisabled(processedItem) && !processedItem.separator;
  }
  findFirstItem() {
    return this.visibleItems().find((processedItem) => this.isValidItem(processedItem));
  }
  findLastItem() {
    return V(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
  }
  findItemByEventTarget(target) {
    let parentNode = target;
    while (parentNode && parentNode.tagName?.toLowerCase() !== "li") {
      parentNode = parentNode?.parentNode;
    }
    return parentNode?.id && this.visibleItems().find((processedItem) => this.isValidItem(processedItem) && `${this.panelId}_${processedItem.key}` === parentNode.id);
  }
  createProcessedItems(items, level = 0, parent = {}, parentKey = "") {
    const processedItems = [];
    items && items.forEach((item, index) => {
      const key = (parentKey !== "" ? parentKey + "_" : "") + index;
      const newItem = {
        icon: item.icon,
        expanded: item.expanded,
        separator: item.separator,
        item,
        index,
        level,
        key,
        parent,
        parentKey
      };
      newItem["items"] = this.createProcessedItems(item.items, level + 1, newItem, key);
      processedItems.push(newItem);
    });
    return processedItems;
  }
  findProcessedItemByItemKey(key, processedItems, level = 0) {
    processedItems = processedItems || this.processedItems();
    if (processedItems && processedItems.length) {
      for (let i = 0; i < processedItems.length; i++) {
        const processedItem = processedItems[i];
        if (this.getItemProp(processedItem, "key") === key) return processedItem;
        const matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);
        if (matchedItem) return matchedItem;
      }
    }
  }
  flatItems(processedItems, processedFlattenItems = []) {
    processedItems && processedItems.forEach((processedItem) => {
      if (this.isVisibleItem(processedItem)) {
        processedFlattenItems.push(processedItem);
        this.flatItems(processedItem.items, processedFlattenItems);
      }
    });
    return processedFlattenItems;
  }
  changeFocusedItem(event) {
    const {
      originalEvent,
      processedItem,
      focusOnNext,
      selfCheck,
      allowHeaderFocus = true
    } = event;
    if (s(this.focusedItem()) && this.focusedItem().key !== processedItem.key) {
      this.focusedItem.set(processedItem);
      this.scrollInView();
    } else if (allowHeaderFocus) {
      this.headerFocus.emit({
        originalEvent,
        focusOnNext,
        selfCheck
      });
    }
  }
  scrollInView() {
    const element = z(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
    if (element) {
      element.scrollIntoView && element.scrollIntoView({
        block: "nearest",
        inline: "nearest"
      });
    }
  }
  onFocus(event) {
    if (!this.focused) {
      this.focused = true;
      const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findItemByEventTarget(event.target) || this.findFirstItem() : this.findLastItem());
      if (event.relatedTarget !== null) this.focusedItem.set(focusedItem);
    }
  }
  onBlur(event) {
    const target = event.relatedTarget;
    if (this.focused && !this.el.nativeElement.contains(target)) {
      this.focused = false;
      this.focusedItem.set(null);
      this.searchValue = "";
    }
  }
  onItemToggle(event) {
    const {
      processedItem,
      expanded
    } = event;
    if (processedItem.item) {
      processedItem.item.expanded = expanded;
    }
    processedItem.expanded = expanded;
    this.processedItems.update((items) => [...items]);
    const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== processedItem.parentKey);
    if (expanded) {
      activeItemPath.push(processedItem);
    }
    this.activeItemPath.set(activeItemPath);
    this.focusedItem.set(processedItem);
  }
  onKeyDown(event) {
    const metaKey = event.metaKey || event.ctrlKey;
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event);
        break;
      case "ArrowLeft":
        this.onArrowLeftKey(event);
        break;
      case "ArrowRight":
        this.onArrowRightKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "Space":
        this.onSpaceKey(event);
        break;
      case "Enter":
        this.onEnterKey(event);
        break;
      case "Escape":
      case "Tab":
      case "PageDown":
      case "PageUp":
      case "Backspace":
      case "ShiftLeft":
      case "ShiftRight":
        break;
      default:
        if (!metaKey && J(event.key)) {
          this.searchItems(event, event.key);
        }
        break;
    }
  }
  onArrowDownKey(event) {
    const processedItem = s(this.focusedItem()) ? this.findNextItem(this.focusedItem()) : this.findFirstItem();
    this.changeFocusedItem({
      originalEvent: event,
      processedItem,
      focusOnNext: true
    });
    event.preventDefault();
  }
  onArrowUpKey(event) {
    const processedItem = s(this.focusedItem()) ? this.findPrevItem(this.focusedItem()) : this.findLastItem();
    this.changeFocusedItem({
      originalEvent: event,
      processedItem,
      selfCheck: true
    });
    event.preventDefault();
  }
  onArrowLeftKey(event) {
    if (s(this.focusedItem())) {
      const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);
      if (matched) {
        const activeItemPath = this.activeItemPath().filter((p) => p.key !== this.focusedItem().key);
        this.activeItemPath.set(activeItemPath);
      } else {
        const focusedItem = s(this.focusedItem().parent) ? this.focusedItem().parent : this.focusedItem();
        this.focusedItem.set(focusedItem);
      }
      event.preventDefault();
    }
  }
  onArrowRightKey(event) {
    if (s(this.focusedItem())) {
      const grouped = this.isItemGroup(this.focusedItem());
      if (grouped) {
        const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);
        if (matched) {
          this.onArrowDownKey(event);
        } else {
          const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItem().parentKey);
          activeItemPath.push(this.focusedItem());
          this.activeItemPath.set(activeItemPath);
        }
      }
      event.preventDefault();
    }
  }
  onHomeKey(event) {
    this.changeFocusedItem({
      originalEvent: event,
      processedItem: this.findFirstItem(),
      allowHeaderFocus: false
    });
    event.preventDefault();
  }
  onEndKey(event) {
    this.changeFocusedItem({
      originalEvent: event,
      processedItem: this.findLastItem(),
      focusOnNext: true,
      allowHeaderFocus: false
    });
    event.preventDefault();
  }
  onEnterKey(event) {
    if (s(this.focusedItem())) {
      const element = z(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
      const anchorElement = element && (z(element, "a") || z(element, "button"));
      anchorElement ? anchorElement.click() : element && element.click();
    }
    event.preventDefault();
  }
  onSpaceKey(event) {
    this.onEnterKey(event);
  }
  findNextItem(processedItem) {
    const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
    const matchedItem = index < this.visibleItems().length - 1 ? this.visibleItems().slice(index + 1).find((pItem) => this.isValidItem(pItem)) : void 0;
    return matchedItem || processedItem;
  }
  findPrevItem(processedItem) {
    const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
    const matchedItem = index > 0 ? V(this.visibleItems().slice(0, index), (pItem) => this.isValidItem(pItem)) : void 0;
    return matchedItem || processedItem;
  }
  searchItems(event, char) {
    this.searchValue = (this.searchValue || "") + char;
    let matchedItem = null;
    let matched = false;
    if (s(this.focusedItem())) {
      const focusedItemIndex = this.visibleItems().findIndex((processedItem) => processedItem.key === this.focusedItem().key);
      matchedItem = this.visibleItems().slice(focusedItemIndex).find((processedItem) => this.isItemMatched(processedItem)) || null;
      matchedItem = l(matchedItem) ? this.visibleItems().slice(0, focusedItemIndex).find((processedItem) => this.isItemMatched(processedItem)) || null : matchedItem;
    } else {
      matchedItem = this.visibleItems().find((processedItem) => this.isItemMatched(processedItem)) || null;
    }
    if (s(matchedItem)) {
      matched = true;
    }
    if (l(matchedItem) && l(this.focusedItem())) {
      matchedItem = this.findFirstItem() || null;
    }
    if (s(matchedItem)) {
      this.changeFocusedItem({
        originalEvent: event,
        processedItem: matchedItem,
        allowHeaderFocus: false
      });
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.searchValue = "";
      this.searchTimeout = null;
    }, 500);
    return matched;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPanelMenuList_BaseFactory;
    return function PanelMenuList_Factory(__ngFactoryType__) {
      return (ɵPanelMenuList_BaseFactory || (ɵPanelMenuList_BaseFactory = ɵɵgetInheritedFactory(_PanelMenuList)))(__ngFactoryType__ || _PanelMenuList);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PanelMenuList,
    selectors: [["ul", "pPanelMenuList", ""]],
    viewQuery: function PanelMenuList_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c4, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.subMenuViewChild = _t.first);
      }
    },
    inputs: {
      panelId: "panelId",
      id: "id",
      items: "items",
      itemTemplate: "itemTemplate",
      parentExpanded: [2, "parentExpanded", "parentExpanded", booleanAttribute],
      expanded: [2, "expanded", "expanded", booleanAttribute],
      transitionOptions: "transitionOptions",
      root: [2, "root", "root", booleanAttribute],
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      activeItem: "activeItem",
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      itemToggle: "itemToggle",
      headerFocus: "headerFocus"
    },
    features: [ɵɵInheritDefinitionFeature],
    attrs: _c5,
    decls: 2,
    vars: 13,
    consts: [["submenu", ""], ["pPanelMenuSub", "", 3, "itemToggle", "keydown", "menuFocus", "menuBlur", "root", "id", "panelId", "tabindex", "itemTemplate", "focusedItemId", "activeItemPath", "transitionOptions", "items", "parentExpanded", "pt", "unstyled", "motionOptions"]],
    template: function PanelMenuList_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "ul", 1, 0);
        ɵɵlistener("itemToggle", function PanelMenuList_Template_ul_itemToggle_0_listener($event) {
          return ctx.onItemToggle($event);
        })("keydown", function PanelMenuList_Template_ul_keydown_0_listener($event) {
          return ctx.onKeyDown($event);
        })("menuFocus", function PanelMenuList_Template_ul_menuFocus_0_listener($event) {
          return ctx.onFocus($event);
        })("menuBlur", function PanelMenuList_Template_ul_menuBlur_0_listener($event) {
          return ctx.onBlur($event);
        });
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵproperty("root", ctx.root)("id", ctx.panelId + "_list")("panelId", ctx.panelId)("tabindex", ctx.tabindex)("itemTemplate", ctx.itemTemplate)("focusedItemId", ctx.focused ? ctx.focusedItemId : void 0)("activeItemPath", ctx.activeItemPath())("transitionOptions", ctx.transitionOptions)("items", ctx.processedItems())("parentExpanded", ctx.parentExpanded)("pt", ctx.pt())("unstyled", ctx.unstyled())("motionOptions", ctx.motionOptions());
      }
    },
    dependencies: [CommonModule, PanelMenuSub, RouterModule, TooltipModule, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanelMenuList, [{
    type: Component,
    args: [{
      selector: "ul[pPanelMenuList]",
      imports: [CommonModule, PanelMenuSub, RouterModule, TooltipModule, SharedModule],
      standalone: true,
      template: `
        <ul
            pPanelMenuSub
            #submenu
            [root]="root"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
            [pt]="pt()"
            [unstyled]="unstyled()"
            [motionOptions]="motionOptions()"
        ></ul>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    panelId: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    itemTemplate: [{
      type: Input
    }],
    parentExpanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    expanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    transitionOptions: [{
      type: Input
    }],
    root: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    activeItem: [{
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
    itemToggle: [{
      type: Output
    }],
    headerFocus: [{
      type: Output
    }],
    subMenuViewChild: [{
      type: ViewChild,
      args: ["submenu"]
    }]
  });
})();
var PanelMenu = class _PanelMenu extends BaseComponent {
  /**
   * An array of menuitems.
   * @group Props
   */
  model;
  /**
   * Style class of the component.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Whether multiple tabs can be activated at the same time or not.
   * @group Props
   */
  multiple = false;
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
   * Current id state as a string.
   * @group Props
   */
  id;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  containerViewChild;
  /**
   * Template option of submenu icon.
   * @group Templates
   */
  submenuIconTemplate;
  /**
   * Template option of header icon.
   * @group Templates
   */
  headerIconTemplate;
  /**
   * Template option of item.
   * @param {PanelMenuItemTemplateContext} context - item context.
   * @see {@link PanelMenuItemTemplateContext}
   * @group Templates
   */
  itemTemplate;
  templates;
  _submenuIconTemplate;
  _headerIconTemplate;
  _itemTemplate;
  activeItem = signal(null, ...ngDevMode ? [{
    debugName: "activeItem"
  }] : []);
  _componentStyle = inject(PanelMenuStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcPanelMenu = inject(PANELMENU_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  getPTOptions(key, item, index) {
    return this.ptm(key, {
      context: {
        item,
        index,
        active: this.isItemActive(item)
      }
    });
  }
  onInit() {
    this.id = this.id || s2("pn_id_");
  }
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "submenuicon":
          this._submenuIconTemplate = item.template;
          break;
        case "headericon":
          this._headerIconTemplate = item.template;
          break;
        case "item":
          this._itemTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  /**
   * Collapses open panels.
   * @group Method
   */
  collapseAll() {
    for (let item of this.model) {
      if (item.expanded) {
        item.expanded = false;
      }
    }
    this.cd.detectChanges();
  }
  changeActiveItem(event, item, index, selfActive = false) {
    if (!this.isItemDisabled(item)) {
      const activeItem = selfActive ? item : this.activeItem && k(item, this.activeItem) ? null : item;
      this.activeItem.set(activeItem);
    }
  }
  getItemProp(item, name) {
    return item ? m(item[name]) : void 0;
  }
  getItemLabel(item) {
    return this.getItemProp(item, "label");
  }
  isItemActive(item) {
    return item.expanded;
  }
  isItemVisible(item) {
    return this.getItemProp(item, "visible") !== false;
  }
  isItemDisabled(item) {
    return this.getItemProp(item, "disabled");
  }
  isItemGroup(item) {
    return s(item.items);
  }
  getPanelId(index, item) {
    return item && item.id ? item.id : `${this.id}_${index}`;
  }
  getHeaderId(item, index) {
    return item.id ? item.id + "_header" : `${this.getPanelId(index)}_header`;
  }
  getContentId(item, index) {
    return item.id ? item.id + "_content" : `${this.getPanelId(index)}_content`;
  }
  updateFocusedHeader(event) {
    const {
      originalEvent,
      focusOnNext,
      selfCheck
    } = event;
    const panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
    const header = selfCheck ? z(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);
    header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
  }
  changeFocusedHeader(event, element) {
    element && bt(element);
  }
  findNextHeader(panelElement, selfCheck = false) {
    const nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
    const headerElement = z(nextPanelElement, '[data-pc-section="header"]');
    return headerElement ? Q(headerElement, "data-p-disabled") ? this.findNextHeader(headerElement.parentElement) : headerElement : null;
  }
  findPrevHeader(panelElement, selfCheck = false) {
    const prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
    const headerElement = z(prevPanelElement, '[data-pc-section="header"]');
    return headerElement ? Q(headerElement, "data-p-disabled") ? this.findPrevHeader(headerElement.parentElement) : headerElement : null;
  }
  findFirstHeader() {
    return this.containerViewChild?.nativeElement ? this.findNextHeader(this.containerViewChild.nativeElement.firstElementChild, true) : null;
  }
  findLastHeader() {
    return this.containerViewChild?.nativeElement ? this.findPrevHeader(this.containerViewChild.nativeElement.lastElementChild, true) : null;
  }
  onHeaderClick(event, item, index) {
    if (this.isItemDisabled(item)) {
      event.preventDefault();
      return;
    }
    if (item.command) {
      item.command({
        originalEvent: event,
        item
      });
    }
    if (!this.multiple) {
      for (let modelItem of this.model) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
    this.changeActiveItem(event, item, index);
    bt(event.currentTarget);
  }
  onHeaderKeyDown(event, item, index) {
    switch (event.code) {
      case "ArrowDown":
        this.onHeaderArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onHeaderArrowUpKey(event);
        break;
      case "Home":
        this.onHeaderHomeKey(event);
        break;
      case "End":
        this.onHeaderEndKey(event);
        break;
      case "Enter":
      case "Space":
        this.onHeaderEnterKey(event, item, index);
        break;
      default:
        break;
    }
  }
  onHeaderArrowDownKey(event) {
    const rootList = Q(event.currentTarget, "data-p-highlight") === true ? z(event.currentTarget.nextElementSibling, '[data-pc-section="rootlist"]') : null;
    rootList ? bt(rootList) : this.updateFocusedHeader({
      originalEvent: event,
      focusOnNext: true
    });
    event.preventDefault();
  }
  onHeaderArrowUpKey(event) {
    const prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
    const rootList = Q(prevHeader, "data-p-highlight") === true ? z(prevHeader.nextElementSibling, '[data-pc-section="rootlist"]') : null;
    rootList ? bt(rootList) : this.updateFocusedHeader({
      originalEvent: event,
      focusOnNext: false
    });
    event.preventDefault();
  }
  onHeaderHomeKey(event) {
    this.changeFocusedHeader(event, this.findFirstHeader());
    event.preventDefault();
  }
  onHeaderEndKey(event) {
    this.changeFocusedHeader(event, this.findLastHeader());
    event.preventDefault();
  }
  onHeaderEnterKey(event, item, index) {
    const headerAction = z(event.currentTarget, '[data-pc-section="headerlink"]');
    headerAction ? headerAction.click() : this.onHeaderClick(event, item, index);
    event.preventDefault();
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPanelMenu_BaseFactory;
    return function PanelMenu_Factory(__ngFactoryType__) {
      return (ɵPanelMenu_BaseFactory || (ɵPanelMenu_BaseFactory = ɵɵgetInheritedFactory(_PanelMenu)))(__ngFactoryType__ || _PanelMenu);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PanelMenu,
    selectors: [["p-panelMenu"], ["p-panelmenu"], ["p-panel-menu"]],
    contentQueries: function PanelMenu_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c6, 4)(dirIndex, _c7, 4)(dirIndex, _c8, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.submenuIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function PanelMenu_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c9, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerViewChild = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function PanelMenu_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      model: "model",
      styleClass: "styleClass",
      multiple: [2, "multiple", "multiple", booleanAttribute],
      transitionOptions: "transitionOptions",
      motionOptions: [1, "motionOptions"],
      id: "id",
      tabindex: [2, "tabindex", "tabindex", numberAttribute]
    },
    features: [ɵɵProvidersFeature([PanelMenuStyle, {
      provide: PANELMENU_INSTANCE,
      useExisting: _PanelMenu
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _PanelMenu
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 1,
    vars: 1,
    consts: [["htmlLabel", ""], ["htmlRouteLabel", ""], [4, "ngFor", "ngForOf"], [3, "class", "ngStyle", "pBind", 4, "ngIf"], [3, "ngStyle", "pBind"], ["role", "button", 3, "click", "keydown", "ngStyle", "pTooltip", "pTooltipUnstyled", "tabindex", "tooltipOptions", "pBind"], [3, "pBind"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "routerLink", "queryParams", "routerLinkActive", "routerLinkActiveOptions", "target", "class", "ngStyle", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind", 4, "ngIf"], ["role", "region", "pMotionName", "p-collapsible", 3, "pBind", "pMotion", "pMotionOptions"], ["pPanelMenuList", "", 3, "headerFocus", "panelId", "items", "itemTemplate", "transitionOptions", "root", "activeItem", "tabindex", "parentExpanded", "pt", "unstyled", "motionOptions"], [3, "target", "class", "ngStyle", "pBind", 4, "ngIf"], [3, "target", "ngStyle", "pBind"], [3, "class", "ngStyle", "pBind", 4, "ngIf", "ngIfElse"], [3, "class", 4, "ngIf"], [4, "ngTemplateOutlet"], ["data-p-icon", "chevron-down", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "chevron-right", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "chevron-down", 3, "pBind"], ["data-p-icon", "chevron-right", 3, "pBind"], [3, "ngStyle", "innerHTML", "pBind"], [3, "routerLink", "queryParams", "routerLinkActive", "routerLinkActiveOptions", "target", "ngStyle", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind"]],
    template: function PanelMenu_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, PanelMenu_ng_container_0_Template, 2, 1, "ng-container", 2);
      }
      if (rf & 2) {
        ɵɵproperty("ngForOf", ctx.model);
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgStyle, PanelMenuList, RouterModule, RouterLink, RouterLinkActive, TooltipModule, Tooltip, Bind, ChevronDownIcon, ChevronRightIcon, SharedModule, BindModule, MotionModule, MotionDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanelMenu, [{
    type: Component,
    args: [{
      selector: "p-panelMenu, p-panelmenu, p-panel-menu",
      imports: [CommonModule, PanelMenuList, RouterModule, TooltipModule, ChevronDownIcon, ChevronRightIcon, SharedModule, BindModule, MotionModule],
      standalone: true,
      template: `
        <ng-container *ngFor="let item of model; let f = first; let l = last; let i = index">
            <div *ngIf="isItemVisible(item)" [class]="cn(cx('panel'), getItemProp(item, 'headerClass'))" [ngStyle]="getItemProp(item, 'style')" [pBind]="ptm('panel')">
                <div
                    [class]="cn(cx('header', { item }), getItemProp(item, 'styleClass'))"
                    [ngStyle]="getItemProp(item, 'style')"
                    [pTooltip]="getItemProp(item, 'tooltip')"
                    [pTooltipUnstyled]="unstyled()"
                    [attr.id]="getHeaderId(item, i)"
                    [tabindex]="0"
                    role="button"
                    [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                    [attr.aria-expanded]="isItemActive(item)"
                    [attr.aria-label]="getItemProp(item, 'label')"
                    [attr.aria-controls]="getContentId(item, i)"
                    [attr.aria-disabled]="isItemDisabled(item)"
                    [attr.data-p-highlight]="isItemActive(item)"
                    [attr.data-p-disabled]="isItemDisabled(item)"
                    [pBind]="getPTOptions('header', item, i)"
                    (click)="onHeaderClick($event, item, i)"
                    (keydown)="onHeaderKeyDown($event, item, i)"
                >
                    <div [class]="cx('headerContent')" [pBind]="getPTOptions('headerContent', item, i)">
                        <ng-container *ngIf="!itemTemplate && !_itemTemplate">
                            <a
                                *ngIf="!getItemProp(item, 'routerLink')"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.tabindex]="-1"
                                [target]="getItemProp(item, 'target')"
                                [attr.title]="getItemProp(item, 'title')"
                                [attr.data-automationid]="getItemProp(item, 'automationId')"
                                [class]="cn(cx('headerLink'), getItemProp(item, 'linkClass'))"
                                [ngStyle]="getItemProp(item, 'linkStyle')"
                                [pBind]="getPTOptions('headerLink', item, i)"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!headerIconTemplate && !_headerIconTemplate">
                                        <svg data-p-icon="chevron-down" [class]="cx('submenuIcon')" *ngIf="isItemActive(item)" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                        <svg data-p-icon="chevron-right" [class]="cx('submenuIcon')" *ngIf="!isItemActive(item)" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="headerIconTemplate || _headerIconTemplate"></ng-template>
                                </ng-container>
                                <span [class]="cn(cx('headerIcon'), item.icon, getItemProp(item, 'iconClass'))" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')" [pBind]="getPTOptions('headerIcon', item, i)"></span>
                                <span
                                    [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))"
                                    [ngStyle]="getItemProp(item, 'labelStyle')"
                                    *ngIf="getItemProp(item, 'escape') !== false; else htmlLabel"
                                    [pBind]="getPTOptions('headerLabel', item, i)"
                                    >{{ getItemProp(item, 'label') }}</span
                                >
                                <ng-template #htmlLabel
                                    ><span [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))" [ngStyle]="getItemProp(item, 'labelStyle')" [innerHTML]="getItemProp(item, 'label')" [pBind]="getPTOptions('headerLabel', item, i)"></span
                                ></ng-template>
                                <span [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))" *ngIf="getItemProp(item, 'badge')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                        <a
                            *ngIf="getItemProp(item, 'routerLink')"
                            [routerLink]="getItemProp(item, 'routerLink')"
                            [queryParams]="getItemProp(item, 'queryParams')"
                            [routerLinkActive]="'p-panelmenu-item-link-active'"
                            [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                            [target]="getItemProp(item, 'target')"
                            [attr.title]="getItemProp(item, 'title')"
                            [attr.data-automationid]="getItemProp(item, 'automationId')"
                            [class]="cn(cx('headerLink'), getItemProp(item, 'linkClass'))"
                            [ngStyle]="getItemProp(item, 'linkStyle')"
                            [attr.tabindex]="-1"
                            [fragment]="getItemProp(item, 'fragment')"
                            [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(item, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(item, 'replaceUrl')"
                            [state]="getItemProp(item, 'state')"
                            [pBind]="getPTOptions('headerLink', item, i)"
                        >
                            <ng-container *ngIf="isItemGroup(item)">
                                <ng-container *ngIf="!headerIconTemplate && !_headerIconTemplate">
                                    <svg data-p-icon="chevron-down" [class]="cx('submenuIcon')" *ngIf="isItemActive(item)" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                    <svg data-p-icon="chevron-right" [class]="cx('submenuIcon')" *ngIf="!isItemActive(item)" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="headerIconTemplate || _headerIconTemplate"></ng-template>
                            </ng-container>
                            <span [class]="cn(cx('headerIcon'), item.icon, getItemProp(item, 'iconClass'))" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')" [pBind]="getPTOptions('headerIcon', item, i)"></span>
                            <span
                                [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))"
                                [ngStyle]="getItemProp(item, 'labelStyle')"
                                *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel"
                                [pBind]="getPTOptions('headerLabel', item, i)"
                                >{{ getItemProp(item, 'label') }}</span
                            >
                            <ng-template #htmlRouteLabel
                                ><span [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))" [ngStyle]="getItemProp(item, 'labelStyle')" [innerHTML]="getItemProp(item, 'label')" [pBind]="getPTOptions('headerLabel', item, i)"></span
                            ></ng-template>
                            <span *ngIf="getItemProp(item, 'badge')" [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))">{{ getItemProp(item, 'badge') }}</span>
                        </a>
                    </div>
                </div>
                <div
                    [class]="cx('contentContainer', { processedItem: item })"
                    role="region"
                    [attr.id]="getContentId(item, i)"
                    [attr.aria-labelledby]="getHeaderId(item, i)"
                    [pBind]="ptm('contentContainer')"
                    pMotionName="p-collapsible"
                    [pMotion]="isItemActive(item)"
                    [pMotionOptions]="computedMotionOptions()"
                >
                    <div [class]="cx('contentWrapper')" [pBind]="ptm('contentWrapper')">
                        <div [class]="cx('content')" [pBind]="ptm('content')">
                            <ul
                                pPanelMenuList
                                [panelId]="getPanelId(i, item)"
                                [items]="getItemProp(item, 'items')"
                                [itemTemplate]="itemTemplate || _itemTemplate"
                                [transitionOptions]="transitionOptions"
                                [root]="true"
                                [activeItem]="activeItem()"
                                [tabindex]="tabindex"
                                [parentExpanded]="isItemActive(item)"
                                (headerFocus)="updateFocusedHeader($event)"
                                [pt]="pt()"
                                [unstyled]="unstyled()"
                                [motionOptions]="computedMotionOptions()"
                            ></ul>
                        </div>
                    </div>
                </div>
            </div>
        </ng-container>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [PanelMenuStyle, {
        provide: PANELMENU_INSTANCE,
        useExisting: PanelMenu
      }, {
        provide: PARENT_INSTANCE,
        useExisting: PanelMenu
      }],
      host: {
        "[class]": 'cn(cx("root"), styleClass)'
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    model: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    multiple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
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
    id: [{
      type: Input
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    containerViewChild: [{
      type: ViewChild,
      args: ["container"]
    }],
    submenuIconTemplate: [{
      type: ContentChild,
      args: ["submenuicon", {
        descendants: false
      }]
    }],
    headerIconTemplate: [{
      type: ContentChild,
      args: ["headericon", {
        descendants: false
      }]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var PanelMenuModule = class _PanelMenuModule {
  static ɵfac = function PanelMenuModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PanelMenuModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _PanelMenuModule,
    imports: [PanelMenu, SharedModule],
    exports: [PanelMenu, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [PanelMenu, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanelMenuModule, [{
    type: NgModule,
    args: [{
      imports: [PanelMenu, SharedModule],
      exports: [PanelMenu, SharedModule]
    }]
  }], null, null);
})();
export {
  PanelMenu,
  PanelMenuClasses,
  PanelMenuList,
  PanelMenuModule,
  PanelMenuStyle,
  PanelMenuSub
};
//# sourceMappingURL=primeng_panelmenu.js.map
