import {
  FocusTrap
} from "./chunk-PBERNHWM.js";
import {
  zindexutils
} from "./chunk-OHFYJZH5.js";
import {
  Motion,
  MotionDirective,
  MotionModule
} from "./chunk-CQDTUEQU.js";
import {
  blockBodyScroll,
  unblockBodyScroll
} from "./chunk-VKUYHHYD.js";
import {
  EyeIcon,
  RefreshIcon,
  SearchMinusIcon,
  SearchPlusIcon,
  TimesIcon,
  UndoIcon
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
  bt,
  ut
} from "./chunk-HEA754HI.js";
import {
  CommonModule,
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
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresolveDocument,
  ɵɵsanitizeUrl,
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

// node_modules/@primeuix/styles/dist/image/index.mjs
var style = "\n    .p-image-mask {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-image-preview {\n        position: relative;\n        display: inline-flex;\n        line-height: 0;\n    }\n\n    .p-image-preview-mask {\n        position: absolute;\n        inset-inline-start: 0;\n        inset-block-start: 0;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        opacity: 0;\n        border: 0 none;\n        padding: 0;\n        cursor: pointer;\n        background: transparent;\n        color: dt('image.preview.mask.color');\n        transition: background dt('image.transition.duration');\n    }\n\n    .p-image-preview:hover > .p-image-preview-mask,\n    .p-image-preview-mask:focus-visible {\n        opacity: 1;\n        cursor: pointer;\n        background: dt('image.preview.mask.background');\n        outline: 0 none;\n    }\n\n    .p-image-preview-icon {\n        font-size: dt('image.preview.icon.size');\n        width: dt('image.preview.icon.size');\n        height: dt('image.preview.icon.size');\n    }\n\n    .p-image-toolbar {\n        position: absolute;\n        inset-block-start: dt('image.toolbar.position.top');\n        inset-inline-end: dt('image.toolbar.position.right');\n        inset-inline-start: dt('image.toolbar.position.left');\n        inset-block-end: dt('image.toolbar.position.bottom');\n        display: flex;\n        z-index: 1;\n        padding: dt('image.toolbar.padding');\n        background: dt('image.toolbar.background');\n        backdrop-filter: blur(dt('image.toolbar.blur'));\n        border-color: dt('image.toolbar.border.color');\n        border-style: solid;\n        border-width: dt('image.toolbar.border.width');\n        border-radius: dt('image.toolbar.border.radius');\n        gap: dt('image.toolbar.gap');\n    }\n\n    .p-image-action {\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        color: dt('image.action.color');\n        background: transparent;\n        width: dt('image.action.size');\n        height: dt('image.action.size');\n        margin: 0;\n        padding: 0;\n        border: 0 none;\n        cursor: pointer;\n        user-select: none;\n        border-radius: dt('image.action.border.radius');\n        outline-color: transparent;\n        transition:\n            background dt('image.transition.duration'),\n            color dt('image.transition.duration'),\n            outline-color dt('image.transition.duration'),\n            box-shadow dt('image.transition.duration');\n    }\n\n    .p-image-action:hover {\n        color: dt('image.action.hover.color');\n        background: dt('image.action.hover.background');\n    }\n\n    .p-image-action:focus-visible {\n        box-shadow: dt('image.action.focus.ring.shadow');\n        outline: dt('image.action.focus.ring.width') dt('image.action.focus.ring.style') dt('image.action.focus.ring.color');\n        outline-offset: dt('image.action.focus.ring.offset');\n    }\n\n    .p-image-action .p-icon {\n        font-size: dt('image.action.icon.size');\n        width: dt('image.action.icon.size');\n        height: dt('image.action.icon.size');\n    }\n\n    .p-image-action.p-disabled {\n        pointer-events: auto;\n    }\n\n    .p-image-original {\n        max-width: 100vw;\n        max-height: 100vh;\n        transition: transform 300ms;\n    }\n\n    .p-image-original-enter-active {\n        animation: p-animate-image-original-enter 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    .p-image-original-leave-active {\n        animation: p-animate-image-original-leave 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    @keyframes p-animate-image-original-enter {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-image-original-leave {\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-image.mjs
var _c0 = ["indicator"];
var _c1 = ["rotaterighticon"];
var _c2 = ["rotatelefticon"];
var _c3 = ["zoomouticon"];
var _c4 = ["zoominicon"];
var _c5 = ["closeicon"];
var _c6 = ["preview"];
var _c7 = ["image"];
var _c8 = ["mask"];
var _c9 = ["previewButton"];
var _c10 = ["closeButton"];
var _c11 = (a0) => ({
  errorCallback: a0
});
var _c12 = (a0, a1) => ({
  height: a0,
  width: a1
});
var _c13 = (a0, a1, a2) => ({
  class: a0,
  style: a1,
  previewCallback: a2
});
function Image_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "img", 8);
    ɵɵlistener("error", function Image_ng_container_0_Template_img_error_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.imageError($event));
    });
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.imageClass);
    ɵɵproperty("ngStyle", ctx_r1.imageStyle)("pBind", ctx_r1.ptm("image"));
    ɵɵattribute("src", ctx_r1.src, ɵɵsanitizeUrl)("srcset", ctx_r1.srcSet)("sizes", ctx_r1.sizes)("alt", ctx_r1.alt)("width", ctx_r1.width)("height", ctx_r1.height)("loading", ctx_r1.loading);
  }
}
function Image_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Image_button_2_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Image_button_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Image_button_2_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 11);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.indicatorTemplate || ctx_r1._indicatorTemplate);
  }
}
function Image_button_2_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 12);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("previewIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("previewIcon"));
  }
}
function Image_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 9, 0);
    ɵɵlistener("click", function Image_button_2_Template_button_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onImageClick());
    });
    ɵɵtemplate(2, Image_button_2_ng_container_2_Template, 2, 1, "ng-container", 10)(3, Image_button_2_ng_template_3_Template, 1, 3, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const defaultTemplate_r4 = ɵɵreference(4);
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("previewMask"));
    ɵɵproperty("ngStyle", ɵɵpureFunction2(7, _c12, ctx_r1.height + "px", ctx_r1.width + "px"))("pBind", ctx_r1.ptm("previewMask"));
    ɵɵattribute("aria-label", ctx_r1.zoomImageAriaLabel);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.indicatorTemplate || ctx_r1._indicatorTemplate)("ngIfElse", defaultTemplate_r4);
  }
}
function Image_Conditional_3__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 23);
  }
}
function Image_Conditional_3_5_ng_template_0_Template(rf, ctx) {
}
function Image_Conditional_3_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Image_Conditional_3_5_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Image_Conditional_3__svg_svg_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 24);
  }
}
function Image_Conditional_3_8_ng_template_0_Template(rf, ctx) {
}
function Image_Conditional_3_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Image_Conditional_3_8_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Image_Conditional_3__svg_svg_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 25);
  }
}
function Image_Conditional_3_11_ng_template_0_Template(rf, ctx) {
}
function Image_Conditional_3_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Image_Conditional_3_11_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Image_Conditional_3__svg_svg_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 26);
  }
}
function Image_Conditional_3_14_ng_template_0_Template(rf, ctx) {
}
function Image_Conditional_3_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Image_Conditional_3_14_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Image_Conditional_3__svg_svg_17_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 27);
  }
}
function Image_Conditional_3_18_ng_template_0_Template(rf, ctx) {
}
function Image_Conditional_3_18_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Image_Conditional_3_18_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Image_Conditional_3_Conditional_19_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "img", 29);
    ɵɵlistener("click", function Image_Conditional_3_Conditional_19_ng_container_1_Template_img_click_1_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onPreviewImageClick());
    });
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("original"));
    ɵɵproperty("ngStyle", ctx_r1.imagePreviewStyle())("pBind", ctx_r1.ptm("original"));
    ɵɵattribute("src", ctx_r1.previewImageSrc ? ctx_r1.previewImageSrc : ctx_r1.src, ɵɵsanitizeUrl)("srcset", ctx_r1.previewImageSrcSet)("sizes", ctx_r1.previewImageSizes);
  }
}
function Image_Conditional_3_Conditional_19_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Image_Conditional_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-motion", 28);
    ɵɵlistener("onBeforeEnter", function Image_Conditional_3_Conditional_19_Template_p_motion_onBeforeEnter_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onAnimationStart($event));
    })("onBeforeLeave", function Image_Conditional_3_Conditional_19_Template_p_motion_onBeforeLeave_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onBeforeLeave());
    })("onAfterLeave", function Image_Conditional_3_Conditional_19_Template_p_motion_onAfterLeave_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onAnimationEnd($event));
    });
    ɵɵtemplate(1, Image_Conditional_3_Conditional_19_ng_container_1_Template, 2, 7, "ng-container", 4)(2, Image_Conditional_3_Conditional_19_ng_container_2_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("visible", ctx_r1.previewVisible)("appear", true)("options", ctx_r1.computedMotionOptions());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.previewTemplate && !ctx_r1._previewTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.previewTemplate || ctx_r1._previewTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(6, _c13, ctx_r1.cx("original"), ctx_r1.imagePreviewStyle(), ctx_r1.onPreviewImageClick.bind(ctx_r1)));
  }
}
function Image_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 13, 2);
    ɵɵlistener("click", function Image_Conditional_3_Template_div_click_0_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMaskClick());
    })("keydown", function Image_Conditional_3_Template_div_keydown_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMaskKeydown($event));
    })("pMotionOnAfterLeave", function Image_Conditional_3_Template_div_pMotionOnAfterLeave_0_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMaskAfterLeave());
    });
    ɵɵelementStart(2, "div", 14);
    ɵɵlistener("click", function Image_Conditional_3_Template_div_click_2_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.handleToolbarClick($event));
    });
    ɵɵelementStart(3, "button", 15);
    ɵɵlistener("click", function Image_Conditional_3_Template_button_click_3_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.rotateRight());
    });
    ɵɵtemplate(4, Image_Conditional_3__svg_svg_4_Template, 1, 0, "svg", 16)(5, Image_Conditional_3_5_Template, 1, 0, null, 11);
    ɵɵelementEnd();
    ɵɵelementStart(6, "button", 15);
    ɵɵlistener("click", function Image_Conditional_3_Template_button_click_6_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.rotateLeft());
    });
    ɵɵtemplate(7, Image_Conditional_3__svg_svg_7_Template, 1, 0, "svg", 17)(8, Image_Conditional_3_8_Template, 1, 0, null, 11);
    ɵɵelementEnd();
    ɵɵelementStart(9, "button", 18);
    ɵɵlistener("click", function Image_Conditional_3_Template_button_click_9_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.zoomOut());
    });
    ɵɵtemplate(10, Image_Conditional_3__svg_svg_10_Template, 1, 0, "svg", 19)(11, Image_Conditional_3_11_Template, 1, 0, null, 11);
    ɵɵelementEnd();
    ɵɵelementStart(12, "button", 18);
    ɵɵlistener("click", function Image_Conditional_3_Template_button_click_12_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.zoomIn());
    });
    ɵɵtemplate(13, Image_Conditional_3__svg_svg_13_Template, 1, 0, "svg", 20)(14, Image_Conditional_3_14_Template, 1, 0, null, 11);
    ɵɵelementEnd();
    ɵɵelementStart(15, "button", 15, 3);
    ɵɵlistener("click", function Image_Conditional_3_Template_button_click_15_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.closePreview());
    });
    ɵɵtemplate(17, Image_Conditional_3__svg_svg_17_Template, 1, 0, "svg", 21)(18, Image_Conditional_3_18_Template, 1, 0, null, 11);
    ɵɵelementEnd()();
    ɵɵconditionalCreate(19, Image_Conditional_3_Conditional_19_Template, 3, 10, "p-motion", 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("mask"));
    ɵɵproperty("pBind", ctx_r1.ptm("mask"))("pMotion", ctx_r1.maskVisible)("pMotionAppear", true)("pMotionEnterActiveClass", "p-overlay-mask-enter-active")("pMotionLeaveActiveClass", "p-overlay-mask-leave-active")("pMotionOptions", ctx_r1.computedMaskMotionOptions());
    ɵɵattribute("aria-modal", ctx_r1.maskVisible);
    ɵɵadvance(2);
    ɵɵclassMap(ctx_r1.cx("toolbar"));
    ɵɵproperty("pBind", ctx_r1.ptm("toolbar"));
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("rotateRightButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("rotateRightButton"));
    ɵɵattribute("aria-label", ctx_r1.rightAriaLabel());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.rotateRightIconTemplate && !ctx_r1._rotateRightIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.rotateRightIconTemplate || ctx_r1._rotateRightIconTemplate);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("rotateLeftButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("rotateLeftButton"));
    ɵɵattribute("aria-label", ctx_r1.leftAriaLabel());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.rotateLeftIconTemplate && !ctx_r1._rotateLeftIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.rotateLeftIconTemplate || ctx_r1._rotateLeftIconTemplate);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("zoomOutButton"));
    ɵɵproperty("disabled", ctx_r1.isZoomOutDisabled)("pBind", ctx_r1.ptm("zoomOutButton"));
    ɵɵattribute("aria-label", ctx_r1.zoomOutAriaLabel());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.zoomOutIconTemplate && !ctx_r1._zoomOutIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.zoomOutIconTemplate || ctx_r1._zoomOutIconTemplate);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("zoomInButton"));
    ɵɵproperty("disabled", ctx_r1.isZoomInDisabled)("pBind", ctx_r1.ptm("zoomInButton"));
    ɵɵattribute("aria-label", ctx_r1.zoomInAriaLabel());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.zoomInIconTemplate && !ctx_r1._zoomInIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.zoomInIconTemplate || ctx_r1._zoomInIconTemplate);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("closeButton"));
    ɵɵproperty("pBind", ctx_r1.ptm("closeButton"));
    ɵɵattribute("aria-label", ctx_r1.closeAriaLabel());
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.closeIconTemplate && !ctx_r1._closeIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.closeIconTemplate || ctx_r1._closeIconTemplate);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.renderPreview() ? 19 : -1);
  }
}
var classes = {
  root: ({
    instance
  }) => ["p-image p-component", {
    "p-image-preview": instance.preview
  }],
  previewMask: "p-image-preview-mask",
  previewIcon: "p-image-preview-icon",
  mask: "p-image-mask p-overlay-mask",
  toolbar: "p-image-toolbar",
  rotateRightButton: "p-image-action p-image-rotate-right-button",
  rotateLeftButton: "p-image-action p-image-rotate-left-button",
  zoomOutButton: ({
    instance
  }) => ["p-image-action p-image-zoom-out-button", {
    "p-disabled": instance.isZoomOutDisabled
  }],
  zoomInButton: ({
    instance
  }) => ["p-image-action p-image-zoom-in-button", {
    "p-disabled": instance.isZoomInDisabled
  }],
  closeButton: "p-image-action p-image-close-button",
  original: "p-image-original"
};
var ImageStyle = class _ImageStyle extends BaseStyle {
  name = "image";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵImageStyle_BaseFactory;
    return function ImageStyle_Factory(__ngFactoryType__) {
      return (ɵImageStyle_BaseFactory || (ɵImageStyle_BaseFactory = ɵɵgetInheritedFactory(_ImageStyle)))(__ngFactoryType__ || _ImageStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _ImageStyle,
    factory: _ImageStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImageStyle, [{
    type: Injectable
  }], null, null);
})();
var ImageClasses;
(function(ImageClasses2) {
  ImageClasses2["root"] = "p-image";
  ImageClasses2["previewMask"] = "p-image-preview-mask";
  ImageClasses2["previewIcon"] = "p-image-preview-icon";
  ImageClasses2["mask"] = "p-image-mask";
  ImageClasses2["toolbar"] = "p-image-toolbar";
  ImageClasses2["rotateRightButton"] = "p-image-rotate-right-button";
  ImageClasses2["rotateLeftButton"] = "p-image-rotate-left-button";
  ImageClasses2["zoomOutButton"] = "p-image-zoom-out-button";
  ImageClasses2["zoomInButton"] = "p-image-zoom-in-button";
  ImageClasses2["closeButton"] = "p-image-close-button";
  ImageClasses2["original"] = "p-image-original";
})(ImageClasses || (ImageClasses = {}));
var IMAGE_INSTANCE = new InjectionToken("IMAGE_INSTANCE");
var Image = class _Image extends BaseComponent {
  $pcImage = inject(IMAGE_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  /**
   * Style class of the image element.
   * @group Props
   */
  imageClass;
  /**
   * Inline style of the image element.
   * @group Props
   */
  imageStyle;
  /**
   * Class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * The source path for the main image.
   * @group Props
   */
  src;
  /**
   * The srcset definition for the main image.
   * @group Props
   */
  srcSet;
  /**
   * The sizes definition for the main image.
   * @group Props
   */
  sizes;
  /**
   * The source path for the preview image.
   * @group Props
   */
  previewImageSrc;
  /**
   * The srcset definition for the preview image.
   * @group Props
   */
  previewImageSrcSet;
  /**
   * The sizes definition for the preview image.
   * @group Props
   */
  previewImageSizes;
  /**
   * Attribute of the preview image element.
   * @group Props
   */
  alt;
  /**
   * Attribute of the image element.
   * @group Props
   */
  width;
  /**
   * Attribute of the image element.
   * @group Props
   */
  height;
  /**
   * Attribute of the image element.
   * @group Props
   */
  loading;
  /**
   * Controls the preview functionality.
   * @group Props
   */
  preview = false;
  /**
   * Transition options of the show animation
   * @group Props
   * @deprecated since v21.0.0. Use `motionOptions` instead.
   */
  showTransitionOptions = "150ms cubic-bezier(0, 0, 0.2, 1)";
  /**
   * Transition options of the hide animation
   * @group Props
   * @deprecated since v21.0.0. Use `motionOptions` instead.
   */
  hideTransitionOptions = "150ms cubic-bezier(0, 0, 0.2, 1)";
  /**
   * Enter animation class name of modal.
   * @defaultValue 'p-modal-enter'
   * @group Props
   */
  modalEnterAnimation = input("p-modal-enter", ...ngDevMode ? [{
    debugName: "modalEnterAnimation"
  }] : []);
  /**
   * Leave animation class name of modal.
   * @defaultValue 'p-modal-leave'
   * @group Props
   */
  modalLeaveAnimation = input("p-modal-leave", ...ngDevMode ? [{
    debugName: "modalLeaveAnimation"
  }] : []);
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(void 0, ...ngDevMode ? [{
    debugName: "appendTo"
  }] : []);
  /**
   * The motion options for the mask.
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
   * Triggered when the preview overlay is shown.
   * @group Emits
   */
  onShow = new EventEmitter();
  /**
   * Triggered when the preview overlay is hidden.
   * @group Emits
   */
  onHide = new EventEmitter();
  /**
   * This event is triggered if an error occurs while loading an image file.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onImageError = new EventEmitter();
  mask;
  previewButton;
  closeButton;
  /**
   * Custom indicator template.
   * @group Templates
   */
  indicatorTemplate;
  /**
   * Custom rotate right icon template.
   * @group Templates
   */
  rotateRightIconTemplate;
  /**
   * Custom rotate left icon template.
   * @group Templates
   */
  rotateLeftIconTemplate;
  /**
   * Custom zoom out icon template.
   * @group Templates
   */
  zoomOutIconTemplate;
  /**
   * Custom zoom in icon template.
   * @group Templates
   */
  zoomInIconTemplate;
  /**
   * Custom close icon template.
   * @group Templates
   */
  closeIconTemplate;
  /**
   * Custom preview template.
   * @group Templates
   */
  previewTemplate;
  /**
   * Custom image template.
   * @group Templates
   */
  imageTemplate;
  renderMask = signal(false, ...ngDevMode ? [{
    debugName: "renderMask"
  }] : []);
  renderPreview = signal(false, ...ngDevMode ? [{
    debugName: "renderPreview"
  }] : []);
  maskVisible = false;
  previewVisible = false;
  rotate = 0;
  scale = 1;
  previewClick = false;
  container;
  wrapper;
  _componentStyle = inject(ImageStyle);
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  get isZoomOutDisabled() {
    return this.scale - this.zoomSettings.step <= this.zoomSettings.min;
  }
  get isZoomInDisabled() {
    return this.scale + this.zoomSettings.step >= this.zoomSettings.max;
  }
  zoomSettings = {
    default: 1,
    step: 0.1,
    max: 1.5,
    min: 0.5
  };
  templates;
  _indicatorTemplate;
  _rotateRightIconTemplate;
  _rotateLeftIconTemplate;
  _zoomOutIconTemplate;
  _zoomInIconTemplate;
  _closeIconTemplate;
  _imageTemplate;
  _previewTemplate;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "indicator":
          this._indicatorTemplate = item.template;
          break;
        case "rotaterighticon":
          this._rotateRightIconTemplate = item.template;
          break;
        case "rotatelefticon":
          this._rotateLeftIconTemplate = item.template;
          break;
        case "zoomouticon":
          this._zoomOutIconTemplate = item.template;
          break;
        case "zoominicon":
          this._zoomInIconTemplate = item.template;
          break;
        case "closeicon":
          this._closeIconTemplate = item.template;
          break;
        case "image":
          this._imageTemplate = item.template;
          break;
        case "preview":
          this._previewTemplate = item.template;
          break;
        default:
          this._indicatorTemplate = item.template;
          break;
      }
    });
  }
  onImageClick() {
    if (this.preview) {
      this.maskVisible = true;
      this.previewVisible = true;
      this.renderMask.set(true);
      this.renderPreview.set(true);
      blockBodyScroll();
    }
  }
  onMaskClick() {
    if (!this.previewClick) {
      this.closePreview();
    }
    this.previewClick = false;
  }
  onMaskKeydown(event) {
    switch (event.code) {
      case "Escape":
        this.onMaskClick();
        setTimeout(() => {
          bt(this.previewButton?.nativeElement);
        }, 25);
        event.preventDefault();
        break;
      default:
        break;
    }
  }
  onPreviewImageClick() {
    this.previewClick = true;
  }
  rotateRight() {
    this.rotate += 90;
    this.previewClick = true;
  }
  rotateLeft() {
    this.rotate -= 90;
    this.previewClick = true;
  }
  zoomIn() {
    this.scale = this.scale + this.zoomSettings.step;
    this.previewClick = true;
  }
  zoomOut() {
    this.scale = this.scale - this.zoomSettings.step;
    this.previewClick = true;
  }
  onAnimationStart(event) {
    this.container = event.element;
    this.wrapper = this.container?.parentElement;
    this.$attrSelector && this.wrapper?.setAttribute(this.$attrSelector, "");
    this.appendContainer();
    this.moveOnTop();
    this.onShow.emit({});
    setTimeout(() => {
      bt(this.closeButton?.nativeElement);
    }, 25);
  }
  onBeforeLeave() {
    this.maskVisible = false;
  }
  onAnimationEnd() {
    this.renderPreview.set(false);
  }
  onMaskAfterLeave() {
    if (!this.renderPreview()) {
      this.renderMask.set(false);
    }
    zindexutils.clear(this.wrapper);
    this.container = null;
    this.wrapper = null;
    this.rotate = 0;
    this.scale = this.zoomSettings.default;
    unblockBodyScroll();
    this.onHide.emit({});
    this.cd.markForCheck();
  }
  moveOnTop() {
    zindexutils.set("modal", this.wrapper, this.config.zIndex.modal);
  }
  appendContainer() {
    if (this.$appendTo() && this.$appendTo() !== "self") {
      if (this.$appendTo() === "body" && this.wrapper) {
        this.document.body.appendChild(this.wrapper);
      } else if (this.wrapper) {
        ut(this.$appendTo(), this.wrapper);
      }
    }
  }
  imagePreviewStyle() {
    return {
      transform: "rotate(" + this.rotate + "deg) scale(" + this.scale + ")"
    };
  }
  get zoomImageAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.zoomImage : void 0;
  }
  handleToolbarClick(event) {
    event.stopPropagation();
  }
  closePreview() {
    this.previewVisible = false;
  }
  imageError(event) {
    this.onImageError.emit(event);
  }
  rightAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.rotateRight : void 0;
  }
  leftAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.rotateLeft : void 0;
  }
  zoomInAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.zoomIn : void 0;
  }
  zoomOutAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.zoomOut : void 0;
  }
  closeAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.close : void 0;
  }
  onKeydownHandler() {
    if (this.previewVisible) {
      this.closePreview();
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵImage_BaseFactory;
    return function Image_Factory(__ngFactoryType__) {
      return (ɵImage_BaseFactory || (ɵImage_BaseFactory = ɵɵgetInheritedFactory(_Image)))(__ngFactoryType__ || _Image);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Image,
    selectors: [["p-image"]],
    contentQueries: function Image_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4)(dirIndex, _c1, 4)(dirIndex, _c2, 4)(dirIndex, _c3, 4)(dirIndex, _c4, 4)(dirIndex, _c5, 4)(dirIndex, _c6, 4)(dirIndex, _c7, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.indicatorTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.rotateRightIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.rotateLeftIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.zoomOutIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.zoomInIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.closeIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.previewTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.imageTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Image_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c8, 5)(_c9, 5)(_c10, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.mask = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.previewButton = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.closeButton = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function Image_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keydown.escape", function Image_keydown_escape_HostBindingHandler() {
          return ctx.onKeydownHandler();
        }, ɵɵresolveDocument);
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      imageClass: "imageClass",
      imageStyle: "imageStyle",
      styleClass: "styleClass",
      src: "src",
      srcSet: "srcSet",
      sizes: "sizes",
      previewImageSrc: "previewImageSrc",
      previewImageSrcSet: "previewImageSrcSet",
      previewImageSizes: "previewImageSizes",
      alt: "alt",
      width: "width",
      height: "height",
      loading: "loading",
      preview: [2, "preview", "preview", booleanAttribute],
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      modalEnterAnimation: [1, "modalEnterAnimation"],
      modalLeaveAnimation: [1, "modalLeaveAnimation"],
      appendTo: [1, "appendTo"],
      maskMotionOptions: [1, "maskMotionOptions"],
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      onShow: "onShow",
      onHide: "onHide",
      onImageError: "onImageError"
    },
    features: [ɵɵProvidersFeature([ImageStyle, {
      provide: IMAGE_INSTANCE,
      useExisting: _Image
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Image
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 4,
    vars: 7,
    consts: [["previewButton", ""], ["defaultTemplate", ""], ["mask", ""], ["closeButton", ""], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 3, "class", "ngStyle", "pBind", "click", 4, "ngIf"], ["role", "dialog", "pFocusTrap", "", 3, "class", "pBind", "pMotion", "pMotionAppear", "pMotionEnterActiveClass", "pMotionLeaveActiveClass", "pMotionOptions"], [3, "error", "ngStyle", "pBind"], ["type", "button", 3, "click", "ngStyle", "pBind"], [4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet"], ["data-p-icon", "eye", 3, "pBind"], ["role", "dialog", "pFocusTrap", "", 3, "click", "keydown", "pMotionOnAfterLeave", "pBind", "pMotion", "pMotionAppear", "pMotionEnterActiveClass", "pMotionLeaveActiveClass", "pMotionOptions"], [3, "click", "pBind"], ["type", "button", 3, "click", "pBind"], ["data-p-icon", "refresh", 4, "ngIf"], ["data-p-icon", "undo", 4, "ngIf"], ["type", "button", 3, "click", "disabled", "pBind"], ["data-p-icon", "search-minus", 4, "ngIf"], ["data-p-icon", "search-plus", 4, "ngIf"], ["data-p-icon", "times", 4, "ngIf"], ["name", "p-image-original", 3, "visible", "appear", "options"], ["data-p-icon", "refresh"], ["data-p-icon", "undo"], ["data-p-icon", "search-minus"], ["data-p-icon", "search-plus"], ["data-p-icon", "times"], ["name", "p-image-original", 3, "onBeforeEnter", "onBeforeLeave", "onAfterLeave", "visible", "appear", "options"], [3, "click", "ngStyle", "pBind"]],
    template: function Image_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, Image_ng_container_0_Template, 2, 11, "ng-container", 4)(1, Image_ng_container_1_Template, 1, 0, "ng-container", 5)(2, Image_button_2_Template, 5, 10, "button", 6);
        ɵɵconditionalCreate(3, Image_Conditional_3_Template, 20, 45, "div", 7);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.imageTemplate && !ctx._imageTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.imageTemplate || ctx._imageTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(5, _c11, ctx.imageError.bind(ctx)));
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.preview);
        ɵɵadvance();
        ɵɵconditional(ctx.renderMask() ? 3 : -1);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, NgStyle, RefreshIcon, EyeIcon, UndoIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, FocusTrap, SharedModule, BindModule, Bind, MotionModule, Motion, MotionDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Image, [{
    type: Component,
    args: [{
      selector: "p-image",
      standalone: true,
      imports: [CommonModule, RefreshIcon, EyeIcon, UndoIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, FocusTrap, SharedModule, BindModule, MotionModule],
      template: `
        <ng-container *ngIf="!imageTemplate && !_imageTemplate">
            <img
                [attr.src]="src"
                [attr.srcset]="srcSet"
                [attr.sizes]="sizes"
                [attr.alt]="alt"
                [attr.width]="width"
                [attr.height]="height"
                [attr.loading]="loading"
                [ngStyle]="imageStyle"
                [class]="imageClass"
                (error)="imageError($event)"
                [pBind]="ptm('image')"
            />
        </ng-container>

        <ng-container *ngTemplateOutlet="imageTemplate || _imageTemplate; context: { errorCallback: imageError.bind(this) }"></ng-container>

        <button *ngIf="preview" [attr.aria-label]="zoomImageAriaLabel" type="button" [class]="cx('previewMask')" (click)="onImageClick()" #previewButton [ngStyle]="{ height: height + 'px', width: width + 'px' }" [pBind]="ptm('previewMask')">
            <ng-container *ngIf="indicatorTemplate || _indicatorTemplate; else defaultTemplate">
                <ng-container *ngTemplateOutlet="indicatorTemplate || _indicatorTemplate"></ng-container>
            </ng-container>
            <ng-template #defaultTemplate>
                <svg data-p-icon="eye" [class]="cx('previewIcon')" [pBind]="ptm('previewIcon')" />
            </ng-template>
        </button>
        @if (renderMask()) {
            <div
                #mask
                [class]="cx('mask')"
                [attr.aria-modal]="maskVisible"
                role="dialog"
                (click)="onMaskClick()"
                (keydown)="onMaskKeydown($event)"
                pFocusTrap
                [pBind]="ptm('mask')"
                [pMotion]="maskVisible"
                [pMotionAppear]="true"
                [pMotionEnterActiveClass]="'p-overlay-mask-enter-active'"
                [pMotionLeaveActiveClass]="'p-overlay-mask-leave-active'"
                [pMotionOptions]="computedMaskMotionOptions()"
                (pMotionOnAfterLeave)="onMaskAfterLeave()"
            >
                <div [class]="cx('toolbar')" (click)="handleToolbarClick($event)" [pBind]="ptm('toolbar')">
                    <button [class]="cx('rotateRightButton')" (click)="rotateRight()" type="button" [attr.aria-label]="rightAriaLabel()" [pBind]="ptm('rotateRightButton')">
                        <svg data-p-icon="refresh" *ngIf="!rotateRightIconTemplate && !_rotateRightIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateRightIconTemplate || _rotateRightIconTemplate"></ng-template>
                    </button>
                    <button [class]="cx('rotateLeftButton')" (click)="rotateLeft()" type="button" [attr.aria-label]="leftAriaLabel()" [pBind]="ptm('rotateLeftButton')">
                        <svg data-p-icon="undo" *ngIf="!rotateLeftIconTemplate && !_rotateLeftIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateLeftIconTemplate || _rotateLeftIconTemplate"></ng-template>
                    </button>
                    <button [class]="cx('zoomOutButton')" (click)="zoomOut()" type="button" [disabled]="isZoomOutDisabled" [attr.aria-label]="zoomOutAriaLabel()" [pBind]="ptm('zoomOutButton')">
                        <svg data-p-icon="search-minus" *ngIf="!zoomOutIconTemplate && !_zoomOutIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomOutIconTemplate || _zoomOutIconTemplate"></ng-template>
                    </button>
                    <button [class]="cx('zoomInButton')" (click)="zoomIn()" type="button" [disabled]="isZoomInDisabled" [attr.aria-label]="zoomInAriaLabel()" [pBind]="ptm('zoomInButton')">
                        <svg data-p-icon="search-plus" *ngIf="!zoomInIconTemplate && !_zoomInIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomInIconTemplate || _zoomInIconTemplate"></ng-template>
                    </button>
                    <button [class]="cx('closeButton')" type="button" (click)="closePreview()" [attr.aria-label]="closeAriaLabel()" #closeButton [pBind]="ptm('closeButton')">
                        <svg data-p-icon="times" *ngIf="!closeIconTemplate && !_closeIconTemplate" />
                        <ng-template *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-template>
                    </button>
                </div>
                @if (renderPreview()) {
                    <p-motion [visible]="previewVisible" name="p-image-original" [appear]="true" [options]="computedMotionOptions()" (onBeforeEnter)="onAnimationStart($event)" (onBeforeLeave)="onBeforeLeave()" (onAfterLeave)="onAnimationEnd($event)">
                        <ng-container *ngIf="!previewTemplate && !_previewTemplate">
                            <img
                                [attr.src]="previewImageSrc ? previewImageSrc : src"
                                [attr.srcset]="previewImageSrcSet"
                                [attr.sizes]="previewImageSizes"
                                [class]="cx('original')"
                                [ngStyle]="imagePreviewStyle()"
                                (click)="onPreviewImageClick()"
                                [pBind]="ptm('original')"
                            />
                        </ng-container>
                        <ng-container
                            *ngTemplateOutlet="
                                previewTemplate || _previewTemplate;
                                context: {
                                    class: cx('original'),
                                    style: imagePreviewStyle(),
                                    previewCallback: onPreviewImageClick.bind(this)
                                }
                            "
                        >
                        </ng-container>
                    </p-motion>
                }
            </div>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [ImageStyle, {
        provide: IMAGE_INSTANCE,
        useExisting: Image
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Image
      }],
      host: {
        "[class]": "cn(cx('root'),styleClass)"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    imageClass: [{
      type: Input
    }],
    imageStyle: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    src: [{
      type: Input
    }],
    srcSet: [{
      type: Input
    }],
    sizes: [{
      type: Input
    }],
    previewImageSrc: [{
      type: Input
    }],
    previewImageSrcSet: [{
      type: Input
    }],
    previewImageSizes: [{
      type: Input
    }],
    alt: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    loading: [{
      type: Input
    }],
    preview: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    modalEnterAnimation: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "modalEnterAnimation",
        required: false
      }]
    }],
    modalLeaveAnimation: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "modalLeaveAnimation",
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
    maskMotionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "maskMotionOptions",
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
    onShow: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    onImageError: [{
      type: Output
    }],
    mask: [{
      type: ViewChild,
      args: ["mask"]
    }],
    previewButton: [{
      type: ViewChild,
      args: ["previewButton"]
    }],
    closeButton: [{
      type: ViewChild,
      args: ["closeButton"]
    }],
    indicatorTemplate: [{
      type: ContentChild,
      args: ["indicator", {
        descendants: false
      }]
    }],
    rotateRightIconTemplate: [{
      type: ContentChild,
      args: ["rotaterighticon", {
        descendants: false
      }]
    }],
    rotateLeftIconTemplate: [{
      type: ContentChild,
      args: ["rotatelefticon", {
        descendants: false
      }]
    }],
    zoomOutIconTemplate: [{
      type: ContentChild,
      args: ["zoomouticon", {
        descendants: false
      }]
    }],
    zoomInIconTemplate: [{
      type: ContentChild,
      args: ["zoominicon", {
        descendants: false
      }]
    }],
    closeIconTemplate: [{
      type: ContentChild,
      args: ["closeicon", {
        descendants: false
      }]
    }],
    previewTemplate: [{
      type: ContentChild,
      args: ["preview", {
        descendants: false
      }]
    }],
    imageTemplate: [{
      type: ContentChild,
      args: ["image", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    onKeydownHandler: [{
      type: HostListener,
      args: ["document:keydown.escape"]
    }]
  });
})();
var ImageModule = class _ImageModule {
  static ɵfac = function ImageModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImageModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ImageModule,
    imports: [Image, SharedModule],
    exports: [Image, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Image, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImageModule, [{
    type: NgModule,
    args: [{
      imports: [Image, SharedModule],
      exports: [Image, SharedModule]
    }]
  }], null, null);
})();
export {
  Image,
  ImageClasses,
  ImageModule,
  ImageStyle
};
//# sourceMappingURL=primeng_image.js.map
