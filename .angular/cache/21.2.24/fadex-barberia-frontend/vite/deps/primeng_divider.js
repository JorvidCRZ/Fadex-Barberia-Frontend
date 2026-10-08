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
import "./chunk-HEA754HI.js";
import {
  CommonModule
} from "./chunk-LFUJRON5.js";
import "./chunk-JAJ76GOU.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  NgModule,
  ViewEncapsulation,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵstyleMap
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

// node_modules/@primeuix/styles/dist/divider/index.mjs
var style = "\n    .p-divider-horizontal {\n        display: flex;\n        width: 100%;\n        position: relative;\n        align-items: center;\n        margin: dt('divider.horizontal.margin');\n        padding: dt('divider.horizontal.padding');\n    }\n\n    .p-divider-horizontal:before {\n        position: absolute;\n        display: block;\n        inset-block-start: 50%;\n        inset-inline-start: 0;\n        width: 100%;\n        content: '';\n        border-block-start: 1px solid dt('divider.border.color');\n    }\n\n    .p-divider-horizontal .p-divider-content {\n        padding: dt('divider.horizontal.content.padding');\n    }\n\n    .p-divider-vertical {\n        min-height: 100%;\n        display: flex;\n        position: relative;\n        justify-content: center;\n        margin: dt('divider.vertical.margin');\n        padding: dt('divider.vertical.padding');\n    }\n\n    .p-divider-vertical:before {\n        position: absolute;\n        display: block;\n        inset-block-start: 0;\n        inset-inline-start: 50%;\n        height: 100%;\n        content: '';\n        border-inline-start: 1px solid dt('divider.border.color');\n    }\n\n    .p-divider.p-divider-vertical .p-divider-content {\n        padding: dt('divider.vertical.content.padding');\n    }\n\n    .p-divider-content {\n        z-index: 1;\n        background: dt('divider.content.background');\n        color: dt('divider.content.color');\n    }\n\n    .p-divider-solid.p-divider-horizontal:before {\n        border-block-start-style: solid;\n    }\n\n    .p-divider-solid.p-divider-vertical:before {\n        border-inline-start-style: solid;\n    }\n\n    .p-divider-dashed.p-divider-horizontal:before {\n        border-block-start-style: dashed;\n    }\n\n    .p-divider-dashed.p-divider-vertical:before {\n        border-inline-start-style: dashed;\n    }\n\n    .p-divider-dotted.p-divider-horizontal:before {\n        border-block-start-style: dotted;\n    }\n\n    .p-divider-dotted.p-divider-vertical:before {\n        border-inline-start-style: dotted;\n    }\n\n    .p-divider-left:dir(rtl),\n    .p-divider-right:dir(rtl) {\n        flex-direction: row-reverse;\n    }\n";

// node_modules/primeng/fesm2022/primeng-divider.mjs
var _c0 = ["*"];
var inlineStyles = {
  root: ({
    instance
  }) => ({
    justifyContent: instance.layout === "horizontal" ? instance.align === "center" || instance.align == null ? "center" : instance.align === "left" ? "flex-start" : instance.align === "right" ? "flex-end" : null : null,
    alignItems: instance.layout === "vertical" ? instance.align === "center" || instance.align == null ? "center" : instance.align === "top" ? "flex-start" : instance.align === "bottom" ? "flex-end" : null : null
  })
};
var classes = {
  root: ({
    instance
  }) => ["p-divider p-component", "p-divider-" + instance.layout, "p-divider-" + instance.type, {
    "p-divider-left": instance.layout === "horizontal" && (!instance.align || instance.align === "left")
  }, {
    "p-divider-center": instance.layout === "horizontal" && instance.align === "center"
  }, {
    "p-divider-right": instance.layout === "horizontal" && instance.align === "right"
  }, {
    "p-divider-top": instance.layout === "vertical" && instance.align === "top"
  }, {
    "p-divider-center": instance.layout === "vertical" && (!instance.align || instance.align === "center")
  }, {
    "p-divider-bottom": instance.layout === "vertical" && instance.align === "bottom"
  }],
  content: "p-divider-content"
};
var DividerStyle = class _DividerStyle extends BaseStyle {
  name = "divider";
  style = style;
  classes = classes;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDividerStyle_BaseFactory;
    return function DividerStyle_Factory(__ngFactoryType__) {
      return (ɵDividerStyle_BaseFactory || (ɵDividerStyle_BaseFactory = ɵɵgetInheritedFactory(_DividerStyle)))(__ngFactoryType__ || _DividerStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _DividerStyle,
    factory: _DividerStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DividerStyle, [{
    type: Injectable
  }], null, null);
})();
var DividerClasses;
(function(DividerClasses2) {
  DividerClasses2["root"] = "p-divider";
  DividerClasses2["content"] = "p-divider-content";
})(DividerClasses || (DividerClasses = {}));
var DIVIDER_INSTANCE = new InjectionToken("DIVIDER_INSTANCE");
var Divider = class _Divider extends BaseComponent {
  $pcDivider = inject(DIVIDER_INSTANCE, {
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
   * Specifies the orientation.
   * @group Props
   */
  layout = "horizontal";
  /**
   * Border style type.
   * @group Props
   */
  type = "solid";
  /**
   * Alignment of the content.
   * @group Props
   */
  align;
  _componentStyle = inject(DividerStyle);
  get dataP() {
    return this.cn({
      [this.align]: this.align,
      [this.layout]: this.layout,
      [this.type]: this.type
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDivider_BaseFactory;
    return function Divider_Factory(__ngFactoryType__) {
      return (ɵDivider_BaseFactory || (ɵDivider_BaseFactory = ɵɵgetInheritedFactory(_Divider)))(__ngFactoryType__ || _Divider);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Divider,
    selectors: [["p-divider"]],
    hostAttrs: ["role", "separator"],
    hostVars: 6,
    hostBindings: function Divider_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("aria-orientation", ctx.layout)("data-p", ctx.dataP);
        ɵɵstyleMap(ctx.sx("root"));
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      styleClass: "styleClass",
      layout: "layout",
      type: "type",
      align: "align"
    },
    features: [ɵɵProvidersFeature([DividerStyle, {
      provide: DIVIDER_INSTANCE,
      useExisting: _Divider
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Divider
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 3,
    consts: [[3, "pBind"]],
    template: function Divider_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0);
        ɵɵprojection(1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("content"));
        ɵɵproperty("pBind", ctx.ptm("content"));
      }
    },
    dependencies: [CommonModule, SharedModule, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Divider, [{
    type: Component,
    args: [{
      selector: "p-divider",
      standalone: true,
      imports: [CommonModule, SharedModule, BindModule],
      template: `
        <div [pBind]="ptm('content')" [class]="cx('content')">
            <ng-content></ng-content>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[attr.aria-orientation]": "layout",
        role: "separator",
        "[class]": "cn(cx('root'), styleClass)",
        "[style]": "sx('root')",
        "[attr.data-p]": "dataP"
      },
      providers: [DividerStyle, {
        provide: DIVIDER_INSTANCE,
        useExisting: Divider
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Divider
      }],
      hostDirectives: [Bind]
    }]
  }], null, {
    styleClass: [{
      type: Input
    }],
    layout: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    align: [{
      type: Input
    }]
  });
})();
var DividerModule = class _DividerModule {
  static ɵfac = function DividerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DividerModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DividerModule,
    imports: [Divider, BindModule],
    exports: [Divider, BindModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Divider, BindModule, BindModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DividerModule, [{
    type: NgModule,
    args: [{
      imports: [Divider, BindModule],
      exports: [Divider, BindModule]
    }]
  }], null, null);
})();
export {
  Divider,
  DividerClasses,
  DividerModule,
  DividerStyle
};
//# sourceMappingURL=primeng_divider.js.map
