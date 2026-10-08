import {
  Dialog
} from "./chunk-3M7CCRDZ.js";
import "./chunk-PBERNHWM.js";
import "./chunk-OHFYJZH5.js";
import "./chunk-CQDTUEQU.js";
import {
  Button
} from "./chunk-CD2MPJWB.js";
import "./chunk-LNLEKQ2Z.js";
import "./chunk-TONGHQ5F.js";
import "./chunk-VKUYHHYD.js";
import "./chunk-YMDHHTAC.js";
import "./chunk-34VLFIXD.js";
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
  ConfirmEventType,
  ConfirmationService,
  Footer,
  PrimeTemplate,
  SharedModule,
  TranslationKeys
} from "./chunk-SKV3H6PS.js";
import {
  _t,
  s3 as s,
  z
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
  ViewEncapsulation,
  booleanAttribute,
  input,
  numberAttribute,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
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
  ɵɵpureFunction1,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵsanitizeHtml,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor
} from "./chunk-FR73ZBHC.js";
import {
  EventEmitter,
  InjectionToken,
  NgZone,
  computed,
  inject,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-EGORNBH2.js";
import "./chunk-Y72XGDAT.js";
import "./chunk-HSWANC32.js";
import "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/confirmdialog/index.mjs
var style = "\n    .p-confirmdialog .p-dialog-content {\n        display: flex;\n        align-items: center;\n        gap: dt('confirmdialog.content.gap');\n    }\n\n    .p-confirmdialog-icon {\n        color: dt('confirmdialog.icon.color');\n        font-size: dt('confirmdialog.icon.size');\n        width: dt('confirmdialog.icon.size');\n        height: dt('confirmdialog.icon.size');\n    }\n";

// node_modules/primeng/fesm2022/primeng-confirmdialog.mjs
var _c0 = ["header"];
var _c1 = ["footer"];
var _c2 = ["rejecticon"];
var _c3 = ["accepticon"];
var _c4 = ["message"];
var _c5 = ["icon"];
var _c6 = ["headless"];
var _c7 = [[["p-footer"]]];
var _c8 = ["p-footer"];
var _c9 = (a0, a1, a2) => ({
  $implicit: a0,
  onAccept: a1,
  onReject: a2
});
var _c10 = (a0) => ({
  $implicit: a0
});
function ConfirmDialog_Conditional_2_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ConfirmDialog_Conditional_2_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_Conditional_2_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.headlessTemplate || ctx_r0._headlessTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(2, _c9, ctx_r0.confirmation, ctx_r0.onAccept.bind(ctx_r0), ctx_r0.onReject.bind(ctx_r0)));
  }
}
function ConfirmDialog_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_Conditional_2_ng_template_0_Template, 1, 6, "ng-template", null, 2, ɵɵtemplateRefExtractor);
  }
}
function ConfirmDialog_Conditional_3_Conditional_0_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ConfirmDialog_Conditional_3_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_Conditional_3_Conditional_0_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.headerTemplate || ctx_r0._headerTemplate);
  }
}
function ConfirmDialog_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_Conditional_3_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", null, 4, ɵɵtemplateRefExtractor);
  }
}
function ConfirmDialog_Conditional_3_ng_template_1_Conditional_0_0_ng_template_0_Template(rf, ctx) {
}
function ConfirmDialog_Conditional_3_ng_template_1_Conditional_0_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_Conditional_3_ng_template_1_Conditional_0_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function ConfirmDialog_Conditional_3_ng_template_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_Conditional_3_ng_template_1_Conditional_0_0_Template, 1, 0, null, 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.iconTemplate || ctx_r0._iconTemplate);
  }
}
function ConfirmDialog_Conditional_3_ng_template_1_Conditional_1_i_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 12);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r0.option("icon"));
    ɵɵproperty("ngClass", ctx_r0.cx("icon"))("pBind", ctx_r0.ptm("icon"));
  }
}
function ConfirmDialog_Conditional_3_ng_template_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_Conditional_3_ng_template_1_Conditional_1_i_0_Template, 1, 4, "i", 11);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r0.option("icon"));
  }
}
function ConfirmDialog_Conditional_3_ng_template_1_Conditional_2_0_ng_template_0_Template(rf, ctx) {
}
function ConfirmDialog_Conditional_3_ng_template_1_Conditional_2_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_Conditional_3_ng_template_1_Conditional_2_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function ConfirmDialog_Conditional_3_ng_template_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_Conditional_3_ng_template_1_Conditional_2_0_Template, 1, 0, null, 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.messageTemplate || ctx_r0._messageTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c10, ctx_r0.confirmation));
  }
}
function ConfirmDialog_Conditional_3_ng_template_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 13);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("message"));
    ɵɵproperty("pBind", ctx_r0.ptm("message"))("innerHTML", ctx_r0.option("message"), ɵɵsanitizeHtml);
  }
}
function ConfirmDialog_Conditional_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, ConfirmDialog_Conditional_3_ng_template_1_Conditional_0_Template, 1, 1)(1, ConfirmDialog_Conditional_3_ng_template_1_Conditional_1_Template, 1, 1, "i", 9);
    ɵɵconditionalCreate(2, ConfirmDialog_Conditional_3_ng_template_1_Conditional_2_Template, 1, 4)(3, ConfirmDialog_Conditional_3_ng_template_1_Conditional_3_Template, 1, 4, "span", 10);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵconditional(ctx_r0.iconTemplate || ctx_r0._iconTemplate ? 0 : !ctx_r0.iconTemplate && !ctx_r0._iconTemplate && !ctx_r0._messageTemplate && !ctx_r0.messageTemplate ? 1 : -1);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r0.messageTemplate || ctx_r0._messageTemplate ? 2 : 3);
  }
}
function ConfirmDialog_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, ConfirmDialog_Conditional_3_Conditional_0_Template, 2, 0);
    ɵɵtemplate(1, ConfirmDialog_Conditional_3_ng_template_1_Template, 4, 2, "ng-template", null, 3, ɵɵtemplateRefExtractor);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.headerTemplate || ctx_r0._headerTemplate ? 0 : -1);
  }
}
function ConfirmDialog_ng_template_4_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ConfirmDialog_ng_template_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
    ɵɵtemplate(1, ConfirmDialog_ng_template_4_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.footerTemplate || ctx_r0._footerTemplate);
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_Conditional_0_i_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 18);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(6);
    ɵɵclassMap(ctx_r0.option("rejectIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("pcRejectButton")["icon"]);
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_Conditional_0_i_0_Template, 1, 3, "i", 17);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(5);
    ɵɵproperty("ngIf", ctx_r0.option("rejectIcon"));
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_1_ng_template_0_Template(rf, ctx) {
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_Conditional_0_Template, 1, 1, "i", 16);
    ɵɵtemplate(1, ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_1_Template, 1, 0, null, 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(4);
    ɵɵconditional(ctx_r0.rejectIcon && !ctx_r0.rejectIconTemplate && !ctx_r0._rejectIconTemplate ? 0 : -1);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.rejectIconTemplate || ctx_r0._rejectIconTemplate);
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 15);
    ɵɵlistener("onClick", function ConfirmDialog_ng_template_4_Conditional_1_p_button_0_Template_p_button_onClick_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r0.onReject());
    });
    ɵɵtemplate(1, ConfirmDialog_ng_template_4_Conditional_1_p_button_0_ng_template_1_Template, 2, 2, "ng-template", null, 5, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("pt", ctx_r0.ptm("pcRejectButton"))("label", ctx_r0.rejectButtonLabel)("styleClass", ctx_r0.getButtonStyleClass("pcRejectButton", "rejectButtonStyleClass"))("ariaLabel", ctx_r0.option("rejectButtonProps", "ariaLabel"))("buttonProps", ctx_r0.getRejectButtonProps())("unstyled", ctx_r0.unstyled());
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_Conditional_0_i_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 18);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(6);
    ɵɵclassMap(ctx_r0.option("acceptIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("pcAcceptButton")["icon"]);
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_Conditional_0_i_0_Template, 1, 3, "i", 17);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(5);
    ɵɵproperty("ngIf", ctx_r0.option("acceptIcon"));
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_1_ng_template_0_Template(rf, ctx) {
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_Conditional_0_Template, 1, 1, "i", 16);
    ɵɵtemplate(1, ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_1_Template, 1, 0, null, 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(4);
    ɵɵconditional(ctx_r0.acceptIcon && !ctx_r0._acceptIconTemplate && !ctx_r0.acceptIconTemplate ? 0 : -1);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.acceptIconTemplate || ctx_r0._acceptIconTemplate);
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_p_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 15);
    ɵɵlistener("onClick", function ConfirmDialog_ng_template_4_Conditional_1_p_button_1_Template_p_button_onClick_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r0.onAccept());
    });
    ɵɵtemplate(1, ConfirmDialog_ng_template_4_Conditional_1_p_button_1_ng_template_1_Template, 2, 2, "ng-template", null, 5, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("pt", ctx_r0.ptm("pcAcceptButton"))("label", ctx_r0.acceptButtonLabel)("styleClass", ctx_r0.getButtonStyleClass("pcAcceptButton", "acceptButtonStyleClass"))("ariaLabel", ctx_r0.option("acceptButtonProps", "ariaLabel"))("buttonProps", ctx_r0.getAcceptButtonProps())("unstyled", ctx_r0.unstyled());
  }
}
function ConfirmDialog_ng_template_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmDialog_ng_template_4_Conditional_1_p_button_0_Template, 3, 6, "p-button", 14)(1, ConfirmDialog_ng_template_4_Conditional_1_p_button_1_Template, 3, 6, "p-button", 14);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", ctx_r0.option("rejectVisible"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.option("acceptVisible"));
  }
}
function ConfirmDialog_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, ConfirmDialog_ng_template_4_Conditional_0_Template, 2, 1);
    ɵɵconditionalCreate(1, ConfirmDialog_ng_template_4_Conditional_1_Template, 2, 2);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.footerTemplate || ctx_r0._footerTemplate ? 0 : -1);
    ɵɵadvance();
    ɵɵconditional(!ctx_r0.footerTemplate && !ctx_r0._footerTemplate ? 1 : -1);
  }
}
var classes = {
  root: "p-confirmdialog",
  icon: "p-confirmdialog-icon",
  message: "p-confirmdialog-message",
  pcRejectButton: "p-confirmdialog-reject-button",
  pcAcceptButton: "p-confirmdialog-accept-button"
};
var ConfirmDialogStyle = class _ConfirmDialogStyle extends BaseStyle {
  name = "confirmdialog";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵConfirmDialogStyle_BaseFactory;
    return function ConfirmDialogStyle_Factory(__ngFactoryType__) {
      return (ɵConfirmDialogStyle_BaseFactory || (ɵConfirmDialogStyle_BaseFactory = ɵɵgetInheritedFactory(_ConfirmDialogStyle)))(__ngFactoryType__ || _ConfirmDialogStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _ConfirmDialogStyle,
    factory: _ConfirmDialogStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmDialogStyle, [{
    type: Injectable
  }], null, null);
})();
var ConfirmDialogClasses;
(function(ConfirmDialogClasses2) {
  ConfirmDialogClasses2["root"] = "p-confirmdialog";
  ConfirmDialogClasses2["icon"] = "p-confirmdialog-icon";
  ConfirmDialogClasses2["message"] = "p-confirmdialog-message";
  ConfirmDialogClasses2["pcRejectButton"] = "p-confirmdialog-reject-button";
  ConfirmDialogClasses2["pcAcceptButton"] = "p-confirmdialog-accept-button";
})(ConfirmDialogClasses || (ConfirmDialogClasses = {}));
var CONFIRMDIALOG_INSTANCE = new InjectionToken("CONFIRMDIALOG_INSTANCE");
var ConfirmDialog = class _ConfirmDialog extends BaseComponent {
  confirmationService;
  zone;
  $pcConfirmDialog = inject(CONFIRMDIALOG_INSTANCE, {
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
   * Title text of the dialog.
   * @group Props
   */
  header;
  /**
   * Icon to display next to message.
   * @group Props
   */
  icon;
  /**
   * Message of the confirmation.
   * @group Props
   */
  message;
  /**
   * Inline style of the element.
   * @group Props
   */
  get style() {
    return this._style;
  }
  set style(value) {
    this._style = value;
    this.cd.markForCheck();
  }
  /**
   * Class of the element.
   * @group Props
   */
  styleClass;
  /**
   * Specify the CSS class(es) for styling the mask element
   * @group Props
   */
  maskStyleClass;
  /**
   * Icon of the accept button.
   * @group Props
   */
  acceptIcon;
  /**
   * Label of the accept button.
   * @group Props
   */
  acceptLabel;
  /**
   * Defines a string that labels the close button for accessibility.
   * @group Props
   */
  closeAriaLabel;
  /**
   * Defines a string that labels the accept button for accessibility.
   * @group Props
   */
  acceptAriaLabel;
  /**
   * Visibility of the accept button.
   * @group Props
   */
  acceptVisible = true;
  /**
   * Icon of the reject button.
   * @group Props
   */
  rejectIcon;
  /**
   * Label of the reject button.
   * @group Props
   */
  rejectLabel;
  /**
   * Defines a string that labels the reject button for accessibility.
   * @group Props
   */
  rejectAriaLabel;
  /**
   * Visibility of the reject button.
   * @group Props
   */
  rejectVisible = true;
  /**
   * Style class of the accept button.
   * @group Props
   */
  acceptButtonStyleClass;
  /**
   * Style class of the reject button.
   * @group Props
   */
  rejectButtonStyleClass;
  /**
   * Specifies if pressing escape key should hide the dialog.
   * @group Props
   */
  closeOnEscape = true;
  /**
   * Specifies if clicking the modal background should hide the dialog.
   * @group Props
   */
  dismissableMask;
  /**
   * Determines whether scrolling behavior should be blocked within the component.
   * @group Props
   */
  blockScroll = true;
  /**
   * When enabled dialog is displayed in RTL direction.
   * @group Props
   */
  rtl = false;
  /**
   * Adds a close icon to the header to hide the dialog.
   * @group Props
   */
  closable = true;
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'body'
   * @group Props
   */
  appendTo = input("body", ...ngDevMode ? [{
    debugName: "appendTo"
  }] : []);
  /**
   * Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs.
   * @group Props
   */
  key;
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
   * Transition options of the animation.
   * @group Props
   */
  transitionOptions = "150ms cubic-bezier(0, 0, 0.2, 1)";
  /**
   * When enabled, can only focus on elements inside the confirm dialog.
   * @group Props
   */
  focusTrap = true;
  /**
   * Element to receive the focus when the dialog gets visible.
   * @group Props
   */
  defaultFocus = "accept";
  /**
   * Object literal to define widths per screen size.
   * @group Props
   */
  breakpoints;
  /**
   * Defines if background should be blocked when dialog is displayed.
   * @group Props
   */
  modal = true;
  /**
   * Current visible state as a boolean.
   * @group Props
   */
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
    if (this._visible && !this.maskVisible) {
      this.maskVisible = true;
    }
    this.cd.markForCheck();
  }
  /**
   *  Allows getting the position of the component.
   * @group Props
   */
  position = "center";
  /**
   * Enables dragging to change the position using header.
   * @group Props
   */
  draggable = true;
  /**
   * Callback to invoke when dialog is hidden.
   * @param {ConfirmEventType} enum - Custom confirm event.
   * @group Emits
   */
  onHide = new EventEmitter();
  footer;
  _componentStyle = inject(ConfirmDialogStyle);
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
   * Custom reject icon template.
   * @group Templates
   */
  rejectIconTemplate;
  /**
   * Custom accept icon template.
   * @group Templates
   */
  acceptIconTemplate;
  /**
   * Custom message template.
   * @group Templates
   */
  messageTemplate;
  /**
   * Custom icon template.
   * @group Templates
   */
  iconTemplate;
  /**
   * Custom headless template.
   * @group Templates
   */
  headlessTemplate;
  templates;
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  _headerTemplate;
  _footerTemplate;
  _rejectIconTemplate;
  _acceptIconTemplate;
  _messageTemplate;
  _iconTemplate;
  _headlessTemplate;
  confirmation;
  _visible;
  _style;
  maskVisible;
  dialog;
  wrapper;
  contentContainer;
  subscription;
  preWidth;
  styleElement;
  id = s("pn_id_");
  ariaLabelledBy = this.getAriaLabelledBy();
  translationSubscription;
  constructor(confirmationService, zone) {
    super();
    this.confirmationService = confirmationService;
    this.zone = zone;
    this.subscription = this.confirmationService.requireConfirmation$.subscribe((confirmation) => {
      if (!confirmation) {
        this.hide();
        return;
      }
      if (confirmation.key === this.key) {
        this.confirmation = confirmation;
        const keys = Object.keys(confirmation);
        keys.forEach((key) => {
          this[key] = confirmation[key];
        });
        if (this.confirmation.accept) {
          this.confirmation.acceptEvent = new EventEmitter();
          this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
        }
        if (this.confirmation.reject) {
          this.confirmation.rejectEvent = new EventEmitter();
          this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
        }
        this.visible = true;
      }
    });
  }
  onInit() {
    if (this.breakpoints) {
      this.createStyle();
    }
    this.translationSubscription = this.config.translationObserver.subscribe(() => {
      if (this.visible) {
        this.cd.markForCheck();
      }
    });
  }
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this._headerTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        case "message":
          this._messageTemplate = item.template;
          break;
        case "icon":
          this._iconTemplate = item.template;
          break;
        case "rejecticon":
          this._rejectIconTemplate = item.template;
          break;
        case "accepticon":
          this._acceptIconTemplate = item.template;
          break;
        case "headless":
          this._headlessTemplate = item.template;
          break;
      }
    });
  }
  getAriaLabelledBy() {
    return this.header !== null ? s("pn_id_") + "_header" : null;
  }
  option(name, k) {
    const source = this;
    if (source.hasOwnProperty(name)) {
      const value = k ? source[k] : source[name];
      return typeof value === "function" ? value() : value;
    }
    return void 0;
  }
  getButtonStyleClass(cx, opt) {
    const cxClass = this.cx(cx);
    const optionClass = this.option(opt);
    return [cxClass, optionClass].filter(Boolean).join(" ");
  }
  getElementToFocus() {
    if (!this.dialog?.el?.nativeElement) return;
    switch (this.option("defaultFocus")) {
      case "accept":
        return z(this.dialog.el.nativeElement, ".p-confirm-dialog-accept");
      case "reject":
        return z(this.dialog.el.nativeElement, ".p-confirm-dialog-reject");
      case "close":
        return z(this.dialog.el.nativeElement, ".p-dialog-header-close");
      case "none":
        return null;
      //backward compatibility
      default:
        return z(this.dialog.el.nativeElement, ".p-confirm-dialog-accept");
    }
  }
  createStyle() {
    if (!this.styleElement) {
      this.styleElement = this.document.createElement("style");
      this.styleElement.type = "text/css";
      _t(this.styleElement, "nonce", this.config?.csp()?.nonce);
      this.document.head.appendChild(this.styleElement);
      let innerHTML = "";
      for (let breakpoint in this.breakpoints) {
        innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-dialog[${this.id}] {
                            width: ${this.breakpoints[breakpoint]} !important;
                        }
                    }
                `;
      }
      this.styleElement.innerHTML = innerHTML;
      _t(this.styleElement, "nonce", this.config?.csp()?.nonce);
    }
  }
  close() {
    if (this.confirmation?.rejectEvent) {
      this.confirmation.rejectEvent.emit(ConfirmEventType.CANCEL);
    }
    this.hide(ConfirmEventType.CANCEL);
  }
  hide(type) {
    this.onHide.emit(type);
    this.visible = false;
    this.unsubscribeConfirmationEvents();
  }
  onDialogHide() {
    this.confirmation = null;
  }
  destroyStyle() {
    if (this.styleElement) {
      this.document.head.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }
  onDestroy() {
    this.subscription.unsubscribe();
    this.unsubscribeConfirmationEvents();
    if (this.translationSubscription) {
      this.translationSubscription.unsubscribe();
    }
    this.destroyStyle();
  }
  onVisibleChange(value) {
    if (!value) {
      this.close();
    } else {
      this.visible = value;
    }
  }
  onAccept() {
    if (this.confirmation && this.confirmation.acceptEvent) {
      this.confirmation.acceptEvent.emit();
    }
    this.hide(ConfirmEventType.ACCEPT);
  }
  onReject() {
    if (this.confirmation && this.confirmation.rejectEvent) {
      this.confirmation.rejectEvent.emit(ConfirmEventType.REJECT);
    }
    this.hide(ConfirmEventType.REJECT);
  }
  unsubscribeConfirmationEvents() {
    if (this.confirmation) {
      this.confirmation.acceptEvent?.unsubscribe();
      this.confirmation.rejectEvent?.unsubscribe();
    }
  }
  get acceptButtonLabel() {
    return this.option("acceptLabel") || this.getAcceptButtonProps()?.label || this.config.getTranslation(TranslationKeys.ACCEPT);
  }
  get rejectButtonLabel() {
    return this.option("rejectLabel") || this.getRejectButtonProps()?.label || this.config.getTranslation(TranslationKeys.REJECT);
  }
  getAcceptButtonProps() {
    return this.option("acceptButtonProps");
  }
  getRejectButtonProps() {
    return this.option("rejectButtonProps");
  }
  static ɵfac = function ConfirmDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmDialog)(ɵɵdirectiveInject(ConfirmationService), ɵɵdirectiveInject(NgZone));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ConfirmDialog,
    selectors: [["p-confirmDialog"], ["p-confirmdialog"], ["p-confirm-dialog"]],
    contentQueries: function ConfirmDialog_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, Footer, 5)(dirIndex, _c0, 4)(dirIndex, _c1, 4)(dirIndex, _c2, 4)(dirIndex, _c3, 4)(dirIndex, _c4, 4)(dirIndex, _c5, 4)(dirIndex, _c6, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t2;
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.footer = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.headerTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.footerTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.rejectIconTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.acceptIconTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.messageTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.iconTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.headlessTemplate = _t2.first);
        ɵɵqueryRefresh(_t2 = ɵɵloadQuery()) && (ctx.templates = _t2);
      }
    },
    inputs: {
      header: "header",
      icon: "icon",
      message: "message",
      style: "style",
      styleClass: "styleClass",
      maskStyleClass: "maskStyleClass",
      acceptIcon: "acceptIcon",
      acceptLabel: "acceptLabel",
      closeAriaLabel: "closeAriaLabel",
      acceptAriaLabel: "acceptAriaLabel",
      acceptVisible: [2, "acceptVisible", "acceptVisible", booleanAttribute],
      rejectIcon: "rejectIcon",
      rejectLabel: "rejectLabel",
      rejectAriaLabel: "rejectAriaLabel",
      rejectVisible: [2, "rejectVisible", "rejectVisible", booleanAttribute],
      acceptButtonStyleClass: "acceptButtonStyleClass",
      rejectButtonStyleClass: "rejectButtonStyleClass",
      closeOnEscape: [2, "closeOnEscape", "closeOnEscape", booleanAttribute],
      dismissableMask: [2, "dismissableMask", "dismissableMask", booleanAttribute],
      blockScroll: [2, "blockScroll", "blockScroll", booleanAttribute],
      rtl: [2, "rtl", "rtl", booleanAttribute],
      closable: [2, "closable", "closable", booleanAttribute],
      appendTo: [1, "appendTo"],
      key: "key",
      autoZIndex: [2, "autoZIndex", "autoZIndex", booleanAttribute],
      baseZIndex: [2, "baseZIndex", "baseZIndex", numberAttribute],
      transitionOptions: "transitionOptions",
      focusTrap: [2, "focusTrap", "focusTrap", booleanAttribute],
      defaultFocus: "defaultFocus",
      breakpoints: "breakpoints",
      modal: [2, "modal", "modal", booleanAttribute],
      visible: "visible",
      position: "position",
      draggable: [2, "draggable", "draggable", booleanAttribute]
    },
    outputs: {
      onHide: "onHide"
    },
    features: [ɵɵProvidersFeature([ConfirmDialogStyle, {
      provide: CONFIRMDIALOG_INSTANCE,
      useExisting: _ConfirmDialog
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _ConfirmDialog
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c8,
    decls: 6,
    vars: 19,
    consts: [["dialog", ""], ["footer", ""], ["headless", ""], ["content", ""], ["header", ""], ["icon", ""], ["role", "alertdialog", 3, "visibleChange", "onHide", "pt", "visible", "closable", "styleClass", "modal", "header", "closeOnEscape", "blockScroll", "appendTo", "position", "dismissableMask", "draggable", "baseZIndex", "autoZIndex", "maskStyleClass", "unstyled"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngTemplateOutlet"], [3, "ngClass", "class", "pBind"], [3, "class", "pBind", "innerHTML"], [3, "ngClass", "class", "pBind", 4, "ngIf"], [3, "ngClass", "pBind"], [3, "pBind", "innerHTML"], [3, "pt", "label", "styleClass", "ariaLabel", "buttonProps", "unstyled", "onClick", 4, "ngIf"], [3, "onClick", "pt", "label", "styleClass", "ariaLabel", "buttonProps", "unstyled"], [3, "class", "pBind"], [3, "class", "pBind", 4, "ngIf"], [3, "pBind"]],
    template: function ConfirmDialog_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c7);
        ɵɵelementStart(0, "p-dialog", 6, 0);
        ɵɵlistener("visibleChange", function ConfirmDialog_Template_p_dialog_visibleChange_0_listener($event) {
          return ctx.onVisibleChange($event);
        })("onHide", function ConfirmDialog_Template_p_dialog_onHide_0_listener() {
          return ctx.onDialogHide();
        });
        ɵɵconditionalCreate(2, ConfirmDialog_Conditional_2_Template, 2, 0)(3, ConfirmDialog_Conditional_3_Template, 3, 1);
        ɵɵtemplate(4, ConfirmDialog_ng_template_4_Template, 2, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵstyleMap(ctx.style);
        ɵɵproperty("pt", ctx.pt)("visible", ctx.visible)("closable", ctx.option("closable"))("styleClass", ctx.cn(ctx.cx("root"), ctx.styleClass))("modal", ctx.option("modal"))("header", ctx.option("header"))("closeOnEscape", ctx.option("closeOnEscape"))("blockScroll", ctx.option("blockScroll"))("appendTo", ctx.$appendTo())("position", ctx.position)("dismissableMask", ctx.dismissableMask)("draggable", ctx.draggable)("baseZIndex", ctx.baseZIndex)("autoZIndex", ctx.autoZIndex)("maskStyleClass", ctx.cn(ctx.cx("mask"), ctx.maskStyleClass))("unstyled", ctx.unstyled());
        ɵɵadvance(2);
        ɵɵconditional(ctx.headlessTemplate || ctx._headlessTemplate ? 2 : 3);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, Button, Dialog, SharedModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmDialog, [{
    type: Component,
    args: [{
      selector: "p-confirmDialog, p-confirmdialog, p-confirm-dialog",
      standalone: true,
      imports: [CommonModule, Button, Dialog, SharedModule, Bind],
      template: `
        <p-dialog
            [pt]="pt"
            #dialog
            [visible]="visible"
            (visibleChange)="onVisibleChange($event)"
            role="alertdialog"
            [closable]="option('closable')"
            [styleClass]="cn(cx('root'), styleClass)"
            [modal]="option('modal')"
            [header]="option('header')"
            [closeOnEscape]="option('closeOnEscape')"
            [blockScroll]="option('blockScroll')"
            [appendTo]="$appendTo()"
            [position]="position"
            [style]="style"
            [dismissableMask]="dismissableMask"
            [draggable]="draggable"
            [baseZIndex]="baseZIndex"
            [autoZIndex]="autoZIndex"
            [maskStyleClass]="cn(cx('mask'), maskStyleClass)"
            [unstyled]="unstyled()"
            (onHide)="onDialogHide()"
        >
            @if (headlessTemplate || _headlessTemplate) {
                <ng-template #headless>
                    <ng-container
                        *ngTemplateOutlet="
                            headlessTemplate || _headlessTemplate;
                            context: {
                                $implicit: confirmation,
                                onAccept: onAccept.bind(this),
                                onReject: onReject.bind(this)
                            }
                        "
                    ></ng-container>
                </ng-template>
            } @else {
                @if (headerTemplate || _headerTemplate) {
                    <ng-template #header>
                        <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
                    </ng-template>
                }

                <ng-template #content>
                    @if (iconTemplate || _iconTemplate) {
                        <ng-template *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-template>
                    } @else if (!iconTemplate && !_iconTemplate && !_messageTemplate && !messageTemplate) {
                        <i [ngClass]="cx('icon')" [class]="option('icon')" [pBind]="ptm('icon')" *ngIf="option('icon')"></i>
                    }
                    @if (messageTemplate || _messageTemplate) {
                        <ng-template *ngTemplateOutlet="messageTemplate || _messageTemplate; context: { $implicit: confirmation }"></ng-template>
                    } @else {
                        <span [class]="cx('message')" [pBind]="ptm('message')" [innerHTML]="option('message')"> </span>
                    }
                </ng-template>
            }
            <ng-template #footer>
                @if (footerTemplate || _footerTemplate) {
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                }
                @if (!footerTemplate && !_footerTemplate) {
                    <p-button
                        [pt]="ptm('pcRejectButton')"
                        *ngIf="option('rejectVisible')"
                        [label]="rejectButtonLabel"
                        (onClick)="onReject()"
                        [styleClass]="getButtonStyleClass('pcRejectButton', 'rejectButtonStyleClass')"
                        [ariaLabel]="option('rejectButtonProps', 'ariaLabel')"
                        [buttonProps]="getRejectButtonProps()"
                        [unstyled]="unstyled()"
                    >
                        <ng-template #icon>
                            @if (rejectIcon && !rejectIconTemplate && !_rejectIconTemplate) {
                                <i *ngIf="option('rejectIcon')" [class]="option('rejectIcon')" [pBind]="ptm('pcRejectButton')['icon']"></i>
                            }
                            <ng-template *ngTemplateOutlet="rejectIconTemplate || _rejectIconTemplate"></ng-template>
                        </ng-template>
                    </p-button>
                    <p-button
                        [pt]="ptm('pcAcceptButton')"
                        [label]="acceptButtonLabel"
                        (onClick)="onAccept()"
                        [styleClass]="getButtonStyleClass('pcAcceptButton', 'acceptButtonStyleClass')"
                        *ngIf="option('acceptVisible')"
                        [ariaLabel]="option('acceptButtonProps', 'ariaLabel')"
                        [buttonProps]="getAcceptButtonProps()"
                        [unstyled]="unstyled()"
                    >
                        <ng-template #icon>
                            @if (acceptIcon && !_acceptIconTemplate && !acceptIconTemplate) {
                                <i *ngIf="option('acceptIcon')" [class]="option('acceptIcon')" [pBind]="ptm('pcAcceptButton')['icon']"></i>
                            }
                            <ng-template *ngTemplateOutlet="acceptIconTemplate || _acceptIconTemplate"></ng-template>
                        </ng-template>
                    </p-button>
                }
            </ng-template>
        </p-dialog>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [ConfirmDialogStyle, {
        provide: CONFIRMDIALOG_INSTANCE,
        useExisting: ConfirmDialog
      }, {
        provide: PARENT_INSTANCE,
        useExisting: ConfirmDialog
      }],
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: ConfirmationService
  }, {
    type: NgZone
  }], {
    header: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    maskStyleClass: [{
      type: Input
    }],
    acceptIcon: [{
      type: Input
    }],
    acceptLabel: [{
      type: Input
    }],
    closeAriaLabel: [{
      type: Input
    }],
    acceptAriaLabel: [{
      type: Input
    }],
    acceptVisible: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    rejectIcon: [{
      type: Input
    }],
    rejectLabel: [{
      type: Input
    }],
    rejectAriaLabel: [{
      type: Input
    }],
    rejectVisible: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    acceptButtonStyleClass: [{
      type: Input
    }],
    rejectButtonStyleClass: [{
      type: Input
    }],
    closeOnEscape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dismissableMask: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    blockScroll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    rtl: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    closable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
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
    key: [{
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
    transitionOptions: [{
      type: Input
    }],
    focusTrap: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    defaultFocus: [{
      type: Input
    }],
    breakpoints: [{
      type: Input
    }],
    modal: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    visible: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    draggable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onHide: [{
      type: Output
    }],
    footer: [{
      type: ContentChild,
      args: [Footer]
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
    rejectIconTemplate: [{
      type: ContentChild,
      args: ["rejecticon", {
        descendants: false
      }]
    }],
    acceptIconTemplate: [{
      type: ContentChild,
      args: ["accepticon", {
        descendants: false
      }]
    }],
    messageTemplate: [{
      type: ContentChild,
      args: ["message", {
        descendants: false
      }]
    }],
    iconTemplate: [{
      type: ContentChild,
      args: ["icon", {
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
var ConfirmDialogModule = class _ConfirmDialogModule {
  static ɵfac = function ConfirmDialogModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmDialogModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ConfirmDialogModule,
    imports: [ConfirmDialog, SharedModule],
    exports: [ConfirmDialog, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [ConfirmDialog, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmDialogModule, [{
    type: NgModule,
    args: [{
      imports: [ConfirmDialog, SharedModule],
      exports: [ConfirmDialog, SharedModule]
    }]
  }], null, null);
})();
export {
  ConfirmDialog,
  ConfirmDialogClasses,
  ConfirmDialogModule,
  ConfirmDialogStyle
};
//# sourceMappingURL=primeng_confirmdialog.js.map
