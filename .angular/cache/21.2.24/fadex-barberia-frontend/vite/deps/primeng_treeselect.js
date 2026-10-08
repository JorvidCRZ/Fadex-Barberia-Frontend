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
import "./chunk-OHFYJZH5.js";
import "./chunk-CQDTUEQU.js";
import {
  AutoFocus,
  AutoFocusModule
} from "./chunk-LNLEKQ2Z.js";
import {
  Fluid
} from "./chunk-TONGHQ5F.js";
import "./chunk-VKUYHHYD.js";
import {
  Ripple
} from "./chunk-YMDHHTAC.js";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  SpinnerIcon,
  TimesIcon
} from "./chunk-34VLFIXD.js";
import {
  Checkbox
} from "./chunk-GY3CDM4E.js";
import {
  BaseEditableHolder
} from "./chunk-A5DMBZXI.js";
import "./chunk-HE2MLLB2.js";
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
  SharedModule,
  TranslationKeys,
  TreeDragDropService
} from "./chunk-SKV3H6PS.js";
import {
  C,
  Lt,
  X,
  Y,
  b,
  bt,
  p,
  s2 as s,
  s3 as s2,
  v,
  vt,
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
  HostListener,
  Injectable,
  Input,
  NgModule,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  input,
  model,
  numberAttribute,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵanimateEnter,
  ɵɵanimateLeave,
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
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/tree/index.mjs
var style = `
    .p-tree {
        display: block;
        background: dt('tree.background');
        color: dt('tree.color');
        padding: dt('tree.padding');
        position: relative;
    }

    .p-tree-root-children,
    .p-tree-node-children {
        display: flex;
        list-style-type: none;
        flex-direction: column;
        margin: 0;
        gap: dt('tree.gap');
    }

    .p-tree-root-children {
        padding: 0;
        padding-block-start: dt('tree.gap');
    }

    .p-tree-node-children {
        padding: 0;
        padding-block-start: dt('tree.gap');
        padding-inline-start: dt('tree.indent');
    }

    .p-tree-node {
        padding: 0;
        outline: 0 none;
    }

    .p-tree-node-content {
        border-radius: dt('tree.node.border.radius');
        padding: dt('tree.node.padding');
        display: flex;
        align-items: center;
        outline-color: transparent;
        color: dt('tree.node.color');
        gap: dt('tree.node.gap');
        transition:
            background dt('tree.transition.duration'),
            color dt('tree.transition.duration'),
            outline-color dt('tree.transition.duration'),
            box-shadow dt('tree.transition.duration');
    }

    .p-tree-node-content[data-p-dragging] {
        outline: 1px dashed dt('primary.color');
        outline-offset: -1px;
    }

    .p-tree-node-content[data-pc-section="drag-image"] {
        background: dt('tree.background');
    }

    .p-tree-node:focus-visible > .p-tree-node-content {
        box-shadow: dt('tree.node.focus.ring.shadow');
        outline: dt('tree.node.focus.ring.width') dt('tree.node.focus.ring.style') dt('tree.node.focus.ring.color');
        outline-offset: dt('tree.node.focus.ring.offset');
    }

    .p-tree-node-content.p-tree-node-selectable:not(.p-tree-node-selected):hover {
        background: dt('tree.node.hover.background');
        color: dt('tree.node.hover.color');
    }

    .p-tree-node-content.p-tree-node-selectable:not(.p-tree-node-selected):hover .p-tree-node-icon {
        color: dt('tree.node.icon.hover.color');
    }

    .p-tree-node-content.p-tree-node-selected {
        background: dt('tree.node.selected.background');
        color: dt('tree.node.selected.color');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-toggle-button {
        color: inherit;
    }

    .p-tree-node-content.p-tree-node-dragover {
        background: dt('tree.node.hover.background');
        color: dt('tree.node.hover.color');
    }

    .p-tree-node-content:focus-visible,
    .p-tree-node-content.p-tree-node-contextmenu-selected {
        box-shadow: dt('tree.node.focus.ring.shadow');
        outline: dt('tree.node.focus.ring.width') dt('tree.node.focus.ring.style') dt('tree.node.focus.ring.color');
        outline-offset: dt('tree.node.focus.ring.offset');
    }

    .p-tree-node-drop-point {
		outline: 1px solid dt('primary.color');
	}

    .p-tree-node-toggle-button {
        cursor: pointer;
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        flex-shrink: 0;
        width: dt('tree.node.toggle.button.size');
        height: dt('tree.node.toggle.button.size');
        color: dt('tree.node.toggle.button.color');
        border: 0 none;
        background: transparent;
        border-radius: dt('tree.node.toggle.button.border.radius');
        transition:
            background dt('tree.transition.duration'),
            color dt('tree.transition.duration'),
            border-color dt('tree.transition.duration'),
            outline-color dt('tree.transition.duration'),
            box-shadow dt('tree.transition.duration');
        outline-color: transparent;
        padding: 0;
    }

    .p-tree-node-toggle-button:enabled:hover {
        background: dt('tree.node.toggle.button.hover.background');
        color: dt('tree.node.toggle.button.hover.color');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-toggle-button:hover {
        background: dt('tree.node.toggle.button.selected.hover.background');
        color: dt('tree.node.toggle.button.selected.hover.color');
    }

    .p-tree-root {
        overflow: auto;
    }

    .p-tree-node-selectable {
        cursor: pointer;
        user-select: none;
    }

    .p-tree-node-leaf > .p-tree-node-content .p-tree-node-toggle-button {
        visibility: hidden;
    }

    .p-tree-node-icon {
        color: dt('tree.node.icon.color');
        transition: color dt('tree.transition.duration');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-icon {
        color: dt('tree.node.icon.selected.color');
    }

    .p-tree-filter {
        margin: dt('tree.filter.margin');
    }

    .p-tree-filter-input {
        width: 100%;
    }

    .p-tree-loading-icon {
        font-size: dt('tree.loading.icon.size');
        width: dt('tree.loading.icon.size');
        height: dt('tree.loading.icon.size');
    }

    .p-tree .p-tree-mask {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-tree-flex-scrollable {
        display: flex;
        flex: 1;
        height: 100%;
        flex-direction: column;
    }

    .p-tree-flex-scrollable .p-tree-root {
        flex: 1;
    }
`;

// node_modules/primeng/fesm2022/primeng-tree.mjs
var _c0 = (a0) => ({
  height: a0
});
var _c1 = (a0, a1) => ({
  $implicit: a0,
  loading: a1
});
var _c2 = (a0, a1, a2) => ({
  $implicit: a0,
  partialSelected: a1,
  class: a2
});
var _c3 = (a0) => ({
  $implicit: a0
});
var _c4 = () => ({
  next: true
});
function UITreeNode_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 9);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("dropPoint"));
    ɵɵproperty("pBind", ctx_r1.getPTOptions("dropPoint"));
    ɵɵattribute("aria-hidden", true);
  }
}
function UITreeNode_Conditional_0_ng_container_4_ng_container_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 13);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r1.cx("nodeToggleIcon"));
    ɵɵproperty("pBind", ctx_r1.getPTOptions("nodeToggleIcon"));
  }
}
function UITreeNode_Conditional_0_ng_container_4_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 14);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r1.cx("nodeToggleIcon"));
    ɵɵproperty("pBind", ctx_r1.getPTOptions("nodeToggleIcon"));
  }
}
function UITreeNode_Conditional_0_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, UITreeNode_Conditional_0_ng_container_4_ng_container_1__svg_svg_1_Template, 1, 3, "svg", 11)(2, UITreeNode_Conditional_0_ng_container_4_ng_container_1__svg_svg_2_Template, 1, 3, "svg", 12);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.node.expanded);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.node.expanded);
  }
}
function UITreeNode_Conditional_0_ng_container_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵnamespaceSVG();
    ɵɵelement(1, "svg", 15);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("nodeToggleIcon"));
    ɵɵproperty("pBind", ctx_r1.getPTOptions("nodeToggleIcon"));
  }
}
function UITreeNode_Conditional_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, UITreeNode_Conditional_0_ng_container_4_ng_container_1_Template, 3, 2, "ng-container", 6)(2, UITreeNode_Conditional_0_ng_container_4_ng_container_2_Template, 2, 3, "ng-container", 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.node.loading);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.loadingMode === "icon" && ctx_r1.node.loading);
  }
}
function UITreeNode_Conditional_0_span_5_1_ng_template_0_Template(rf, ctx) {
}
function UITreeNode_Conditional_0_span_5_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, UITreeNode_Conditional_0_span_5_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function UITreeNode_Conditional_0_span_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 9);
    ɵɵtemplate(1, UITreeNode_Conditional_0_span_5_1_Template, 1, 0, null, 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("nodeToggleIcon"));
    ɵɵproperty("pBind", ctx_r1.getPTOptions("nodeToggleIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.tree.togglerIconTemplate || ctx_r1.tree._togglerIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(5, _c1, ctx_r1.node.expanded, ctx_r1.node.loading));
  }
}
function UITreeNode_Conditional_0_p_checkbox_6_ng_container_1_ng_template_1_0_ng_template_0_Template(rf, ctx) {
}
function UITreeNode_Conditional_0_p_checkbox_6_ng_container_1_ng_template_1_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, UITreeNode_Conditional_0_p_checkbox_6_ng_container_1_ng_template_1_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function UITreeNode_Conditional_0_p_checkbox_6_ng_container_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, UITreeNode_Conditional_0_p_checkbox_6_ng_container_1_ng_template_1_0_Template, 1, 0, null, 16);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.tree.checkboxIconTemplate || ctx_r1.tree._checkboxIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(2, _c2, ctx_r1.isSelected(), ctx_r1.node.partialSelected, ctx_r1.cx("nodeCheckbox")));
  }
}
function UITreeNode_Conditional_0_p_checkbox_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, UITreeNode_Conditional_0_p_checkbox_6_ng_container_1_ng_template_1_Template, 1, 6, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function UITreeNode_Conditional_0_p_checkbox_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "p-checkbox", 17);
    ɵɵlistener("click", function UITreeNode_Conditional_0_p_checkbox_6_Template_p_checkbox_click_0_listener($event) {
      return $event.preventDefault();
    });
    ɵɵtemplate(1, UITreeNode_Conditional_0_p_checkbox_6_ng_container_1_Template, 3, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngModel", ctx_r1.isSelected())("styleClass", ctx_r1.cx("nodeCheckbox"))("binary", true)("indeterminate", ctx_r1.node.partialSelected)("disabled", ctx_r1.node.selectable === false)("variant", (ctx_r1.tree == null ? null : ctx_r1.tree.config.inputStyle()) === "filled" || (ctx_r1.tree == null ? null : ctx_r1.tree.config.inputVariant()) === "filled" ? "filled" : "outlined")("tabindex", -1)("pt", ctx_r1.getPTOptions("pcNodeCheckbox"))("unstyled", ctx_r1.unstyled());
    ɵɵattribute("data-p-partialchecked", ctx_r1.node.partialSelected);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.tree.checkboxIconTemplate || ctx_r1.tree._checkboxIconTemplate);
  }
}
function UITreeNode_Conditional_0_span_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 9);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.getIcon());
    ɵɵproperty("pBind", ctx_r1.getPTOptions("nodeIcon"));
  }
}
function UITreeNode_Conditional_0_span_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.node.label);
  }
}
function UITreeNode_Conditional_0_span_10_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function UITreeNode_Conditional_0_span_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, UITreeNode_Conditional_0_span_10_ng_container_1_Template, 1, 0, "ng-container", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.tree.getTemplateForNode(ctx_r1.node))("ngTemplateOutletContext", ɵɵpureFunction1(2, _c3, ctx_r1.node));
  }
}
function UITreeNode_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 9);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("dropPoint", ɵɵpureFunction0(4, _c4)));
    ɵɵproperty("pBind", ctx_r1.getPTOptions("dropPoint"));
    ɵɵattribute("aria-hidden", true);
  }
}
function UITreeNode_Conditional_0_ul_12_p_treeNode_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "p-treeNode", 20);
  }
  if (rf & 2) {
    const childNode_r3 = ctx.$implicit;
    const firstChild_r4 = ctx.first;
    const lastChild_r5 = ctx.last;
    const index_r6 = ctx.index;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("node", childNode_r3)("parentNode", ctx_r1.node)("firstChild", firstChild_r4)("lastChild", lastChild_r5)("index", index_r6)("itemSize", ctx_r1.itemSize)("level", ctx_r1.level + 1)("loadingMode", ctx_r1.loadingMode)("pt", ctx_r1.pt)("unstyled", ctx_r1.unstyled());
  }
}
function UITreeNode_Conditional_0_ul_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 18);
    ɵɵtemplate(1, UITreeNode_Conditional_0_ul_12_p_treeNode_1_Template, 1, 10, "p-treeNode", 19);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("nodeChildren"));
    ɵɵproperty("pBind", ctx_r1.ptm("nodeChildren"));
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.node.children)("ngForTrackBy", ctx_r1.tree.trackBy.bind(ctx_r1));
  }
}
function UITreeNode_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 2);
    ɵɵlistener("keydown", function UITreeNode_Conditional_0_Template_li_keydown_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onKeyDown($event));
    });
    ɵɵconditionalCreate(1, UITreeNode_Conditional_0_Conditional_1_Template, 1, 4, "div", 3);
    ɵɵelementStart(2, "div", 4);
    ɵɵlistener("click", function UITreeNode_Conditional_0_Template_div_click_2_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNodeClick($event));
    })("contextmenu", function UITreeNode_Conditional_0_Template_div_contextmenu_2_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNodeRightClick($event));
    })("dblclick", function UITreeNode_Conditional_0_Template_div_dblclick_2_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNodeDblClick($event));
    })("touchend", function UITreeNode_Conditional_0_Template_div_touchend_2_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNodeTouchEnd());
    })("drop", function UITreeNode_Conditional_0_Template_div_drop_2_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNodeDrop($event));
    })("dragstart", function UITreeNode_Conditional_0_Template_div_dragstart_2_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNodeDragStart($event));
    })("dragover", function UITreeNode_Conditional_0_Template_div_dragover_2_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNodeDragOver($event));
    })("dragleave", function UITreeNode_Conditional_0_Template_div_dragleave_2_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNodeDragLeave($event));
    })("dragend", function UITreeNode_Conditional_0_Template_div_dragend_2_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNodeDragEnd($event));
    });
    ɵɵelementStart(3, "button", 5);
    ɵɵlistener("click", function UITreeNode_Conditional_0_Template_button_click_3_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.toggle($event));
    });
    ɵɵtemplate(4, UITreeNode_Conditional_0_ng_container_4_Template, 3, 2, "ng-container", 6)(5, UITreeNode_Conditional_0_span_5_Template, 2, 8, "span", 7);
    ɵɵelementEnd();
    ɵɵtemplate(6, UITreeNode_Conditional_0_p_checkbox_6_Template, 2, 11, "p-checkbox", 8)(7, UITreeNode_Conditional_0_span_7_Template, 1, 3, "span", 7);
    ɵɵelementStart(8, "span", 9);
    ɵɵtemplate(9, UITreeNode_Conditional_0_span_9_Template, 2, 1, "span", 6)(10, UITreeNode_Conditional_0_span_10_Template, 2, 4, "span", 6);
    ɵɵelementEnd()();
    ɵɵconditionalCreate(11, UITreeNode_Conditional_0_Conditional_11_Template, 1, 5, "div", 3);
    ɵɵtemplate(12, UITreeNode_Conditional_0_ul_12_Template, 2, 5, "ul", 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r1.node.style);
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("node"), ctx_r1.node.styleClass));
    ɵɵproperty("ngStyle", ɵɵpureFunction1(36, _c0, ctx_r1.itemSize + "px"))("pBind", ctx_r1.getPTOptions("node"));
    ɵɵattribute("aria-label", ctx_r1.node.label)("aria-checked", ctx_r1.checked)("aria-setsize", ctx_r1.node.children ? ctx_r1.node.children.length : 0)("aria-selected", ctx_r1.selected)("aria-expanded", ctx_r1.node.expanded)("aria-posinset", ctx_r1.index + 1)("aria-level", ctx_r1.level + 1)("tabindex", ctx_r1.index === 0 ? 0 : -1)("data-id", ctx_r1.node.key);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.isPrevDropPointActive() ? 1 : -1);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("nodeContent"));
    ɵɵstyleProp("padding-left", ctx_r1.level * ctx_r1.indentation + "rem");
    ɵɵproperty("draggable", ctx_r1.tree.draggableNodes)("pBind", ctx_r1.getPTOptions("nodeContent"));
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("nodeToggleButton"));
    ɵɵproperty("pBind", ctx_r1.getPTOptions("nodeToggleButton"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.tree.togglerIconTemplate && !ctx_r1.tree._togglerIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.tree.togglerIconTemplate || ctx_r1.tree._togglerIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.tree.selectionMode == "checkbox");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.node.icon || ctx_r1.node.expandedIcon || ctx_r1.node.collapsedIcon);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("nodeLabel"));
    ɵɵproperty("pBind", ctx_r1.getPTOptions("nodeLabel"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.tree.getTemplateForNode(ctx_r1.node));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.tree.getTemplateForNode(ctx_r1.node));
    ɵɵadvance();
    ɵɵconditional(ctx_r1.isNextDropPointActive() ? 11 : -1);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.tree.virtualScroll && ctx_r1.node.children && ctx_r1.node.expanded);
  }
}
var _c5 = ["filter"];
var _c6 = ["node"];
var _c7 = ["header"];
var _c8 = ["footer"];
var _c9 = ["loader"];
var _c10 = ["empty"];
var _c11 = ["togglericon"];
var _c12 = ["checkboxicon"];
var _c13 = ["loadingicon"];
var _c14 = ["filtericon"];
var _c15 = ["scroller"];
var _c16 = ["wrapper"];
var _c17 = ["content"];
var _c18 = (a0) => ({
  options: a0
});
function Tree_div_0_i_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 11);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("loadingIcon"), "pi-spin" + ctx_r0.loadingIcon));
    ɵɵproperty("pBind", ctx_r0.ptm("loadingIcon"));
  }
}
function Tree_div_0_ng_container_2__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 13);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("loadingIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("loadingIcon"));
  }
}
function Tree_div_0_ng_container_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Tree_div_0_ng_container_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Tree_div_0_ng_container_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Tree_div_0_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 11);
    ɵɵtemplate(1, Tree_div_0_ng_container_2_span_2_1_Template, 1, 0, null, 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("loadingIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("loadingIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.loadingIconTemplate || ctx_r0._loadingIconTemplate);
  }
}
function Tree_div_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Tree_div_0_ng_container_2__svg_svg_1_Template, 1, 3, "svg", 12)(2, Tree_div_0_ng_container_2_span_2_Template, 2, 4, "span", 7);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.loadingIconTemplate && !ctx_r0._loadingIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.loadingIconTemplate || ctx_r0._loadingIconTemplate);
  }
}
function Tree_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵanimateLeave("p-overlay-mask-leave-active");
    ɵɵanimateEnter("p-overlay-mask-enter-active");
    ɵɵtemplate(1, Tree_div_0_i_1_Template, 1, 3, "i", 7)(2, Tree_div_0_ng_container_2_Template, 3, 2, "ng-container", 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("mask"));
    ɵɵproperty("pBind", ctx_r0.ptm("mask"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.loadingIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.loadingIcon);
  }
}
function Tree_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Tree_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Tree_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Tree_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 14);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.filterTemplate || ctx_r0._filterTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c3, ctx_r0.filterOptions));
  }
}
function Tree_Conditional_3_p_iconfield_0__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 19);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("filterIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("filterIcon"));
  }
}
function Tree_Conditional_3_p_iconfield_0_span_5_1_ng_template_0_Template(rf, ctx) {
}
function Tree_Conditional_3_p_iconfield_0_span_5_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Tree_Conditional_3_p_iconfield_0_span_5_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Tree_Conditional_3_p_iconfield_0_span_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 11);
    ɵɵtemplate(1, Tree_Conditional_3_p_iconfield_0_span_5_1_Template, 1, 0, null, 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("filterIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("filterIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.filterIconTemplate || ctx_r0._filterIconTemplate);
  }
}
function Tree_Conditional_3_p_iconfield_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-iconfield", 16)(1, "input", 17, 0);
    ɵɵlistener("keydown.enter", function Tree_Conditional_3_p_iconfield_0_Template_input_keydown_enter_1_listener($event) {
      return $event.preventDefault();
    })("input", function Tree_Conditional_3_p_iconfield_0_Template_input_input_1_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._filter($event.target == null ? null : $event.target.value));
    });
    ɵɵelementEnd();
    ɵɵelementStart(3, "p-inputicon", 16);
    ɵɵtemplate(4, Tree_Conditional_3_p_iconfield_0__svg_svg_4_Template, 1, 3, "svg", 18)(5, Tree_Conditional_3_p_iconfield_0_span_5_Template, 2, 4, "span", 7);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("pcFilterContainer"));
    ɵɵproperty("pt", ctx_r0.ptm("pcFilterContainer"))("unstyled", ctx_r0.unstyled());
    ɵɵadvance();
    ɵɵclassMap(ctx_r0.cx("pcFilterInput"));
    ɵɵproperty("pAutoFocus", ctx_r0.filterInputAutoFocus)("pt", ctx_r0.ptm("pcFilterInput"))("unstyled", ctx_r0.unstyled());
    ɵɵattribute("placeholder", ctx_r0.filterPlaceholder);
    ɵɵadvance(2);
    ɵɵproperty("pt", ctx_r0.ptm("pcFilterIconContainer"))("unstyled", ctx_r0.unstyled());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.filterIconTemplate && !ctx_r0._filterIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.filterIconTemplate || ctx_r0._filterIconTemplate);
  }
}
function Tree_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Tree_Conditional_3_p_iconfield_0_Template, 6, 14, "p-iconfield", 15);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r0.filter);
  }
}
function Tree_ng_container_4_p_scroller_1_ng_template_2_ul_0_p_treeNode_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "p-treeNode", 25, 3);
  }
  if (rf & 2) {
    const rowNode_r4 = ctx.$implicit;
    const firstChild_r5 = ctx.first;
    const lastChild_r6 = ctx.last;
    const index_r7 = ctx.index;
    const scrollerOptions_r8 = ɵɵnextContext(2).options;
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("level", rowNode_r4.level)("rowNode", rowNode_r4)("node", rowNode_r4.node)("parentNode", rowNode_r4.parent)("firstChild", firstChild_r5)("lastChild", lastChild_r6)("index", ctx_r0.getIndex(scrollerOptions_r8, index_r7))("itemSize", scrollerOptions_r8.itemSize)("indentation", ctx_r0.indentation)("loadingMode", ctx_r0.loadingMode)("pt", ctx_r0.pt)("unstyled", ctx_r0.unstyled());
  }
}
function Tree_ng_container_4_p_scroller_1_ng_template_2_ul_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 23, 2);
    ɵɵtemplate(2, Tree_ng_container_4_p_scroller_1_ng_template_2_ul_0_p_treeNode_2_Template, 2, 12, "p-treeNode", 24);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r8 = ɵɵnextContext();
    const items_r10 = ctx_r8.$implicit;
    const scrollerOptions_r8 = ctx_r8.options;
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵstyleMap(scrollerOptions_r8.contentStyle);
    ɵɵclassMap(ctx_r0.cx("rootChildren"));
    ɵɵproperty("ngClass", scrollerOptions_r8.contentStyleClass)("pBind", ctx_r0.ptm("rootChildren"));
    ɵɵattribute("aria-label", ctx_r0.ariaLabel)("aria-labelledby", ctx_r0.ariaLabelledBy);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", items_r10)("ngForTrackBy", ctx_r0.trackBy);
  }
}
function Tree_ng_container_4_p_scroller_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Tree_ng_container_4_p_scroller_1_ng_template_2_ul_0_Template, 3, 10, "ul", 22);
  }
  if (rf & 2) {
    const items_r10 = ctx.$implicit;
    ɵɵproperty("ngIf", items_r10);
  }
}
function Tree_ng_container_4_p_scroller_1_ng_container_4_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Tree_ng_container_4_p_scroller_1_ng_container_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Tree_ng_container_4_p_scroller_1_ng_container_4_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 14);
  }
  if (rf & 2) {
    const scrollerOptions_r11 = ctx.options;
    const ctx_r0 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.loaderTemplate || ctx_r0._loaderTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c18, scrollerOptions_r11));
  }
}
function Tree_ng_container_4_p_scroller_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Tree_ng_container_4_p_scroller_1_ng_container_4_ng_template_1_Template, 1, 4, "ng-template", null, 4, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function Tree_ng_container_4_p_scroller_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-scroller", 21, 1);
    ɵɵlistener("onScroll", function Tree_ng_container_4_p_scroller_1_Template_p_scroller_onScroll_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onScroll.emit($event));
    })("onScrollIndexChange", function Tree_ng_container_4_p_scroller_1_Template_p_scroller_onScrollIndexChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onScrollIndexChange.emit($event));
    })("onLazyLoad", function Tree_ng_container_4_p_scroller_1_Template_p_scroller_onLazyLoad_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onLazyLoad.emit($event));
    });
    ɵɵtemplate(2, Tree_ng_container_4_p_scroller_1_ng_template_2_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor)(4, Tree_ng_container_4_p_scroller_1_ng_container_4_Template, 3, 0, "ng-container", 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵstyleMap(ɵɵpureFunction1(12, _c0, ctx_r0.scrollHeight !== "flex" ? ctx_r0.scrollHeight : void 0));
    ɵɵproperty("items", ctx_r0.serializedValue)("tabindex", -1)("styleClass", ctx_r0.cx("wrapper"))("scrollHeight", ctx_r0.scrollHeight !== "flex" ? void 0 : "100%")("itemSize", ctx_r0.virtualScrollItemSize)("lazy", ctx_r0.lazy)("options", ctx_r0.virtualScrollOptions)("pt", ctx_r0.ptm("virtualScroller"));
    ɵɵattribute("data-p", ctx_r0.wrapperDataP);
    ɵɵadvance(4);
    ɵɵproperty("ngIf", ctx_r0.loaderTemplate || ctx_r0._loaderTemplate);
  }
}
function Tree_ng_container_4_ng_container_2_ul_3_p_treeNode_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "p-treeNode", 29);
  }
  if (rf & 2) {
    const node_r12 = ctx.$implicit;
    const firstChild_r13 = ctx.first;
    const lastChild_r14 = ctx.last;
    const index_r15 = ctx.index;
    const ctx_r0 = ɵɵnextContext(4);
    ɵɵproperty("node", node_r12)("firstChild", firstChild_r13)("lastChild", lastChild_r14)("index", index_r15)("level", 0)("loadingMode", ctx_r0.loadingMode)("pt", ctx_r0.pt)("unstyled", ctx_r0.unstyled());
  }
}
function Tree_ng_container_4_ng_container_2_ul_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 27, 2);
    ɵɵtemplate(2, Tree_ng_container_4_ng_container_2_ul_3_p_treeNode_2_Template, 1, 8, "p-treeNode", 28);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("rootChildren"));
    ɵɵproperty("pBind", ctx_r0.ptm("rootChildren"));
    ɵɵattribute("aria-label", ctx_r0.ariaLabel)("aria-labelledby", ctx_r0.ariaLabelledBy);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r0.getRootNode())("ngForTrackBy", ctx_r0.trackBy.bind(ctx_r0));
  }
}
function Tree_ng_container_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 11, 5);
    ɵɵtemplate(3, Tree_ng_container_4_ng_container_2_ul_3_Template, 3, 7, "ul", 26);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵclassMap(ctx_r0.cx("wrapper"));
    ɵɵstyleProp("max-height", ctx_r0.scrollHeight);
    ɵɵproperty("pBind", ctx_r0.ptm("wrapper"));
    ɵɵattribute("data-p", ctx_r0.wrapperDataP);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.getRootNode());
  }
}
function Tree_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Tree_ng_container_4_p_scroller_1_Template, 5, 14, "p-scroller", 20)(2, Tree_ng_container_4_ng_container_2_Template, 4, 7, "ng-container", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.virtualScroll);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.virtualScroll);
  }
}
function Tree_div_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.emptyMessageLabel, " ");
  }
}
function Tree_div_5_2_ng_template_0_Template(rf, ctx) {
}
function Tree_div_5_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Tree_div_5_2_ng_template_0_Template, 0, 0, "ng-template", null, 6, ɵɵtemplateRefExtractor);
  }
}
function Tree_div_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, Tree_div_5_ng_container_1_Template, 2, 1, "ng-container", 30)(2, Tree_div_5_2_Template, 2, 0, null, 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("emptyMessage"));
    ɵɵproperty("pBind", ctx_r0.ptm("emptyMessage"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.emptyTemplate && !ctx_r0._emptyTemplate)("ngIfElse", ctx_r0.emptyFilter);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.emptyTemplate || ctx_r0._emptyTemplate);
  }
}
function Tree_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var classes = {
  root: ({
    instance
  }) => ["p-tree p-component", {
    "p-tree-selectable": instance.selectionMode != null,
    "p-tree-loading": instance.loading,
    "p-tree-flex-scrollable": instance.scrollHeight === "flex",
    "p-tree-node-dragover": instance.dragHover
  }],
  mask: "p-tree-mask p-overlay-mask",
  loadingIcon: "p-tree-loading-icon",
  pcFilterInput: "p-tree-filter-input",
  wrapper: "p-tree-root",
  rootChildren: "p-tree-root-children",
  node: ({
    instance
  }) => ({
    "p-tree-node": true,
    "p-tree-node-leaf": instance.isLeaf()
  }),
  nodeContent: ({
    instance
  }) => ({
    "p-tree-node-content": true,
    "p-tree-node-selectable": instance.selectable,
    "p-tree-node-dragover": instance.isNodeDropActive(),
    "p-tree-node-selected": instance.selectionMode === "checkbox" && instance.tree.highlightOnSelect ? instance.checked : instance.selected,
    "p-tree-node-contextmenu-selected": instance.isContextMenuSelected()
  }),
  nodeToggleButton: "p-tree-node-toggle-button",
  nodeToggleIcon: "p-tree-node-toggle-icon",
  nodeCheckbox: "p-tree-node-checkbox",
  nodeIcon: "p-tree-node-icon",
  nodeLabel: "p-tree-node-label",
  nodeChildren: "p-tree-node-children",
  emptyMessage: "p-tree-empty-message",
  dropPoint: "p-tree-node-drop-point"
};
var TreeStyle = class _TreeStyle extends BaseStyle {
  name = "tree";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTreeStyle_BaseFactory;
    return function TreeStyle_Factory(__ngFactoryType__) {
      return (ɵTreeStyle_BaseFactory || (ɵTreeStyle_BaseFactory = ɵɵgetInheritedFactory(_TreeStyle)))(__ngFactoryType__ || _TreeStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TreeStyle,
    factory: _TreeStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeStyle, [{
    type: Injectable
  }], null, null);
})();
var TreeClasses;
(function(TreeClasses2) {
  TreeClasses2["root"] = "p-tree";
  TreeClasses2["mask"] = "p-tree-mask";
  TreeClasses2["loadingIcon"] = "p-tree-loading-icon";
  TreeClasses2["pcFilterInput"] = "p-tree-filter-input";
  TreeClasses2["wrapper"] = "p-tree-root";
  TreeClasses2["rootChildren"] = "p-tree-root-children";
  TreeClasses2["node"] = "p-tree-node";
  TreeClasses2["nodeContent"] = "p-tree-node-content";
  TreeClasses2["nodeToggleButton"] = "p-tree-node-toggle-button";
  TreeClasses2["nodeToggleIcon"] = "p-tree-node-toggle-icon";
  TreeClasses2["nodeCheckbox"] = "p-tree-node-checkbox";
  TreeClasses2["nodeIcon"] = "p-tree-node-icon";
  TreeClasses2["nodeLabel"] = "p-tree-node-label";
  TreeClasses2["nodeChildren"] = "p-tree-node-children";
  TreeClasses2["emptyMessage"] = "p-tree-empty-message";
  TreeClasses2["dropPoint"] = "p-tree-node-droppoint";
})(TreeClasses || (TreeClasses = {}));
var TREE_INSTANCE = new InjectionToken("TREE_INSTANCE");
var TREENODE_INSTANCE = new InjectionToken("TREENODE_INSTANCE");
var UITreeNode = class _UITreeNode extends BaseComponent {
  $pcTreeNode = inject(TREENODE_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  static ICON_CLASS = "p-tree-node-icon ";
  rowNode;
  node;
  parentNode;
  root;
  index;
  firstChild;
  lastChild;
  level;
  indentation;
  itemSize;
  loadingMode;
  tree = inject(forwardRef(() => Tree));
  timeout;
  isPrevDropPointHovered = signal(false, ...ngDevMode ? [{
    debugName: "isPrevDropPointHovered"
  }] : []);
  isNextDropPointHovered = signal(false, ...ngDevMode ? [{
    debugName: "isNextDropPointHovered"
  }] : []);
  isNodeDropHovered = signal(false, ...ngDevMode ? [{
    debugName: "isNodeDropHovered"
  }] : []);
  isPrevDropPointActive = computed(() => this.isPrevDropPointHovered() && this.isDroppable(), ...ngDevMode ? [{
    debugName: "isPrevDropPointActive"
  }] : []);
  isNextDropPointActive = computed(() => this.isNextDropPointHovered() && this.isDroppable(), ...ngDevMode ? [{
    debugName: "isNextDropPointActive"
  }] : []);
  isNodeDropActive = computed(() => this.isNodeDropHovered() && this.isNodeDroppable(), ...ngDevMode ? [{
    debugName: "isNodeDropActive"
  }] : []);
  dropPosition = computed(() => this.isPrevDropPointActive() ? -1 : this.isNextDropPointActive() ? 1 : 0, ...ngDevMode ? [{
    debugName: "dropPosition"
  }] : []);
  _componentStyle = inject(TreeStyle);
  /**
   * Computed signal that reactively tracks selection state.
   */
  _selected = computed(() => {
    this.tree.selection();
    return this.tree.isSelected(this.node);
  }, ...ngDevMode ? [{
    debugName: "_selected"
  }] : []);
  /**
   * Computed signal that reactively tracks context menu selection state.
   */
  _contextMenuSelected = computed(() => {
    const selection = this.tree.contextMenuSelection();
    if (!selection || !this.node) {
      return false;
    }
    return selection === this.node || selection.key && selection.key === this.node.key;
  }, ...ngDevMode ? [{
    debugName: "_contextMenuSelected"
  }] : []);
  get selected() {
    return this.tree.selectionMode === "single" || this.tree.selectionMode === "multiple" ? this._selected() : void 0;
  }
  get checked() {
    return this.tree.selectionMode === "checkbox" ? this._selected() : void 0;
  }
  get nodeClass() {
    return this.tree._componentStyle.classes.node({
      instance: this
    });
  }
  get selectable() {
    return this.node?.selectable === false ? false : this.tree?.selectionMode != null;
  }
  get subNodes() {
    return this.node?.parent ? this.node.parent.children : this.tree.value;
  }
  getPTOptions(key) {
    return this.ptm(key, {
      context: {
        node: this.node,
        index: this.index,
        expanded: this.node?.expanded,
        selected: this.selected,
        checked: this.checked,
        partialChecked: this.node?.partialSelected,
        leaf: this.isLeaf()
      }
    });
  }
  onInit() {
    this.node.parent = this.parentNode;
    const nativeElement = this.tree.el.nativeElement;
    const pDialogWrapper = nativeElement.closest("p-dialog");
    if (this.parentNode && !pDialogWrapper) {
      this.setAllNodesTabIndexes();
      this.tree.syncNodeOption(this.node, this.tree.value, "parent", this.tree.getNodeWithKey(this.parentNode.key, this.tree.value));
    }
  }
  getIcon() {
    let icon;
    if (this.node.icon) icon = this.node.icon;
    else icon = this.node.expanded && this.node.children && this.node.children?.length ? this.node.expandedIcon : this.node.collapsedIcon;
    return _UITreeNode.ICON_CLASS + " " + icon + " p-tree-node-icon";
  }
  isLeaf() {
    return this.tree.isNodeLeaf(this.node);
  }
  isSelected() {
    return this._selected();
  }
  isContextMenuSelected() {
    return this._contextMenuSelected();
  }
  isSameNode(event) {
    return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('[role="treeitem"]')));
  }
  isDraggable() {
    return this.tree.draggableNodes;
  }
  isDroppable() {
    return this.tree.droppableNodes && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope);
  }
  isNodeDroppable() {
    return this.node?.droppable !== false && this.isDroppable();
  }
  isNodeDraggable() {
    return this.node?.draggable !== false && this.isDraggable();
  }
  toggle(event) {
    if (this.node.expanded) this.collapse(event);
    else this.expand(event);
    event.stopPropagation();
  }
  expand(event) {
    this.node.expanded = true;
    if (this.tree.virtualScroll) {
      this.tree.updateSerializedValue();
      this.focusVirtualNode();
    }
    this.tree.onNodeExpand.emit({
      originalEvent: event,
      node: this.node
    });
  }
  collapse(event) {
    this.node.expanded = false;
    if (this.tree.virtualScroll) {
      this.tree.updateSerializedValue();
      this.focusVirtualNode();
    }
    this.tree.onNodeCollapse.emit({
      originalEvent: event,
      node: this.node
    });
  }
  onNodeClick(event) {
    this.tree.onNodeClick(event, this.node);
  }
  onNodeKeydown(event) {
    if (event.key === "Enter") {
      this.tree.onNodeClick(event, this.node);
    }
  }
  onNodeTouchEnd() {
    this.tree.onNodeTouchEnd();
  }
  onNodeRightClick(event) {
    this.tree.onNodeRightClick(event, this.node);
  }
  onNodeDblClick(event) {
    this.tree.onNodeDblClick(event, this.node);
  }
  insertNodeOnDrop() {
    const {
      dragNode,
      dragNodeIndex,
      dragNodeSubNodes
    } = this.tree;
    if (!this.node || dragNodeIndex == null || !dragNode || !dragNodeSubNodes) {
      return;
    }
    const position = this.dropPosition();
    const subNodes = this.subNodes || [];
    const index = this.index || 0;
    const dropIndex = dragNodeSubNodes === subNodes ? dragNodeIndex > index ? index : index - 1 : index;
    dragNodeSubNodes.splice(dragNodeIndex, 1);
    if (position < 0) {
      subNodes.splice(dropIndex, 0, dragNode);
    } else if (position > 0) {
      subNodes.splice(dropIndex + 1, 0, dragNode);
    } else {
      this.node.children = this.node.children || [];
      this.node.children.push(dragNode);
    }
    this.tree.dragDropService.stopDrag({
      node: dragNode,
      subNodes,
      index: dragNodeIndex
    });
  }
  onNodeDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isDroppable()) {
      const {
        dragNode
      } = this.tree;
      const position = this.dropPosition();
      const isValidDrop = position !== 0 || position === 0 && this.isNodeDroppable();
      if (isValidDrop) {
        if (this.tree.validateDrop) {
          this.tree.onNodeDrop.emit({
            originalEvent: event,
            dragNode,
            dropNode: this.node,
            index: this.index,
            accept: () => {
              this.insertNodeOnDrop();
            }
          });
        } else {
          this.insertNodeOnDrop();
          this.tree.onNodeDrop.emit({
            originalEvent: event,
            dragNode,
            dropNode: this.node,
            index: this.index
          });
        }
      }
    }
    this.isPrevDropPointHovered.set(false);
    this.isNextDropPointHovered.set(false);
    this.isNodeDropHovered.set(false);
  }
  onNodeDragStart(event) {
    if (this.isNodeDraggable()) {
      event.dataTransfer.effectAllowed = "all";
      event.dataTransfer?.setData("text", "data");
      const target = event.currentTarget;
      const dragEl = target.cloneNode(true);
      const toggler = dragEl.querySelector('[data-pc-section="nodetogglebutton"]');
      const checkbox = dragEl.querySelector('[data-pc-name="pcnodecheckbox"]');
      target.setAttribute("data-p-dragging", "true");
      dragEl.style.width = v(target) + "px";
      dragEl.style.height = C(target) + "px";
      dragEl.setAttribute("data-pc-section", "drag-image");
      toggler.style.visibility = "hidden";
      checkbox?.remove();
      document.body.appendChild(dragEl);
      event.dataTransfer?.setDragImage(dragEl, 0, 0);
      setTimeout(() => document.body.removeChild(dragEl), 0);
      this.tree.dragDropService.startDrag({
        tree: this,
        node: this.node,
        subNodes: this.subNodes,
        index: this.index,
        scope: this.tree.draggableScope
      });
    } else {
      event.preventDefault();
    }
  }
  onNodeDragOver(event) {
    if (this.isDroppable()) {
      event.dataTransfer.dropEffect = "copy";
      const nodeElement = event.currentTarget;
      const rect = nodeElement.getBoundingClientRect();
      const y = event.clientY - parseInt(rect.top);
      this.isPrevDropPointHovered.set(false);
      this.isNextDropPointHovered.set(false);
      this.isNodeDropHovered.set(false);
      if (y < rect.height * 0.25) {
        this.isPrevDropPointHovered.set(true);
      } else if (y > rect.height * 0.75) {
        this.isNextDropPointHovered.set(true);
      } else if (this.isNodeDroppable()) {
        this.isNodeDropHovered.set(true);
      }
    } else {
      event.dataTransfer.dropEffect = "none";
    }
    if (this.tree.droppableNodes) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  onNodeDragLeave() {
    this.isPrevDropPointHovered.set(false);
    this.isNextDropPointHovered.set(false);
    this.isNodeDropHovered.set(false);
  }
  onNodeDragEnd(event) {
    event.currentTarget?.removeAttribute("data-p-dragging");
    this.tree.dragDropService.stopDrag({
      node: this.node,
      subNodes: this.subNodes,
      index: this.index
    });
  }
  onKeyDown(event) {
    if (!this.isSameNode(event) || this.tree.contextMenu && this.tree.contextMenu.containerViewChild?.nativeElement.style.display === "block") {
      return;
    }
    switch (event.code) {
      //down arrow
      case "ArrowDown":
        this.onArrowDown(event);
        break;
      //up arrow
      case "ArrowUp":
        this.onArrowUp(event);
        break;
      //right arrow
      case "ArrowRight":
        this.onArrowRight(event);
        break;
      //left arrow
      case "ArrowLeft":
        this.onArrowLeft(event);
        break;
      //enter
      case "Enter":
      case "Space":
      case "NumpadEnter":
        this.onEnter(event);
        break;
      //tab
      case "Tab":
        this.setAllNodesTabIndexes();
        break;
      default:
        break;
    }
  }
  onArrowUp(event) {
    const nodeElement = event.target.getAttribute("data-pc-section") === "nodetogglebutton" ? event.target.closest('[role="treeitem"]') : event.target.parentElement;
    if (nodeElement?.previousElementSibling) {
      this.focusRowChange(nodeElement, nodeElement.previousElementSibling, this.findLastVisibleDescendant(nodeElement.previousElementSibling));
    } else {
      let parentNodeElement = this.getParentNodeElement(nodeElement);
      if (parentNodeElement) {
        this.focusRowChange(nodeElement, parentNodeElement);
      }
    }
    event.preventDefault();
  }
  onArrowDown(event) {
    const nodeElement = event.target.getAttribute("data-pc-section") === "nodetogglebutton" ? event.target.closest('[role="treeitem"]') : event.target;
    const listElement = nodeElement?.children[1];
    if (listElement && listElement.children.length > 0) {
      this.focusRowChange(nodeElement, listElement.children[0]);
    } else {
      if (nodeElement?.parentElement?.nextElementSibling) {
        this.focusRowChange(nodeElement, nodeElement.parentElement.nextElementSibling);
      } else {
        let nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement?.parentElement);
        if (nextSiblingAncestor) {
          this.focusRowChange(nodeElement, nextSiblingAncestor);
        }
      }
    }
    event.preventDefault();
  }
  onArrowRight(event) {
    if (!this.node?.expanded && !this.tree.isNodeLeaf(this.node)) {
      this.expand(event);
      event.currentTarget.tabIndex = -1;
      setTimeout(() => {
        this.onArrowDown(event);
      }, 1);
    }
    event.preventDefault();
  }
  onArrowLeft(event) {
    const nodeElement = event.target.getAttribute("data-pc-section") === "nodetogglebutton" ? event.target.closest('[role="treeitem"]') : event.target;
    if (this.level === 0 && !this.node?.expanded) {
      return false;
    }
    if (this.node?.expanded) {
      this.collapse(event);
      return;
    }
    let parentNodeElement = this.getParentNodeElement(nodeElement?.parentElement);
    if (parentNodeElement) {
      this.focusRowChange(event.currentTarget, parentNodeElement);
    }
    event.preventDefault();
  }
  onEnter(event) {
    this.tree.onNodeClick(event, this.node);
    this.setTabIndexForSelectionMode(event, this.tree.nodeTouched);
    event.preventDefault();
  }
  setAllNodesTabIndexes() {
    const nodes = Y(this.tree.el.nativeElement, '[data-pc-section="node"]');
    const hasSelectedNode = [...nodes].some((node) => node.getAttribute("aria-selected") === "true" || node.getAttribute("aria-checked") === "true");
    [...nodes].forEach((node) => {
      node.tabIndex = -1;
    });
    if (hasSelectedNode) {
      const selectedNodes = [...nodes].filter((node) => node.getAttribute("aria-selected") === "true" || node.getAttribute("aria-checked") === "true");
      selectedNodes[0].tabIndex = 0;
      return;
    }
    if (nodes.length) {
      [...nodes][0].tabIndex = 0;
    }
  }
  setTabIndexForSelectionMode(event, nodeTouched) {
    if (this.tree.selectionMode !== null) {
      const elements = [...Y(this.tree.el.nativeElement, '[role="treeitem"]')];
      event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;
      if (elements.every((element) => element.tabIndex === -1)) {
        elements[0].tabIndex = 0;
      }
    }
  }
  findNextSiblingOfAncestor(nodeElement) {
    let parentNodeElement = this.getParentNodeElement(nodeElement);
    if (parentNodeElement) {
      if (parentNodeElement.nextElementSibling) return parentNodeElement.nextElementSibling;
      else return this.findNextSiblingOfAncestor(parentNodeElement);
    } else {
      return null;
    }
  }
  findLastVisibleDescendant(nodeElement) {
    const listElement = Array.from(nodeElement.children).find((el) => el.getAttribute("data-pc-section") === "node");
    const childrenListElement = listElement?.children[1];
    if (childrenListElement && childrenListElement.children.length > 0) {
      const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
      return this.findLastVisibleDescendant(lastChildElement);
    } else {
      return nodeElement;
    }
  }
  getParentNodeElement(nodeElement) {
    const parentNodeElement = nodeElement.parentElement?.parentElement?.parentElement;
    return parentNodeElement?.tagName === "P-TREENODE" ? parentNodeElement : null;
  }
  focusNode(element) {
    if (this.tree.droppableNodes) element.children[1].focus();
    else element.children[0].focus();
  }
  focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant) {
    firstFocusableRow.tabIndex = "-1";
    currentFocusedRow.children[0].tabIndex = "0";
    this.focusNode(lastVisibleDescendant || currentFocusedRow);
  }
  focusVirtualNode() {
    this.timeout = setTimeout(() => {
      let node = z(this.tree?.contentViewChild?.nativeElement, `[data-id="${this.node?.key ?? this.node?.data}"]`);
      bt(node);
    }, 1);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵUITreeNode_BaseFactory;
    return function UITreeNode_Factory(__ngFactoryType__) {
      return (ɵUITreeNode_BaseFactory || (ɵUITreeNode_BaseFactory = ɵɵgetInheritedFactory(_UITreeNode)))(__ngFactoryType__ || _UITreeNode);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _UITreeNode,
    selectors: [["p-treeNode"]],
    inputs: {
      rowNode: "rowNode",
      node: "node",
      parentNode: "parentNode",
      root: [2, "root", "root", booleanAttribute],
      index: [2, "index", "index", numberAttribute],
      firstChild: [2, "firstChild", "firstChild", booleanAttribute],
      lastChild: [2, "lastChild", "lastChild", booleanAttribute],
      level: [2, "level", "level", numberAttribute],
      indentation: [2, "indentation", "indentation", numberAttribute],
      itemSize: [2, "itemSize", "itemSize", numberAttribute],
      loadingMode: "loadingMode"
    },
    features: [ɵɵProvidersFeature([TreeStyle, {
      provide: TREENODE_INSTANCE,
      useExisting: _UITreeNode
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _UITreeNode
    }]), ɵɵInheritDefinitionFeature],
    decls: 1,
    vars: 1,
    consts: [["icon", ""], ["role", "treeitem", 3, "class", "ngStyle", "style", "pBind"], ["role", "treeitem", 3, "keydown", "ngStyle", "pBind"], [3, "class", "pBind"], [3, "click", "contextmenu", "dblclick", "touchend", "drop", "dragstart", "dragover", "dragleave", "dragend", "draggable", "pBind"], ["type", "button", "pRipple", "", "tabindex", "-1", 3, "click", "pBind"], [4, "ngIf"], [3, "class", "pBind", 4, "ngIf"], [3, "ngModel", "styleClass", "binary", "indeterminate", "disabled", "variant", "tabindex", "pt", "unstyled", "click", 4, "ngIf"], [3, "pBind"], ["role", "group", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "chevron-right", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "chevron-down", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "chevron-right", 3, "pBind"], ["data-p-icon", "chevron-down", 3, "pBind"], ["data-p-icon", "spinner", "spin", "", 3, "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "click", "ngModel", "styleClass", "binary", "indeterminate", "disabled", "variant", "tabindex", "pt", "unstyled"], ["role", "group", 3, "pBind"], [3, "node", "parentNode", "firstChild", "lastChild", "index", "itemSize", "level", "loadingMode", "pt", "unstyled", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "node", "parentNode", "firstChild", "lastChild", "index", "itemSize", "level", "loadingMode", "pt", "unstyled"]],
    template: function UITreeNode_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, UITreeNode_Conditional_0_Template, 13, 38, "li", 1);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.node ? 0 : -1);
      }
    },
    dependencies: [_UITreeNode, CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgStyle, Ripple, Checkbox, FormsModule, NgControlStatus, NgModel, ChevronRightIcon, ChevronDownIcon, SpinnerIcon, SharedModule, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UITreeNode, [{
    type: Component,
    args: [{
      selector: "p-treeNode",
      standalone: true,
      imports: [CommonModule, Ripple, Checkbox, FormsModule, ChevronRightIcon, ChevronDownIcon, SpinnerIcon, SharedModule, BindModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
        @if (node) {
            <li
                [class]="cn(cx('node'), node.styleClass)"
                [ngStyle]="{ height: itemSize + 'px' }"
                [style]="node.style"
                [attr.aria-label]="node.label"
                [attr.aria-checked]="checked"
                [attr.aria-setsize]="node.children ? node.children.length : 0"
                [attr.aria-selected]="selected"
                [attr.aria-expanded]="node.expanded"
                [attr.aria-posinset]="index + 1"
                [attr.aria-level]="level + 1"
                [attr.tabindex]="index === 0 ? 0 : -1"
                [attr.data-id]="node.key"
                role="treeitem"
                (keydown)="onKeyDown($event)"
                [pBind]="getPTOptions('node')"
            >
                @if (isPrevDropPointActive()) {
                    <div [class]="cx('dropPoint')" [attr.aria-hidden]="true" [pBind]="getPTOptions('dropPoint')"></div>
                }
                <div
                    [class]="cx('nodeContent')"
                    [style.paddingLeft]="level * indentation + 'rem'"
                    (click)="onNodeClick($event)"
                    (contextmenu)="onNodeRightClick($event)"
                    (dblclick)="onNodeDblClick($event)"
                    (touchend)="onNodeTouchEnd()"
                    (drop)="onNodeDrop($event)"
                    (dragstart)="onNodeDragStart($event)"
                    (dragover)="onNodeDragOver($event)"
                    (dragleave)="onNodeDragLeave($event)"
                    (dragend)="onNodeDragEnd($event)"
                    [draggable]="tree.draggableNodes"
                    [pBind]="getPTOptions('nodeContent')"
                >
                    <button type="button" [class]="cx('nodeToggleButton')" (click)="toggle($event)" pRipple tabindex="-1" [pBind]="getPTOptions('nodeToggleButton')">
                        <ng-container *ngIf="!tree.togglerIconTemplate && !tree._togglerIconTemplate">
                            <ng-container *ngIf="!node.loading">
                                <svg data-p-icon="chevron-right" *ngIf="!node.expanded" [class]="cx('nodeToggleIcon')" [pBind]="getPTOptions('nodeToggleIcon')" />
                                <svg data-p-icon="chevron-down" *ngIf="node.expanded" [class]="cx('nodeToggleIcon')" [pBind]="getPTOptions('nodeToggleIcon')" />
                            </ng-container>
                            <ng-container *ngIf="loadingMode === 'icon' && node.loading">
                                <svg data-p-icon="spinner" [class]="cx('nodeToggleIcon')" spin [pBind]="getPTOptions('nodeToggleIcon')" />
                            </ng-container>
                        </ng-container>
                        <span *ngIf="tree.togglerIconTemplate || tree._togglerIconTemplate" [class]="cx('nodeToggleIcon')" [pBind]="getPTOptions('nodeToggleIcon')">
                            <ng-template *ngTemplateOutlet="tree.togglerIconTemplate || tree._togglerIconTemplate; context: { $implicit: node.expanded, loading: node.loading }"></ng-template>
                        </span>
                    </button>

                    <p-checkbox
                        [ngModel]="isSelected()"
                        [styleClass]="cx('nodeCheckbox')"
                        [binary]="true"
                        [indeterminate]="node.partialSelected"
                        *ngIf="tree.selectionMode == 'checkbox'"
                        [disabled]="node.selectable === false"
                        [variant]="tree?.config.inputStyle() === 'filled' || tree?.config.inputVariant() === 'filled' ? 'filled' : 'outlined'"
                        [attr.data-p-partialchecked]="node.partialSelected"
                        [tabindex]="-1"
                        (click)="$event.preventDefault()"
                        [pt]="getPTOptions('pcNodeCheckbox')"
                        [unstyled]="unstyled()"
                    >
                        <ng-container *ngIf="tree.checkboxIconTemplate || tree._checkboxIconTemplate">
                            <ng-template #icon>
                                <ng-template
                                    *ngTemplateOutlet="
                                        tree.checkboxIconTemplate || tree._checkboxIconTemplate;
                                        context: {
                                            $implicit: isSelected(),
                                            partialSelected: node.partialSelected,
                                            class: cx('nodeCheckbox')
                                        }
                                    "
                                ></ng-template>
                            </ng-template>
                        </ng-container>
                    </p-checkbox>

                    <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon" [pBind]="getPTOptions('nodeIcon')"></span>
                    <span [class]="cx('nodeLabel')" [pBind]="getPTOptions('nodeLabel')">
                        <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                        <span *ngIf="tree.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                        </span>
                    </span>
                </div>
                @if (isNextDropPointActive()) {
                    <div [class]="cx('dropPoint', { next: true })" [attr.aria-hidden]="true" [pBind]="getPTOptions('dropPoint')"></div>
                }
                <ul [class]="cx('nodeChildren')" *ngIf="!tree.virtualScroll && node.children && node.expanded" role="group" [pBind]="ptm('nodeChildren')">
                    <p-treeNode
                        *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; let index = index; trackBy: tree.trackBy.bind(this)"
                        [node]="childNode"
                        [parentNode]="node"
                        [firstChild]="firstChild"
                        [lastChild]="lastChild"
                        [index]="index"
                        [itemSize]="itemSize"
                        [level]="level + 1"
                        [loadingMode]="loadingMode"
                        [pt]="pt"
                        [unstyled]="unstyled()"
                    ></p-treeNode>
                </ul>
            </li>
        }
    `,
      encapsulation: ViewEncapsulation.None,
      providers: [TreeStyle, {
        provide: TREENODE_INSTANCE,
        useExisting: UITreeNode
      }, {
        provide: PARENT_INSTANCE,
        useExisting: UITreeNode
      }]
    }]
  }], null, {
    rowNode: [{
      type: Input
    }],
    node: [{
      type: Input
    }],
    parentNode: [{
      type: Input
    }],
    root: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    index: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    firstChild: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    lastChild: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    level: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    indentation: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    itemSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    loadingMode: [{
      type: Input
    }]
  });
})();
var Tree = class _Tree extends BaseComponent {
  dragDropService;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcTree = inject(TREE_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * An array of treenodes.
   * @group Props
   */
  value;
  /**
   * Defines the selection mode.
   * @group Props
   */
  selectionMode;
  /**
   * Loading mode display.
   * @group Props
   */
  loadingMode = "mask";
  /**
   * A single treenode instance or an array to refer to the selections.
   * @group Props
   */
  selection = model(null, ...ngDevMode ? [{
    debugName: "selection"
  }] : []);
  /**
   * Style class of the component.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Context menu instance.
   * @group Props
   */
  contextMenu;
  /**
   * Defines the behavior of context menu selection, in "separate" mode context menu updates contextMenuSelection property whereas in joint mode selection property is used instead so that when row selection is enabled, both row selection and context menu selection use the same property.
   * @group Props
   */
  contextMenuSelectionMode = "joint";
  /**
   * Selected node with a context menu.
   * @group Props
   */
  contextMenuSelection = model(null, ...ngDevMode ? [{
    debugName: "contextMenuSelection"
  }] : []);
  /**
   * Scope of the draggable nodes to match a droppableScope.
   * @group Props
   */
  draggableScope;
  /**
   * Scope of the droppable nodes to match a draggableScope.
   * @group Props
   */
  droppableScope;
  /**
   * Whether the nodes are draggable.
   * @group Props
   */
  draggableNodes;
  /**
   * Whether the nodes are droppable.
   * @group Props
   */
  droppableNodes;
  /**
   * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
   * @group Props
   */
  metaKeySelection = false;
  /**
   * Whether checkbox selections propagate to ancestor nodes.
   * @group Props
   */
  propagateSelectionUp = true;
  /**
   * Whether checkbox selections propagate to descendant nodes.
   * @group Props
   */
  propagateSelectionDown = true;
  /**
   * Displays a loader to indicate data load is in progress.
   * @group Props
   */
  loading;
  /**
   * The icon to show while indicating data load is in progress.
   * @group Props
   */
  loadingIcon;
  /**
   * Text to display when there is no data.
   * @group Props
   */
  emptyMessage = "";
  /**
   * Used to define a string that labels the tree.
   * @group Props
   */
  ariaLabel;
  /**
   * Defines a string that labels the toggler icon for accessibility.
   * @group Props
   */
  togglerAriaLabel;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * When enabled, drop can be accepted or rejected based on condition defined at onNodeDrop.
   * @group Props
   */
  validateDrop;
  /**
   * When specified, displays an input field to filter the items.
   * @group Props
   */
  filter;
  /**
   * Determines whether the filter input should be automatically focused when the component is rendered.
   * @group Props
   */
  filterInputAutoFocus = false;
  /**
   * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
   * @group Props
   */
  filterBy = "label";
  /**
   * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
   * @group Props
   */
  filterMode = "lenient";
  /**
   * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
   * @group Props
   */
  filterOptions;
  /**
   * Placeholder text to show when filter input is empty.
   * @group Props
   */
  filterPlaceholder;
  /**
   * Values after the tree nodes are filtered.
   * @group Props
   */
  filteredNodes;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * Height of the scrollable viewport.
   * @group Props
   */
  scrollHeight;
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
   * Height of an item in the list for VirtualScrolling.
   * @group Props
   */
  virtualScrollItemSize;
  /**
   * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  virtualScrollOptions;
  /**
   * Indentation factor for spacing of the nested node when virtual scrolling is enabled.
   * @group Props
   */
  indentation = 1.5;
  /**
   * Custom templates of the component.
   * @group Props
   */
  _templateMap;
  /**
   * Function to optimize the node list rendering, default algorithm checks for object identity.
   * @group Props
   */
  trackBy = (index, item) => item;
  /**
   * Highlights the node on select.
   * @group Props
   */
  highlightOnSelect = false;
  /**
   * Callback to invoke when a node is selected.
   * @param {TreeNodeSelectEvent} event - Node select event.
   * @group Emits
   */
  onNodeSelect = new EventEmitter();
  /**
   * Callback to invoke when a node is unselected.
   * @param {TreeNodeUnSelectEvent} event - Node unselect event.
   * @group Emits
   */
  onNodeUnselect = new EventEmitter();
  /**
   * Callback to invoke when a node is expanded.
   * @param {TreeNodeExpandEvent} event - Node expand event.
   * @group Emits
   */
  onNodeExpand = new EventEmitter();
  /**
   * Callback to invoke when a node is collapsed.
   * @param {TreeNodeCollapseEvent} event - Node collapse event.
   * @group Emits
   */
  onNodeCollapse = new EventEmitter();
  /**
   * Callback to invoke when a node is selected with right click.
   * @param {onNodeContextMenuSelect} event - Node context menu select event.
   * @group Emits
   */
  onNodeContextMenuSelect = new EventEmitter();
  /**
   * Callback to invoke when a node is double clicked.
   * @param {TreeNodeDoubleClickEvent} event - Node double click event.
   * @group Emits
   */
  onNodeDoubleClick = new EventEmitter();
  /**
   * Callback to invoke when a node is dropped.
   * @param {TreeNodeDropEvent} event - Node drop event.
   * @group Emits
   */
  onNodeDrop = new EventEmitter();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {TreeLazyLoadEvent} event - Custom lazy load event.
   * @group Emits
   */
  onLazyLoad = new EventEmitter();
  /**
   * Callback to invoke in virtual scroll mode when scroll position changes.
   * @param {TreeScrollEvent} event - Custom scroll event.
   * @group Emits
   */
  onScroll = new EventEmitter();
  /**
   * Callback to invoke in virtual scroll mode when scroll position and item's range in view changes.
   * @param {TreeScrollIndexChangeEvent} event - Scroll index change event.
   * @group Emits
   */
  onScrollIndexChange = new EventEmitter();
  /**
   * Callback to invoke when data is filtered.
   * @param {TreeFilterEvent} event - Custom filter event.
   * @group Emits
   */
  onFilter = new EventEmitter();
  /**
   * Custom filter template.
   * @param {TreeFilterTemplateContext} context - filter context.
   * @see {@link TreeFilterTemplateContext}
   * @group Templates
   */
  filterTemplate;
  /**
   * Custom node template.
   * @group Templates
   */
  nodeTemplate;
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
   * Custom loader template.
   * @param {TreeLoaderTemplateContext} context - loader context.
   * @see {@link TreeLoaderTemplateContext}
   * @group Templates
   */
  loaderTemplate;
  /**
   * Custom empty message template.
   * @group Templates
   */
  emptyTemplate;
  /**
   * Custom toggler icon template.
   * @param {TreeTogglerIconTemplateContext} context - toggler icon context.
   * @see {@link TreeTogglerIconTemplateContext}
   * @group Templates
   */
  togglerIconTemplate;
  /**
   * Custom checkbox icon template.
   * @param {TreeCheckboxIconTemplateContext} context - checkbox icon context.
   * @see {@link TreeCheckboxIconTemplateContext}
   * @group Templates
   */
  checkboxIconTemplate;
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
  filterViewChild;
  scroller;
  wrapperViewChild;
  contentViewChild;
  templates;
  _headerTemplate;
  _emptyTemplate;
  _footerTemplate;
  _loaderTemplate;
  _togglerIconTemplate;
  _checkboxIconTemplate;
  _loadingIconTemplate;
  _filterIconTemplate;
  _filterTemplate;
  onAfterContentInit() {
    if (this.templates.length) {
      this._templateMap = {};
    }
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this._headerTemplate = item.template;
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
        case "togglericon":
          this._togglerIconTemplate = item.template;
          break;
        case "checkboxicon":
          this._checkboxIconTemplate = item.template;
          break;
        case "loadingicon":
          this._loadingIconTemplate = item.template;
          break;
        case "filtericon":
          this._filterIconTemplate = item.template;
          break;
        case "filter":
          this._filterTemplate = item.template;
          break;
        default:
          this._templateMap[item.name] = item.template;
          break;
      }
    });
  }
  serializedValue;
  nodeTouched;
  dragNodeTree;
  dragNode;
  dragNodeSubNodes;
  dragNodeIndex;
  dragNodeScope;
  dragHover;
  dragStartSubscription;
  dragStopSubscription;
  _componentStyle = inject(TreeStyle);
  handleDropEvent(event) {
    this.onDrop(event);
  }
  handleDragOverEvent(event) {
    this.onDragOver(event);
  }
  handleDragEnterEvent() {
    this.onDragEnter();
  }
  handleDragLeaveEvent(event) {
    this.onDragLeave(event);
  }
  constructor(dragDropService) {
    super();
    this.dragDropService = dragDropService;
  }
  onInit() {
    if (this.filterBy) {
      this.filterOptions = {
        filter: (value) => this._filter(value),
        reset: () => this.resetFilter()
      };
    }
    if (this.droppableNodes) {
      this.dragStartSubscription = this.dragDropService.dragStart$.subscribe((event) => {
        this.dragNodeTree = event.tree;
        this.dragNode = event.node;
        this.dragNodeSubNodes = event.subNodes;
        this.dragNodeIndex = event.index;
        this.dragNodeScope = event.scope;
      });
      this.dragStopSubscription = this.dragDropService.dragStop$.subscribe((event) => {
        this.dragNodeTree = null;
        this.dragNode = null;
        this.dragNodeSubNodes = null;
        this.dragNodeIndex = null;
        this.dragNodeScope = null;
        this.dragHover = false;
      });
    }
  }
  onChanges(simpleChange) {
    if (simpleChange.value) {
      this.updateSerializedValue();
      if (this.hasFilterActive()) {
        this._filter(this.filterViewChild?.nativeElement?.value);
      }
    }
  }
  get emptyMessageLabel() {
    return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
  }
  updateSerializedValue() {
    this.serializedValue = [];
    this.serializeNodes(null, this.getRootNode(), 0, true);
  }
  serializeNodes(parent, nodes, level, visible) {
    if (nodes && nodes.length) {
      for (let node of nodes) {
        node.parent = parent;
        const rowNode = {
          node,
          parent,
          level,
          visible: visible && (parent ? parent.expanded : true)
        };
        this.serializedValue.push(rowNode);
        if (rowNode.visible && node.expanded) {
          this.serializeNodes(node, node.children, level + 1, rowNode.visible);
        }
      }
    }
  }
  onNodeClick(event, node) {
    let eventTarget = event.target;
    const section = eventTarget?.getAttribute?.("data-pc-section");
    if (section === "nodetogglebutton" || section === "nodetoggleicon") {
      return;
    }
    if (this.selectionMode) {
      if (node.selectable === false) {
        node.style = "--p-focus-ring-color: none;";
        return;
      } else {
        if (!node.style?.includes("--p-focus-ring-color")) {
          node.style = node.style ? `${node.style}--p-focus-ring-color: var(--primary-color)` : "--p-focus-ring-color: var(--primary-color)";
        }
      }
      if (this.hasFilteredNodes()) {
        node = this.getNodeWithKey(node.key, this.filteredNodes);
        if (!node) {
          return;
        }
      }
      let index = this.findIndexInSelection(node);
      let selected = index >= 0;
      const currentSelection = this.selection();
      if (this.isCheckboxSelectionMode()) {
        if (selected) {
          if (this.propagateSelectionDown) this.propagateDown(node, false);
          else this.selection.set(currentSelection.filter((_val, i) => i != index));
          if (this.propagateSelectionUp && node.parent) {
            this.propagateUp(node.parent, false);
          }
          this.onNodeUnselect.emit({
            originalEvent: event,
            node
          });
        } else {
          if (this.propagateSelectionDown) this.propagateDown(node, true);
          else this.selection.set([...currentSelection || [], node]);
          if (this.propagateSelectionUp && node.parent) {
            this.propagateUp(node.parent, true);
          }
          this.onNodeSelect.emit({
            originalEvent: event,
            node
          });
        }
      } else {
        let metaSelection = this.nodeTouched ? false : this.metaKeySelection;
        if (metaSelection) {
          let metaKey = event.metaKey || event.ctrlKey;
          if (selected && metaKey) {
            if (this.isSingleSelectionMode()) {
              this.selection.set(null);
            } else {
              this.selection.set(currentSelection.filter((_val, i) => i != index));
            }
            this.onNodeUnselect.emit({
              originalEvent: event,
              node
            });
          } else {
            if (this.isSingleSelectionMode()) {
              this.selection.set(node);
            } else if (this.isMultipleSelectionMode()) {
              const base = !metaKey ? [] : currentSelection || [];
              this.selection.set([...base, node]);
            }
            this.onNodeSelect.emit({
              originalEvent: event,
              node
            });
          }
        } else {
          if (this.isSingleSelectionMode()) {
            if (selected) {
              this.selection.set(null);
              this.onNodeUnselect.emit({
                originalEvent: event,
                node
              });
            } else {
              this.selection.set(node);
              setTimeout(() => {
                this.onNodeSelect.emit({
                  originalEvent: event,
                  node
                });
              });
            }
          } else {
            if (selected) {
              this.selection.set(currentSelection.filter((_val, i) => i != index));
              this.onNodeUnselect.emit({
                originalEvent: event,
                node
              });
            } else {
              this.selection.set([...currentSelection || [], node]);
              setTimeout(() => {
                this.onNodeSelect.emit({
                  originalEvent: event,
                  node
                });
              });
            }
          }
        }
      }
    }
    this.nodeTouched = false;
  }
  onNodeTouchEnd() {
    this.nodeTouched = true;
  }
  onNodeRightClick(event, node) {
    if (this.contextMenu) {
      let eventTarget = event.target;
      const section = eventTarget.getAttribute("data-pc-section");
      if (section === "nodetogglebutton" || section === "nodetoggleicon") {
        return;
      }
      let index = this.findIndexInSelection(node);
      let isNodeSelected = index >= 0;
      const onContextMenuCallback = () => {
        this.contextMenu.show(event);
        this.contextMenu.hideCallback = () => {
          this.contextMenuSelection.set(null);
        };
        this.onNodeContextMenuSelect.emit({
          originalEvent: event,
          node
        });
      };
      if (this.contextMenuSelectionMode === "separate") {
        this.contextMenuSelection.set(node);
        onContextMenuCallback();
      } else if (this.contextMenuSelectionMode === "joint") {
        if (!isNodeSelected) {
          if (this.isSingleSelectionMode()) {
            this.selection.set(node);
          } else {
            this.selection.set([node]);
          }
        }
        onContextMenuCallback();
      }
    }
  }
  onNodeDblClick(event, node) {
    this.onNodeDoubleClick.emit({
      originalEvent: event,
      node
    });
  }
  findIndexInSelection(node) {
    let index = -1;
    const currentSelection = this.selection();
    if (this.selectionMode && currentSelection) {
      if (this.isSingleSelectionMode()) {
        const sel = currentSelection;
        let areNodesEqual = sel.key && sel.key === node.key || sel == node;
        index = areNodesEqual ? 0 : -1;
      } else {
        const selArray = currentSelection;
        for (let i = 0; i < selArray.length; i++) {
          let selectedNode = selArray[i];
          let areNodesEqual = selectedNode.key && selectedNode.key === node.key || selectedNode == node;
          if (areNodesEqual) {
            index = i;
            break;
          }
        }
      }
    }
    return index;
  }
  syncNodeOption(node, parentNodes, option, value) {
    const _node = this.hasFilteredNodes() ? this.getNodeWithKey(node.key, parentNodes) : null;
    if (_node) {
      _node[option] = value || node[option];
    }
  }
  hasFilteredNodes() {
    return this.filter && this.filteredNodes && this.filteredNodes.length;
  }
  hasFilterActive() {
    return this.filter && this.filterViewChild?.nativeElement?.value.length > 0;
  }
  getNodeWithKey(key, nodes) {
    for (let node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        let matchedNode = this.getNodeWithKey(key, node.children);
        if (matchedNode) {
          return matchedNode;
        }
      }
    }
  }
  propagateUp(node, select) {
    if (node.children && node.children.length) {
      let selectedCount = 0;
      let childPartialSelected = false;
      for (let child of node.children) {
        if (this.isSelected(child)) {
          selectedCount++;
        } else if (child.partialSelected) {
          childPartialSelected = true;
        }
      }
      const currentSelection = this.selection() || [];
      if (select && selectedCount == node.children.length) {
        this.selection.set([...currentSelection, node]);
        node.partialSelected = false;
      } else {
        if (!select) {
          let index = this.findIndexInSelection(node);
          if (index >= 0) {
            this.selection.set(currentSelection.filter((_val, i) => i != index));
          }
        }
        if (childPartialSelected || selectedCount > 0 && selectedCount != node.children.length) node.partialSelected = true;
        else node.partialSelected = false;
      }
      this.syncNodeOption(node, this.filteredNodes, "partialSelected");
    }
    let parent = node.parent;
    if (parent) {
      this.propagateUp(parent, select);
    }
  }
  propagateDown(node, select) {
    let index = this.findIndexInSelection(node);
    const currentSelection = this.selection() || [];
    if (select && index == -1) {
      this.selection.set([...currentSelection, node]);
    } else if (!select && index > -1) {
      this.selection.set(currentSelection.filter((_val, i) => i != index));
    }
    node.partialSelected = false;
    this.syncNodeOption(node, this.filteredNodes, "partialSelected");
    if (node.children && node.children.length) {
      for (let child of node.children) {
        this.propagateDown(child, select);
      }
    }
  }
  isSelected(node) {
    return this.findIndexInSelection(node) != -1;
  }
  isSingleSelectionMode() {
    return this.selectionMode && this.selectionMode == "single";
  }
  isMultipleSelectionMode() {
    return this.selectionMode && this.selectionMode == "multiple";
  }
  isCheckboxSelectionMode() {
    return this.selectionMode && this.selectionMode == "checkbox";
  }
  isNodeLeaf(node) {
    return node.leaf == false ? false : !(node.children && node.children.length);
  }
  getRootNode() {
    return this.filteredNodes ? this.filteredNodes : this.value;
  }
  getTemplateForNode(node) {
    if (this._templateMap) return node.type ? this._templateMap[node.type] : this._templateMap["default"];
    else return null;
  }
  onDragOver(event) {
    if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
      event.dataTransfer.dropEffect = "copy";
      event.preventDefault();
    }
  }
  onDrop(event) {
    if (this.droppableNodes) {
      event.preventDefault();
      let dragNode = this.dragNode;
      if (this.isSameTreeScope(this.dragNodeScope)) {
        return;
      }
      if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
        let dragNodeIndex = this.dragNodeIndex;
        this.value = this.value || [];
        if (this.validateDrop) {
          this.onNodeDrop.emit({
            originalEvent: event,
            dragNode,
            dropNode: null,
            index: dragNodeIndex,
            accept: () => {
              this.processTreeDrop(dragNode, dragNodeIndex);
            }
          });
        } else {
          this.onNodeDrop.emit({
            originalEvent: event,
            dragNode,
            dropNode: null,
            index: dragNodeIndex
          });
          this.processTreeDrop(dragNode, dragNodeIndex);
        }
      }
    }
  }
  processTreeDrop(dragNode, dragNodeIndex) {
    this.dragNodeSubNodes.splice(dragNodeIndex, 1);
    this.value.push(dragNode);
    this.dragDropService.stopDrag({
      node: dragNode
    });
  }
  onDragEnter() {
    if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
      this.dragHover = true;
    }
  }
  onDragLeave(event) {
    if (this.droppableNodes) {
      let rect = event.currentTarget.getBoundingClientRect();
      if (event.x > parseInt(rect.left) + rect.width || event.x < parseInt(rect.left) || event.y > parseInt(rect.top) + rect.height || event.y < parseInt(rect.top)) {
        this.dragHover = false;
      }
    }
  }
  allowDrop(dragNode, dropNode, dragNodeScope) {
    if (!dragNode) {
      return false;
    } else if (this.isValidDragScope(dragNodeScope)) {
      let allow = true;
      if (dropNode) {
        if (dragNode === dropNode) {
          allow = false;
        } else {
          let parent = dropNode.parent;
          while (parent != null) {
            if (parent === dragNode) {
              allow = false;
              break;
            }
            parent = parent.parent;
          }
        }
      }
      return allow;
    } else {
      return false;
    }
  }
  hasCommonScope(dragScope, dropScope) {
    if (typeof dropScope === "string") {
      if (typeof dragScope === "string") return dropScope === dragScope;
      else if (Array.isArray(dragScope)) return dragScope.indexOf(dropScope) != -1;
    } else if (Array.isArray(dropScope)) {
      if (typeof dragScope === "string") {
        return dropScope.indexOf(dragScope) != -1;
      } else if (Array.isArray(dragScope)) {
        for (let s3 of dropScope) {
          for (let ds of dragScope) {
            if (s3 === ds) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  isSameTreeScope(dragScope) {
    return this.hasCommonScope(dragScope, this.draggableScope);
  }
  isValidDragScope(dragScope) {
    let dropScope = this.droppableScope;
    if (dropScope) {
      return this.hasCommonScope(dragScope, dropScope);
    } else {
      return true;
    }
  }
  _filter(value) {
    let filterValue = value;
    if (filterValue === "") {
      this.filteredNodes = null;
    } else {
      this.filteredNodes = [];
      const searchFields = this.filterBy.split(",");
      const filterText = X(filterValue).toLocaleLowerCase(this.filterLocale);
      const isStrictMode = this.filterMode === "strict";
      for (let node of this.value) {
        let copyNode = __spreadValues({}, node);
        let paramsWithoutNode = {
          searchFields,
          filterText,
          isStrictMode
        };
        if (isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode)) || !isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode))) {
          this.filteredNodes.push(copyNode);
        }
      }
    }
    this.updateSerializedValue();
    this.onFilter.emit({
      filter: filterValue,
      filteredValue: this.filteredNodes
    });
  }
  /**
   * Resets filter.
   * @group Method
   */
  resetFilter() {
    this.filteredNodes = null;
    if (this.filterViewChild && this.filterViewChild.nativeElement) {
      this.filterViewChild.nativeElement.value = "";
    }
  }
  /**
   * Scrolls to virtual index.
   * @param {number} number - Index to be scrolled.
   * @group Method
   */
  scrollToVirtualIndex(index) {
    this.virtualScroll && this.scroller?.scrollToIndex(index);
  }
  /**
   * Scrolls to virtual index.
   * @param {ScrollToOptions} options - Scroll options.
   * @group Method
   */
  scrollTo(options) {
    if (this.virtualScroll) {
      this.scroller?.scrollTo(options);
    } else if (this.wrapperViewChild && this.wrapperViewChild.nativeElement) {
      if (this.wrapperViewChild.nativeElement.scrollTo) {
        this.wrapperViewChild.nativeElement.scrollTo(options);
      } else {
        this.wrapperViewChild.nativeElement.scrollLeft = options.left;
        this.wrapperViewChild.nativeElement.scrollTop = options.top;
      }
    }
  }
  findFilteredNodes(node, paramsWithoutNode) {
    if (node) {
      let matched = false;
      if (node.children) {
        let childNodes = [...node.children];
        node.children = [];
        for (let childNode of childNodes) {
          let copyChildNode = __spreadValues({}, childNode);
          if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
            matched = true;
            node.children.push(copyChildNode);
          }
        }
      }
      if (matched) {
        node.expanded = true;
        return true;
      }
    }
  }
  isFilterMatched(node, params) {
    let {
      searchFields,
      filterText,
      isStrictMode
    } = params;
    let matched = false;
    for (let field of searchFields) {
      let fieldValue = X(String(p(node, field))).toLocaleLowerCase(this.filterLocale);
      if (fieldValue.indexOf(filterText) > -1) {
        matched = true;
      }
    }
    if (!matched || isStrictMode && !this.isNodeLeaf(node)) {
      matched = this.findFilteredNodes(node, {
        searchFields,
        filterText,
        isStrictMode
      }) || matched;
    }
    return matched;
  }
  getIndex(options, index) {
    const getItemOptions = options["getItemOptions"];
    return getItemOptions ? getItemOptions(index).index : index;
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  onDestroy() {
    if (this.dragStartSubscription) {
      this.dragStartSubscription.unsubscribe();
    }
    if (this.dragStopSubscription) {
      this.dragStopSubscription.unsubscribe();
    }
  }
  get containerDataP() {
    return this.cn({
      loading: this.loading,
      scrollable: this.scrollHeight === "flex"
    });
  }
  get wrapperDataP() {
    return this.cn({
      scrollable: this.scrollHeight === "flex"
    });
  }
  static ɵfac = function Tree_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Tree)(ɵɵdirectiveInject(TreeDragDropService, 8));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Tree,
    selectors: [["p-tree"]],
    contentQueries: function Tree_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c5, 4)(dirIndex, _c6, 4)(dirIndex, _c7, 4)(dirIndex, _c8, 4)(dirIndex, _c9, 4)(dirIndex, _c10, 4)(dirIndex, _c11, 4)(dirIndex, _c12, 4)(dirIndex, _c13, 4)(dirIndex, _c14, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nodeTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loaderTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.togglerIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.checkboxIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loadingIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Tree_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c5, 5)(_c15, 5)(_c16, 5)(_c17, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scroller = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.wrapperViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentViewChild = _t.first);
      }
    },
    hostVars: 3,
    hostBindings: function Tree_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("drop", function Tree_drop_HostBindingHandler($event) {
          return ctx.handleDropEvent($event);
        })("dragover", function Tree_dragover_HostBindingHandler($event) {
          return ctx.handleDragOverEvent($event);
        })("dragenter", function Tree_dragenter_HostBindingHandler() {
          return ctx.handleDragEnterEvent();
        })("dragleave", function Tree_dragleave_HostBindingHandler($event) {
          return ctx.handleDragLeaveEvent($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("data-p", ctx.containerDataP);
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      value: "value",
      selectionMode: "selectionMode",
      loadingMode: "loadingMode",
      selection: [1, "selection"],
      styleClass: "styleClass",
      contextMenu: "contextMenu",
      contextMenuSelectionMode: "contextMenuSelectionMode",
      contextMenuSelection: [1, "contextMenuSelection"],
      draggableScope: "draggableScope",
      droppableScope: "droppableScope",
      draggableNodes: [2, "draggableNodes", "draggableNodes", booleanAttribute],
      droppableNodes: [2, "droppableNodes", "droppableNodes", booleanAttribute],
      metaKeySelection: [2, "metaKeySelection", "metaKeySelection", booleanAttribute],
      propagateSelectionUp: [2, "propagateSelectionUp", "propagateSelectionUp", booleanAttribute],
      propagateSelectionDown: [2, "propagateSelectionDown", "propagateSelectionDown", booleanAttribute],
      loading: [2, "loading", "loading", booleanAttribute],
      loadingIcon: "loadingIcon",
      emptyMessage: "emptyMessage",
      ariaLabel: "ariaLabel",
      togglerAriaLabel: "togglerAriaLabel",
      ariaLabelledBy: "ariaLabelledBy",
      validateDrop: [2, "validateDrop", "validateDrop", booleanAttribute],
      filter: [2, "filter", "filter", booleanAttribute],
      filterInputAutoFocus: [2, "filterInputAutoFocus", "filterInputAutoFocus", booleanAttribute],
      filterBy: "filterBy",
      filterMode: "filterMode",
      filterOptions: "filterOptions",
      filterPlaceholder: "filterPlaceholder",
      filteredNodes: "filteredNodes",
      filterLocale: "filterLocale",
      scrollHeight: "scrollHeight",
      lazy: [2, "lazy", "lazy", booleanAttribute],
      virtualScroll: [2, "virtualScroll", "virtualScroll", booleanAttribute],
      virtualScrollItemSize: [2, "virtualScrollItemSize", "virtualScrollItemSize", numberAttribute],
      virtualScrollOptions: "virtualScrollOptions",
      indentation: [2, "indentation", "indentation", numberAttribute],
      _templateMap: "_templateMap",
      trackBy: "trackBy",
      highlightOnSelect: [2, "highlightOnSelect", "highlightOnSelect", booleanAttribute]
    },
    outputs: {
      selection: "selectionChange",
      contextMenuSelection: "contextMenuSelectionChange",
      onNodeSelect: "onNodeSelect",
      onNodeUnselect: "onNodeUnselect",
      onNodeExpand: "onNodeExpand",
      onNodeCollapse: "onNodeCollapse",
      onNodeContextMenuSelect: "onNodeContextMenuSelect",
      onNodeDoubleClick: "onNodeDoubleClick",
      onNodeDrop: "onNodeDrop",
      onLazyLoad: "onLazyLoad",
      onScroll: "onScroll",
      onScrollIndexChange: "onScrollIndexChange",
      onFilter: "onFilter"
    },
    features: [ɵɵProvidersFeature([TreeStyle, {
      provide: TREE_INSTANCE,
      useExisting: _Tree
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Tree
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 7,
    vars: 6,
    consts: [["filter", ""], ["scroller", ""], ["content", ""], ["treeNode", ""], ["loader", ""], ["wrapper", ""], ["emptyFilter", ""], [3, "class", "pBind", 4, "ngIf"], [4, "ngTemplateOutlet"], [3, "class", "pt", "unstyled"], [4, "ngIf"], [3, "pBind"], ["data-p-icon", "spinner", "spin", "", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "spinner", "spin", "", 3, "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "class", "pt", "unstyled", 4, "ngIf"], [3, "pt", "unstyled"], ["pInputText", "", "type", "search", "autocomplete", "off", 3, "keydown.enter", "input", "pAutoFocus", "pt", "unstyled"], ["data-p-icon", "search", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "search", 3, "pBind"], ["hostName", "tree", 3, "items", "tabindex", "styleClass", "style", "scrollHeight", "itemSize", "lazy", "options", "pt", "onScroll", "onScrollIndexChange", "onLazyLoad", 4, "ngIf"], ["hostName", "tree", 3, "onScroll", "onScrollIndexChange", "onLazyLoad", "items", "tabindex", "styleClass", "scrollHeight", "itemSize", "lazy", "options", "pt"], ["role", "tree", 3, "class", "ngClass", "style", "pBind", 4, "ngIf"], ["role", "tree", 3, "ngClass", "pBind"], [3, "level", "rowNode", "node", "parentNode", "firstChild", "lastChild", "index", "itemSize", "indentation", "loadingMode", "pt", "unstyled", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "level", "rowNode", "node", "parentNode", "firstChild", "lastChild", "index", "itemSize", "indentation", "loadingMode", "pt", "unstyled"], ["role", "tree", 3, "class", "pBind", 4, "ngIf"], ["role", "tree", 3, "pBind"], [3, "node", "firstChild", "lastChild", "index", "level", "loadingMode", "pt", "unstyled", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "node", "firstChild", "lastChild", "index", "level", "loadingMode", "pt", "unstyled"], [4, "ngIf", "ngIfElse"]],
    template: function Tree_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, Tree_div_0_Template, 3, 5, "div", 7)(1, Tree_ng_container_1_Template, 1, 0, "ng-container", 8);
        ɵɵconditionalCreate(2, Tree_Conditional_2_Template, 1, 4, "ng-container")(3, Tree_Conditional_3_Template, 1, 1, "p-iconfield", 9);
        ɵɵtemplate(4, Tree_ng_container_4_Template, 3, 2, "ng-container", 10)(5, Tree_div_5_Template, 3, 6, "div", 7)(6, Tree_ng_container_6_Template, 1, 0, "ng-container", 8);
      }
      if (rf & 2) {
        let tmp_3_0;
        ɵɵproperty("ngIf", ctx.loading && ctx.loadingMode === "mask");
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.headerTemplate || ctx._headerTemplate);
        ɵɵadvance();
        ɵɵconditional(ctx.filterTemplate || ctx._filterTemplate ? 2 : 3);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", (tmp_3_0 = ctx.getRootNode()) == null ? null : tmp_3_0.length);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.loading && (ctx.getRootNode() == null || ctx.getRootNode().length === 0));
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.footerTemplate || ctx._footerTemplate);
      }
    },
    dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet, Scroller, SharedModule, SearchIcon, SpinnerIcon, InputText, FormsModule, IconField, InputIcon, UITreeNode, AutoFocusModule, AutoFocus, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tree, [{
    type: Component,
    args: [{
      selector: "p-tree",
      standalone: true,
      imports: [CommonModule, Scroller, SharedModule, SearchIcon, SpinnerIcon, InputText, FormsModule, IconField, InputIcon, UITreeNode, AutoFocusModule, Bind],
      template: `
        <div [class]="cx('mask')" *ngIf="loading && loadingMode === 'mask'" [pBind]="ptm('mask')" animate.enter="p-overlay-mask-enter-active" animate.leave="p-overlay-mask-leave-active">
            <i *ngIf="loadingIcon" [class]="cn(cx('loadingIcon'), 'pi-spin' + loadingIcon)" [pBind]="ptm('loadingIcon')"></i>
            <ng-container *ngIf="!loadingIcon">
                <svg data-p-icon="spinner" *ngIf="!loadingIconTemplate && !_loadingIconTemplate" spin [class]="cx('loadingIcon')" [pBind]="ptm('loadingIcon')" />
                <span *ngIf="loadingIconTemplate || _loadingIconTemplate" [class]="cx('loadingIcon')" [pBind]="ptm('loadingIcon')">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate || _loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
        </div>
        <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
        @if (filterTemplate || _filterTemplate) {
            <ng-container *ngTemplateOutlet="filterTemplate || _filterTemplate; context: { $implicit: filterOptions }"></ng-container>
        } @else {
            <p-iconfield *ngIf="filter" [class]="cx('pcFilterContainer')" [pt]="ptm('pcFilterContainer')" [unstyled]="unstyled()">
                <input
                    #filter
                    [pAutoFocus]="filterInputAutoFocus"
                    pInputText
                    type="search"
                    autocomplete="off"
                    [class]="cx('pcFilterInput')"
                    [attr.placeholder]="filterPlaceholder"
                    (keydown.enter)="$event.preventDefault()"
                    (input)="_filter($event.target?.value)"
                    [pt]="ptm('pcFilterInput')"
                    [unstyled]="unstyled()"
                />
                <p-inputicon [pt]="ptm('pcFilterIconContainer')" [unstyled]="unstyled()">
                    <svg data-p-icon="search" *ngIf="!filterIconTemplate && !_filterIconTemplate" [class]="cx('filterIcon')" [pBind]="ptm('filterIcon')" />
                    <span *ngIf="filterIconTemplate || _filterIconTemplate" [class]="cx('filterIcon')" [pBind]="ptm('filterIcon')">
                        <ng-template *ngTemplateOutlet="filterIconTemplate || _filterIconTemplate"></ng-template>
                    </span>
                </p-inputicon>
            </p-iconfield>
        }

        <ng-container *ngIf="getRootNode()?.length">
            <p-scroller
                #scroller
                *ngIf="virtualScroll"
                [items]="serializedValue"
                [tabindex]="-1"
                [styleClass]="cx('wrapper')"
                [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                [itemSize]="virtualScrollItemSize"
                [lazy]="lazy"
                (onScroll)="onScroll.emit($event)"
                (onScrollIndexChange)="onScrollIndexChange.emit($event)"
                (onLazyLoad)="onLazyLoad.emit($event)"
                [options]="virtualScrollOptions"
                [pt]="ptm('virtualScroller')"
                hostName="tree"
                [attr.data-p]="wrapperDataP"
            >
                <ng-template #content let-items let-scrollerOptions="options">
                    <ul
                        *ngIf="items"
                        #content
                        [class]="cx('rootChildren')"
                        [ngClass]="scrollerOptions.contentStyleClass"
                        [style]="scrollerOptions.contentStyle"
                        role="tree"
                        [attr.aria-label]="ariaLabel"
                        [attr.aria-labelledby]="ariaLabelledBy"
                        [pBind]="ptm('rootChildren')"
                    >
                        <p-treeNode
                            #treeNode
                            *ngFor="let rowNode of items; let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy"
                            [level]="rowNode.level"
                            [rowNode]="rowNode"
                            [node]="rowNode.node"
                            [parentNode]="rowNode.parent"
                            [firstChild]="firstChild"
                            [lastChild]="lastChild"
                            [index]="getIndex(scrollerOptions, index)"
                            [itemSize]="scrollerOptions.itemSize"
                            [indentation]="indentation"
                            [loadingMode]="loadingMode"
                            [pt]="pt"
                            [unstyled]="unstyled()"
                        ></p-treeNode>
                    </ul>
                </ng-template>
                <ng-container *ngIf="loaderTemplate || _loaderTemplate">
                    <ng-template #loader let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="loaderTemplate || _loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                    </ng-template>
                </ng-container>
            </p-scroller>
            <ng-container *ngIf="!virtualScroll">
                <div #wrapper [class]="cx('wrapper')" [style.max-height]="scrollHeight" [pBind]="ptm('wrapper')" [attr.data-p]="wrapperDataP">
                    <ul #content [class]="cx('rootChildren')" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy" [pBind]="ptm('rootChildren')">
                        <p-treeNode
                            *ngFor="let node of getRootNode(); let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy.bind(this)"
                            [node]="node"
                            [firstChild]="firstChild"
                            [lastChild]="lastChild"
                            [index]="index"
                            [level]="0"
                            [loadingMode]="loadingMode"
                            [pt]="pt"
                            [unstyled]="unstyled()"
                        ></p-treeNode>
                    </ul>
                </div>
            </ng-container>
        </ng-container>

        <div [class]="cx('emptyMessage')" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)" [pBind]="ptm('emptyMessage')">
            <ng-container *ngIf="!emptyTemplate && !_emptyTemplate; else emptyFilter">
                {{ emptyMessageLabel }}
            </ng-container>
            <ng-template #emptyFilter *ngTemplateOutlet="emptyTemplate || _emptyTemplate"></ng-template>
        </div>
        <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [TreeStyle, {
        provide: TREE_INSTANCE,
        useExisting: Tree
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Tree
      }],
      host: {
        "[class]": "cn(cx('root'), styleClass)",
        "[attr.data-p]": "containerDataP"
      },
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: TreeDragDropService,
    decorators: [{
      type: Optional
    }]
  }], {
    value: [{
      type: Input
    }],
    selectionMode: [{
      type: Input
    }],
    loadingMode: [{
      type: Input
    }],
    selection: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "selection",
        required: false
      }]
    }, {
      type: Output,
      args: ["selectionChange"]
    }],
    styleClass: [{
      type: Input
    }],
    contextMenu: [{
      type: Input
    }],
    contextMenuSelectionMode: [{
      type: Input
    }],
    contextMenuSelection: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "contextMenuSelection",
        required: false
      }]
    }, {
      type: Output,
      args: ["contextMenuSelectionChange"]
    }],
    draggableScope: [{
      type: Input
    }],
    droppableScope: [{
      type: Input
    }],
    draggableNodes: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    droppableNodes: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    metaKeySelection: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    propagateSelectionUp: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    propagateSelectionDown: [{
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
    loadingIcon: [{
      type: Input
    }],
    emptyMessage: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    togglerAriaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    validateDrop: [{
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
    filterInputAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterBy: [{
      type: Input
    }],
    filterMode: [{
      type: Input
    }],
    filterOptions: [{
      type: Input
    }],
    filterPlaceholder: [{
      type: Input
    }],
    filteredNodes: [{
      type: Input
    }],
    filterLocale: [{
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
    virtualScrollItemSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    virtualScrollOptions: [{
      type: Input
    }],
    indentation: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    _templateMap: [{
      type: Input
    }],
    trackBy: [{
      type: Input
    }],
    highlightOnSelect: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onNodeSelect: [{
      type: Output
    }],
    onNodeUnselect: [{
      type: Output
    }],
    onNodeExpand: [{
      type: Output
    }],
    onNodeCollapse: [{
      type: Output
    }],
    onNodeContextMenuSelect: [{
      type: Output
    }],
    onNodeDoubleClick: [{
      type: Output
    }],
    onNodeDrop: [{
      type: Output
    }],
    onLazyLoad: [{
      type: Output
    }],
    onScroll: [{
      type: Output
    }],
    onScrollIndexChange: [{
      type: Output
    }],
    onFilter: [{
      type: Output
    }],
    filterTemplate: [{
      type: ContentChild,
      args: ["filter", {
        descendants: false
      }]
    }],
    nodeTemplate: [{
      type: ContentChild,
      args: ["node", {
        descendants: false
      }]
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
    loaderTemplate: [{
      type: ContentChild,
      args: ["loader", {
        descendants: false
      }]
    }],
    emptyTemplate: [{
      type: ContentChild,
      args: ["empty", {
        descendants: false
      }]
    }],
    togglerIconTemplate: [{
      type: ContentChild,
      args: ["togglericon", {
        descendants: false
      }]
    }],
    checkboxIconTemplate: [{
      type: ContentChild,
      args: ["checkboxicon", {
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
    filterViewChild: [{
      type: ViewChild,
      args: ["filter"]
    }],
    scroller: [{
      type: ViewChild,
      args: ["scroller"]
    }],
    wrapperViewChild: [{
      type: ViewChild,
      args: ["wrapper"]
    }],
    contentViewChild: [{
      type: ViewChild,
      args: ["content"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    handleDropEvent: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }],
    handleDragOverEvent: [{
      type: HostListener,
      args: ["dragover", ["$event"]]
    }],
    handleDragEnterEvent: [{
      type: HostListener,
      args: ["dragenter"]
    }],
    handleDragLeaveEvent: [{
      type: HostListener,
      args: ["dragleave", ["$event"]]
    }]
  });
})();
var TreeModule = class _TreeModule {
  static ɵfac = function TreeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TreeModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TreeModule,
    imports: [Tree, SharedModule],
    exports: [Tree, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Tree, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeModule, [{
    type: NgModule,
    args: [{
      imports: [Tree, SharedModule],
      exports: [Tree, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/treeselect/index.mjs
var style2 = "\n    .p-treeselect {\n        display: inline-flex;\n        cursor: pointer;\n        position: relative;\n        user-select: none;\n        background: dt('treeselect.background');\n        border: 1px solid dt('treeselect.border.color');\n        transition:\n            background dt('treeselect.transition.duration'),\n            color dt('treeselect.transition.duration'),\n            border-color dt('treeselect.transition.duration'),\n            outline-color dt('treeselect.transition.duration'),\n            box-shadow dt('treeselect.transition.duration');\n        border-radius: dt('treeselect.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('treeselect.shadow');\n    }\n\n    .p-treeselect:not(.p-disabled):hover {\n        border-color: dt('treeselect.hover.border.color');\n    }\n\n    .p-treeselect:not(.p-disabled).p-focus {\n        border-color: dt('treeselect.focus.border.color');\n        box-shadow: dt('treeselect.focus.ring.shadow');\n        outline: dt('treeselect.focus.ring.width') dt('treeselect.focus.ring.style') dt('treeselect.focus.ring.color');\n        outline-offset: dt('treeselect.focus.ring.offset');\n    }\n\n    .p-treeselect.p-variant-filled {\n        background: dt('treeselect.filled.background');\n    }\n\n    .p-treeselect.p-variant-filled:not(.p-disabled):hover {\n        background: dt('treeselect.filled.hover.background');\n    }\n\n    .p-treeselect.p-variant-filled.p-focus {\n        background: dt('treeselect.filled.focus.background');\n    }\n\n    .p-treeselect.p-invalid {\n        border-color: dt('treeselect.invalid.border.color');\n    }\n\n    .p-treeselect.p-disabled {\n        opacity: 1;\n        background: dt('treeselect.disabled.background');\n    }\n\n    .p-treeselect-clear-icon {\n        align-self: center;\n        color: dt('treeselect.clear.icon.color');\n        inset-inline-end: dt('treeselect.dropdown.width');\n    }\n\n    .p-treeselect-dropdown {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        background: transparent;\n        color: dt('treeselect.dropdown.color');\n        width: dt('treeselect.dropdown.width');\n        border-start-end-radius: dt('border.radius.md');\n        border-end-end-radius: dt('border.radius.md');\n    }\n\n    .p-treeselect-label-container {\n        overflow: hidden;\n        flex: 1 1 auto;\n        cursor: pointer;\n    }\n\n    .p-treeselect-label {\n        display: flex;\n        align-items: center;\n        gap: calc(dt('treeselect.padding.y') / 2);\n        white-space: nowrap;\n        cursor: pointer;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding: dt('treeselect.padding.y') dt('treeselect.padding.x');\n        color: dt('treeselect.color');\n    }\n\n    .p-treeselect-label.p-placeholder {\n        color: dt('treeselect.placeholder.color');\n    }\n\n    .p-treeselect.p-invalid .p-treeselect-label.p-placeholder {\n        color: dt('treeselect.invalid.placeholder.color');\n    }\n\n    .p-treeselect:has(.p-select-clear-icon) .p-treeselect-label {\n        padding-inline-end: dt('treeselect.padding.x');\n    }\n\n    .p-treeselect.p-disabled .p-treeselect-label {\n        color: dt('treeselect.disabled.color');\n    }\n\n    .p-treeselect-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n\n    .p-treeselect-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: dt('treeselect.overlay.background');\n        color: dt('treeselect.overlay.color');\n        border: 1px solid dt('treeselect.overlay.border.color');\n        border-radius: dt('treeselect.overlay.border.radius');\n        box-shadow: dt('treeselect.overlay.shadow');\n        overflow: hidden;\n        min-width: 100%;\n        will-change: transform;\n    }\n\n    .p-treeselect-tree-container {\n        overflow: auto;\n    }\n\n    .p-treeselect-empty-message {\n        padding: dt('treeselect.empty.message.padding');\n        background: transparent;\n    }\n\n    .p-treeselect-fluid {\n        display: flex;\n    }\n\n    .p-treeselect-overlay .p-tree {\n        padding: dt('treeselect.tree.padding');\n    }\n\n    .p-treeselect-overlay .p-tree-loading {\n        min-height: 3rem;\n    }\n\n    .p-treeselect-label .p-chip {\n        padding-block-start: calc(dt('treeselect.padding.y') / 2);\n        padding-block-end: calc(dt('treeselect.padding.y') / 2);\n        border-radius: dt('treeselect.chip.border.radius');\n    }\n\n    .p-treeselect-label:has(.p-chip) {\n        padding: calc(dt('treeselect.padding.y') / 2) calc(dt('treeselect.padding.x') / 2);\n    }\n\n    .p-treeselect-sm .p-treeselect-label {\n        font-size: dt('treeselect.sm.font.size');\n        padding-block: dt('treeselect.sm.padding.y');\n        padding-inline: dt('treeselect.sm.padding.x');\n    }\n\n    .p-treeselect-sm .p-treeselect-dropdown .p-icon {\n        font-size: dt('treeselect.sm.font.size');\n        width: dt('treeselect.sm.font.size');\n        height: dt('treeselect.sm.font.size');\n    }\n\n    .p-treeselect-lg .p-treeselect-label {\n        font-size: dt('treeselect.lg.font.size');\n        padding-block: dt('treeselect.lg.padding.y');\n        padding-inline: dt('treeselect.lg.padding.x');\n    }\n\n    .p-treeselect-lg .p-treeselect-dropdown .p-icon {\n        font-size: dt('treeselect.lg.font.size');\n        width: dt('treeselect.lg.font.size');\n        height: dt('treeselect.lg.font.size');\n    }\n";

// node_modules/primeng/fesm2022/primeng-treeselect.mjs
var _c02 = ["value"];
var _c19 = ["header"];
var _c22 = ["empty"];
var _c32 = ["footer"];
var _c42 = ["clearicon"];
var _c52 = ["triggericon"];
var _c62 = ["dropdownicon"];
var _c72 = ["filtericon"];
var _c82 = ["closeicon"];
var _c92 = ["itemtogglericon"];
var _c102 = ["itemcheckboxicon"];
var _c112 = ["itemloadingicon"];
var _c122 = ["focusInput"];
var _c132 = ["filter"];
var _c142 = ["tree"];
var _c152 = ["panel"];
var _c162 = ["overlay"];
var _c172 = ["firstHiddenFocusableEl"];
var _c182 = ["lastHiddenFocusableEl"];
var _c192 = (a0, a1) => ({
  $implicit: a0,
  placeholder: a1
});
var _c20 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
var _c21 = (a0) => ({
  "max-height": a0
});
var _c222 = (a0) => ({
  $implicit: a0
});
var _c23 = (a0, a1) => ({
  $implicit: a0,
  partialSelected: a1
});
function TreeSelect_ng_container_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TreeSelect_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, TreeSelect_ng_container_5_ng_container_1_Template, 1, 0, "ng-container", 23);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.valueTemplate || ctx_r1._valueTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c192, ctx_r1.value, ctx_r1.placeholder));
  }
}
function TreeSelect_ng_template_6_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.label || "empty", " ");
  }
}
function TreeSelect_ng_template_6_ng_template_1_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 15);
    ɵɵelement(1, "p-chip", 25);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const node_r3 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("chipItem"));
    ɵɵproperty("pBind", ctx_r1.ptm("chipItem"));
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("pcChip"));
    ɵɵproperty("unstyled", ctx_r1.unstyled())("label", node_r3.label)("pt", ctx_r1.ptm("pcChip"));
  }
}
function TreeSelect_ng_template_6_ng_template_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.placeholder || "empty");
  }
}
function TreeSelect_ng_template_6_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_template_6_ng_template_1_div_0_Template, 2, 8, "div", 24)(1, TreeSelect_ng_template_6_ng_template_1_ng_container_1_Template, 2, 1, "ng-container", 18);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngForOf", ctx_r1.value);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.emptyValue);
  }
}
function TreeSelect_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_template_6_ng_container_0_Template, 2, 1, "ng-container", 17)(1, TreeSelect_ng_template_6_ng_template_1_Template, 2, 2, "ng-template", null, 4, ɵɵtemplateRefExtractor);
  }
  if (rf & 2) {
    const chipsValueTemplate_r4 = ɵɵreference(2);
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r1.display === "comma")("ngIfElse", chipsValueTemplate_r4);
  }
}
function TreeSelect_ng_container_8__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 28);
    ɵɵlistener("click", function TreeSelect_ng_container_8__svg_svg_1_Template_svg_click_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("clearIcon"));
  }
}
function TreeSelect_ng_container_8_span_2_1_ng_template_0_Template(rf, ctx) {
}
function TreeSelect_ng_container_8_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_container_8_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TreeSelect_ng_container_8_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 29);
    ɵɵlistener("click", function TreeSelect_ng_container_8_span_2_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear($event));
    });
    ɵɵtemplate(1, TreeSelect_ng_container_8_span_2_1_Template, 1, 0, null, 30);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("clearIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.clearIconTemplate || ctx_r1._clearIconTemplate);
  }
}
function TreeSelect_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, TreeSelect_ng_container_8__svg_svg_1_Template, 1, 3, "svg", 26)(2, TreeSelect_ng_container_8_span_2_Template, 2, 4, "span", 27);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.clearIconTemplate && !ctx_r1._clearIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.clearIconTemplate || ctx_r1.clearIconTemplate);
  }
}
function TreeSelect__svg_svg_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 31);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("dropdownIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("dropdownIcon"));
  }
}
function TreeSelect_span_11_1_ng_template_0_Template(rf, ctx) {
}
function TreeSelect_span_11_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_span_11_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TreeSelect_span_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 15);
    ɵɵtemplate(1, TreeSelect_span_11_1_Template, 1, 0, null, 30);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("dropdownIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("dropdownIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.triggerIconTemplate || ctx_r1._triggerIconTemplate || ctx_r1.dropdownIconTemplate || ctx_r1._dropdownIconTemplate);
  }
}
function TreeSelect_ng_template_14_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TreeSelect_ng_template_14_ng_container_8_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TreeSelect_ng_template_14_ng_container_8_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_template_14_ng_container_8_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 30);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.emptyTemplate || ctx_r1._emptyTemplate);
  }
}
function TreeSelect_ng_template_14_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, TreeSelect_ng_template_14_ng_container_8_ng_template_1_Template, 1, 1, "ng-template", null, 9, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function TreeSelect_ng_template_14_9_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TreeSelect_ng_template_14_9_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_template_14_9_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 23);
  }
  if (rf & 2) {
    const expanded_r8 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.itemTogglerIconTemplate || ctx_r1._itemTogglerIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c222, expanded_r8));
  }
}
function TreeSelect_ng_template_14_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_template_14_9_ng_template_0_Template, 1, 4, "ng-template", null, 10, ɵɵtemplateRefExtractor);
  }
}
function TreeSelect_ng_template_14_10_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TreeSelect_ng_template_14_10_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_template_14_10_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 23);
  }
  if (rf & 2) {
    const selected_r9 = ctx.$implicit;
    const partialSelected_r10 = ctx.partialSelected;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.itemCheckboxIconTemplate || ctx_r1._itemCheckboxIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c23, selected_r9, partialSelected_r10));
  }
}
function TreeSelect_ng_template_14_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_template_14_10_ng_template_0_Template, 1, 5, "ng-template", null, 11, ɵɵtemplateRefExtractor);
  }
}
function TreeSelect_ng_template_14_11_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TreeSelect_ng_template_14_11_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_template_14_11_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 30);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.itemLoadingIconTemplate || ctx_r1._itemLoadingIconTemplate);
  }
}
function TreeSelect_ng_template_14_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TreeSelect_ng_template_14_11_ng_template_0_Template, 1, 1, "ng-template", null, 12, ɵɵtemplateRefExtractor);
  }
}
function TreeSelect_ng_template_14_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TreeSelect_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 16, 5)(2, "span", 32, 6);
    ɵɵlistener("focus", function TreeSelect_ng_template_14_Template_span_focus_2_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFirstHiddenFocus($event));
    });
    ɵɵelementEnd();
    ɵɵtemplate(4, TreeSelect_ng_template_14_ng_container_4_Template, 1, 0, "ng-container", 23);
    ɵɵelementStart(5, "div", 16)(6, "p-tree", 33, 7);
    ɵɵlistener("selectionChange", function TreeSelect_ng_template_14_Template_p_tree_selectionChange_6_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onSelectionChange($event));
    })("onNodeExpand", function TreeSelect_ng_template_14_Template_p_tree_onNodeExpand_6_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.nodeExpand($event));
    })("onNodeCollapse", function TreeSelect_ng_template_14_Template_p_tree_onNodeCollapse_6_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.nodeCollapse($event));
    })("onNodeSelect", function TreeSelect_ng_template_14_Template_p_tree_onNodeSelect_6_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onSelect($event));
    })("onNodeUnselect", function TreeSelect_ng_template_14_Template_p_tree_onNodeUnselect_6_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onUnselect($event));
    });
    ɵɵtemplate(8, TreeSelect_ng_template_14_ng_container_8_Template, 3, 0, "ng-container", 18)(9, TreeSelect_ng_template_14_9_Template, 2, 0, null, 18)(10, TreeSelect_ng_template_14_10_Template, 2, 0, null, 18)(11, TreeSelect_ng_template_14_11_Template, 2, 0, null, 18);
    ɵɵelementEnd()();
    ɵɵtemplate(12, TreeSelect_ng_template_14_ng_container_12_Template, 1, 0, "ng-container", 23);
    ɵɵelementStart(13, "span", 32, 8);
    ɵɵlistener("focus", function TreeSelect_ng_template_14_Template_span_focus_13_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onLastHiddenFocus($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("panel"), ctx_r1.panelStyleClass, ctx_r1.panelClass));
    ɵɵproperty("ngStyle", ctx_r1.panelStyle)("pBind", ctx_r1.ptm("panel"));
    ɵɵattribute("id", ctx_r1.listId);
    ɵɵadvance(2);
    ɵɵproperty("pBind", ctx_r1.ptm("hiddenFirstFocusableEl"));
    ɵɵattribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate || ctx_r1._headerTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(47, _c20, ctx_r1.value, ctx_r1.options));
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("treeContainer"));
    ɵɵproperty("ngStyle", ɵɵpureFunction1(50, _c21, ctx_r1.scrollHeight))("pBind", ctx_r1.ptm("treeContainer"));
    ɵɵadvance();
    ɵɵproperty("value", ctx_r1.options)("propagateSelectionDown", ctx_r1.propagateSelectionDown)("propagateSelectionUp", ctx_r1.propagateSelectionUp)("selectionMode", ctx_r1.selectionMode)("selection", ctx_r1.value)("metaKeySelection", ctx_r1.metaKeySelection)("emptyMessage", ctx_r1.emptyMessage)("filter", ctx_r1.filter)("filterBy", ctx_r1.filterBy)("filterMode", ctx_r1.filterMode)("filterPlaceholder", ctx_r1.filterPlaceholder)("filterLocale", ctx_r1.filterLocale)("filteredNodes", ctx_r1.filteredNodes)("virtualScroll", ctx_r1.virtualScroll)("virtualScrollItemSize", ctx_r1.virtualScrollItemSize)("virtualScrollOptions", ctx_r1.virtualScrollOptions)("_templateMap", ctx_r1.templateMap)("loading", ctx_r1.loading)("filterInputAutoFocus", ctx_r1.filterInputAutoFocus)("loadingMode", ctx_r1.loadingMode)("pt", ctx_r1.ptm("pcTree"))("unstyled", ctx_r1.unstyled());
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.emptyTemplate || ctx_r1._emptyTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.itemTogglerIconTemplate || ctx_r1._itemTogglerIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.itemCheckboxIconTemplate || ctx_r1._itemCheckboxIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.itemLoadingIconTemplate || ctx_r1._itemLoadingIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.footerTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(52, _c20, ctx_r1.value, ctx_r1.options));
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r1.ptm("hiddenLastFocusableEl"));
    ɵɵattribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
  }
}
var style3 = (
  /*css*/
  `
    ${style2}

    /* For PrimeNG */

    .p-treeselect.ng-invalid.ng-dirty {
        border-color: dt('treeselect.invalid.border.color');
    }

    p-treeselect.ng-invalid.ng-dirty.p-focus {
        border-color: dt('treeselect.focus.border.color');
    }

    p-treeselect.ng-invalid.ng-dirty .p-treeselect-label.p-placeholder {
        color: dt('treeselect.invalid.placeholder.color');
    }

    .p-treeselect-clear-icon.p-icon {
        flex-shrink: 0;
    }
`
);
var inlineStyles = {
  root: ({
    instance
  }) => __spreadValues({
    position: instance.$appendTo() === "self" ? "relative" : void 0
  }, instance.containerStyle)
};
var classes2 = {
  root: ({
    instance
  }) => ["p-treeselect p-component p-inputwrapper", {
    "p-treeselect-display-chip": instance.display === "chip",
    "p-disabled": instance.$disabled(),
    "p-invalid": instance.invalid(),
    "p-focus": instance.focused,
    "p-variant-filled": instance.$variant() === "filled",
    "p-inputwrapper-filled": !instance.emptyValue,
    "p-inputwrapper-focus": instance.focused || instance.overlayVisible,
    "p-treeselect-open": instance.overlayVisible,
    "p-treeselect-clearable": instance.showClear,
    "p-treeselect-fluid": instance.hasFluid,
    "p-treeselect-sm p-inputfield-sm": instance.size() === "small",
    "p-treeselect-lg p-inputfield-lg": instance.size() === "large"
  }],
  labelContainer: "p-treeselect-label-container",
  label: ({
    instance
  }) => ["p-treeselect-label", {
    "p-placeholder": instance.label === instance.placeholder,
    "p-treeselect-label-empty": !instance.placeholder && instance.emptyValue
  }],
  clearIcon: "p-treeselect-clear-icon",
  chip: "p-treeselect-chip-item",
  pcChip: "p-treeselect-chip",
  dropdown: "p-treeselect-dropdown",
  dropdownIcon: "p-treeselect-dropdown-icon",
  panel: "p-treeselect-overlay p-component-overlay p-component",
  treeContainer: "p-treeselect-tree-container",
  emptyMessage: "p-treeselect-empty-message"
};
var TreeSelectStyle = class _TreeSelectStyle extends BaseStyle {
  name = "treeselect";
  style = style3;
  classes = classes2;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTreeSelectStyle_BaseFactory;
    return function TreeSelectStyle_Factory(__ngFactoryType__) {
      return (ɵTreeSelectStyle_BaseFactory || (ɵTreeSelectStyle_BaseFactory = ɵɵgetInheritedFactory(_TreeSelectStyle)))(__ngFactoryType__ || _TreeSelectStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TreeSelectStyle,
    factory: _TreeSelectStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeSelectStyle, [{
    type: Injectable
  }], null, null);
})();
var TreeSelectClasses;
(function(TreeSelectClasses2) {
  TreeSelectClasses2["root"] = "p-treeselect";
  TreeSelectClasses2["labelContainer"] = "p-treeselect-label-container";
  TreeSelectClasses2["label"] = "p-treeselect-label";
  TreeSelectClasses2["chipItem"] = "p-treeselect-chip-item";
  TreeSelectClasses2["clearIcon"] = "p-treeselect-clear-icon";
  TreeSelectClasses2["pcChip"] = "p-treeselect-chip";
  TreeSelectClasses2["dropdown"] = "p-treeselect-dropdown";
  TreeSelectClasses2["dropdownIcon"] = "p-treeselect-dropdown-icon";
  TreeSelectClasses2["panel"] = "p-treeselect-overlay";
  TreeSelectClasses2["treeContainer"] = "p-treeselect-tree-container";
  TreeSelectClasses2["emptyMessage"] = "p-treeselect-empty-message";
})(TreeSelectClasses || (TreeSelectClasses = {}));
var TREESELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TreeSelect),
  multi: true
};
var TREESELECT_INSTANCE = new InjectionToken("TREESELECT_INSTANCE");
var TreeSelect = class _TreeSelect extends BaseEditableHolder {
  $pcTreeSelect = inject(TREESELECT_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  _componentStyle = inject(TreeSelectStyle);
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Identifier of the underlying input element.
   * @group Props
   */
  inputId;
  /**
   * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  scrollHeight = "400px";
  /**
   * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
   * @group Props
   */
  metaKeySelection = false;
  /**
   * Defines how the selected items are displayed.
   * @group Props
   */
  display = "comma";
  /**
   * Defines the selection mode.
   * @group Props
   */
  selectionMode = "single";
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = "0";
  /**
   * Defines a string that labels the input for accessibility.
   * @group Props
   */
  ariaLabel;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Label to display when there are no selections.
   * @group Props
   */
  placeholder;
  /**
   * Style class of the overlay panel.
   * @group Props
   */
  panelClass;
  /**
   * Inline style of the panel element.
   * @group Props
   */
  panelStyle;
  /**
   * Style class of the panel element.
   * @group Props
   */
  panelStyleClass;
  /**
   * Inline style of the container element.
   * @deprecated since v20.0.0, use `style` instead.
   * @group Props
   */
  containerStyle;
  /**
   * Style class of the container element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  containerStyleClass;
  /**
   * Inline style of the label element.
   * @group Props
   */
  labelStyle;
  /**
   * Style class of the label element.
   * @group Props
   */
  labelStyleClass;
  /**
   * Specifies the options for the overlay.
   * @group Props
   */
  overlayOptions;
  /**
   * Text to display when there are no options available. Defaults to value from PrimeNG locale configuration.
   * @group Props
   */
  emptyMessage = "";
  /**
   * When specified, displays an input field to filter the items.
   * @group Props
   */
  filter = false;
  /**
   * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
   * @group Props
   */
  filterBy = "label";
  /**
   * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
   * @group Props
   */
  filterMode = "lenient";
  /**
   * Placeholder text to show when filter input is empty.
   * @group Props
   */
  filterPlaceholder;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * Determines whether the filter input should be automatically focused when the component is rendered.
   * @group Props
   */
  filterInputAutoFocus = true;
  /**
   * Whether checkbox selections propagate to descendant nodes.
   * @group Props
   */
  propagateSelectionDown = true;
  /**
   * Whether checkbox selections propagate to ancestor nodes.
   * @group Props
   */
  propagateSelectionUp = true;
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear = false;
  /**
   * Clears the filter value when hiding the dropdown.
   * @group Props
   */
  resetFilterOnHide = true;
  /**
   * Whether the data should be loaded on demand during scroll.
   * @group Props
   */
  virtualScroll;
  /**
   * Height of an item in the list for VirtualScrolling.
   * @group Props
   */
  virtualScrollItemSize;
  /**
   * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  virtualScrollOptions;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * An array of treenodes.
   * @defaultValue undefined
   * @group Props
   */
  get options() {
    return this._options;
  }
  set options(options) {
    this._options = options;
    this.updateTreeState();
  }
  /**
   * Displays a loader to indicate data load is in progress.
   * @group Props
   */
  loading;
  /**
   * Loading mode display.
   * @group Props
   */
  loadingMode = "mask";
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
   * Callback to invoke when a node is expanded.
   * @param {TreeSelectNodeExpandEvent} event - Custom node expand event.
   * @group Emits
   */
  onNodeExpand = new EventEmitter();
  /**
   * Callback to invoke when a node is collapsed.
   * @param {TreeSelectNodeCollapseEvent} event - Custom node collapse event.
   * @group Emits
   */
  onNodeCollapse = new EventEmitter();
  /**
   * Callback to invoke when the overlay is shown.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onShow = new EventEmitter();
  /**
   * Callback to invoke when the overlay is hidden.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onHide = new EventEmitter();
  /**
   * Callback to invoke when input field is cleared.
   * @group Emits
   */
  onClear = new EventEmitter();
  /**
   * Callback to invoke when data is filtered.
   * @group Emits
   */
  onFilter = new EventEmitter();
  /**
   * Callback to invoke when treeselect gets focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when treeselect loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Callback to invoke when a node is unselected.
   * @param {TreeNodeUnSelectEvent} event - node unselect event.
   * @group Emits
   */
  onNodeUnselect = new EventEmitter();
  /**
   * Callback to invoke when a node is selected.
   * @param {TreeNodeSelectEvent} event - node select event.
   * @group Emits
   */
  onNodeSelect = new EventEmitter();
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  focusInput;
  filterViewChild;
  treeViewChild;
  panelEl;
  overlayViewChild;
  firstHiddenFocusableElementOnOverlay;
  lastHiddenFocusableElementOnOverlay;
  $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant(), ...ngDevMode ? [{
    debugName: "$variant"
  }] : []);
  pcFluid = inject(Fluid, {
    optional: true,
    host: true,
    skipSelf: true
  });
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  filteredNodes;
  filterValue = null;
  serializedValue;
  /**
   * Custom value template.
   * @param {TreeSelectValueTemplateContext} context - value context.
   * @see {@link TreeSelectValueTemplateContext}
   * @group Templates
   */
  valueTemplate;
  /**
   * Custom header template.
   * @param {TreeSelectHeaderTemplateContext} context - header context.
   * @see {@link TreeSelectHeaderTemplateContext}
   * @group Templates
   */
  headerTemplate;
  /**
   * Custom empty message template.
   * @group Templates
   */
  emptyTemplate;
  /**
   * Custom footer template.
   * @param {TreeSelectHeaderTemplateContext} context - footer context.
   * @see {@link TreeSelectHeaderTemplateContext}
   * @group Templates
   */
  footerTemplate;
  /**
   * Custom clear icon template.
   * @group Templates
   */
  clearIconTemplate;
  /**
   * Custom trigger icon template.
   * @group Templates
   */
  triggerIconTemplate;
  /**
   * Custom dropdown icon template.
   * @group Templates
   */
  dropdownIconTemplate;
  /**
   * Custom filter icon template.
   * @group Templates
   */
  filterIconTemplate;
  /**
   * Custom close icon template.
   * @group Templates
   */
  closeIconTemplate;
  /**
   * Custom item toggler icon template.
   * @param {TreeSelectItemTogglerIconTemplateContext} context - toggler icon context.
   * @see {@link TreeSelectItemTogglerIconTemplateContext}
   * @group Templates
   */
  itemTogglerIconTemplate;
  /**
   * Custom item checkbox icon template.
   * @param {TreeSelectItemCheckboxIconTemplateContext} context - checkbox icon context.
   * @see {@link TreeSelectItemCheckboxIconTemplateContext}
   * @group Templates
   */
  itemCheckboxIconTemplate;
  /**
   * Custom item loading icon template.
   * @group Templates
   */
  itemLoadingIconTemplate;
  templates;
  _valueTemplate;
  _headerTemplate;
  _emptyTemplate;
  _footerTemplate;
  _clearIconTemplate;
  _triggerIconTemplate;
  _filterIconTemplate;
  _closeIconTemplate;
  _itemTogglerIconTemplate;
  _itemCheckboxIconTemplate;
  _itemLoadingIconTemplate;
  _dropdownIconTemplate;
  focused;
  overlayVisible;
  value;
  expandedNodes = [];
  _options;
  templateMap;
  listId = "";
  onHostClick(event) {
    this.onClick(event);
  }
  onInit() {
    this.listId = s2("pn_id_") + "_list";
    this.updateTreeState();
  }
  onAfterContentInit() {
    if (this.templates.length) {
      this.templateMap = {};
    }
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "value":
          this._valueTemplate = item.template;
          break;
        case "header":
          this._headerTemplate = item.template;
          break;
        case "empty":
          this._emptyTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        case "clearicon":
          this._clearIconTemplate = item.template;
          break;
        case "triggericon":
          this._triggerIconTemplate = item.template;
          break;
        case "filtericon":
          this._filterIconTemplate = item.template;
          break;
        case "closeicon":
          this._closeIconTemplate = item.template;
          break;
        case "itemtogglericon":
          this._itemTogglerIconTemplate = item.template;
          break;
        case "itemcheckboxicon":
          this._itemCheckboxIconTemplate = item.template;
          break;
        case "dropdownicon":
          this._dropdownIconTemplate = item.template;
          break;
        case "itemloadingicon":
          this._itemLoadingIconTemplate = item.template;
          break;
        default:
          if (item.name) this.templateMap[item.name] = item.template;
          else this.valueTemplate = item.template;
          break;
      }
    });
  }
  onOverlayBeforeEnter() {
    if (this.filter) {
      s(this.filterValue) && this.treeViewChild?._filter(this.filterValue);
      this.filterInputAutoFocus && this.filterViewChild?.nativeElement.focus();
    } else {
      let focusableElements = b(this.panelEl?.nativeElement);
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }
  onOverlayBeforeHide() {
    let focusableElements = b(this.el.nativeElement);
    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
  onSelectionChange(event) {
    this.value = event;
    this.onModelChange(this.value);
    this.cd.markForCheck();
  }
  onClick(event) {
    if (this.$disabled()) {
      return;
    }
    const section = event.target?.getAttribute?.("data-pc-section");
    if (!this.overlayViewChild?.el?.nativeElement?.contains(event.target) && section !== "box" && section !== "icon") {
      if (this.overlayVisible) {
        this.hide();
      } else {
        this.show();
      }
      this.focusInput?.nativeElement.focus();
    }
  }
  onKeyDown(event) {
    switch (event.code) {
      //down
      case "ArrowDown":
        if (!this.overlayVisible) {
          this.show();
          event.preventDefault();
        }
        this.onArrowDown(event);
        event.preventDefault();
        break;
      //space
      case "Space":
      case "Enter":
        if (!this.overlayVisible) {
          this.show();
          event.preventDefault();
        }
        break;
      //escape
      case "Escape":
        if (this.overlayVisible) {
          this.hide();
          this.focusInput?.nativeElement.focus();
          event.preventDefault();
        }
        break;
      //tab
      case "Tab":
        this.onTabKey(event);
        break;
      default:
        break;
    }
  }
  onFilterInput(event) {
    this.filterValue = event.target.value;
    this.treeViewChild?._filter(this.filterValue);
    this.onFilter.emit({
      filter: this.filterValue,
      filteredValue: this.treeViewChild?.filteredNodes
    });
    setTimeout(() => {
      this.overlayViewChild?.alignOverlay();
    });
  }
  onArrowDown(event) {
    if (this.overlayVisible && this.panelEl?.nativeElement) {
      let focusableElements = b(this.panelEl.nativeElement, '[data-pc-section="node"]');
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
      event.preventDefault();
    }
  }
  onFirstHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInput?.nativeElement ? vt(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInput?.nativeElement;
    bt(focusableEl);
  }
  onLastHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInput?.nativeElement ? Lt(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInput?.nativeElement;
    bt(focusableEl);
  }
  show() {
    this.overlayVisible = true;
  }
  hide(event) {
    this.overlayVisible = false;
    this.resetFilter();
    this.onHide.emit(event);
    this.cd.markForCheck();
  }
  clear(event) {
    this.value = null;
    this.resetExpandedNodes();
    this.resetPartialSelected();
    this.onModelChange(this.value);
    this.onClear.emit();
    event.stopPropagation();
  }
  checkValue() {
    return this.value !== null && s(this.value);
  }
  onTabKey(event, pressedInInputText = false) {
    if (!pressedInInputText) {
      if (this.overlayVisible && this.hasFocusableElements()) {
        bt(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay?.nativeElement : this.firstHiddenFocusableElementOnOverlay?.nativeElement);
        event.preventDefault();
      } else {
        this.overlayVisible && this.hide(this.filter);
      }
    }
  }
  hasFocusableElements() {
    return b(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
  }
  resetFilter() {
    if (this.filter && !this.resetFilterOnHide) {
      this.filteredNodes = this.treeViewChild?.filteredNodes;
      this.treeViewChild?.resetFilter();
    } else {
      this.filterValue = null;
    }
  }
  updateTreeState() {
    if (this.value) {
      let selectedNodes = this.selectionMode === "single" ? [this.value] : [...this.value];
      this.resetExpandedNodes();
      this.resetPartialSelected();
      if (selectedNodes && this.options) {
        this.updateTreeBranchState(null, null, selectedNodes);
      }
    }
  }
  updateTreeBranchState(node, path, selectedNodes) {
    if (node) {
      if (this.isSelected(node)) {
        this.expandPath(path);
        selectedNodes.splice(selectedNodes.indexOf(node), 1);
      }
      if (selectedNodes.length > 0 && node.children) {
        for (let childNode of node.children) {
          this.updateTreeBranchState(childNode, [...path, node], selectedNodes);
        }
      }
    } else {
      for (let childNode of this.options) {
        this.updateTreeBranchState(childNode, [], selectedNodes);
      }
    }
  }
  expandPath(expandedNodes) {
    for (let node of expandedNodes) {
      node.expanded = true;
    }
    this.expandedNodes = [...expandedNodes];
  }
  nodeExpand(event) {
    this.onNodeExpand.emit(event);
    this.expandedNodes.push(event.node);
    setTimeout(() => {
      this.overlayViewChild?.alignOverlay();
    });
  }
  nodeCollapse(event) {
    this.onNodeCollapse.emit(event);
    this.expandedNodes.splice(this.expandedNodes.indexOf(event.node), 1);
    setTimeout(() => {
      this.overlayViewChild?.alignOverlay();
    });
  }
  resetExpandedNodes() {
    for (let node of this.expandedNodes) {
      node.expanded = false;
    }
    this.expandedNodes = [];
  }
  resetPartialSelected(nodes = this.options) {
    if (!nodes) {
      return;
    }
    for (let node of nodes) {
      node.partialSelected = false;
      if (node.children && node.children?.length > 0) {
        this.resetPartialSelected(node.children);
      }
    }
  }
  findSelectedNodes(node, keys, selectedNodes) {
    if (node) {
      if (this.isSelected(node)) {
        selectedNodes.push(node);
        delete keys[node.key];
      }
      if (Object.keys(keys).length && node.children) {
        for (let childNode of node.children) {
          this.findSelectedNodes(childNode, keys, selectedNodes);
        }
      }
    } else {
      for (let childNode of this.options) {
        this.findSelectedNodes(childNode, keys, selectedNodes);
      }
    }
  }
  isSelected(node) {
    return this.findIndexInSelection(node) != -1;
  }
  findIndexInSelection(node) {
    let index = -1;
    if (this.value) {
      if (this.selectionMode === "single") {
        let areNodesEqual = this.value.key && this.value.key === node.key || this.value == node;
        index = areNodesEqual ? 0 : -1;
      } else {
        for (let i = 0; i < this.value.length; i++) {
          let selectedNode = this.value[i];
          let areNodesEqual = selectedNode.key && selectedNode.key === node.key || selectedNode == node;
          if (areNodesEqual) {
            index = i;
            break;
          }
        }
      }
    }
    return index;
  }
  onSelect(event) {
    this.onNodeSelect.emit(event);
    if (this.selectionMode === "single") {
      this.hide();
      this.focusInput?.nativeElement.focus();
    }
  }
  onUnselect(event) {
    this.onNodeUnselect.emit(event);
  }
  onInputFocus(event) {
    if (this.$disabled()) {
      return;
    }
    this.focused = true;
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    this.onBlur.emit(event);
    this.onModelTouched();
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value) {
    this.value = value;
    this.updateTreeState();
    this.cd.markForCheck();
  }
  get emptyValue() {
    return !this.value || Object.keys(this.value).length === 0;
  }
  get emptyOptions() {
    return !this.options || this.options.length === 0;
  }
  get label() {
    let value = this.value || [];
    return value.length ? value.map((node) => node.label).join(", ") : this.selectionMode === "single" && this.value ? value.label : this.placeholder;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTreeSelect_BaseFactory;
    return function TreeSelect_Factory(__ngFactoryType__) {
      return (ɵTreeSelect_BaseFactory || (ɵTreeSelect_BaseFactory = ɵɵgetInheritedFactory(_TreeSelect)))(__ngFactoryType__ || _TreeSelect);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _TreeSelect,
    selectors: [["p-treeSelect"], ["p-treeselect"], ["p-tree-select"]],
    contentQueries: function TreeSelect_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c02, 4)(dirIndex, _c19, 4)(dirIndex, _c22, 4)(dirIndex, _c32, 4)(dirIndex, _c42, 4)(dirIndex, _c52, 4)(dirIndex, _c62, 4)(dirIndex, _c72, 4)(dirIndex, _c82, 4)(dirIndex, _c92, 4)(dirIndex, _c102, 4)(dirIndex, _c112, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.valueTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clearIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.triggerIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dropdownIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.closeIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTogglerIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemCheckboxIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemLoadingIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function TreeSelect_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c122, 5)(_c132, 5)(_c142, 5)(_c152, 5)(_c162, 5)(_c172, 5)(_c182, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.focusInput = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.treeViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.panelEl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.overlayViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.firstHiddenFocusableElementOnOverlay = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.lastHiddenFocusableElementOnOverlay = _t.first);
      }
    },
    hostVars: 4,
    hostBindings: function TreeSelect_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("mousedown", function TreeSelect_mousedown_HostBindingHandler($event) {
          return ctx.onHostClick($event);
        });
      }
      if (rf & 2) {
        ɵɵstyleMap(ctx.sx("root"));
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.containerStyleClass));
      }
    },
    inputs: {
      inputId: "inputId",
      scrollHeight: "scrollHeight",
      metaKeySelection: [2, "metaKeySelection", "metaKeySelection", booleanAttribute],
      display: "display",
      selectionMode: "selectionMode",
      tabindex: "tabindex",
      ariaLabel: "ariaLabel",
      ariaLabelledBy: "ariaLabelledBy",
      placeholder: "placeholder",
      panelClass: "panelClass",
      panelStyle: "panelStyle",
      panelStyleClass: "panelStyleClass",
      containerStyle: "containerStyle",
      containerStyleClass: "containerStyleClass",
      labelStyle: "labelStyle",
      labelStyleClass: "labelStyleClass",
      overlayOptions: "overlayOptions",
      emptyMessage: "emptyMessage",
      filter: [2, "filter", "filter", booleanAttribute],
      filterBy: "filterBy",
      filterMode: "filterMode",
      filterPlaceholder: "filterPlaceholder",
      filterLocale: "filterLocale",
      filterInputAutoFocus: [2, "filterInputAutoFocus", "filterInputAutoFocus", booleanAttribute],
      propagateSelectionDown: [2, "propagateSelectionDown", "propagateSelectionDown", booleanAttribute],
      propagateSelectionUp: [2, "propagateSelectionUp", "propagateSelectionUp", booleanAttribute],
      showClear: [2, "showClear", "showClear", booleanAttribute],
      resetFilterOnHide: [2, "resetFilterOnHide", "resetFilterOnHide", booleanAttribute],
      virtualScroll: "virtualScroll",
      virtualScrollItemSize: "virtualScrollItemSize",
      virtualScrollOptions: "virtualScrollOptions",
      autofocus: [2, "autofocus", "autofocus", booleanAttribute],
      options: "options",
      loading: [2, "loading", "loading", booleanAttribute],
      loadingMode: "loadingMode",
      size: [1, "size"],
      variant: [1, "variant"],
      fluid: [1, "fluid"],
      appendTo: [1, "appendTo"],
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      onNodeExpand: "onNodeExpand",
      onNodeCollapse: "onNodeCollapse",
      onShow: "onShow",
      onHide: "onHide",
      onClear: "onClear",
      onFilter: "onFilter",
      onFocus: "onFocus",
      onBlur: "onBlur",
      onNodeUnselect: "onNodeUnselect",
      onNodeSelect: "onNodeSelect"
    },
    features: [ɵɵProvidersFeature([TREESELECT_VALUE_ACCESSOR, TreeSelectStyle, {
      provide: TREESELECT_INSTANCE,
      useExisting: _TreeSelect
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _TreeSelect
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 16,
    vars: 37,
    consts: [["focusInput", ""], ["defaultValueTemplate", ""], ["overlay", ""], ["content", ""], ["chipsValueTemplate", ""], ["panel", ""], ["firstHiddenFocusableEl", ""], ["tree", ""], ["lastHiddenFocusableEl", ""], ["empty", ""], ["togglericon", ""], ["checkboxicon", ""], ["loadingicon", ""], [1, "p-hidden-accessible", 3, "pBind"], ["type", "text", "role", "combobox", "readonly", "", 3, "focus", "blur", "keydown", "pAutoFocus", "pBind"], [3, "pBind"], [3, "ngStyle", "pBind"], [4, "ngIf", "ngIfElse"], [4, "ngIf"], ["role", "button", "aria-haspopup", "tree", 3, "pBind"], ["data-p-icon", "chevron-down", 3, "class", "pBind", 4, "ngIf"], [3, "class", "pBind", 4, "ngIf"], [3, "visibleChange", "onBeforeEnter", "onBeforeHide", "onShow", "onHide", "hostAttrSelector", "visible", "options", "target", "appendTo", "unstyled", "pt", "motionOptions"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "class", "pBind", 4, "ngFor", "ngForOf"], [3, "unstyled", "label", "pt"], ["data-p-icon", "times", 3, "class", "pBind", "click", 4, "ngIf"], [3, "class", "pBind", "click", 4, "ngIf"], ["data-p-icon", "times", 3, "click", "pBind"], [3, "click", "pBind"], [4, "ngTemplateOutlet"], ["data-p-icon", "chevron-down", 3, "pBind"], ["role", "presentation", 1, "p-hidden-accessible", "p-hidden-focusable", 3, "focus", "pBind"], [3, "selectionChange", "onNodeExpand", "onNodeCollapse", "onNodeSelect", "onNodeUnselect", "value", "propagateSelectionDown", "propagateSelectionUp", "selectionMode", "selection", "metaKeySelection", "emptyMessage", "filter", "filterBy", "filterMode", "filterPlaceholder", "filterLocale", "filteredNodes", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "_templateMap", "loading", "filterInputAutoFocus", "loadingMode", "pt", "unstyled"]],
    template: function TreeSelect_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "div", 13)(1, "input", 14, 0);
        ɵɵlistener("focus", function TreeSelect_Template_input_focus_1_listener($event) {
          return ctx.onInputFocus($event);
        })("blur", function TreeSelect_Template_input_blur_1_listener($event) {
          return ctx.onInputBlur($event);
        })("keydown", function TreeSelect_Template_input_keydown_1_listener($event) {
          return ctx.onKeyDown($event);
        });
        ɵɵelementEnd()();
        ɵɵelementStart(3, "div", 15)(4, "div", 16);
        ɵɵtemplate(5, TreeSelect_ng_container_5_Template, 2, 5, "ng-container", 17)(6, TreeSelect_ng_template_6_Template, 3, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        ɵɵelementEnd()();
        ɵɵtemplate(8, TreeSelect_ng_container_8_Template, 3, 2, "ng-container", 18);
        ɵɵelementStart(9, "div", 19);
        ɵɵtemplate(10, TreeSelect__svg_svg_10_Template, 1, 3, "svg", 20)(11, TreeSelect_span_11_Template, 2, 4, "span", 21);
        ɵɵelementEnd();
        ɵɵelementStart(12, "p-overlay", 22, 2);
        ɵɵtwoWayListener("visibleChange", function TreeSelect_Template_p_overlay_visibleChange_12_listener($event) {
          ɵɵrestoreView(_r1);
          ɵɵtwoWayBindingSet(ctx.overlayVisible, $event) || (ctx.overlayVisible = $event);
          return ɵɵresetView($event);
        });
        ɵɵlistener("onBeforeEnter", function TreeSelect_Template_p_overlay_onBeforeEnter_12_listener() {
          return ctx.onOverlayBeforeEnter();
        })("onBeforeHide", function TreeSelect_Template_p_overlay_onBeforeHide_12_listener() {
          return ctx.onOverlayBeforeHide();
        })("onShow", function TreeSelect_Template_p_overlay_onShow_12_listener($event) {
          return ctx.onShow.emit($event);
        })("onHide", function TreeSelect_Template_p_overlay_onHide_12_listener($event) {
          return ctx.hide($event);
        });
        ɵɵtemplate(14, TreeSelect_ng_template_14_Template, 15, 55, "ng-template", null, 3, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        const defaultValueTemplate_r11 = ɵɵreference(7);
        ɵɵproperty("pBind", ctx.ptm("hiddenInputContainer"));
        ɵɵattribute("data-p-hidden-accessible", true);
        ɵɵadvance();
        ɵɵproperty("pAutoFocus", ctx.autofocus)("pBind", ctx.ptm("hiddenInput"));
        ɵɵattribute("id", ctx.inputId)("disabled", ctx.$disabled() ? "" : void 0)("tabindex", !ctx.$disabled() ? ctx.tabindex : -1)("aria-controls", ctx.overlayVisible ? ctx.listId : null)("aria-haspopup", "tree")("aria-expanded", ctx.overlayVisible ?? false)("aria-labelledby", ctx.ariaLabelledBy)("aria-label", ctx.ariaLabel || (ctx.label === "p-emptylabel" ? void 0 : ctx.label));
        ɵɵadvance(2);
        ɵɵclassMap(ctx.cx("labelContainer"));
        ɵɵproperty("pBind", ctx.ptm("labelContainer"));
        ɵɵadvance();
        ɵɵclassMap(ctx.cn(ctx.cx("label"), ctx.labelStyleClass));
        ɵɵproperty("ngStyle", ctx.labelStyle)("pBind", ctx.ptm("label"));
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.valueTemplate || ctx._valueTemplate)("ngIfElse", defaultValueTemplate_r11);
        ɵɵadvance(3);
        ɵɵproperty("ngIf", ctx.checkValue() && !ctx.$disabled() && ctx.showClear);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("dropdown"));
        ɵɵproperty("pBind", ctx.ptm("dropdown"));
        ɵɵattribute("aria-expanded", ctx.overlayVisible ?? false)("aria-label", "treeselect trigger");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.triggerIconTemplate && !ctx._triggerIconTemplate && !ctx.dropdownIconTemplate && !ctx._dropdownIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.triggerIconTemplate || ctx._triggerIconTemplate || ctx.dropdownIconTemplate || ctx._dropdownIconTemplate);
        ɵɵadvance();
        ɵɵproperty("hostAttrSelector", ctx.$attrSelector);
        ɵɵtwoWayProperty("visible", ctx.overlayVisible);
        ɵɵproperty("options", ctx.overlayOptions)("target", "@parent")("appendTo", ctx.$appendTo())("unstyled", ctx.unstyled())("pt", ctx.ptm("pcOverlay"))("motionOptions", ctx.motionOptions());
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgStyle, Overlay, SharedModule, Tree, AutoFocus, TimesIcon, ChevronDownIcon, Chip, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeSelect, [{
    type: Component,
    args: [{
      selector: "p-treeSelect, p-treeselect, p-tree-select",
      standalone: true,
      imports: [CommonModule, Overlay, SharedModule, Tree, AutoFocus, TimesIcon, ChevronDownIcon, Chip, Bind],
      hostDirectives: [Bind],
      template: `
        <div class="p-hidden-accessible" [pBind]="ptm('hiddenInputContainer')" [attr.data-p-hidden-accessible]="true">
            <input
                #focusInput
                type="text"
                role="combobox"
                [attr.id]="inputId"
                readonly
                [attr.disabled]="$disabled() ? '' : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.tabindex]="!$disabled() ? tabindex : -1"
                [attr.aria-controls]="overlayVisible ? listId : null"
                [attr.aria-haspopup]="'tree'"
                [attr.aria-expanded]="overlayVisible ?? false"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel || (label === 'p-emptylabel' ? undefined : label)"
                [pAutoFocus]="autofocus"
                [pBind]="ptm('hiddenInput')"
            />
        </div>
        <div [class]="cx('labelContainer')" [pBind]="ptm('labelContainer')">
            <div [class]="cn(cx('label'), labelStyleClass)" [ngStyle]="labelStyle" [pBind]="ptm('label')">
                <ng-container *ngIf="valueTemplate || _valueTemplate; else defaultValueTemplate">
                    <ng-container *ngTemplateOutlet="valueTemplate || _valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
                </ng-container>
                <ng-template #defaultValueTemplate>
                    <ng-container *ngIf="display === 'comma'; else chipsValueTemplate">
                        {{ label || 'empty' }}
                    </ng-container>
                    <ng-template #chipsValueTemplate>
                        <div *ngFor="let node of value" [class]="cx('chipItem')" [pBind]="ptm('chipItem')">
                            <p-chip [unstyled]="unstyled()" [label]="node.label" [class]="cx('pcChip')" [pt]="ptm('pcChip')" />
                        </div>
                        <ng-container *ngIf="emptyValue">{{ placeholder || 'empty' }}</ng-container>
                    </ng-template>
                </ng-template>
            </div>
        </div>
        <ng-container *ngIf="checkValue() && !$disabled() && showClear">
            <svg data-p-icon="times" *ngIf="!clearIconTemplate && !_clearIconTemplate" [class]="cx('clearIcon')" (click)="clear($event)" [pBind]="ptm('clearIcon')" />
            <span *ngIf="clearIconTemplate || clearIconTemplate" [class]="cx('clearIcon')" (click)="clear($event)" [pBind]="ptm('clearIcon')">
                <ng-template *ngTemplateOutlet="clearIconTemplate || _clearIconTemplate"></ng-template>
            </span>
        </ng-container>
        <div [class]="cx('dropdown')" role="button" aria-haspopup="tree" [attr.aria-expanded]="overlayVisible ?? false" [attr.aria-label]="'treeselect trigger'" [pBind]="ptm('dropdown')">
            <svg data-p-icon="chevron-down" *ngIf="!triggerIconTemplate && !_triggerIconTemplate && !dropdownIconTemplate && !_dropdownIconTemplate" [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')" />
            <span *ngIf="triggerIconTemplate || _triggerIconTemplate || dropdownIconTemplate || _dropdownIconTemplate" [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')">
                <ng-template *ngTemplateOutlet="triggerIconTemplate || _triggerIconTemplate || dropdownIconTemplate || _dropdownIconTemplate"></ng-template>
            </span>
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
            (onBeforeEnter)="onOverlayBeforeEnter()"
            (onBeforeHide)="onOverlayBeforeHide()"
            (onShow)="onShow.emit($event)"
            (onHide)="hide($event)"
        >
            <ng-template #content>
                <div #panel [attr.id]="listId" [class]="cn(cx('panel'), panelStyleClass, panelClass)" [ngStyle]="panelStyle" [pBind]="ptm('panel')">
                    <span
                        #firstHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onFirstHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('hiddenFirstFocusableEl')"
                    >
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate; context: { $implicit: value, options: options }"></ng-container>
                    <div [class]="cx('treeContainer')" [ngStyle]="{ 'max-height': scrollHeight }" [pBind]="ptm('treeContainer')">
                        <p-tree
                            #tree
                            [value]="options"
                            [propagateSelectionDown]="propagateSelectionDown"
                            [propagateSelectionUp]="propagateSelectionUp"
                            [selectionMode]="selectionMode"
                            (selectionChange)="onSelectionChange($event)"
                            [selection]="value"
                            [metaKeySelection]="metaKeySelection"
                            (onNodeExpand)="nodeExpand($event)"
                            (onNodeCollapse)="nodeCollapse($event)"
                            (onNodeSelect)="onSelect($event)"
                            [emptyMessage]="emptyMessage"
                            (onNodeUnselect)="onUnselect($event)"
                            [filter]="filter"
                            [filterBy]="filterBy"
                            [filterMode]="filterMode"
                            [filterPlaceholder]="filterPlaceholder"
                            [filterLocale]="filterLocale"
                            [filteredNodes]="filteredNodes"
                            [virtualScroll]="virtualScroll"
                            [virtualScrollItemSize]="virtualScrollItemSize"
                            [virtualScrollOptions]="virtualScrollOptions"
                            [_templateMap]="templateMap"
                            [loading]="loading"
                            [filterInputAutoFocus]="filterInputAutoFocus"
                            [loadingMode]="loadingMode"
                            [pt]="ptm('pcTree')"
                            [unstyled]="unstyled()"
                        >
                            <ng-container *ngIf="emptyTemplate || _emptyTemplate">
                                <ng-template #empty>
                                    <ng-container *ngTemplateOutlet="emptyTemplate || _emptyTemplate"></ng-container>
                                </ng-template>
                            </ng-container>
                            <ng-template #togglericon let-expanded *ngIf="itemTogglerIconTemplate || _itemTogglerIconTemplate">
                                <ng-container *ngTemplateOutlet="itemTogglerIconTemplate || _itemTogglerIconTemplate; context: { $implicit: expanded }"></ng-container>
                            </ng-template>
                            <ng-template #checkboxicon let-selected let-partialSelected="partialSelected" *ngIf="itemCheckboxIconTemplate || _itemCheckboxIconTemplate">
                                <ng-container *ngTemplateOutlet="itemCheckboxIconTemplate || _itemCheckboxIconTemplate; context: { $implicit: selected, partialSelected: partialSelected }"></ng-container>
                            </ng-template>
                            <ng-template #loadingicon *ngIf="itemLoadingIconTemplate || _itemLoadingIconTemplate">
                                <ng-container *ngTemplateOutlet="itemLoadingIconTemplate || _itemLoadingIconTemplate"></ng-container>
                            </ng-template>
                        </p-tree>
                    </div>
                    <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: value, options: options }"></ng-container>
                    <span
                        #lastHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onLastHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('hiddenLastFocusableEl')"
                    ></span>
                </div>
            </ng-template>
        </p-overlay>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [TREESELECT_VALUE_ACCESSOR, TreeSelectStyle, {
        provide: TREESELECT_INSTANCE,
        useExisting: TreeSelect
      }, {
        provide: PARENT_INSTANCE,
        useExisting: TreeSelect
      }],
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": "cn(cx('root'), containerStyleClass)",
        "[style]": "sx('root')"
      }
    }]
  }], null, {
    inputId: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    metaKeySelection: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    display: [{
      type: Input
    }],
    selectionMode: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    panelClass: [{
      type: Input
    }],
    panelStyle: [{
      type: Input
    }],
    panelStyleClass: [{
      type: Input
    }],
    containerStyle: [{
      type: Input
    }],
    containerStyleClass: [{
      type: Input
    }],
    labelStyle: [{
      type: Input
    }],
    labelStyleClass: [{
      type: Input
    }],
    overlayOptions: [{
      type: Input
    }],
    emptyMessage: [{
      type: Input
    }],
    filter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterBy: [{
      type: Input
    }],
    filterMode: [{
      type: Input
    }],
    filterPlaceholder: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    filterInputAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    propagateSelectionDown: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    propagateSelectionUp: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    resetFilterOnHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    virtualScroll: [{
      type: Input
    }],
    virtualScrollItemSize: [{
      type: Input
    }],
    virtualScrollOptions: [{
      type: Input
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    options: [{
      type: Input
    }],
    loading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    loadingMode: [{
      type: Input
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
    onNodeExpand: [{
      type: Output
    }],
    onNodeCollapse: [{
      type: Output
    }],
    onShow: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    onClear: [{
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
    onNodeUnselect: [{
      type: Output
    }],
    onNodeSelect: [{
      type: Output
    }],
    focusInput: [{
      type: ViewChild,
      args: ["focusInput"]
    }],
    filterViewChild: [{
      type: ViewChild,
      args: ["filter"]
    }],
    treeViewChild: [{
      type: ViewChild,
      args: ["tree"]
    }],
    panelEl: [{
      type: ViewChild,
      args: ["panel"]
    }],
    overlayViewChild: [{
      type: ViewChild,
      args: ["overlay"]
    }],
    firstHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["firstHiddenFocusableEl"]
    }],
    lastHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["lastHiddenFocusableEl"]
    }],
    valueTemplate: [{
      type: ContentChild,
      args: ["value", {
        descendants: false
      }]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    emptyTemplate: [{
      type: ContentChild,
      args: ["empty", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false
      }]
    }],
    clearIconTemplate: [{
      type: ContentChild,
      args: ["clearicon", {
        descendants: false
      }]
    }],
    triggerIconTemplate: [{
      type: ContentChild,
      args: ["triggericon", {
        descendants: false
      }]
    }],
    dropdownIconTemplate: [{
      type: ContentChild,
      args: ["dropdownicon", {
        descendants: false
      }]
    }],
    filterIconTemplate: [{
      type: ContentChild,
      args: ["filtericon", {
        descendants: false
      }]
    }],
    closeIconTemplate: [{
      type: ContentChild,
      args: ["closeicon", {
        descendants: false
      }]
    }],
    itemTogglerIconTemplate: [{
      type: ContentChild,
      args: ["itemtogglericon", {
        descendants: false
      }]
    }],
    itemCheckboxIconTemplate: [{
      type: ContentChild,
      args: ["itemcheckboxicon", {
        descendants: false
      }]
    }],
    itemLoadingIconTemplate: [{
      type: ContentChild,
      args: ["itemloadingicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    onHostClick: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }]
  });
})();
var TreeSelectModule = class _TreeSelectModule {
  static ɵfac = function TreeSelectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TreeSelectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TreeSelectModule,
    imports: [TreeSelect, SharedModule],
    exports: [TreeSelect, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [TreeSelect, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeSelectModule, [{
    type: NgModule,
    args: [{
      imports: [TreeSelect, SharedModule],
      exports: [TreeSelect, SharedModule]
    }]
  }], null, null);
})();
export {
  TREESELECT_VALUE_ACCESSOR,
  TreeSelect,
  TreeSelectClasses,
  TreeSelectModule,
  TreeSelectStyle
};
//# sourceMappingURL=primeng_treeselect.js.map
