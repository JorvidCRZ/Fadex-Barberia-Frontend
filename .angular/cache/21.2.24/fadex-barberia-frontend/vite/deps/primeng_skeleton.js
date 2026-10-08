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
  ɵɵgetInheritedFactory,
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
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/skeleton/index.mjs
var style = "\n    .p-skeleton {\n        display: block;\n        overflow: hidden;\n        background: dt('skeleton.background');\n        border-radius: dt('skeleton.border.radius');\n    }\n\n    .p-skeleton::after {\n        content: '';\n        animation: p-skeleton-animation 1.2s infinite;\n        height: 100%;\n        left: 0;\n        position: absolute;\n        right: 0;\n        top: 0;\n        transform: translateX(-100%);\n        z-index: 1;\n        background: linear-gradient(90deg, rgba(255, 255, 255, 0), dt('skeleton.animation.background'), rgba(255, 255, 255, 0));\n    }\n\n    [dir='rtl'] .p-skeleton::after {\n        animation-name: p-skeleton-animation-rtl;\n    }\n\n    .p-skeleton-circle {\n        border-radius: 50%;\n    }\n\n    .p-skeleton-animation-none::after {\n        animation: none;\n    }\n\n    @keyframes p-skeleton-animation {\n        from {\n            transform: translateX(-100%);\n        }\n        to {\n            transform: translateX(100%);\n        }\n    }\n\n    @keyframes p-skeleton-animation-rtl {\n        from {\n            transform: translateX(100%);\n        }\n        to {\n            transform: translateX(-100%);\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-skeleton.mjs
var inlineStyles = {
  root: {
    position: "relative"
  }
};
var classes = {
  root: ({
    instance
  }) => ["p-skeleton p-component", {
    "p-skeleton-circle": instance.shape === "circle",
    "p-skeleton-animation-none": instance.animation === "none"
  }]
};
var SkeletonStyle = class _SkeletonStyle extends BaseStyle {
  name = "skeleton";
  style = style;
  classes = classes;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵSkeletonStyle_BaseFactory;
    return function SkeletonStyle_Factory(__ngFactoryType__) {
      return (ɵSkeletonStyle_BaseFactory || (ɵSkeletonStyle_BaseFactory = ɵɵgetInheritedFactory(_SkeletonStyle)))(__ngFactoryType__ || _SkeletonStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _SkeletonStyle,
    factory: _SkeletonStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SkeletonStyle, [{
    type: Injectable
  }], null, null);
})();
var SkeletonClasses;
(function(SkeletonClasses2) {
  SkeletonClasses2["root"] = "p-skeleton";
})(SkeletonClasses || (SkeletonClasses = {}));
var SKELETON_INSTANCE = new InjectionToken("SKELETON_INSTANCE");
var Skeleton = class _Skeleton extends BaseComponent {
  $pcSkeleton = inject(SKELETON_INSTANCE, {
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
   * Class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Shape of the element.
   * @group Props
   */
  shape = "rectangle";
  /**
   * Type of the animation.
   * @gruop Props
   */
  animation = "wave";
  /**
   * Border radius of the element, defaults to value from theme.
   * @group Props
   */
  borderRadius;
  /**
   * Size of the skeleton.
   * @group Props
   */
  size;
  /**
   * Width of the element.
   * @group Props
   */
  width = "100%";
  /**
   * Height of the element.
   * @group Props
   */
  height = "1rem";
  _componentStyle = inject(SkeletonStyle);
  get containerStyle() {
    const inlineStyles2 = this._componentStyle?.inlineStyles["root"];
    let style2;
    if (!this.$unstyled()) {
      if (this.size) style2 = __spreadProps(__spreadValues({}, inlineStyles2), {
        width: this.size,
        height: this.size,
        borderRadius: this.borderRadius
      });
      else style2 = __spreadProps(__spreadValues({}, inlineStyles2), {
        width: this.width,
        height: this.height,
        borderRadius: this.borderRadius
      });
    }
    return style2;
  }
  get dataP() {
    return this.cn({
      [this.shape]: this.shape
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵSkeleton_BaseFactory;
    return function Skeleton_Factory(__ngFactoryType__) {
      return (ɵSkeleton_BaseFactory || (ɵSkeleton_BaseFactory = ɵɵgetInheritedFactory(_Skeleton)))(__ngFactoryType__ || _Skeleton);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Skeleton,
    selectors: [["p-skeleton"]],
    hostVars: 6,
    hostBindings: function Skeleton_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("aria-hidden", true)("data-p", ctx.dataP);
        ɵɵstyleMap(ctx.containerStyle);
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      styleClass: "styleClass",
      shape: "shape",
      animation: "animation",
      borderRadius: "borderRadius",
      size: "size",
      width: "width",
      height: "height"
    },
    features: [ɵɵProvidersFeature([SkeletonStyle, {
      provide: SKELETON_INSTANCE,
      useExisting: _Skeleton
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Skeleton
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function Skeleton_Template(rf, ctx) {
    },
    dependencies: [CommonModule, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Skeleton, [{
    type: Component,
    args: [{
      selector: "p-skeleton",
      standalone: true,
      imports: [CommonModule, SharedModule],
      template: ``,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [SkeletonStyle, {
        provide: SKELETON_INSTANCE,
        useExisting: Skeleton
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Skeleton
      }],
      host: {
        "[attr.aria-hidden]": "true",
        "[class]": "cn(cx('root'), styleClass)",
        "[style]": "containerStyle",
        "[attr.data-p]": "dataP"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    styleClass: [{
      type: Input
    }],
    shape: [{
      type: Input
    }],
    animation: [{
      type: Input
    }],
    borderRadius: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    height: [{
      type: Input
    }]
  });
})();
var SkeletonModule = class _SkeletonModule {
  static ɵfac = function SkeletonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SkeletonModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _SkeletonModule,
    imports: [Skeleton, SharedModule],
    exports: [Skeleton, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Skeleton, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SkeletonModule, [{
    type: NgModule,
    args: [{
      imports: [Skeleton, SharedModule],
      exports: [Skeleton, SharedModule]
    }]
  }], null, null);
})();
export {
  Skeleton,
  SkeletonClasses,
  SkeletonModule,
  SkeletonStyle
};
//# sourceMappingURL=primeng_skeleton.js.map
