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
import "./chunk-HEA754HI.js";
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
  ViewEncapsulation,
  booleanAttribute,
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
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-FR73ZBHC.js";
import {
  InjectionToken,
  inject,
  ɵɵdefineInjectable,
  ɵɵdefineInjector
} from "./chunk-EGORNBH2.js";
import "./chunk-Y72XGDAT.js";
import "./chunk-HSWANC32.js";
import "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/tag/index.mjs
var style = "\n    .p-tag {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: dt('tag.primary.background');\n        color: dt('tag.primary.color');\n        font-size: dt('tag.font.size');\n        font-weight: dt('tag.font.weight');\n        padding: dt('tag.padding');\n        border-radius: dt('tag.border.radius');\n        gap: dt('tag.gap');\n    }\n\n    .p-tag-icon {\n        font-size: dt('tag.icon.size');\n        width: dt('tag.icon.size');\n        height: dt('tag.icon.size');\n    }\n\n    .p-tag-rounded {\n        border-radius: dt('tag.rounded.border.radius');\n    }\n\n    .p-tag-success {\n        background: dt('tag.success.background');\n        color: dt('tag.success.color');\n    }\n\n    .p-tag-info {\n        background: dt('tag.info.background');\n        color: dt('tag.info.color');\n    }\n\n    .p-tag-warn {\n        background: dt('tag.warn.background');\n        color: dt('tag.warn.color');\n    }\n\n    .p-tag-danger {\n        background: dt('tag.danger.background');\n        color: dt('tag.danger.color');\n    }\n\n    .p-tag-secondary {\n        background: dt('tag.secondary.background');\n        color: dt('tag.secondary.color');\n    }\n\n    .p-tag-contrast {\n        background: dt('tag.contrast.background');\n        color: dt('tag.contrast.color');\n    }\n";

// node_modules/primeng/fesm2022/primeng-tag.mjs
var _c0 = ["icon"];
var _c1 = ["*"];
function Tag_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 4);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("icon"));
    ɵɵproperty("ngClass", ctx_r0.icon)("pBind", ctx_r0.ptm("icon"));
  }
}
function Tag_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Tag_ng_container_1_span_1_Template, 1, 4, "span", 3);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.icon);
  }
}
function Tag_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Tag_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Tag_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Tag_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 2);
    ɵɵtemplate(1, Tag_span_2_1_Template, 1, 0, null, 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("icon"));
    ɵɵproperty("pBind", ctx_r0.ptm("icon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.iconTemplate || ctx_r0._iconTemplate);
  }
}
var classes = {
  root: ({
    instance
  }) => ["p-tag p-component", {
    "p-tag-info": instance.severity === "info",
    "p-tag-success": instance.severity === "success",
    "p-tag-warn": instance.severity === "warn",
    "p-tag-danger": instance.severity === "danger",
    "p-tag-secondary": instance.severity === "secondary",
    "p-tag-contrast": instance.severity === "contrast",
    "p-tag-rounded": instance.rounded
  }],
  icon: "p-tag-icon",
  label: "p-tag-label"
};
var TagStyle = class _TagStyle extends BaseStyle {
  name = "tag";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTagStyle_BaseFactory;
    return function TagStyle_Factory(__ngFactoryType__) {
      return (ɵTagStyle_BaseFactory || (ɵTagStyle_BaseFactory = ɵɵgetInheritedFactory(_TagStyle)))(__ngFactoryType__ || _TagStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TagStyle,
    factory: _TagStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TagStyle, [{
    type: Injectable
  }], null, null);
})();
var TagClasses;
(function(TagClasses2) {
  TagClasses2["root"] = "p-tag";
  TagClasses2["icon"] = "p-tag-icon";
  TagClasses2["label"] = "p-tag-label";
})(TagClasses || (TagClasses = {}));
var TAG_INSTANCE = new InjectionToken("TAG_INSTANCE");
var Tag = class _Tag extends BaseComponent {
  $pcTag = inject(TAG_INSTANCE, {
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
   * Style class of the component.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Severity type of the tag.
   * @group Props
   */
  severity;
  /**
   * Value to display inside the tag.
   * @group Props
   */
  value;
  /**
   * Icon of the tag to display next to the value.
   * @group Props
   */
  icon;
  /**
   * Whether the corners of the tag are rounded.
   * @group Props
   */
  rounded;
  /**
   * Custom icon template.
   * @group Templates
   */
  iconTemplate;
  templates;
  _iconTemplate;
  _componentStyle = inject(TagStyle);
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "icon":
          this._iconTemplate = item.template;
          break;
      }
    });
  }
  get dataP() {
    return this.cn({
      rounded: this.rounded,
      [this.severity]: this.severity
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTag_BaseFactory;
    return function Tag_Factory(__ngFactoryType__) {
      return (ɵTag_BaseFactory || (ɵTag_BaseFactory = ɵɵgetInheritedFactory(_Tag)))(__ngFactoryType__ || _Tag);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Tag,
    selectors: [["p-tag"]],
    contentQueries: function Tag_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.iconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    hostVars: 3,
    hostBindings: function Tag_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-p", ctx.dataP);
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      styleClass: "styleClass",
      severity: "severity",
      value: "value",
      icon: "icon",
      rounded: [2, "rounded", "rounded", booleanAttribute]
    },
    features: [ɵɵProvidersFeature([TagStyle, {
      provide: TAG_INSTANCE,
      useExisting: _Tag
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Tag
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c1,
    decls: 5,
    vars: 6,
    consts: [[4, "ngIf"], [3, "class", "pBind", 4, "ngIf"], [3, "pBind"], [3, "class", "ngClass", "pBind", 4, "ngIf"], [3, "ngClass", "pBind"], [4, "ngTemplateOutlet"]],
    template: function Tag_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
        ɵɵtemplate(1, Tag_ng_container_1_Template, 2, 1, "ng-container", 0)(2, Tag_span_2_Template, 2, 4, "span", 1);
        ɵɵelementStart(3, "span", 2);
        ɵɵtext(4);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.iconTemplate && !ctx._iconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.iconTemplate || ctx._iconTemplate);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("label"));
        ɵɵproperty("pBind", ctx.ptm("label"));
        ɵɵadvance();
        ɵɵtextInterpolate(ctx.value);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, SharedModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tag, [{
    type: Component,
    args: [{
      selector: "p-tag",
      standalone: true,
      imports: [CommonModule, SharedModule, Bind],
      template: `
        <ng-content></ng-content>
        <ng-container *ngIf="!iconTemplate && !_iconTemplate">
            <span [class]="cx('icon')" [ngClass]="icon" [pBind]="ptm('icon')" *ngIf="icon"></span>
        </ng-container>
        <span [class]="cx('icon')" [pBind]="ptm('icon')" *ngIf="iconTemplate || _iconTemplate">
            <ng-template *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-template>
        </span>
        <span [class]="cx('label')" [pBind]="ptm('label')">{{ value }}</span>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [TagStyle, {
        provide: TAG_INSTANCE,
        useExisting: Tag
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Tag
      }],
      host: {
        "[class]": "cn(cx('root'), styleClass)",
        "[attr.data-p]": "dataP"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    styleClass: [{
      type: Input
    }],
    severity: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    rounded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    iconTemplate: [{
      type: ContentChild,
      args: ["icon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var TagModule = class _TagModule {
  static ɵfac = function TagModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TagModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TagModule,
    imports: [Tag, SharedModule],
    exports: [Tag, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Tag, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TagModule, [{
    type: NgModule,
    args: [{
      imports: [Tag, SharedModule],
      exports: [Tag, SharedModule]
    }]
  }], null, null);
})();
export {
  Tag,
  TagClasses,
  TagModule,
  TagStyle
};
//# sourceMappingURL=primeng_tag.js.map
