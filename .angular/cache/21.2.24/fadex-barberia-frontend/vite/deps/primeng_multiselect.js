import {
  Tooltip
} from "./chunk-IOOQBAGZ.js";
import {
  IconField
} from "./chunk-UOKOLPZU.js";
import {
  InputIcon
} from "./chunk-ITNBJOFE.js";
import {
  Chip
} from "./chunk-DDQZZMYX.js";
import {
  Scroller
} from "./chunk-TKTKDLUD.js";
import {
  Overlay
} from "./chunk-7H22NANO.js";
import {
  InputText
} from "./chunk-U5QTQ2LG.js";
import {
  ObjectUtils
} from "./chunk-OHFYJZH5.js";
import "./chunk-CQDTUEQU.js";
import {
  AutoFocus
} from "./chunk-LNLEKQ2Z.js";
import {
  Fluid
} from "./chunk-TONGHQ5F.js";
import {
  DomHandler,
  unblockBodyScroll
} from "./chunk-VKUYHHYD.js";
import {
  ChevronDownIcon,
  SearchIcon,
  TimesIcon
} from "./chunk-34VLFIXD.js";
import {
  Checkbox
} from "./chunk-GY3CDM4E.js";
import {
  BaseEditableHolder
} from "./chunk-A5DMBZXI.js";
import "./chunk-HE2MLLB2.js";
import {
  CheckIcon
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
  FilterService,
  Footer,
  Header,
  OverlayService,
  PrimeTemplate,
  SharedModule,
  TranslationKeys
} from "./chunk-SKV3H6PS.js";
import {
  C2 as C,
  J,
  Lt,
  M,
  b,
  bt,
  k2 as k,
  p,
  s2 as s,
  s3 as s2,
  vt,
  y,
  z
} from "./chunk-HEA754HI.js";
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-LMKS7RSM.js";
import {
  CommonModule,
  NgClass,
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
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-FR73ZBHC.js";
import {
  EventEmitter,
  InjectionToken,
  NgZone,
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

// node_modules/@primeuix/styles/dist/multiselect/index.mjs
var style = "\n    .p-multiselect {\n        display: inline-flex;\n        cursor: pointer;\n        position: relative;\n        user-select: none;\n        background: dt('multiselect.background');\n        border: 1px solid dt('multiselect.border.color');\n        transition:\n            background dt('multiselect.transition.duration'),\n            color dt('multiselect.transition.duration'),\n            border-color dt('multiselect.transition.duration'),\n            outline-color dt('multiselect.transition.duration'),\n            box-shadow dt('multiselect.transition.duration');\n        border-radius: dt('multiselect.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('multiselect.shadow');\n    }\n\n    .p-multiselect:not(.p-disabled):hover {\n        border-color: dt('multiselect.hover.border.color');\n    }\n\n    .p-multiselect:not(.p-disabled).p-focus {\n        border-color: dt('multiselect.focus.border.color');\n        box-shadow: dt('multiselect.focus.ring.shadow');\n        outline: dt('multiselect.focus.ring.width') dt('multiselect.focus.ring.style') dt('multiselect.focus.ring.color');\n        outline-offset: dt('multiselect.focus.ring.offset');\n    }\n\n    .p-multiselect.p-variant-filled {\n        background: dt('multiselect.filled.background');\n    }\n\n    .p-multiselect.p-variant-filled:not(.p-disabled):hover {\n        background: dt('multiselect.filled.hover.background');\n    }\n\n    .p-multiselect.p-variant-filled.p-focus {\n        background: dt('multiselect.filled.focus.background');\n    }\n\n    .p-multiselect.p-invalid {\n        border-color: dt('multiselect.invalid.border.color');\n    }\n\n    .p-multiselect.p-disabled {\n        opacity: 1;\n        background: dt('multiselect.disabled.background');\n    }\n\n    .p-multiselect-dropdown {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        background: transparent;\n        color: dt('multiselect.dropdown.color');\n        width: dt('multiselect.dropdown.width');\n        border-start-end-radius: dt('multiselect.border.radius');\n        border-end-end-radius: dt('multiselect.border.radius');\n    }\n\n    .p-multiselect-clear-icon {\n        align-self: center;\n        color: dt('multiselect.clear.icon.color');\n        inset-inline-end: dt('multiselect.dropdown.width');\n    }\n\n    .p-multiselect-label-container {\n        overflow: hidden;\n        flex: 1 1 auto;\n        cursor: pointer;\n    }\n\n    .p-multiselect-label {\n        white-space: nowrap;\n        cursor: pointer;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding: dt('multiselect.padding.y') dt('multiselect.padding.x');\n        color: dt('multiselect.color');\n    }\n\n    .p-multiselect-display-chip .p-multiselect-label {\n        display: flex;\n        align-items: center;\n        gap: calc(dt('multiselect.padding.y') / 2);\n    }\n\n    .p-multiselect-label.p-placeholder {\n        color: dt('multiselect.placeholder.color');\n    }\n\n    .p-multiselect.p-invalid .p-multiselect-label.p-placeholder {\n        color: dt('multiselect.invalid.placeholder.color');\n    }\n\n    .p-multiselect.p-disabled .p-multiselect-label {\n        color: dt('multiselect.disabled.color');\n    }\n\n    .p-multiselect-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n\n    .p-multiselect-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: dt('multiselect.overlay.background');\n        color: dt('multiselect.overlay.color');\n        border: 1px solid dt('multiselect.overlay.border.color');\n        border-radius: dt('multiselect.overlay.border.radius');\n        box-shadow: dt('multiselect.overlay.shadow');\n        min-width: 100%;\n    }\n\n    .p-multiselect-header {\n        display: flex;\n        align-items: center;\n        padding: dt('multiselect.list.header.padding');\n    }\n\n    .p-multiselect-header .p-checkbox {\n        margin-inline-end: dt('multiselect.option.gap');\n    }\n\n    .p-multiselect-filter-container {\n        flex: 1 1 auto;\n    }\n\n    .p-multiselect-filter {\n        width: 100%;\n    }\n\n    .p-multiselect-list-container {\n        overflow: auto;\n    }\n\n    .p-multiselect-list {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        padding: dt('multiselect.list.padding');\n        display: flex;\n        flex-direction: column;\n        gap: dt('multiselect.list.gap');\n    }\n\n    .p-multiselect-option {\n        cursor: pointer;\n        font-weight: normal;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        gap: dt('multiselect.option.gap');\n        padding: dt('multiselect.option.padding');\n        border: 0 none;\n        color: dt('multiselect.option.color');\n        background: transparent;\n        transition:\n            background dt('multiselect.transition.duration'),\n            color dt('multiselect.transition.duration'),\n            border-color dt('multiselect.transition.duration'),\n            box-shadow dt('multiselect.transition.duration'),\n            outline-color dt('multiselect.transition.duration');\n        border-radius: dt('multiselect.option.border.radius');\n    }\n\n    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {\n        background: dt('multiselect.option.focus.background');\n        color: dt('multiselect.option.focus.color');\n    }\n\n    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled):hover {\n        background: dt('multiselect.option.focus.background');\n        color: dt('multiselect.option.focus.color');\n    }\n\n    .p-multiselect-option.p-multiselect-option-selected {\n        background: dt('multiselect.option.selected.background');\n        color: dt('multiselect.option.selected.color');\n    }\n\n    .p-multiselect-option.p-multiselect-option-selected.p-focus {\n        background: dt('multiselect.option.selected.focus.background');\n        color: dt('multiselect.option.selected.focus.color');\n    }\n\n    .p-multiselect-option-group {\n        cursor: auto;\n        margin: 0;\n        padding: dt('multiselect.option.group.padding');\n        background: dt('multiselect.option.group.background');\n        color: dt('multiselect.option.group.color');\n        font-weight: dt('multiselect.option.group.font.weight');\n    }\n\n    .p-multiselect-empty-message {\n        padding: dt('multiselect.empty.message.padding');\n    }\n\n    .p-multiselect-label .p-chip {\n        padding-block-start: calc(dt('multiselect.padding.y') / 2);\n        padding-block-end: calc(dt('multiselect.padding.y') / 2);\n        border-radius: dt('multiselect.chip.border.radius');\n    }\n\n    .p-multiselect-label:has(.p-chip) {\n        padding: calc(dt('multiselect.padding.y') / 2) calc(dt('multiselect.padding.x') / 2);\n    }\n\n    .p-multiselect-fluid {\n        display: flex;\n        width: 100%;\n    }\n\n    .p-multiselect-sm .p-multiselect-label {\n        font-size: dt('multiselect.sm.font.size');\n        padding-block: dt('multiselect.sm.padding.y');\n        padding-inline: dt('multiselect.sm.padding.x');\n    }\n\n    .p-multiselect-sm .p-multiselect-dropdown .p-icon {\n        font-size: dt('multiselect.sm.font.size');\n        width: dt('multiselect.sm.font.size');\n        height: dt('multiselect.sm.font.size');\n    }\n\n    .p-multiselect-lg .p-multiselect-label {\n        font-size: dt('multiselect.lg.font.size');\n        padding-block: dt('multiselect.lg.padding.y');\n        padding-inline: dt('multiselect.lg.padding.x');\n    }\n\n    .p-multiselect-lg .p-multiselect-dropdown .p-icon {\n        font-size: dt('multiselect.lg.font.size');\n        width: dt('multiselect.lg.font.size');\n        height: dt('multiselect.lg.font.size');\n    }\n\n    .p-floatlabel-in .p-multiselect-filter {\n        padding-block-start: dt('multiselect.padding.y');\n        padding-block-end: dt('multiselect.padding.y');\n    }\n";

// node_modules/primeng/fesm2022/primeng-multiselect.mjs
var _c0 = ["pMultiSelectItem", ""];
var _c1 = (a0) => ({
  $implicit: a0
});
var _c2 = (a0, a1) => ({
  checked: a0,
  class: a1
});
function MultiSelectItem_ng_container_1_ng_template_1_0_ng_template_0_Template(rf, ctx) {
}
function MultiSelectItem_ng_container_1_ng_template_1_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelectItem_ng_container_1_ng_template_1_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelectItem_ng_container_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelectItem_ng_container_1_ng_template_1_0_Template, 1, 0, null, 3);
  }
  if (rf & 2) {
    const klass_r1 = ctx.class;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.itemCheckboxIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c2, ctx_r1.selected, klass_r1));
  }
}
function MultiSelectItem_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelectItem_ng_container_1_ng_template_1_Template, 1, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function MultiSelectItem_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.label ?? "empty");
  }
}
function MultiSelectItem_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c3 = ["item"];
var _c4 = ["group"];
var _c5 = ["loader"];
var _c6 = ["header"];
var _c7 = ["filter"];
var _c8 = ["footer"];
var _c9 = ["emptyfilter"];
var _c10 = ["empty"];
var _c11 = ["selecteditems"];
var _c12 = ["loadingicon"];
var _c13 = ["filtericon"];
var _c14 = ["removetokenicon"];
var _c15 = ["chipicon"];
var _c16 = ["clearicon"];
var _c17 = ["dropdownicon"];
var _c18 = ["itemcheckboxicon"];
var _c19 = ["headercheckboxicon"];
var _c20 = ["overlay"];
var _c21 = ["filterInput"];
var _c22 = ["focusInput"];
var _c23 = ["items"];
var _c24 = ["scroller"];
var _c25 = ["lastHiddenFocusableEl"];
var _c26 = ["firstHiddenFocusableEl"];
var _c27 = ["headerCheckbox"];
var _c28 = [[["p-header"]], [["p-footer"]]];
var _c29 = ["p-header", "p-footer"];
var _c30 = () => ({
  class: "p-multiselect-chip-icon"
});
var _c31 = (a0, a1) => ({
  $implicit: a0,
  removeChip: a1
});
var _c32 = (a0) => ({
  dataP: a0
});
var _c33 = (a0) => ({
  options: a0
});
var _c34 = (a0, a1, a2) => ({
  checked: a0,
  partialSelected: a1,
  class: a2
});
var _c35 = (a0) => ({
  height: a0
});
var _c36 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
var _c37 = () => ({});
function MultiSelect_ng_container_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.label() || "empty");
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵtextInterpolate1(" ", ctx_r1.getSelectedItemsLabel(), " ");
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 27);
    ɵɵlistener("click", function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r5);
      const item_r4 = ɵɵnextContext(4).$implicit;
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.removeOption(item_r4, $event));
    });
    ɵɵtemplate(1, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_ng_container_1_Template, 1, 0, "ng-container", 28);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(8);
    ɵɵclassMap(ctx_r1.cx("chipIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("chipIcon"));
    ɵɵattribute("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.chipIconTemplate || ctx_r1._chipIconTemplate || ctx_r1.removeTokenIconTemplate || ctx_r1._removeTokenIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction0(6, _c30));
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_Template, 2, 7, "span", 26);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(7);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.chipIconTemplate || ctx_r1._chipIconTemplate || ctx_r1.removeTokenIconTemplate || ctx_r1._removeTokenIconTemplate);
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_Template, 2, 1, "ng-container", 20);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(6);
    ɵɵproperty("ngIf", !ctx_r1.$disabled() && !ctx_r1.readonly);
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_Template, 1, 1, "ng-template", null, 5, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 19, 4)(2, "p-chip", 25);
    ɵɵlistener("onRemove", function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_Template_p_chip_onRemove_2_listener($event) {
      const item_r4 = ɵɵrestoreView(_r3).$implicit;
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.removeOption(item_r4, $event));
    });
    ɵɵtemplate(3, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_Template, 3, 0, "ng-container", 20);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r1.cx("chipItem"));
    ɵɵproperty("pBind", ctx_r1.ptm("chipItem"));
    ɵɵadvance(2);
    ɵɵclassMap(ctx_r1.cx("pcChip"));
    ɵɵproperty("pt", ctx_r1.ptm("pcChip"))("unstyled", ctx_r1.unstyled())("label", ctx_r1.getLabelByValue(item_r4))("removable", !ctx_r1.$disabled() && !ctx_r1.readonly)("removeIcon", ctx_r1.chipIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.chipIconTemplate || ctx_r1._chipIconTemplate || ctx_r1.removeTokenIconTemplate || ctx_r1._removeTokenIconTemplate);
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_Template, 4, 11, "div", 24);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngForOf", ctx_r1.chipSelectedItems());
  }
}
function MultiSelect_ng_container_5_ng_container_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.placeholder() || "empty");
  }
}
function MultiSelect_ng_container_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵconditionalCreate(1, MultiSelect_ng_container_5_ng_container_2_Conditional_1_Template, 1, 1)(2, MultiSelect_ng_container_5_ng_container_2_Conditional_2_Template, 1, 1, "div", 23);
    ɵɵtemplate(3, MultiSelect_ng_container_5_ng_container_2_ng_container_3_Template, 2, 1, "ng-container", 20);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.chipSelectedItems() && ctx_r1.chipSelectedItems().length === ctx_r1.maxSelectedLabels ? 1 : 2);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.modelValue() || ctx_r1.modelValue().length === 0);
  }
}
function MultiSelect_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_5_ng_container_1_Template, 2, 1, "ng-container", 20)(2, MultiSelect_ng_container_5_ng_container_2_Template, 4, 2, "ng-container", 20);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.display === "comma");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.display === "chip");
  }
}
function MultiSelect_ng_container_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_container_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.placeholder() || "empty");
  }
}
function MultiSelect_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_6_ng_container_1_Template, 1, 0, "ng-container", 28)(2, MultiSelect_ng_container_6_ng_container_2_Template, 2, 1, "ng-container", 20);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.selectedItemsTemplate || ctx_r1._selectedItemsTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(3, _c31, ctx_r1.selectedOptions, ctx_r1.removeOption.bind(ctx_r1)));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.modelValue() || ctx_r1.modelValue().length === 0);
  }
}
function MultiSelect_ng_container_7__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 31);
    ɵɵlistener("click", function MultiSelect_ng_container_7__svg_svg_1_Template_svg_click_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("clearIcon"));
    ɵɵattribute("aria-hidden", true);
  }
}
function MultiSelect_ng_container_7_span_2_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_container_7_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_container_7_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_container_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 27);
    ɵɵlistener("click", function MultiSelect_ng_container_7_span_2_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear($event));
    });
    ɵɵtemplate(1, MultiSelect_ng_container_7_span_2_1_Template, 1, 0, null, 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("clearIcon"));
    ɵɵattribute("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.clearIconTemplate || ctx_r1._clearIconTemplate);
  }
}
function MultiSelect_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_7__svg_svg_1_Template, 1, 4, "svg", 29)(2, MultiSelect_ng_container_7_span_2_Template, 2, 5, "span", 30);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.clearIconTemplate && !ctx_r1._clearIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.clearIconTemplate || ctx_r1._clearIconTemplate);
  }
}
function MultiSelect_ng_container_9_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_container_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_9_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 32);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.loadingIconTemplate || ctx_r1._loadingIconTemplate);
  }
}
function MultiSelect_ng_container_9_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 19);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("loadingIcon"), "pi-spin " + ctx_r1.loadingIcon));
    ɵɵproperty("pBind", ctx_r1.ptm("loadingIcon"));
    ɵɵattribute("aria-hidden", true);
  }
}
function MultiSelect_ng_container_9_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 19);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("loadingIcon"), "pi pi-spinner pi-spin"));
    ɵɵproperty("pBind", ctx_r1.ptm("loadingIcon"));
    ɵɵattribute("aria-hidden", true);
  }
}
function MultiSelect_ng_container_9_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_9_ng_container_2_span_1_Template, 1, 4, "span", 33)(2, MultiSelect_ng_container_9_ng_container_2_span_2_Template, 1, 4, "span", 33);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.loadingIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.loadingIcon);
  }
}
function MultiSelect_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_9_ng_container_1_Template, 2, 1, "ng-container", 20)(2, MultiSelect_ng_container_9_ng_container_2_Template, 3, 2, "ng-container", 20);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.loadingIconTemplate || ctx_r1._loadingIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.loadingIconTemplate && !ctx_r1._loadingIconTemplate);
  }
}
function MultiSelect_ng_template_10_ng_container_0_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 36);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("dropdownIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("dropdownIcon"))("ngClass", ctx_r1.dropdownIcon);
    ɵɵattribute("aria-hidden", true)("data-p", ctx_r1.dropdownIconDataP);
  }
}
function MultiSelect_ng_template_10_ng_container_0__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 37);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("dropdownIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("dropdownIcon"));
    ɵɵattribute("aria-hidden", true)("data-p", ctx_r1.dropdownIconDataP);
  }
}
function MultiSelect_ng_template_10_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_10_ng_container_0_span_1_Template, 1, 6, "span", 34)(2, MultiSelect_ng_template_10_ng_container_0__svg_svg_2_Template, 1, 5, "svg", 35);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.dropdownIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.dropdownIcon);
  }
}
function MultiSelect_ng_template_10_span_1_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_template_10_span_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_10_span_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_template_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 19);
    ɵɵtemplate(1, MultiSelect_ng_template_10_span_1_1_Template, 1, 0, null, 28);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("dropdownIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("dropdownIcon"));
    ɵɵattribute("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.dropdownIconTemplate || ctx_r1._dropdownIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(6, _c32, ctx_r1.dropdownIconDataP));
  }
}
function MultiSelect_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_10_ng_container_0_Template, 3, 2, "ng-container", 20)(1, MultiSelect_ng_template_10_span_1_Template, 2, 8, "span", 33);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngIf", !ctx_r1.dropdownIconTemplate && !ctx_r1._dropdownIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.dropdownIconTemplate || ctx_r1._dropdownIconTemplate);
  }
}
function MultiSelect_ng_template_14_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_div_4_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_div_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_14_div_4_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 28);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.filterTemplate || ctx_r1._filterTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c33, ctx_r1.filterOptions));
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2__svg_svg_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 45);
  }
  if (rf & 2) {
    const klass_r10 = ɵɵnextContext().class;
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵclassMap(klass_r10);
    ɵɵproperty("pBind", ctx_r1.getHeaderCheckboxPTOptions("pcHeaderCheckbox.icon"));
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2__svg_svg_0_Template, 1, 3, "svg", 44)(1, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_1_Template, 1, 0, null, 28);
  }
  if (rf & 2) {
    const klass_r10 = ctx.class;
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵproperty("ngIf", !ctx_r1.headerCheckboxIconTemplate && !ctx_r1._headerCheckboxIconTemplate && ctx_r1.allSelected());
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerCheckboxIconTemplate || ctx_r1._headerCheckboxIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(3, _c34, ctx_r1.allSelected(), ctx_r1.partialSelected(), klass_r10));
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-checkbox", 43, 10);
    ɵɵlistener("onChange", function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_Template_p_checkbox_onChange_0_listener($event) {
      ɵɵrestoreView(_r9);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onToggleAll($event));
    });
    ɵɵtemplate(2, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_Template, 2, 7, "ng-template", null, 11, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("pt", ctx_r1.getHeaderCheckboxPTOptions("pcHeaderCheckbox"))("ngModel", ctx_r1.allSelected())("ariaLabel", ctx_r1.toggleAllAriaLabel)("binary", true)("variant", ctx_r1.$variant())("disabled", ctx_r1.$disabled())("unstyled", ctx_r1.unstyled());
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 50);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵproperty("pBind", ctx_r1.ptm("filterIcon"));
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_span_5_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_span_5_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_span_5_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 51);
    ɵɵtemplate(1, MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_span_5_1_Template, 1, 0, null, 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵproperty("pBind", ctx_r1.ptm("filterIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.filterIconTemplate || ctx_r1._filterIconTemplate);
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-iconfield", 46)(1, "input", 47, 12);
    ɵɵlistener("input", function MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_Template_input_input_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onFilterInputChange($event));
    })("keydown", function MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_Template_input_keydown_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onFilterKeyDown($event));
    })("click", function MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_Template_input_click_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onInputClick($event));
    })("blur", function MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_Template_input_blur_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onFilterBlur($event));
    });
    ɵɵelementEnd();
    ɵɵelementStart(3, "p-inputicon", 46);
    ɵɵtemplate(4, MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1__svg_svg_4_Template, 1, 1, "svg", 48)(5, MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_span_5_Template, 2, 2, "span", 49);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r1.cx("pcFilterContainer"));
    ɵɵproperty("pt", ctx_r1.ptm("pcFilterContainer"))("unstyled", ctx_r1.unstyled());
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("pcFilter"));
    ɵɵproperty("pt", ctx_r1.ptm("pcFilter"))("variant", ctx_r1.$variant())("value", ctx_r1._filterValue() || "")("unstyled", ctx_r1.unstyled());
    ɵɵattribute("autocomplete", ctx_r1.autocomplete)("aria-owns", ctx_r1.id + "_list")("aria-activedescendant", ctx_r1.focusedOptionId)("disabled", ctx_r1.$disabled() ? "" : void 0)("placeholder", ctx_r1.filterPlaceHolder)("aria-label", ctx_r1.ariaFilterLabel);
    ɵɵadvance(2);
    ɵɵproperty("pt", ctx_r1.ptm("pcFilterIconContainer"))("unstyled", ctx_r1.unstyled());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.filterIconTemplate && !ctx_r1._filterIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.filterIconTemplate || ctx_r1._filterIconTemplate);
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_Template, 4, 7, "p-checkbox", 41)(1, MultiSelect_ng_template_14_div_4_ng_template_3_p_iconfield_1_Template, 6, 20, "p-iconfield", 42);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r1.showToggleAll && !ctx_r1.selectionLimit);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.filter);
  }
}
function MultiSelect_ng_template_14_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵprojection(1);
    ɵɵtemplate(2, MultiSelect_ng_template_14_div_4_ng_container_2_Template, 2, 4, "ng-container", 21)(3, MultiSelect_ng_template_14_div_4_ng_template_3_Template, 2, 2, "ng-template", null, 9, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const builtInFilterElement_r12 = ɵɵreference(4);
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("header"));
    ɵɵproperty("pBind", ctx_r1.ptm("header"));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.filterTemplate || ctx_r1._filterTemplate)("ngIfElse", builtInFilterElement_r12);
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_p_scroller_6_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const items_r14 = ctx.$implicit;
    const scrollerOptions_r15 = ctx.options;
    ɵɵnextContext(2);
    const buildInItems_r16 = ɵɵreference(9);
    ɵɵproperty("ngTemplateOutlet", buildInItems_r16)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c36, items_r14, scrollerOptions_r15));
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_container_4_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_container_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_p_scroller_6_ng_container_4_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const scrollerOptions_r17 = ctx.options;
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.loaderTemplate || ctx_r1._loaderTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c33, scrollerOptions_r17));
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_14_p_scroller_6_ng_container_4_ng_template_1_Template, 1, 4, "ng-template", null, 14, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function MultiSelect_ng_template_14_p_scroller_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-scroller", 52, 13);
    ɵɵlistener("onLazyLoad", function MultiSelect_ng_template_14_p_scroller_6_Template_p_scroller_onLazyLoad_0_listener($event) {
      ɵɵrestoreView(_r13);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onLazyLoad.emit($event));
    });
    ɵɵtemplate(2, MultiSelect_ng_template_14_p_scroller_6_ng_template_2_Template, 1, 5, "ng-template", null, 3, ɵɵtemplateRefExtractor)(4, MultiSelect_ng_template_14_p_scroller_6_ng_container_4_Template, 3, 0, "ng-container", 20);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵstyleMap(ɵɵpureFunction1(9, _c35, ctx_r1.scrollHeight));
    ɵɵproperty("items", ctx_r1.visibleOptions())("itemSize", ctx_r1.virtualScrollItemSize)("autoSize", true)("tabindex", -1)("lazy", ctx_r1.lazy)("options", ctx_r1.virtualScrollOptions);
    ɵɵadvance(4);
    ɵɵproperty("ngIf", ctx_r1.loaderTemplate || ctx_r1._loaderTemplate);
  }
}
function MultiSelect_ng_template_14_ng_container_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_14_ng_container_7_ng_container_1_Template, 1, 0, "ng-container", 28);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const buildInItems_r16 = ɵɵreference(9);
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", buildInItems_r16)("ngTemplateOutletContext", ɵɵpureFunction2(3, _c36, ctx_r1.visibleOptions(), ɵɵpureFunction0(2, _c37)));
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r18 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.getOptionGroupLabel(option_r18.optionGroup));
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 58);
  }
  if (rf & 2) {
    const option_r18 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.groupTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c1, option_r18.optionGroup));
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "li", 56);
    ɵɵtemplate(2, MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_span_2_Template, 2, 1, "span", 20)(3, MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_ng_container_3_Template, 1, 4, "ng-container", 57);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r18 = ɵɵnextContext();
    const option_r18 = ctx_r18.$implicit;
    const i_r20 = ctx_r18.index;
    const scrollerOptions_r21 = ɵɵnextContext().options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("optionGroup"));
    ɵɵproperty("pBind", ctx_r1.ptm("optionGroup"))("ngStyle", ɵɵpureFunction1(7, _c35, scrollerOptions_r21.itemSize + "px"));
    ɵɵattribute("id", ctx_r1.id + "_" + ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.groupTemplate && option_r18.optionGroup);
    ɵɵadvance();
    ɵɵproperty("ngIf", option_r18.optionGroup && ctx_r1.groupTemplate);
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "li", 59);
    ɵɵlistener("onClick", function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_1_Template_li_onClick_1_listener($event) {
      ɵɵrestoreView(_r22);
      const i_r20 = ɵɵnextContext().index;
      const scrollerOptions_r21 = ɵɵnextContext().options;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onOptionSelect($event, false, ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21)));
    })("onMouseEnter", function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_1_Template_li_onMouseEnter_1_listener($event) {
      ɵɵrestoreView(_r22);
      const i_r20 = ɵɵnextContext().index;
      const scrollerOptions_r21 = ɵɵnextContext().options;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onOptionMouseEnter($event, ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21)));
    });
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r18 = ɵɵnextContext();
    const option_r18 = ctx_r18.$implicit;
    const i_r20 = ctx_r18.index;
    const scrollerOptions_r21 = ɵɵnextContext().options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r1.getPTOptions(option_r18, ctx_r1.getItemOptions, i_r20, "option"))("id", ctx_r1.id + "_" + ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21))("option", option_r18)("selected", ctx_r1.isSelected(option_r18))("label", ctx_r1.getOptionLabel(option_r18))("disabled", ctx_r1.isOptionDisabled(option_r18))("template", ctx_r1.itemTemplate || ctx_r1._itemTemplate)("itemCheckboxIconTemplate", ctx_r1.itemCheckboxIconTemplate || ctx_r1._itemCheckboxIconTemplate)("itemSize", scrollerOptions_r21.itemSize)("focused", ctx_r1.focusedOptionIndex() === ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21))("ariaPosInset", ctx_r1.getAriaPosInset(ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21)))("ariaSetSize", ctx_r1.ariaSetSize)("variant", ctx_r1.$variant())("highlightOnSelect", ctx_r1.highlightOnSelect)("pt", ctx_r1.pt)("unstyled", ctx_r1.unstyled());
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_Template, 4, 9, "ng-container", 20)(1, MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_1_Template, 2, 16, "ng-container", 20);
  }
  if (rf & 2) {
    const option_r18 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r1.isOptionGroup(option_r18));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.isOptionGroup(option_r18));
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵtextInterpolate1(" ", ctx_r1.emptyFilterMessageLabel, " ");
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 32);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.emptyFilterTemplate || ctx_r1._emptyFilterTemplate || ctx_r1.emptyTemplate || ctx_r1._emptyFilterTemplate);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 56);
    ɵɵconditionalCreate(1, MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_1_Template, 1, 1)(2, MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_2_Template, 1, 1, "ng-container");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r21 = ɵɵnextContext().options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("emptyMessage"));
    ɵɵproperty("pBind", ctx_r1.ptm("emptyMessage"))("ngStyle", ɵɵpureFunction1(5, _c35, scrollerOptions_r21.itemSize + "px"));
    ɵɵadvance();
    ɵɵconditional(!ctx_r1.emptyFilterTemplate && !ctx_r1._emptyFilterTemplate && !ctx_r1.emptyTemplate && !ctx_r1._emptyTemplate ? 1 : 2);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵtextInterpolate1(" ", ctx_r1.emptyMessageLabel, " ");
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 32);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.emptyTemplate || ctx_r1._emptyTemplate);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 56);
    ɵɵconditionalCreate(1, MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_1_Template, 1, 1)(2, MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_2_Template, 1, 1, "ng-container");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r21 = ɵɵnextContext().options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("emptyMessage"));
    ɵɵproperty("pBind", ctx_r1.ptm("emptyMessage"))("ngStyle", ɵɵpureFunction1(5, _c35, scrollerOptions_r21.itemSize + "px"));
    ɵɵadvance();
    ɵɵconditional(!ctx_r1.emptyTemplate && !ctx_r1._emptyTemplate ? 1 : 2);
  }
}
function MultiSelect_ng_template_14_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 53, 15);
    ɵɵtemplate(2, MultiSelect_ng_template_14_ng_template_8_ng_template_2_Template, 2, 2, "ng-template", 54)(3, MultiSelect_ng_template_14_ng_template_8_li_3_Template, 3, 7, "li", 55)(4, MultiSelect_ng_template_14_ng_template_8_li_4_Template, 3, 7, "li", 55);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const items_r23 = ctx.$implicit;
    const scrollerOptions_r21 = ctx.options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵstyleMap(scrollerOptions_r21.contentStyle);
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("list"), scrollerOptions_r21.contentStyleClass));
    ɵɵproperty("pBind", ctx_r1.ptm("list"));
    ɵɵattribute("aria-label", ctx_r1.listLabel);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", items_r23);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.hasFilter() && ctx_r1.isEmpty());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.hasFilter() && ctx_r1.isEmpty());
  }
}
function MultiSelect_ng_template_14_div_10_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_div_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵprojection(1, 1);
    ɵɵtemplate(2, MultiSelect_ng_template_14_div_10_ng_container_2_Template, 1, 0, "ng-container", 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.footerTemplate || ctx_r1._footerTemplate);
  }
}
function MultiSelect_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 38)(1, "span", 39, 6);
    ɵɵlistener("focus", function MultiSelect_ng_template_14_Template_span_focus_1_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFirstHiddenFocus($event));
    });
    ɵɵelementEnd();
    ɵɵtemplate(3, MultiSelect_ng_template_14_ng_container_3_Template, 1, 0, "ng-container", 32)(4, MultiSelect_ng_template_14_div_4_Template, 5, 5, "div", 33);
    ɵɵelementStart(5, "div", 19);
    ɵɵtemplate(6, MultiSelect_ng_template_14_p_scroller_6_Template, 5, 11, "p-scroller", 40)(7, MultiSelect_ng_template_14_ng_container_7_Template, 2, 6, "ng-container", 20)(8, MultiSelect_ng_template_14_ng_template_8_Template, 5, 9, "ng-template", null, 7, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵtemplate(10, MultiSelect_ng_template_14_div_10_Template, 3, 1, "div", 20);
    ɵɵelementStart(11, "span", 39, 8);
    ɵɵlistener("focus", function MultiSelect_ng_template_14_Template_span_focus_11_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onLastHiddenFocus($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("overlay"), ctx_r1.panelStyleClass));
    ɵɵproperty("pBind", ctx_r1.ptm("overlay"))("ngStyle", ctx_r1.panelStyle);
    ɵɵattribute("data-p", ctx_r1.overlayDataP)("id", ctx_r1.id + "_list");
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r1.ptm("firstHiddenFocusableEl"));
    ɵɵattribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate || ctx_r1._headerTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showHeader);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("listContainer"));
    ɵɵstyleProp("max-height", ctx_r1.virtualScroll ? "auto" : ctx_r1.scrollHeight || "auto");
    ɵɵproperty("pBind", ctx_r1.ptm("listContainer"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.virtualScroll);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.virtualScroll);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r1.footerFacet || ctx_r1.footerTemplate || ctx_r1._footerTemplate);
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r1.ptm("lastHiddenFocusableEl"));
    ɵɵattribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
  }
}
var style2 = (
  /*css*/
  `
    ${style}

    /* For PrimeNG */
   .p-multiselect.ng-invalid.ng-dirty {
        border-color: dt('multiselect.invalid.border.color');
    }
    p-multiSelect.ng-invalid.ng-dirty .p-multiselect-label.p-placeholder,
    p-multi-select.ng-invalid.ng-dirty .p-multiselect-label.p-placeholder,
    p-multiselect.ng-invalid.ng-dirty .p-multiselect-label.p-placeholder {
        color: dt('multiselect.invalid.placeholder.color');
    }
`
);
var inlineStyles = {
  root: ({
    instance
  }) => ({
    position: instance.$appendTo() === "self" ? "relative" : void 0
  })
};
var classes = {
  root: ({
    instance
  }) => ["p-multiselect p-component p-inputwrapper", {
    "p-multiselect p-component p-inputwrapper": true,
    "p-multiselect-display-chip": instance.display === "chip",
    "p-disabled": instance.$disabled(),
    "p-invalid": instance.invalid(),
    "p-variant-filled": instance.$variant() === "filled",
    "p-focus": instance.focused,
    "p-inputwrapper-filled": instance.$filled(),
    "p-inputwrapper-focus": instance.focused || instance.overlayVisible,
    "p-multiselect-open": instance.overlayVisible,
    "p-multiselect-fluid": instance.hasFluid,
    "p-multiselect-sm p-inputfield-sm": instance.size() === "small",
    "p-multiselect-lg p-inputfield-lg": instance.size() === "large"
  }],
  labelContainer: "p-multiselect-label-container",
  label: ({
    instance
  }) => ({
    "p-multiselect-label": true,
    "p-placeholder": instance.label() === instance.placeholder(),
    "p-multiselect-label-empty": !instance.placeholder() && !instance.defaultLabel && (!instance.modelValue() || instance.modelValue().length === 0)
  }),
  chipItem: "p-multiselect-chip-item",
  pcChip: "p-multiselect-chip",
  chipIcon: "p-multiselect-chip-icon",
  dropdown: "p-multiselect-dropdown",
  loadingIcon: "p-multiselect-loading-icon",
  dropdownIcon: "p-multiselect-dropdown-icon",
  overlay: "p-multiselect-overlay p-component-overlay p-component",
  header: "p-multiselect-header",
  pcFilterContainer: "p-multiselect-filter-container",
  pcFilter: "p-multiselect-filter",
  listContainer: "p-multiselect-list-container",
  list: "p-multiselect-list",
  optionGroup: "p-multiselect-option-group",
  option: ({
    instance
  }) => ({
    "p-multiselect-option": true,
    "p-multiselect-option-selected": instance.selected && instance.highlightOnSelect,
    "p-disabled": instance.disabled,
    "p-focus": instance.focused
  }),
  emptyMessage: "p-multiselect-empty-message",
  clearIcon: "p-multiselect-clear-icon"
};
var MultiSelectStyle = class _MultiSelectStyle extends BaseStyle {
  name = "multiselect";
  style = style2;
  classes = classes;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMultiSelectStyle_BaseFactory;
    return function MultiSelectStyle_Factory(__ngFactoryType__) {
      return (ɵMultiSelectStyle_BaseFactory || (ɵMultiSelectStyle_BaseFactory = ɵɵgetInheritedFactory(_MultiSelectStyle)))(__ngFactoryType__ || _MultiSelectStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _MultiSelectStyle,
    factory: _MultiSelectStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectStyle, [{
    type: Injectable
  }], null, null);
})();
var MultiSelectClasses;
(function(MultiSelectClasses2) {
  MultiSelectClasses2["root"] = "p-multiselect";
  MultiSelectClasses2["labelContainer"] = "p-multiselect-label-container";
  MultiSelectClasses2["label"] = "p-multiselect-label";
  MultiSelectClasses2["chipItem"] = "p-multiselect-chip-item";
  MultiSelectClasses2["pcChip"] = "p-multiselect-chip";
  MultiSelectClasses2["chipIcon"] = "p-multiselect-chip-icon";
  MultiSelectClasses2["dropdown"] = "p-multiselect-dropdown";
  MultiSelectClasses2["loadingIcon"] = "p-multiselect-loading-icon";
  MultiSelectClasses2["dropdownIcon"] = "p-multiselect-dropdown-icon";
  MultiSelectClasses2["overlay"] = "p-multiselect-overlay";
  MultiSelectClasses2["header"] = "p-multiselect-header";
  MultiSelectClasses2["pcFilterContainer"] = "p-multiselect-filter-container";
  MultiSelectClasses2["pcFilter"] = "p-multiselect-filter";
  MultiSelectClasses2["listContainer"] = "p-multiselect-list-container";
  MultiSelectClasses2["list"] = "p-multiselect-list";
  MultiSelectClasses2["optionGroup"] = "p-multiselect-option-group";
  MultiSelectClasses2["option"] = "p-multiselect-option";
  MultiSelectClasses2["emptyMessage"] = "p-multiselect-empty-message";
  MultiSelectClasses2["clearIcon"] = "p-autocomplete-clear-icon";
})(MultiSelectClasses || (MultiSelectClasses = {}));
var MULTISELECT_INSTANCE = new InjectionToken("MULTISELECT_INSTANCE");
var MULTISELECT_ITEM_INSTANCE = new InjectionToken("MULTISELECT_ITEM_INSTANCE");
var MULTISELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelect),
  multi: true
};
var MultiSelectItem = class _MultiSelectItem extends BaseComponent {
  $pcMultiSelectItem = inject(MULTISELECT_ITEM_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  hostName = "MultiSelect";
  getPTOptions(key) {
    return this.ptm(key, {
      context: {
        selected: this.selected,
        focused: this.focused,
        disabled: this.disabled
      }
    });
  }
  option;
  selected;
  label;
  disabled;
  itemSize;
  focused;
  ariaPosInset;
  ariaSetSize;
  variant;
  template;
  checkIconTemplate;
  itemCheckboxIconTemplate;
  highlightOnSelect;
  onClick = new EventEmitter();
  onMouseEnter = new EventEmitter();
  _componentStyle = inject(MultiSelectStyle);
  onOptionClick(event) {
    this.onClick.emit({
      originalEvent: event,
      option: this.option,
      selected: this.selected
    });
    event.stopPropagation();
    event.preventDefault();
  }
  onOptionMouseEnter(event) {
    this.onMouseEnter.emit({
      originalEvent: event,
      option: this.option,
      selected: this.selected
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMultiSelectItem_BaseFactory;
    return function MultiSelectItem_Factory(__ngFactoryType__) {
      return (ɵMultiSelectItem_BaseFactory || (ɵMultiSelectItem_BaseFactory = ɵɵgetInheritedFactory(_MultiSelectItem)))(__ngFactoryType__ || _MultiSelectItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _MultiSelectItem,
    selectors: [["li", "pMultiSelectItem", ""]],
    hostAttrs: ["role", "option"],
    hostVars: 13,
    hostBindings: function MultiSelectItem_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function MultiSelectItem_click_HostBindingHandler($event) {
          return ctx.onOptionClick($event);
        })("mouseenter", function MultiSelectItem_mouseenter_HostBindingHandler($event) {
          return ctx.onOptionMouseEnter($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("aria-label", ctx.label)("aria-setsize", ctx.ariaSetSize)("aria-posinset", ctx.ariaPosInset)("aria-selected", ctx.selected)("data-p-selected", ctx.selected)("data-p-focused", ctx.focused)("data-p-highlight", ctx.selected)("data-p-disabled", ctx.disabled)("aria-checked", ctx.selected);
        ɵɵclassMap(ctx.cx("option"));
        ɵɵstyleProp("height", ctx.itemSize, "px");
      }
    },
    inputs: {
      option: "option",
      selected: [2, "selected", "selected", booleanAttribute],
      label: "label",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      itemSize: [2, "itemSize", "itemSize", numberAttribute],
      focused: [2, "focused", "focused", booleanAttribute],
      ariaPosInset: "ariaPosInset",
      ariaSetSize: "ariaSetSize",
      variant: "variant",
      template: "template",
      checkIconTemplate: "checkIconTemplate",
      itemCheckboxIconTemplate: "itemCheckboxIconTemplate",
      highlightOnSelect: [2, "highlightOnSelect", "highlightOnSelect", booleanAttribute]
    },
    outputs: {
      onClick: "onClick",
      onMouseEnter: "onMouseEnter"
    },
    features: [ɵɵProvidersFeature([MultiSelectStyle]), ɵɵInheritDefinitionFeature],
    attrs: _c0,
    decls: 4,
    vars: 13,
    consts: [["icon", ""], [3, "ngModel", "binary", "tabindex", "variant", "ariaLabel", "pt", "unstyled"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function MultiSelectItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "p-checkbox", 1);
        ɵɵtemplate(1, MultiSelectItem_ng_container_1_Template, 3, 0, "ng-container", 2);
        ɵɵelementEnd();
        ɵɵtemplate(2, MultiSelectItem_span_2_Template, 2, 1, "span", 2)(3, MultiSelectItem_ng_container_3_Template, 1, 0, "ng-container", 3);
      }
      if (rf & 2) {
        ɵɵproperty("ngModel", ctx.selected)("binary", true)("tabindex", -1)("variant", ctx.variant)("ariaLabel", ctx.label)("pt", ctx.getPTOptions("pcOptionCheckbox"))("unstyled", ctx.unstyled());
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.itemCheckboxIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.template);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.template)("ngTemplateOutletContext", ɵɵpureFunction1(11, _c1, ctx.option));
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, Checkbox, FormsModule, NgControlStatus, NgModel, SharedModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectItem, [{
    type: Component,
    args: [{
      selector: "li[pMultiSelectItem]",
      standalone: true,
      imports: [CommonModule, Checkbox, FormsModule, SharedModule],
      template: `
        <p-checkbox [ngModel]="selected" [binary]="true" [tabindex]="-1" [variant]="variant" [ariaLabel]="label" [pt]="getPTOptions('pcOptionCheckbox')" [unstyled]="unstyled()">
            <ng-container *ngIf="itemCheckboxIconTemplate">
                <ng-template #icon let-klass="class">
                    <ng-template *ngTemplateOutlet="itemCheckboxIconTemplate; context: { checked: selected, class: klass }"></ng-template>
                </ng-template>
            </ng-container>
        </p-checkbox>
        <span *ngIf="!template">{{ label ?? 'empty' }}</span>
        <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
    `,
      encapsulation: ViewEncapsulation.None,
      providers: [MultiSelectStyle],
      host: {
        "[style.height.px]": "itemSize",
        "[attr.aria-label]": "label",
        role: "option",
        "[attr.aria-setsize]": "ariaSetSize",
        "[attr.aria-posinset]": "ariaPosInset",
        "[attr.aria-selected]": "selected",
        "[attr.data-p-selected]": "selected",
        "[attr.data-p-focused]": "focused",
        "[attr.data-p-highlight]": "selected",
        "[attr.data-p-disabled]": "disabled",
        "[attr.aria-checked]": "selected",
        "(click)": "onOptionClick($event)",
        "(mouseenter)": "onOptionMouseEnter($event)",
        "[class]": "cx('option')"
      }
    }]
  }], null, {
    option: [{
      type: Input
    }],
    selected: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    label: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    itemSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    focused: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ariaPosInset: [{
      type: Input
    }],
    ariaSetSize: [{
      type: Input
    }],
    variant: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    checkIconTemplate: [{
      type: Input
    }],
    itemCheckboxIconTemplate: [{
      type: Input
    }],
    highlightOnSelect: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onClick: [{
      type: Output
    }],
    onMouseEnter: [{
      type: Output
    }]
  });
})();
var MultiSelect = class _MultiSelect extends BaseEditableHolder {
  zone;
  filterService;
  overlayService;
  /**
   * Unique identifier of the component
   * @group Props
   */
  id;
  /**
   * Defines a string that labels the input for accessibility.
   * @group Props
   */
  ariaLabel;
  /**
   * Style class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Inline style of the overlay panel.
   * @group Props
   */
  panelStyle;
  /**
   * Style class of the overlay panel element.
   * @group Props
   */
  panelStyleClass;
  /**
   * Identifier of the focus input to match a label defined for the component.
   * @group Props
   */
  inputId;
  /**
   * When present, it specifies that the component cannot be edited.
   * @group Props
   */
  readonly;
  /**
   * Whether to display options as grouped when nested options are provided.
   * @group Props
   */
  group;
  /**
   * When specified, displays an input field to filter the items on keyup.
   * @group Props
   */
  filter = true;
  /**
   * Defines placeholder of the filter input.
   * @group Props
   */
  filterPlaceHolder;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * Specifies the visibility of the options panel.
   * @group Props
   */
  overlayVisible = false;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * A property to uniquely identify a value in options.
   * @group Props
   */
  dataKey;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Whether to show labels of selected item labels or use default label.
   * @group Props
   * @defaultValue true
   */
  set displaySelectedLabel(val) {
    this._displaySelectedLabel = val;
  }
  get displaySelectedLabel() {
    return this._displaySelectedLabel;
  }
  /**
   * Decides how many selected item labels to show at most.
   * @group Props
   * @defaultValue 3
   */
  set maxSelectedLabels(val) {
    this._maxSelectedLabels = val || 0;
  }
  get maxSelectedLabels() {
    return this._maxSelectedLabels;
  }
  /**
   * Maximum number of selectable items.
   * @group Props
   */
  selectionLimit;
  /**
   * Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.
   * @group Props
   */
  selectedItemsLabel;
  /**
   * Whether to show the checkbox at header to toggle all items at once.
   * @group Props
   */
  showToggleAll = true;
  /**
   * Text to display when filtering does not return any results.
   * @group Props
   */
  emptyFilterMessage = "";
  /**
   * Text to display when there is no data. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyMessage = "";
  /**
   * Clears the filter value when hiding the dropdown.
   * @group Props
   */
  resetFilterOnHide = false;
  /**
   * Icon class of the dropdown icon.
   * @group Props
   */
  dropdownIcon;
  /**
   * Icon class of the chip icon.
   * @group Props
   */
  chipIcon;
  /**
   * Name of the label field of an option.
   * @group Props
   */
  optionLabel;
  /**
   * Name of the value field of an option.
   * @group Props
   */
  optionValue;
  /**
   * Name of the disabled field of an option.
   * @group Props
   */
  optionDisabled;
  /**
   * Name of the label field of an option group.
   * @group Props
   */
  optionGroupLabel = "label";
  /**
   * Name of the options field of an option group.
   * @group Props
   */
  optionGroupChildren = "items";
  /**
   * Whether to show the header.
   * @group Props
   */
  showHeader = true;
  /**
   * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
   * @group Props
   */
  filterBy;
  /**
   * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  scrollHeight = "200px";
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  lazy = false;
  /**
   * Whether the data should be loaded on demand during scroll.
   * @group Props
   */
  virtualScroll;
  /**
   * Whether the multiselect is in loading state.
   * @group Props
   */
  loading = false;
  /**
   * Height of an item in the list for VirtualScrolling.
   * @group Props
   */
  virtualScrollItemSize;
  /**
   * Icon to display in loading state.
   * @group Props
   */
  loadingIcon;
  /**
   * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  virtualScrollOptions;
  /**
   * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
   * @group Props
   */
  overlayOptions;
  /**
   * Defines a string that labels the filter input.
   * @group Props
   */
  ariaFilterLabel;
  /**
   * Defines how the items are filtered.
   * @group Props
   */
  filterMatchMode = "contains";
  /**
   * Advisory information to display in a tooltip on hover.
   * @group Props
   */
  tooltip = "";
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition = "right";
  /**
   * Type of CSS position.
   * @group Props
   */
  tooltipPositionStyle = "absolute";
  /**
   * Style class of the tooltip.
   * @group Props
   */
  tooltipStyleClass;
  /**
   * Applies focus to the filter element when the overlay is shown.
   * @group Props
   */
  autofocusFilter = false;
  /**
   * Defines how the selected items are displayed.
   * @group Props
   */
  display = "comma";
  /**
   * Defines the autocomplete is active.
   * @group Props
   */
  autocomplete = "off";
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear = false;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * Label to display when there are no selections.
   * @group Props
   */
  set placeholder(val) {
    this._placeholder.set(val);
  }
  get placeholder() {
    return this._placeholder.asReadonly();
  }
  /**
   * An array of objects to display as the available options.
   * @group Props
   */
  get options() {
    return this._options();
  }
  set options(val) {
    if (!y(this._options(), val)) {
      this._options.set(val || []);
    }
  }
  /**
   * When specified, filter displays with this value.
   * @group Props
   */
  get filterValue() {
    return this._filterValue();
  }
  set filterValue(val) {
    this._filterValue.set(val);
  }
  /**
   * Whether all data is selected.
   * @group Props
   */
  get selectAll() {
    return this._selectAll;
  }
  set selectAll(value) {
    this._selectAll = value;
  }
  /**
   * Indicates whether to focus on options when hovering over them, defaults to optionLabel.
   * @group Props
   */
  focusOnHover = true;
  /**
   * Fields used when filtering the options, defaults to optionLabel.
   * @group Props
   */
  filterFields;
  /**
   * Determines if the option will be selected on focus.
   * @group Props
   */
  selectOnFocus = false;
  /**
   * Whether to focus on the first visible or selected element when the overlay panel is shown.
   * @group Props
   */
  autoOptionFocus = false;
  /**
   * Whether the selected option will be add highlight class.
   * @group Props
   */
  highlightOnSelect = true;
  /**
   * Specifies the size of the component.
   * @defaultValue undefined
   * @group Props
   */
  size = input(...ngDevMode ? [void 0, {
    debugName: "size"
  }] : []);
  /**
   * Specifies the input variant of the component.
   * @defaultValue undefined
   * @group Props
   */
  variant = input(...ngDevMode ? [void 0, {
    debugName: "variant"
  }] : []);
  /**
   * Spans 100% width of the container when enabled.
   * @defaultValue undefined
   * @group Props
   */
  fluid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "fluid"
  } : {}), {
    transform: booleanAttribute
  }));
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
  /**
   * Callback to invoke when value changes.
   * @param {MultiSelectChangeEvent} event - Custom change event.
   * @group Emits
   */
  onChange = new EventEmitter();
  /**
   * Callback to invoke when data is filtered.
   * @param {MultiSelectFilterEvent} event - Custom filter event.
   * @group Emits
   */
  onFilter = new EventEmitter();
  /**
   * Callback to invoke when multiselect receives focus.
   * @param {MultiSelectFocusEvent} event - Custom focus event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when multiselect loses focus.
   * @param {MultiSelectBlurEvent} event - Custom blur event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Callback to invoke when component is clicked.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onClick = new EventEmitter();
  /**
   * Callback to invoke when input field is cleared.
   * @group Emits
   */
  onClear = new EventEmitter();
  /**
   * Callback to invoke when overlay panel becomes visible.
   * @param {AnimationEvent} event - Animation event.
   * @group Emits
   */
  onPanelShow = new EventEmitter();
  /**
   * Callback to invoke when overlay panel becomes hidden.
   * @param {AnimationEvent} event - Animation event.
   * @group Emits
   */
  onPanelHide = new EventEmitter();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {MultiSelectLazyLoadEvent} event - Lazy load event.
   * @group Emits
   */
  onLazyLoad = new EventEmitter();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {MultiSelectRemoveEvent} event - Remove event.
   * @group Emits
   */
  onRemove = new EventEmitter();
  /**
   * Callback to invoke when all data is selected.
   * @param {MultiSelectSelectAllChangeEvent} event - Custom select event.
   * @group Emits
   */
  onSelectAllChange = new EventEmitter();
  overlayViewChild;
  filterInputChild;
  focusInputViewChild;
  itemsViewChild;
  scroller;
  lastHiddenFocusableElementOnOverlay;
  firstHiddenFocusableElementOnOverlay;
  headerCheckboxViewChild;
  footerFacet;
  headerFacet;
  _componentStyle = inject(MultiSelectStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  searchValue;
  searchTimeout;
  _selectAll = null;
  _placeholder = signal(void 0, ...ngDevMode ? [{
    debugName: "_placeholder"
  }] : []);
  _disableTooltip = false;
  value;
  _filteredOptions;
  focus;
  filtered;
  /**
   * Custom item template.
   * @group Templates
   */
  itemTemplate;
  /**
   * Custom group template.
   * @group Templates
   */
  groupTemplate;
  /**
   * Custom loader template.
   * @group Templates
   */
  loaderTemplate;
  /**
   * Custom header template.
   * @group Templates
   */
  headerTemplate;
  /**
   * Custom filter template.
   * @group Templates
   */
  filterTemplate;
  /**
   * Custom footer template.
   * @group Templates
   */
  footerTemplate;
  /**
   * Custom empty filter template.
   * @group Templates
   */
  emptyFilterTemplate;
  /**
   * Custom empty template.
   * @group Templates
   */
  emptyTemplate;
  /**
   * Custom selected items template.
   * @group Templates
   */
  selectedItemsTemplate;
  /**
   * Custom loading icon template.
   * @group Templates
   */
  loadingIconTemplate;
  /**
   * Custom filter icon template.
   * @group Templates
   */
  filterIconTemplate;
  /**
   * Custom remove token icon template.
   * @group Templates
   */
  removeTokenIconTemplate;
  /**
   * Custom chip icon template.
   * @group Templates
   */
  chipIconTemplate;
  /**
   * Custom clear icon template.
   * @group Templates
   */
  clearIconTemplate;
  /**
   * Custom dropdown icon template.
   * @group Templates
   */
  dropdownIconTemplate;
  /**
   * Custom item checkbox icon template.
   * @group Templates
   */
  itemCheckboxIconTemplate;
  /**
   * Custom header checkbox icon template.
   * @group Templates
   */
  headerCheckboxIconTemplate;
  templates;
  _itemTemplate;
  _groupTemplate;
  _loaderTemplate;
  _headerTemplate;
  _filterTemplate;
  _footerTemplate;
  _emptyFilterTemplate;
  _emptyTemplate;
  _selectedItemsTemplate;
  _loadingIconTemplate;
  _filterIconTemplate;
  _removeTokenIconTemplate;
  _chipIconTemplate;
  _clearIconTemplate;
  _dropdownIconTemplate;
  _itemCheckboxIconTemplate;
  _headerCheckboxIconTemplate;
  $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant(), ...ngDevMode ? [{
    debugName: "$variant"
  }] : []);
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  $pcMultiSelect = inject(MULTISELECT_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  pcFluid = inject(Fluid, {
    optional: true,
    host: true,
    skipSelf: true
  });
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  onAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "item":
          this._itemTemplate = item.template;
          break;
        case "group":
          this._groupTemplate = item.template;
          break;
        case "selectedItems":
        case "selecteditems":
          this._selectedItemsTemplate = item.template;
          break;
        case "header":
          this._headerTemplate = item.template;
          break;
        case "filter":
          this._filterTemplate = item.template;
          break;
        case "emptyfilter":
          this._emptyFilterTemplate = item.template;
          break;
        case "empty":
          this._emptyTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        case "loader":
          this._loaderTemplate = item.template;
          break;
        case "headercheckboxicon":
          this._headerCheckboxIconTemplate = item.template;
          break;
        case "loadingicon":
          this._loadingIconTemplate = item.template;
          break;
        case "filtericon":
          this._filterIconTemplate = item.template;
          break;
        case "removetokenicon":
          this._removeTokenIconTemplate = item.template;
          break;
        case "clearicon":
          this._clearIconTemplate = item.template;
          break;
        case "dropdownicon":
          this._dropdownIconTemplate = item.template;
          break;
        case "itemcheckboxicon":
          this._itemCheckboxIconTemplate = item.template;
          break;
        case "chipicon":
          this._chipIconTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  headerCheckboxFocus;
  filterOptions;
  preventModelTouched;
  focused = false;
  itemsWrapper;
  _displaySelectedLabel = true;
  _maxSelectedLabels = 3;
  modelValue = signal(null, ...ngDevMode ? [{
    debugName: "modelValue"
  }] : []);
  _filterValue = signal(null, ...ngDevMode ? [{
    debugName: "_filterValue"
  }] : []);
  _options = signal([], ...ngDevMode ? [{
    debugName: "_options"
  }] : []);
  startRangeIndex = signal(-1, ...ngDevMode ? [{
    debugName: "startRangeIndex"
  }] : []);
  focusedOptionIndex = signal(-1, ...ngDevMode ? [{
    debugName: "focusedOptionIndex"
  }] : []);
  selectedOptions;
  clickInProgress = false;
  get emptyMessageLabel() {
    return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
  }
  get emptyFilterMessageLabel() {
    return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
  }
  get isVisibleClearIcon() {
    return this.modelValue() != null && this.modelValue() !== "" && s(this.modelValue()) && this.showClear && !this.$disabled() && !this.readonly && this.$filled();
  }
  get toggleAllAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria[this.allSelected() ? "selectAll" : "unselectAll"] : void 0;
  }
  get listLabel() {
    return this.config.getTranslation(TranslationKeys.ARIA)["listLabel"];
  }
  getAllVisibleAndNonVisibleOptions() {
    return this.group ? this.flatOptions(this.options) : this.options || [];
  }
  visibleOptions = computed(() => {
    const options = this.getAllVisibleAndNonVisibleOptions();
    const isArrayOfObjects = C(options) && ObjectUtils.isObject(options[0]);
    if (this._filterValue()) {
      let filteredOptions;
      if (isArrayOfObjects) {
        filteredOptions = this.filterService.filter(options, this.searchFields(), this._filterValue(), this.filterMatchMode, this.filterLocale);
      } else {
        filteredOptions = options.filter((option) => option.toString().toLocaleLowerCase().includes(this._filterValue().toLocaleLowerCase()));
      }
      if (this.group) {
        const optionGroups = this.options || [];
        const filtered = [];
        optionGroups.forEach((group) => {
          const groupChildren = this.getOptionGroupChildren(group);
          const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));
          if (filteredItems.length > 0) filtered.push(__spreadProps(__spreadValues({}, group), {
            [typeof this.optionGroupChildren === "string" ? this.optionGroupChildren : "items"]: [...filteredItems]
          }));
        });
        return this.flatOptions(filtered);
      }
      return filteredOptions;
    }
    return options;
  }, ...ngDevMode ? [{
    debugName: "visibleOptions"
  }] : []);
  label = computed(() => {
    let label;
    const modelValue = this.modelValue();
    if (modelValue && modelValue?.length && this.displaySelectedLabel) {
      if (s(this.maxSelectedLabels) && modelValue?.length > (this.maxSelectedLabels || 0)) {
        return this.getSelectedItemsLabel();
      } else {
        label = "";
        for (let i = 0; i < modelValue.length; i++) {
          if (i !== 0) {
            label += ", ";
          }
          label += this.getLabelByValue(modelValue[i]);
        }
      }
    } else {
      label = this.placeholder() || "";
    }
    return label;
  }, ...ngDevMode ? [{
    debugName: "label"
  }] : []);
  chipSelectedItems = computed(() => {
    return s(this.maxSelectedLabels) && this.modelValue() && this.modelValue()?.length > (this.maxSelectedLabels || 0) ? this.modelValue()?.slice(0, this.maxSelectedLabels) : this.modelValue();
  }, ...ngDevMode ? [{
    debugName: "chipSelectedItems"
  }] : []);
  constructor(zone, filterService, overlayService) {
    super();
    this.zone = zone;
    this.filterService = filterService;
    this.overlayService = overlayService;
    effect(() => {
      const modelValue = this.modelValue();
      const allVisibleAndNonVisibleOptions = this.getAllVisibleAndNonVisibleOptions();
      if (allVisibleAndNonVisibleOptions && s(allVisibleAndNonVisibleOptions)) {
        if (this.optionValue && this.optionLabel && modelValue) {
          this.selectedOptions = allVisibleAndNonVisibleOptions.filter((option) => modelValue.includes(option[this.optionLabel]) || modelValue.includes(option[this.optionValue]));
        } else {
          this.selectedOptions = modelValue;
        }
        this.cd.markForCheck();
      }
    });
  }
  onInit() {
    this.id = this.id || s2("pn_id_");
    this.autoUpdateModel();
    if (this.filterBy) {
      this.filterOptions = {
        filter: (value) => this.onFilterInputChange(value),
        reset: () => this.resetFilter()
      };
    }
  }
  maxSelectionLimitReached() {
    return this.selectionLimit && this.modelValue() && this.modelValue().length === this.selectionLimit;
  }
  onAfterViewInit() {
    if (this.overlayVisible) {
      this.show();
    }
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
    if (this.filtered) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.overlayViewChild?.alignOverlay();
        }, 1);
      });
      this.filtered = false;
    }
  }
  flatOptions(options) {
    return (options || []).reduce((result, option, index) => {
      result.push({
        optionGroup: option,
        group: true,
        index
      });
      const optionGroupChildren = this.getOptionGroupChildren(option);
      optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
      return result;
    }, []);
  }
  autoUpdateModel() {
    if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
      this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex());
      const value = this.getOptionValue(this.visibleOptions()[this.focusedOptionIndex()]);
      this.onOptionSelect({
        originalEvent: null,
        option: [value]
      });
    }
  }
  /**
   * Updates the model value.
   * @group Method
   */
  updateModel(value, event) {
    this.value = value;
    this.onModelChange(value);
    this.writeValue(value);
  }
  onInputClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.focusedOptionIndex.set(-1);
  }
  onOptionSelect(event, isFocus = false, index = -1) {
    const {
      originalEvent,
      option
    } = event;
    if (this.$disabled() || this.isOptionDisabled(option)) {
      return;
    }
    let selected = this.isSelected(option);
    let value = [];
    if (selected) {
      value = this.modelValue().filter((val) => !k(val, this.getOptionValue(option), this.equalityKey() || ""));
    } else {
      value = [...this.modelValue() || [], this.getOptionValue(option)];
    }
    this.updateModel(value, originalEvent);
    index !== -1 && this.focusedOptionIndex.set(index);
    isFocus && bt(this.focusInputViewChild?.nativeElement);
    this.onChange.emit({
      originalEvent: event,
      value,
      itemValue: option
    });
  }
  findSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  onOptionSelectRange(event, start = -1, end = -1) {
    start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
    end === -1 && (end = this.findNearestSelectedOptionIndex(start));
    if (start !== -1 && end !== -1) {
      const rangeStart = Math.min(start, end);
      const rangeEnd = Math.max(start, end);
      const value = this.visibleOptions().slice(rangeStart, rangeEnd + 1).filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
      this.updateModel(value, event);
    }
  }
  searchFields() {
    return (this.filterBy || this.optionLabel || "label").split(",");
  }
  findNearestSelectedOptionIndex(index, firstCheckUp = false) {
    let matchedOptionIndex = -1;
    if (this.hasSelectedOption()) {
      if (firstCheckUp) {
        matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
      } else {
        matchedOptionIndex = this.findNextSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
      }
    }
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findPrevSelectedOptionIndex(index) {
    const matchedOptionIndex = this.hasSelectedOption() && index > 0 ? M(this.visibleOptions().slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
  }
  findFirstFocusedOptionIndex() {
    const selectedIndex = this.findFirstSelectedOptionIndex();
    return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
  }
  findFirstOptionIndex() {
    return this.visibleOptions().findIndex((option) => this.isValidOption(option));
  }
  findFirstSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  findNextSelectedOptionIndex(index) {
    const matchedOptionIndex = this.hasSelectedOption() && index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidSelectedOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
  }
  equalityKey() {
    return this.optionValue ? null : this.dataKey;
  }
  hasSelectedOption() {
    return s(this.modelValue());
  }
  isValidSelectedOption(option) {
    return this.isValidOption(option) && this.isSelected(option);
  }
  isOptionGroup(option) {
    return option && (this.group || this.optionGroupLabel) && option.optionGroup && option.group;
  }
  isValidOption(option) {
    return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
  }
  isOptionDisabled(option) {
    if (this.maxSelectionLimitReached() && !this.isSelected(option)) {
      return true;
    }
    return this.optionDisabled ? p(option, this.optionDisabled) : option && option.disabled !== void 0 ? option.disabled : false;
  }
  isSelected(option) {
    const optionValue = this.getOptionValue(option);
    return (this.modelValue() || []).some((value) => k(value, optionValue, this.equalityKey() || ""));
  }
  isOptionMatched(option) {
    return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue?.toLocaleLowerCase(this.filterLocale));
  }
  isEmpty() {
    return !this._options() || this.visibleOptions() && this.visibleOptions().length === 0;
  }
  getOptionIndex(index, scrollerOptions) {
    return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)["index"];
  }
  getAriaPosInset(index) {
    return (this.optionGroupLabel ? index - this.visibleOptions().slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
  }
  get ariaSetSize() {
    return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
  }
  getLabelByValue(value) {
    const options = this.group ? this.flatOptions(this._options()) : this._options() || [];
    const matchedOption = options.find((option) => !this.isOptionGroup(option) && k(this.getOptionValue(option), value, this.equalityKey() || ""));
    return matchedOption ? this.getOptionLabel(matchedOption) : null;
  }
  getSelectedItemsLabel() {
    let pattern = /{(.*?)}/;
    let message = this.selectedItemsLabel ? this.selectedItemsLabel : this.config.getTranslation(TranslationKeys.SELECTION_MESSAGE);
    if (pattern.test(message)) {
      return message.replace(message.match(pattern)[0], this.modelValue().length + "");
    }
    return message;
  }
  getOptionLabel(option) {
    return this.optionLabel ? p(option, this.optionLabel) : option && option.label != void 0 ? option.label : option;
  }
  getOptionValue(option) {
    return this.optionValue ? p(option, this.optionValue) : !this.optionLabel && option && option.value !== void 0 ? option.value : option;
  }
  getOptionGroupLabel(optionGroup) {
    return this.optionGroupLabel ? p(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label != void 0 ? optionGroup.label : optionGroup;
  }
  getOptionGroupChildren(optionGroup) {
    return optionGroup ? this.optionGroupChildren ? p(optionGroup, this.optionGroupChildren) : optionGroup.items : [];
  }
  onKeyDown(event) {
    if (this.$disabled()) {
      event.preventDefault();
      return;
    }
    const metaKey = event.metaKey || event.ctrlKey;
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event);
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
      case "Space":
        this.onEnterKey(event);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event);
        break;
      case "ShiftLeft":
      case "ShiftRight":
        this.onShiftKey();
        break;
      default:
        if (event.code === "KeyA" && metaKey) {
          const value = this.visibleOptions().filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
          this.updateModel(value, event);
          event.preventDefault();
          break;
        }
        if (!metaKey && J(event.key)) {
          !this.overlayVisible && this.show();
          this.searchOptions(event, event.key);
          event.preventDefault();
        }
        break;
    }
  }
  onFilterKeyDown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event, true);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        this.onArrowLeftKey(event, true);
        break;
      case "Home":
        this.onHomeKey(event, true);
        break;
      case "End":
        this.onEndKey(event, true);
        break;
      case "Enter":
      case "NumpadEnter":
        this.onEnterKey(event);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event, true);
        break;
      default:
        break;
    }
  }
  onArrowLeftKey(event, pressedInInputText = false) {
    pressedInInputText && this.focusedOptionIndex.set(-1);
  }
  onArrowDownKey(event) {
    const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();
    if (event.shiftKey) {
      this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
    }
    this.changeFocusedOptionIndex(event, optionIndex);
    !this.overlayVisible && this.show();
    event.preventDefault();
    event.stopPropagation();
  }
  onArrowUpKey(event, pressedInInputText = false) {
    if (event.altKey && !pressedInInputText) {
      if (this.focusedOptionIndex() !== -1) {
        this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
      }
      this.overlayVisible && this.hide();
      event.preventDefault();
    } else {
      const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();
      if (event.shiftKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
      event.preventDefault();
    }
    event.stopPropagation();
  }
  onHomeKey(event, pressedInInputText = false) {
    const {
      currentTarget
    } = event;
    if (pressedInInputText) {
      const len = currentTarget.value.length;
      currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
      this.focusedOptionIndex.set(-1);
    } else {
      let metaKey = event.metaKey || event.ctrlKey;
      let optionIndex = this.findFirstOptionIndex();
      if (event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
    }
    event.preventDefault();
  }
  onEndKey(event, pressedInInputText = false) {
    const {
      currentTarget
    } = event;
    if (pressedInInputText) {
      const len = currentTarget.value.length;
      currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
      this.focusedOptionIndex.set(-1);
    } else {
      let metaKey = event.metaKey || event.ctrlKey;
      let optionIndex = this.findLastFocusedOptionIndex();
      if (event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
    }
    event.preventDefault();
  }
  onPageDownKey(event) {
    this.scrollInView(this.visibleOptions().length - 1);
    event.preventDefault();
  }
  onPageUpKey(event) {
    this.scrollInView(0);
    event.preventDefault();
  }
  onEnterKey(event) {
    if (!this.overlayVisible) {
      this.onArrowDownKey(event);
    } else {
      if (this.focusedOptionIndex() !== -1) {
        if (event.shiftKey) {
          this.onOptionSelectRange(event, this.focusedOptionIndex());
        } else {
          this.onOptionSelect({
            originalEvent: event,
            option: this.visibleOptions()[this.focusedOptionIndex()]
          });
        }
      }
    }
    event.preventDefault();
  }
  onEscapeKey(event) {
    if (this.overlayVisible) {
      this.hide(true);
      event.stopPropagation();
      event.preventDefault();
    }
  }
  onTabKey(event, pressedInInputText = false) {
    if (!pressedInInputText) {
      if (this.overlayVisible && this.hasFocusableElements()) {
        bt(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay?.nativeElement : this.firstHiddenFocusableElementOnOverlay?.nativeElement);
        event.preventDefault();
      } else {
        if (this.focusedOptionIndex() !== -1) {
          const option = this.visibleOptions()[this.focusedOptionIndex()];
          !this.isSelected(option) && this.onOptionSelect({
            originalEvent: event,
            option
          });
        }
        this.overlayVisible && this.hide(this.filter);
      }
    }
  }
  onShiftKey() {
    this.startRangeIndex.set(this.focusedOptionIndex());
  }
  onContainerClick(event) {
    if (this.$disabled() || this.loading || this.readonly || event.target?.isSameNode?.(this.focusInputViewChild?.nativeElement)) {
      return;
    }
    if (!this.overlayViewChild || !this.overlayViewChild.el.nativeElement.contains(event.target)) {
      if (this.clickInProgress) {
        return;
      }
      this.clickInProgress = true;
      setTimeout(() => {
        this.clickInProgress = false;
      }, 150);
      this.overlayVisible ? this.hide(true) : this.show(true);
    }
    this.focusInputViewChild?.nativeElement.focus({
      preventScroll: true
    });
    this.onClick.emit(event);
    this.cd.detectChanges();
  }
  onFirstHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement ? vt(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild?.nativeElement;
    bt(focusableEl);
  }
  onInputFocus(event) {
    this.focused = true;
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
    this.focusedOptionIndex.set(focusedOptionIndex);
    this.overlayVisible && this.scrollInView(this.focusedOptionIndex());
    this.onFocus.emit({
      originalEvent: event
    });
  }
  onInputBlur(event) {
    this.focused = false;
    this.onBlur.emit({
      originalEvent: event
    });
    if (!this.preventModelTouched) {
      this.onModelTouched();
    }
    this.preventModelTouched = false;
  }
  onFilterInputChange(event) {
    let value = event.target.value;
    this._filterValue.set(value);
    this.focusedOptionIndex.set(-1);
    this.onFilter.emit({
      originalEvent: event,
      filter: this._filterValue()
    });
    !this.virtualScrollerDisabled && this.scroller?.scrollToIndex(0);
    setTimeout(() => {
      this.overlayViewChild?.alignOverlay();
    });
  }
  onLastHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement ? Lt(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild?.nativeElement;
    bt(focusableEl);
  }
  onOptionMouseEnter(event, index) {
    if (this.focusOnHover) {
      this.changeFocusedOptionIndex(event, index);
    }
  }
  onFilterBlur(event) {
    this.focusedOptionIndex.set(-1);
  }
  onToggleAll(event) {
    if (this.$disabled() || this.readonly) {
      return;
    }
    if (this.selectAll != null) {
      this.onSelectAllChange.emit({
        originalEvent: event,
        checked: !this.allSelected()
      });
    } else {
      const selectedDisabledOptions = this.getAllVisibleAndNonVisibleOptions().filter((option) => this.isSelected(option) && (this.optionDisabled ? p(option, this.optionDisabled) : option && option.disabled !== void 0 ? option.disabled : false));
      const visibleOptions = this.allSelected() ? this.visibleOptions().filter((option) => !this.isValidOption(option) && this.isSelected(option)) : this.visibleOptions().filter((option) => this.isSelected(option) || this.isValidOption(option));
      const selectedOptionsBeforeSearch = this.filter && !this.allSelected() ? this.getAllVisibleAndNonVisibleOptions().filter((option) => this.isSelected(option) && this.isValidOption(option)) : [];
      const optionValues = [...selectedOptionsBeforeSearch, ...selectedDisabledOptions, ...visibleOptions].map((option) => this.getOptionValue(option));
      const value = [...new Set(optionValues)];
      this.updateModel(value, event);
      if (!value.length || value.length === this.getAllVisibleAndNonVisibleOptions().length) {
        this.onSelectAllChange.emit({
          originalEvent: event,
          checked: !!value.length
        });
      }
    }
    if (this.partialSelected()) {
      this.selectedOptions = [];
      this.cd.markForCheck();
    }
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
    DomHandler.focus(this.headerCheckboxViewChild?.inputViewChild?.nativeElement);
    this.headerCheckboxFocus = true;
    event.originalEvent.preventDefault();
    event.originalEvent.stopPropagation();
  }
  changeFocusedOptionIndex(event, index) {
    if (this.focusedOptionIndex() !== index) {
      this.focusedOptionIndex.set(index);
      this.scrollInView();
    }
  }
  get virtualScrollerDisabled() {
    return !this.virtualScroll;
  }
  scrollInView(index = -1) {
    const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
    if (this.itemsViewChild && this.itemsViewChild.nativeElement) {
      const element = z(this.itemsViewChild.nativeElement, `li[id="${id}"]`);
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      } else if (!this.virtualScrollerDisabled) {
        setTimeout(() => {
          this.virtualScroll && this.scroller?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
        }, 0);
      }
    }
  }
  get focusedOptionId() {
    return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
  }
  allSelected() {
    return this.selectAll !== null ? this.selectAll : s(this.visibleOptions()) && this.visibleOptions().every((option) => this.isOptionGroup(option) || this.isOptionDisabled(option) || this.isSelected(option));
  }
  partialSelected() {
    return this.selectedOptions && this.selectedOptions.length > 0 && this.selectedOptions.length < (this.options?.length || 0);
  }
  /**
   * Displays the panel.
   * @group Method
   */
  show(isFocus) {
    this.overlayVisible = true;
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex();
    this.focusedOptionIndex.set(focusedOptionIndex);
    if (isFocus) {
      bt(this.focusInputViewChild?.nativeElement);
    }
    this.cd.markForCheck();
  }
  /**
   * Hides the panel.
   * @group Method
   */
  hide(isFocus) {
    this.overlayVisible = false;
    this.focusedOptionIndex.set(-1);
    if (this.filter && this.resetFilterOnHide) {
      this.resetFilter();
    }
    if (this.overlayOptions?.mode === "modal") {
      unblockBodyScroll();
    }
    isFocus && bt(this.focusInputViewChild?.nativeElement);
    this.cd.markForCheck();
  }
  onOverlayBeforeEnter(event) {
    this.itemsWrapper = z(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? '[data-pc-name="virtualscroller"]' : '[data-pc-section="listcontainer"]');
    this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);
    if (this.options && this.options.length) {
      if (this.virtualScroll) {
        const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;
        if (selectedIndex !== -1) {
          this.scroller?.scrollToIndex(selectedIndex);
        }
      } else {
        let selectedListItem = z(this.itemsWrapper, '[data-pc-section="option"][data-p-selected="true"]');
        if (selectedListItem) {
          selectedListItem.scrollIntoView({
            block: "nearest",
            inline: "nearest"
          });
        }
      }
    }
    if (this.filterInputChild && this.filterInputChild.nativeElement) {
      this.preventModelTouched = true;
      if (this.autofocusFilter) {
        this.filterInputChild.nativeElement.focus();
      }
    }
    this.onPanelShow.emit(event);
  }
  onOverlayAfterLeave(event) {
    this.itemsWrapper = null;
    this.onModelTouched();
    this.onPanelHide.emit(event);
  }
  resetFilter() {
    if (this.filterInputChild && this.filterInputChild.nativeElement) {
      this.filterInputChild.nativeElement.value = "";
    }
    this._filterValue.set(null);
    this._filteredOptions = null;
  }
  onOverlayHide(event) {
    this.focusedOptionIndex.set(-1);
    if (this.filter && this.resetFilterOnHide) {
      this.resetFilter();
    }
  }
  close(event) {
    this.hide();
    event.preventDefault();
    event.stopPropagation();
  }
  clear(event) {
    this.value = [];
    this.updateModel(null, event);
    this.selectedOptions = [];
    this.onClear.emit();
    this._disableTooltip = true;
    event.stopPropagation();
  }
  labelContainerMouseLeave() {
    if (this._disableTooltip) this._disableTooltip = false;
  }
  removeOption(optionValue, event) {
    let value = this.modelValue().filter((val) => !k(val, optionValue, this.equalityKey() || ""));
    this.updateModel(value, event);
    this.onChange.emit({
      originalEvent: event,
      value,
      itemValue: optionValue
    });
    this.onRemove.emit({
      newValue: value,
      removed: optionValue
    });
    event && event.stopPropagation();
  }
  findNextOptionIndex(index) {
    const matchedOptionIndex = index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
  }
  findPrevOptionIndex(index) {
    const matchedOptionIndex = index > 0 ? M(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findLastSelectedOptionIndex() {
    return this.hasSelectedOption() ? M(this.visibleOptions(), (option) => this.isValidSelectedOption(option)) : -1;
  }
  findLastFocusedOptionIndex() {
    const selectedIndex = this.findLastSelectedOptionIndex();
    return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
  }
  findLastOptionIndex() {
    return M(this.visibleOptions(), (option) => this.isValidOption(option));
  }
  searchOptions(event, char) {
    this.searchValue = (this.searchValue || "") + char;
    let optionIndex = -1;
    let matched = false;
    if (this.focusedOptionIndex() !== -1) {
      optionIndex = this.visibleOptions().slice(this.focusedOptionIndex()).findIndex((option) => this.isOptionMatched(option));
      optionIndex = optionIndex === -1 ? this.visibleOptions().slice(0, this.focusedOptionIndex()).findIndex((option) => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex();
    } else {
      optionIndex = this.visibleOptions().findIndex((option) => this.isOptionMatched(option));
    }
    if (optionIndex !== -1) {
      matched = true;
    }
    if (optionIndex === -1 && this.focusedOptionIndex() === -1) {
      optionIndex = this.findFirstFocusedOptionIndex();
    }
    if (optionIndex !== -1) {
      this.changeFocusedOptionIndex(event, optionIndex);
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
  hasFocusableElements() {
    return b(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
  }
  hasFilter() {
    return this._filterValue() && this._filterValue().trim().length > 0;
  }
  get containerDataP() {
    return this.cn({
      invalid: this.invalid(),
      disabled: this.$disabled(),
      focus: this.focused,
      fluid: this.hasFluid,
      filled: this.$variant() === "filled",
      [this.size()]: this.size()
    });
  }
  get labelDataP() {
    return this.cn({
      placeholder: this.label === this.placeholder,
      clearable: this.showClear,
      disabled: this.disabled,
      [this.size()]: this.size(),
      "has-chip": this.display === "chip" && this.value && this.value.length && (this.maxSelectedLabels ? this.value.length <= this.maxSelectedLabels : true),
      empty: !this.placeholder && !this.$filled
    });
  }
  get dropdownIconDataP() {
    return this.cn({
      [this.size()]: this.size()
    });
  }
  get overlayDataP() {
    return this.cn({
      ["overlay-" + this.appendTo]: "overlay-" + this.appendTo
    });
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    this.value = value;
    setModelValue(value);
    this.cd.markForCheck();
  }
  getHeaderCheckboxPTOptions(key) {
    return this.ptm(key, {
      context: {
        selected: this.allSelected()
      }
    });
  }
  getPTOptions(option, itemOptions, index, key) {
    return this.ptm(key, {
      context: {
        selected: this.isSelected(option),
        focused: this.focusedOptionIndex() === this.getOptionIndex(index, itemOptions),
        disabled: this.isOptionDisabled(option)
      }
    });
  }
  static ɵfac = function MultiSelect_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MultiSelect)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(FilterService), ɵɵdirectiveInject(OverlayService));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MultiSelect,
    selectors: [["p-multiSelect"], ["p-multiselect"], ["p-multi-select"]],
    contentQueries: function MultiSelect_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, Footer, 5)(dirIndex, Header, 5)(dirIndex, _c3, 4)(dirIndex, _c4, 4)(dirIndex, _c5, 4)(dirIndex, _c6, 4)(dirIndex, _c7, 4)(dirIndex, _c8, 4)(dirIndex, _c9, 4)(dirIndex, _c10, 4)(dirIndex, _c11, 4)(dirIndex, _c12, 4)(dirIndex, _c13, 4)(dirIndex, _c14, 4)(dirIndex, _c15, 4)(dirIndex, _c16, 4)(dirIndex, _c17, 4)(dirIndex, _c18, 4)(dirIndex, _c19, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.groupTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loaderTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyFilterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.selectedItemsTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loadingIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.removeTokenIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.chipIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clearIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dropdownIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemCheckboxIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerCheckboxIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function MultiSelect_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c20, 5)(_c21, 5)(_c22, 5)(_c23, 5)(_c24, 5)(_c25, 5)(_c26, 5)(_c27, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.overlayViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterInputChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.focusInputViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemsViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scroller = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.lastHiddenFocusableElementOnOverlay = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.firstHiddenFocusableElementOnOverlay = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerCheckboxViewChild = _t.first);
      }
    },
    hostVars: 6,
    hostBindings: function MultiSelect_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function MultiSelect_click_HostBindingHandler($event) {
          return ctx.onContainerClick($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("id", ctx.id)("data-p", ctx.containerDataP);
        ɵɵstyleMap(ctx.sx("root"));
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      id: "id",
      ariaLabel: "ariaLabel",
      styleClass: "styleClass",
      panelStyle: "panelStyle",
      panelStyleClass: "panelStyleClass",
      inputId: "inputId",
      readonly: [2, "readonly", "readonly", booleanAttribute],
      group: [2, "group", "group", booleanAttribute],
      filter: [2, "filter", "filter", booleanAttribute],
      filterPlaceHolder: "filterPlaceHolder",
      filterLocale: "filterLocale",
      overlayVisible: [2, "overlayVisible", "overlayVisible", booleanAttribute],
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      dataKey: "dataKey",
      ariaLabelledBy: "ariaLabelledBy",
      displaySelectedLabel: "displaySelectedLabel",
      maxSelectedLabels: "maxSelectedLabels",
      selectionLimit: [2, "selectionLimit", "selectionLimit", numberAttribute],
      selectedItemsLabel: "selectedItemsLabel",
      showToggleAll: [2, "showToggleAll", "showToggleAll", booleanAttribute],
      emptyFilterMessage: "emptyFilterMessage",
      emptyMessage: "emptyMessage",
      resetFilterOnHide: [2, "resetFilterOnHide", "resetFilterOnHide", booleanAttribute],
      dropdownIcon: "dropdownIcon",
      chipIcon: "chipIcon",
      optionLabel: "optionLabel",
      optionValue: "optionValue",
      optionDisabled: "optionDisabled",
      optionGroupLabel: "optionGroupLabel",
      optionGroupChildren: "optionGroupChildren",
      showHeader: [2, "showHeader", "showHeader", booleanAttribute],
      filterBy: "filterBy",
      scrollHeight: "scrollHeight",
      lazy: [2, "lazy", "lazy", booleanAttribute],
      virtualScroll: [2, "virtualScroll", "virtualScroll", booleanAttribute],
      loading: [2, "loading", "loading", booleanAttribute],
      virtualScrollItemSize: [2, "virtualScrollItemSize", "virtualScrollItemSize", numberAttribute],
      loadingIcon: "loadingIcon",
      virtualScrollOptions: "virtualScrollOptions",
      overlayOptions: "overlayOptions",
      ariaFilterLabel: "ariaFilterLabel",
      filterMatchMode: "filterMatchMode",
      tooltip: "tooltip",
      tooltipPosition: "tooltipPosition",
      tooltipPositionStyle: "tooltipPositionStyle",
      tooltipStyleClass: "tooltipStyleClass",
      autofocusFilter: [2, "autofocusFilter", "autofocusFilter", booleanAttribute],
      display: "display",
      autocomplete: "autocomplete",
      showClear: [2, "showClear", "showClear", booleanAttribute],
      autofocus: [2, "autofocus", "autofocus", booleanAttribute],
      placeholder: "placeholder",
      options: "options",
      filterValue: "filterValue",
      selectAll: "selectAll",
      focusOnHover: [2, "focusOnHover", "focusOnHover", booleanAttribute],
      filterFields: "filterFields",
      selectOnFocus: [2, "selectOnFocus", "selectOnFocus", booleanAttribute],
      autoOptionFocus: [2, "autoOptionFocus", "autoOptionFocus", booleanAttribute],
      highlightOnSelect: [2, "highlightOnSelect", "highlightOnSelect", booleanAttribute],
      size: [1, "size"],
      variant: [1, "variant"],
      fluid: [1, "fluid"],
      appendTo: [1, "appendTo"],
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      onChange: "onChange",
      onFilter: "onFilter",
      onFocus: "onFocus",
      onBlur: "onBlur",
      onClick: "onClick",
      onClear: "onClear",
      onPanelShow: "onPanelShow",
      onPanelHide: "onPanelHide",
      onLazyLoad: "onLazyLoad",
      onRemove: "onRemove",
      onSelectAllChange: "onSelectAllChange"
    },
    features: [ɵɵProvidersFeature([MULTISELECT_VALUE_ACCESSOR, MultiSelectStyle, {
      provide: MULTISELECT_INSTANCE,
      useExisting: _MultiSelect
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _MultiSelect
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c29,
    decls: 16,
    vars: 51,
    consts: [["focusInput", ""], ["elseBlock", ""], ["overlay", ""], ["content", ""], ["token", ""], ["removeicon", ""], ["firstHiddenFocusableEl", ""], ["buildInItems", ""], ["lastHiddenFocusableEl", ""], ["builtInFilterElement", ""], ["headerCheckbox", ""], ["icon", ""], ["filterInput", ""], ["scroller", ""], ["loader", ""], ["items", ""], [1, "p-hidden-accessible", 3, "pBind"], ["role", "combobox", 3, "focus", "blur", "keydown", "pTooltip", "pTooltipUnstyled", "tooltipPosition", "positionStyle", "tooltipStyleClass", "pAutoFocus", "pBind"], [3, "mouseleave", "pBind", "pTooltip", "pTooltipUnstyled", "tooltipDisabled", "tooltipPosition", "positionStyle", "tooltipStyleClass"], [3, "pBind"], [4, "ngIf"], [4, "ngIf", "ngIfElse"], [3, "visibleChange", "onBeforeEnter", "onAfterLeave", "onHide", "hostAttrSelector", "visible", "options", "target", "appendTo", "unstyled", "pt", "motionOptions"], [3, "pBind", "class"], [3, "pBind", "class", 4, "ngFor", "ngForOf"], [3, "onRemove", "pt", "unstyled", "label", "removable", "removeIcon"], [3, "class", "pBind", "click", 4, "ngIf"], [3, "click", "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["data-p-icon", "times", 3, "pBind", "class", "click", 4, "ngIf"], [3, "pBind", "class", "click", 4, "ngIf"], ["data-p-icon", "times", 3, "click", "pBind"], [4, "ngTemplateOutlet"], [3, "pBind", "class", 4, "ngIf"], [3, "pBind", "class", "ngClass", 4, "ngIf"], ["data-p-icon", "chevron-down", 3, "pBind", "class", 4, "ngIf"], [3, "pBind", "ngClass"], ["data-p-icon", "chevron-down", 3, "pBind"], [3, "pBind", "ngStyle"], ["role", "presentation", 1, "p-hidden-accessible", "p-hidden-focusable", 3, "focus", "pBind"], [3, "items", "style", "itemSize", "autoSize", "tabindex", "lazy", "options", "onLazyLoad", 4, "ngIf"], [3, "pt", "ngModel", "ariaLabel", "binary", "variant", "disabled", "unstyled", "onChange", 4, "ngIf"], [3, "pt", "class", "unstyled", 4, "ngIf"], [3, "onChange", "pt", "ngModel", "ariaLabel", "binary", "variant", "disabled", "unstyled"], ["data-p-icon", "check", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "check", 3, "pBind"], [3, "pt", "unstyled"], ["pInputText", "", "type", "text", "role", "searchbox", 3, "input", "keydown", "click", "blur", "pt", "variant", "value", "unstyled"], ["data-p-icon", "search", 3, "pBind", 4, "ngIf"], ["class", "p-multiselect-filter-icon", 3, "pBind", 4, "ngIf"], ["data-p-icon", "search", 3, "pBind"], [1, "p-multiselect-filter-icon", 3, "pBind"], [3, "onLazyLoad", "items", "itemSize", "autoSize", "tabindex", "lazy", "options"], ["role", "listbox", "aria-multiselectable", "true", 3, "pBind"], ["ngFor", "", 3, "ngForOf"], ["role", "option", 3, "pBind", "class", "ngStyle", 4, "ngIf"], ["role", "option", 3, "pBind", "ngStyle"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["pMultiSelectItem", "", "pRipple", "", 3, "onClick", "onMouseEnter", "pBind", "id", "option", "selected", "label", "disabled", "template", "itemCheckboxIconTemplate", "itemSize", "focused", "ariaPosInset", "ariaSetSize", "variant", "highlightOnSelect", "pt", "unstyled"]],
    template: function MultiSelect_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵprojectionDef(_c28);
        ɵɵelementStart(0, "div", 16)(1, "input", 17, 0);
        ɵɵlistener("focus", function MultiSelect_Template_input_focus_1_listener($event) {
          return ctx.onInputFocus($event);
        })("blur", function MultiSelect_Template_input_blur_1_listener($event) {
          return ctx.onInputBlur($event);
        })("keydown", function MultiSelect_Template_input_keydown_1_listener($event) {
          return ctx.onKeyDown($event);
        });
        ɵɵelementEnd()();
        ɵɵelementStart(3, "div", 18);
        ɵɵlistener("mouseleave", function MultiSelect_Template_div_mouseleave_3_listener() {
          return ctx.labelContainerMouseLeave();
        });
        ɵɵelementStart(4, "div", 19);
        ɵɵtemplate(5, MultiSelect_ng_container_5_Template, 3, 2, "ng-container", 20)(6, MultiSelect_ng_container_6_Template, 3, 6, "ng-container", 20);
        ɵɵelementEnd()();
        ɵɵtemplate(7, MultiSelect_ng_container_7_Template, 3, 2, "ng-container", 20);
        ɵɵelementStart(8, "div", 19);
        ɵɵtemplate(9, MultiSelect_ng_container_9_Template, 3, 2, "ng-container", 21)(10, MultiSelect_ng_template_10_Template, 2, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
        ɵɵelementStart(12, "p-overlay", 22, 2);
        ɵɵtwoWayListener("visibleChange", function MultiSelect_Template_p_overlay_visibleChange_12_listener($event) {
          ɵɵrestoreView(_r1);
          ɵɵtwoWayBindingSet(ctx.overlayVisible, $event) || (ctx.overlayVisible = $event);
          return ɵɵresetView($event);
        });
        ɵɵlistener("onBeforeEnter", function MultiSelect_Template_p_overlay_onBeforeEnter_12_listener($event) {
          return ctx.onOverlayBeforeEnter($event);
        })("onAfterLeave", function MultiSelect_Template_p_overlay_onAfterLeave_12_listener($event) {
          return ctx.onOverlayAfterLeave($event);
        })("onHide", function MultiSelect_Template_p_overlay_onHide_12_listener($event) {
          return ctx.onOverlayHide($event);
        });
        ɵɵtemplate(14, MultiSelect_ng_template_14_Template, 13, 24, "ng-template", null, 3, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        const elseBlock_r24 = ɵɵreference(11);
        ɵɵproperty("pBind", ctx.ptm("hiddenInputContainer"));
        ɵɵattribute("data-p-hidden-accessible", true);
        ɵɵadvance();
        ɵɵproperty("pTooltip", ctx.tooltip)("pTooltipUnstyled", ctx.unstyled())("tooltipPosition", ctx.tooltipPosition)("positionStyle", ctx.tooltipPositionStyle)("tooltipStyleClass", ctx.tooltipStyleClass)("pAutoFocus", ctx.autofocus)("pBind", ctx.ptm("hiddenInput"));
        ɵɵattribute("aria-disabled", ctx.$disabled())("id", ctx.inputId)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledBy)("aria-haspopup", "listbox")("aria-expanded", ctx.overlayVisible ?? false)("aria-controls", ctx.overlayVisible ? ctx.id + "_list" : null)("tabindex", !ctx.$disabled() ? ctx.tabindex : -1)("aria-activedescendant", ctx.focused ? ctx.focusedOptionId : void 0)("value", ctx.modelValue())("name", ctx.name())("required", ctx.required() ? "" : void 0)("disabled", ctx.$disabled() ? "" : void 0);
        ɵɵadvance(2);
        ɵɵclassMap(ctx.cx("labelContainer"));
        ɵɵproperty("pBind", ctx.ptm("labelContainer"))("pTooltip", ctx.tooltip)("pTooltipUnstyled", ctx.unstyled())("tooltipDisabled", ctx._disableTooltip)("tooltipPosition", ctx.tooltipPosition)("positionStyle", ctx.tooltipPositionStyle)("tooltipStyleClass", ctx.tooltipStyleClass);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("label"));
        ɵɵproperty("pBind", ctx.ptm("label"));
        ɵɵattribute("data-p", ctx.labelDataP);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.selectedItemsTemplate && !ctx._selectedItemsTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.selectedItemsTemplate || ctx._selectedItemsTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.isVisibleClearIcon);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("dropdown"));
        ɵɵproperty("pBind", ctx.ptm("dropdown"));
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.loading)("ngIfElse", elseBlock_r24);
        ɵɵadvance(3);
        ɵɵproperty("hostAttrSelector", ctx.$attrSelector);
        ɵɵtwoWayProperty("visible", ctx.overlayVisible);
        ɵɵproperty("options", ctx.overlayOptions)("target", "@parent")("appendTo", ctx.$appendTo())("unstyled", ctx.unstyled())("pt", ctx.ptm("pcOverlay"))("motionOptions", ctx.motionOptions());
      }
    },
    dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, MultiSelectItem, Overlay, SharedModule, Tooltip, Scroller, AutoFocus, CheckIcon, SearchIcon, TimesIcon, ChevronDownIcon, IconField, InputIcon, InputText, Chip, Checkbox, FormsModule, NgControlStatus, NgModel, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelect, [{
    type: Component,
    args: [{
      selector: "p-multiSelect, p-multiselect, p-multi-select",
      standalone: true,
      imports: [CommonModule, MultiSelectItem, Overlay, SharedModule, Tooltip, Scroller, AutoFocus, CheckIcon, SearchIcon, TimesIcon, ChevronDownIcon, IconField, InputIcon, InputText, Chip, Checkbox, FormsModule, BindModule],
      hostDirectives: [Bind],
      template: `
        <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true" [pBind]="ptm('hiddenInputContainer')">
            <input
                #focusInput
                [pTooltip]="tooltip"
                [pTooltipUnstyled]="unstyled()"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
                [attr.aria-disabled]="$disabled()"
                [attr.id]="inputId"
                role="combobox"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-haspopup]="'listbox'"
                [attr.aria-expanded]="overlayVisible ?? false"
                [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                [attr.tabindex]="!$disabled() ? tabindex : -1"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [pAutoFocus]="autofocus"
                [attr.value]="modelValue()"
                [attr.name]="name()"
                [attr.required]="required() ? '' : undefined"
                [attr.disabled]="$disabled() ? '' : undefined"
                [pBind]="ptm('hiddenInput')"
            />
        </div>
        <div
            [pBind]="ptm('labelContainer')"
            [class]="cx('labelContainer')"
            [pTooltip]="tooltip"
            [pTooltipUnstyled]="unstyled()"
            (mouseleave)="labelContainerMouseLeave()"
            [tooltipDisabled]="_disableTooltip"
            [tooltipPosition]="tooltipPosition"
            [positionStyle]="tooltipPositionStyle"
            [tooltipStyleClass]="tooltipStyleClass"
        >
            <div [pBind]="ptm('label')" [class]="cx('label')" [attr.data-p]="labelDataP">
                <ng-container *ngIf="!selectedItemsTemplate && !_selectedItemsTemplate">
                    <ng-container *ngIf="display === 'comma'">{{ label() || 'empty' }}</ng-container>
                    <ng-container *ngIf="display === 'chip'">
                        @if (chipSelectedItems() && chipSelectedItems().length === maxSelectedLabels) {
                            {{ getSelectedItemsLabel() }}
                        } @else {
                            <div #token *ngFor="let item of chipSelectedItems(); let i = index" [pBind]="ptm('chipItem')" [class]="cx('chipItem')">
                                <p-chip [pt]="ptm('pcChip')" [unstyled]="unstyled()" [class]="cx('pcChip')" [label]="getLabelByValue(item)" [removable]="!$disabled() && !readonly" (onRemove)="removeOption(item, $event)" [removeIcon]="chipIcon">
                                    <ng-container *ngIf="chipIconTemplate || _chipIconTemplate || removeTokenIconTemplate || _removeTokenIconTemplate">
                                        <ng-template #removeicon>
                                            <ng-container *ngIf="!$disabled() && !readonly">
                                                <span
                                                    [class]="cx('chipIcon')"
                                                    *ngIf="chipIconTemplate || _chipIconTemplate || removeTokenIconTemplate || _removeTokenIconTemplate"
                                                    (click)="removeOption(item, $event)"
                                                    [attr.aria-hidden]="true"
                                                    [pBind]="ptm('chipIcon')"
                                                >
                                                    <ng-container *ngTemplateOutlet="chipIconTemplate || _chipIconTemplate || removeTokenIconTemplate || _removeTokenIconTemplate; context: { class: 'p-multiselect-chip-icon' }"></ng-container>
                                                </span>
                                            </ng-container>
                                        </ng-template>
                                    </ng-container>
                                </p-chip>
                            </div>
                        }
                        <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || 'empty' }}</ng-container>
                    </ng-container>
                </ng-container>
                <ng-container *ngIf="selectedItemsTemplate || _selectedItemsTemplate">
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate || _selectedItemsTemplate; context: { $implicit: selectedOptions, removeChip: removeOption.bind(this) }"></ng-container>
                    <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || 'empty' }}</ng-container>
                </ng-container>
            </div>
        </div>
        <ng-container *ngIf="isVisibleClearIcon">
            <svg data-p-icon="times" *ngIf="!clearIconTemplate && !_clearIconTemplate" [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear($event)" [attr.aria-hidden]="true" />
            <span *ngIf="clearIconTemplate || _clearIconTemplate" [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear($event)" [attr.aria-hidden]="true">
                <ng-template *ngTemplateOutlet="clearIconTemplate || _clearIconTemplate"></ng-template>
            </span>
        </ng-container>
        <div [pBind]="ptm('dropdown')" [class]="cx('dropdown')">
            <ng-container *ngIf="loading; else elseBlock">
                <ng-container *ngIf="loadingIconTemplate || _loadingIconTemplate">
                    <ng-container *ngTemplateOutlet="loadingIconTemplate || _loadingIconTemplate"></ng-container>
                </ng-container>
                <ng-container *ngIf="!loadingIconTemplate && !_loadingIconTemplate">
                    <span *ngIf="loadingIcon" [pBind]="ptm('loadingIcon')" [class]="cn(cx('loadingIcon'), 'pi-spin ' + loadingIcon)" [attr.aria-hidden]="true"></span>
                    <span *ngIf="!loadingIcon" [pBind]="ptm('loadingIcon')" [class]="cn(cx('loadingIcon'), 'pi pi-spinner pi-spin')" [attr.aria-hidden]="true"></span>
                </ng-container>
            </ng-container>
            <ng-template #elseBlock>
                <ng-container *ngIf="!dropdownIconTemplate && !_dropdownIconTemplate">
                    <span *ngIf="dropdownIcon" [pBind]="ptm('dropdownIcon')" [class]="cx('dropdownIcon')" [ngClass]="dropdownIcon" [attr.aria-hidden]="true" [attr.data-p]="dropdownIconDataP"></span>
                    <svg data-p-icon="chevron-down" *ngIf="!dropdownIcon" [pBind]="ptm('dropdownIcon')" [class]="cx('dropdownIcon')" [attr.aria-hidden]="true" [attr.data-p]="dropdownIconDataP" />
                </ng-container>
                <span *ngIf="dropdownIconTemplate || _dropdownIconTemplate" [pBind]="ptm('dropdownIcon')" [class]="cx('dropdownIcon')" [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate || _dropdownIconTemplate; context: { dataP: dropdownIconDataP }"></ng-template>
                </span>
            </ng-template>
        </div>
        <p-overlay
            #overlay
            [hostAttrSelector]="$attrSelector"
            [(visible)]="overlayVisible"
            [options]="overlayOptions"
            [target]="'@parent'"
            [appendTo]="$appendTo()"
            [unstyled]="unstyled()"
            [pt]="ptm('pcOverlay')"
            [motionOptions]="motionOptions()"
            (onBeforeEnter)="onOverlayBeforeEnter($event)"
            (onAfterLeave)="onOverlayAfterLeave($event)"
            (onHide)="onOverlayHide($event)"
        >
            <ng-template #content>
                <div [pBind]="ptm('overlay')" [attr.data-p]="overlayDataP" [attr.id]="id + '_list'" [class]="cn(cx('overlay'), panelStyleClass)" [ngStyle]="panelStyle">
                    <span
                        #firstHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onFirstHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('firstHiddenFocusableEl')"
                    >
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
                    <div [pBind]="ptm('header')" [class]="cx('header')" *ngIf="showHeader">
                        <ng-content select="p-header"></ng-content>
                        <ng-container *ngIf="filterTemplate || _filterTemplate; else builtInFilterElement">
                            <ng-container *ngTemplateOutlet="filterTemplate || _filterTemplate; context: { options: filterOptions }"></ng-container>
                        </ng-container>
                        <ng-template #builtInFilterElement>
                            <p-checkbox
                                [pt]="getHeaderCheckboxPTOptions('pcHeaderCheckbox')"
                                [ngModel]="allSelected()"
                                [ariaLabel]="toggleAllAriaLabel"
                                [binary]="true"
                                (onChange)="onToggleAll($event)"
                                *ngIf="showToggleAll && !selectionLimit"
                                [variant]="$variant()"
                                [disabled]="$disabled()"
                                [unstyled]="unstyled()"
                                #headerCheckbox
                            >
                                <ng-template #icon let-klass="class">
                                    <svg data-p-icon="check" *ngIf="!headerCheckboxIconTemplate && !_headerCheckboxIconTemplate && allSelected()" [class]="klass" [pBind]="getHeaderCheckboxPTOptions('pcHeaderCheckbox.icon')" />
                                    <ng-template
                                        *ngTemplateOutlet="
                                            headerCheckboxIconTemplate || _headerCheckboxIconTemplate;
                                            context: {
                                                checked: allSelected(),
                                                partialSelected: partialSelected(),
                                                class: klass
                                            }
                                        "
                                    ></ng-template>
                                </ng-template>
                            </p-checkbox>

                            <p-iconfield *ngIf="filter" [pt]="ptm('pcFilterContainer')" [class]="cx('pcFilterContainer')" [unstyled]="unstyled()">
                                <input
                                    #filterInput
                                    pInputText
                                    [pt]="ptm('pcFilter')"
                                    [variant]="$variant()"
                                    type="text"
                                    [attr.autocomplete]="autocomplete"
                                    role="searchbox"
                                    [attr.aria-owns]="id + '_list'"
                                    [attr.aria-activedescendant]="focusedOptionId"
                                    [value]="_filterValue() || ''"
                                    (input)="onFilterInputChange($event)"
                                    (keydown)="onFilterKeyDown($event)"
                                    (click)="onInputClick($event)"
                                    (blur)="onFilterBlur($event)"
                                    [class]="cx('pcFilter')"
                                    [attr.disabled]="$disabled() ? '' : undefined"
                                    [attr.placeholder]="filterPlaceHolder"
                                    [attr.aria-label]="ariaFilterLabel"
                                    [unstyled]="unstyled()"
                                />
                                <p-inputicon [pt]="ptm('pcFilterIconContainer')" [unstyled]="unstyled()">
                                    <svg data-p-icon="search" *ngIf="!filterIconTemplate && !_filterIconTemplate" [pBind]="ptm('filterIcon')" />
                                    <span *ngIf="filterIconTemplate || _filterIconTemplate" [pBind]="ptm('filterIcon')" class="p-multiselect-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate || _filterIconTemplate"></ng-template>
                                    </span>
                                </p-inputicon>
                            </p-iconfield>
                        </ng-template>
                    </div>
                    <div [pBind]="ptm('listContainer')" [class]="cx('listContainer')" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'">
                        <p-scroller
                            *ngIf="virtualScroll"
                            #scroller
                            [items]="visibleOptions()"
                            [style]="{ height: scrollHeight }"
                            [itemSize]="virtualScrollItemSize"
                            [autoSize]="true"
                            [tabindex]="-1"
                            [lazy]="lazy"
                            (onLazyLoad)="onLazyLoad.emit($event)"
                            [options]="virtualScrollOptions"
                        >
                            <ng-template #content let-items let-scrollerOptions="options">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                            </ng-template>
                            <ng-container *ngIf="loaderTemplate || _loaderTemplate">
                                <ng-template #loader let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="loaderTemplate || _loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                </ng-template>
                            </ng-container>
                        </p-scroller>
                        <ng-container *ngIf="!virtualScroll">
                            <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: visibleOptions(), options: {} }"></ng-container>
                        </ng-container>

                        <ng-template #buildInItems let-items let-scrollerOptions="options">
                            <ul #items [pBind]="ptm('list')" [class]="cn(cx('list'), scrollerOptions.contentStyleClass)" [style]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true" [attr.aria-label]="listLabel">
                                <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                    <ng-container *ngIf="isOptionGroup(option)">
                                        <li [pBind]="ptm('optionGroup')" [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" [class]="cx('optionGroup')" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                            <span *ngIf="!groupTemplate && option.optionGroup">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                            <ng-container *ngIf="option.optionGroup && groupTemplate" [ngTemplateOutlet]="groupTemplate" [ngTemplateOutletContext]="{ $implicit: option.optionGroup }"></ng-container>
                                        </li>
                                    </ng-container>
                                    <ng-container *ngIf="!isOptionGroup(option)">
                                        <li
                                            pMultiSelectItem
                                            pRipple
                                            [pBind]="getPTOptions(option, getItemOptions, i, 'option')"
                                            [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                            [option]="option"
                                            [selected]="isSelected(option)"
                                            [label]="getOptionLabel(option)"
                                            [disabled]="isOptionDisabled(option)"
                                            [template]="itemTemplate || _itemTemplate"
                                            [itemCheckboxIconTemplate]="itemCheckboxIconTemplate || _itemCheckboxIconTemplate"
                                            [itemSize]="scrollerOptions.itemSize"
                                            [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                            [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                            [ariaSetSize]="ariaSetSize"
                                            [variant]="$variant()"
                                            [highlightOnSelect]="highlightOnSelect"
                                            (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                            (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            [pt]="pt"
                                            [unstyled]="unstyled()"
                                        ></li>
                                    </ng-container>
                                </ng-template>

                                <li *ngIf="hasFilter() && isEmpty()" [pBind]="ptm('emptyMessage')" [class]="cx('emptyMessage')" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                    @if (!emptyFilterTemplate && !_emptyFilterTemplate && !emptyTemplate && !_emptyTemplate) {
                                        {{ emptyFilterMessageLabel }}
                                    } @else {
                                        <ng-container *ngTemplateOutlet="emptyFilterTemplate || _emptyFilterTemplate || emptyTemplate || _emptyFilterTemplate"></ng-container>
                                    }
                                </li>
                                <li *ngIf="!hasFilter() && isEmpty()" [pBind]="ptm('emptyMessage')" [class]="cx('emptyMessage')" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                    @if (!emptyTemplate && !_emptyTemplate) {
                                        {{ emptyMessageLabel }}
                                    } @else {
                                        <ng-container *ngTemplateOutlet="emptyTemplate || _emptyTemplate"></ng-container>
                                    }
                                </li>
                            </ul>
                        </ng-template>
                    </div>
                    <div *ngIf="footerFacet || footerTemplate || _footerTemplate">
                        <ng-content select="p-footer"></ng-content>
                        <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                    </div>

                    <span
                        #lastHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onLastHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('lastHiddenFocusableEl')"
                    ></span>
                </div>
            </ng-template>
        </p-overlay>
    `,
      providers: [MULTISELECT_VALUE_ACCESSOR, MultiSelectStyle, {
        provide: MULTISELECT_INSTANCE,
        useExisting: MultiSelect
      }, {
        provide: PARENT_INSTANCE,
        useExisting: MultiSelect
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[attr.id]": "id",
        "[attr.data-p]": "containerDataP",
        "(click)": "onContainerClick($event)",
        "[class]": "cn(cx('root'), styleClass)",
        "[style]": "sx('root')"
      }
    }]
  }], () => [{
    type: NgZone
  }, {
    type: FilterService
  }, {
    type: OverlayService
  }], {
    id: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    panelStyle: [{
      type: Input
    }],
    panelStyleClass: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    readonly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    group: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterPlaceHolder: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    overlayVisible: [{
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
    dataKey: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    displaySelectedLabel: [{
      type: Input
    }],
    maxSelectedLabels: [{
      type: Input
    }],
    selectionLimit: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    selectedItemsLabel: [{
      type: Input
    }],
    showToggleAll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    emptyFilterMessage: [{
      type: Input
    }],
    emptyMessage: [{
      type: Input
    }],
    resetFilterOnHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dropdownIcon: [{
      type: Input
    }],
    chipIcon: [{
      type: Input
    }],
    optionLabel: [{
      type: Input
    }],
    optionValue: [{
      type: Input
    }],
    optionDisabled: [{
      type: Input
    }],
    optionGroupLabel: [{
      type: Input
    }],
    optionGroupChildren: [{
      type: Input
    }],
    showHeader: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterBy: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    lazy: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    virtualScroll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    loading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    virtualScrollItemSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    loadingIcon: [{
      type: Input
    }],
    virtualScrollOptions: [{
      type: Input
    }],
    overlayOptions: [{
      type: Input
    }],
    ariaFilterLabel: [{
      type: Input
    }],
    filterMatchMode: [{
      type: Input
    }],
    tooltip: [{
      type: Input
    }],
    tooltipPosition: [{
      type: Input
    }],
    tooltipPositionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    autofocusFilter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    display: [{
      type: Input
    }],
    autocomplete: [{
      type: Input
    }],
    showClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    placeholder: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    filterValue: [{
      type: Input
    }],
    selectAll: [{
      type: Input
    }],
    focusOnHover: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterFields: [{
      type: Input
    }],
    selectOnFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoOptionFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    highlightOnSelect: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    size: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "size",
        required: false
      }]
    }],
    variant: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "variant",
        required: false
      }]
    }],
    fluid: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "fluid",
        required: false
      }]
    }],
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
    onChange: [{
      type: Output
    }],
    onFilter: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onClick: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    onPanelShow: [{
      type: Output
    }],
    onPanelHide: [{
      type: Output
    }],
    onLazyLoad: [{
      type: Output
    }],
    onRemove: [{
      type: Output
    }],
    onSelectAllChange: [{
      type: Output
    }],
    overlayViewChild: [{
      type: ViewChild,
      args: ["overlay"]
    }],
    filterInputChild: [{
      type: ViewChild,
      args: ["filterInput"]
    }],
    focusInputViewChild: [{
      type: ViewChild,
      args: ["focusInput"]
    }],
    itemsViewChild: [{
      type: ViewChild,
      args: ["items"]
    }],
    scroller: [{
      type: ViewChild,
      args: ["scroller"]
    }],
    lastHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["lastHiddenFocusableEl"]
    }],
    firstHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["firstHiddenFocusableEl"]
    }],
    headerCheckboxViewChild: [{
      type: ViewChild,
      args: ["headerCheckbox"]
    }],
    footerFacet: [{
      type: ContentChild,
      args: [Footer]
    }],
    headerFacet: [{
      type: ContentChild,
      args: [Header]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item", {
        descendants: false
      }]
    }],
    groupTemplate: [{
      type: ContentChild,
      args: ["group", {
        descendants: false
      }]
    }],
    loaderTemplate: [{
      type: ContentChild,
      args: ["loader", {
        descendants: false
      }]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    filterTemplate: [{
      type: ContentChild,
      args: ["filter", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false
      }]
    }],
    emptyFilterTemplate: [{
      type: ContentChild,
      args: ["emptyfilter", {
        descendants: false
      }]
    }],
    emptyTemplate: [{
      type: ContentChild,
      args: ["empty", {
        descendants: false
      }]
    }],
    selectedItemsTemplate: [{
      type: ContentChild,
      args: ["selecteditems", {
        descendants: false
      }]
    }],
    loadingIconTemplate: [{
      type: ContentChild,
      args: ["loadingicon", {
        descendants: false
      }]
    }],
    filterIconTemplate: [{
      type: ContentChild,
      args: ["filtericon", {
        descendants: false
      }]
    }],
    removeTokenIconTemplate: [{
      type: ContentChild,
      args: ["removetokenicon", {
        descendants: false
      }]
    }],
    chipIconTemplate: [{
      type: ContentChild,
      args: ["chipicon", {
        descendants: false
      }]
    }],
    clearIconTemplate: [{
      type: ContentChild,
      args: ["clearicon", {
        descendants: false
      }]
    }],
    dropdownIconTemplate: [{
      type: ContentChild,
      args: ["dropdownicon", {
        descendants: false
      }]
    }],
    itemCheckboxIconTemplate: [{
      type: ContentChild,
      args: ["itemcheckboxicon", {
        descendants: false
      }]
    }],
    headerCheckboxIconTemplate: [{
      type: ContentChild,
      args: ["headercheckboxicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var MultiSelectModule = class _MultiSelectModule {
  static ɵfac = function MultiSelectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MultiSelectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MultiSelectModule,
    imports: [MultiSelect, SharedModule],
    exports: [MultiSelect, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MultiSelect, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectModule, [{
    type: NgModule,
    args: [{
      imports: [MultiSelect, SharedModule],
      exports: [MultiSelect, SharedModule]
    }]
  }], null, null);
})();
export {
  MULTISELECT_VALUE_ACCESSOR,
  MultiSelect,
  MultiSelectClasses,
  MultiSelectItem,
  MultiSelectModule,
  MultiSelectStyle
};
//# sourceMappingURL=primeng_multiselect.js.map
