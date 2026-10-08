import {
  Fluid
} from "./chunk-TONGHQ5F.js";
import {
  BaseModelHolder
} from "./chunk-HE2MLLB2.js";
import {
  PARENT_INSTANCE
} from "./chunk-CFVD6AOW.js";
import {
  BaseStyle
} from "./chunk-7LUITJS5.js";
import {
  Bind
} from "./chunk-RFX47YJQ.js";
import "./chunk-SKV3H6PS.js";
import "./chunk-HEA754HI.js";
import {
  NgControl
} from "./chunk-LMKS7RSM.js";
import "./chunk-LFUJRON5.js";
import "./chunk-JAJ76GOU.js";
import {
  Directive,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Output,
  booleanAttribute,
  input,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵclassMap,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵgetInheritedFactory,
  ɵɵlistener
} from "./chunk-FR73ZBHC.js";
import {
  EventEmitter,
  InjectionToken,
  computed,
  effect,
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

// node_modules/@primeuix/styles/dist/textarea/index.mjs
var style = "\n    .p-textarea {\n        font-family: inherit;\n        font-feature-settings: inherit;\n        font-size: 1rem;\n        color: dt('textarea.color');\n        background: dt('textarea.background');\n        padding-block: dt('textarea.padding.y');\n        padding-inline: dt('textarea.padding.x');\n        border: 1px solid dt('textarea.border.color');\n        transition:\n            background dt('textarea.transition.duration'),\n            color dt('textarea.transition.duration'),\n            border-color dt('textarea.transition.duration'),\n            outline-color dt('textarea.transition.duration'),\n            box-shadow dt('textarea.transition.duration');\n        appearance: none;\n        border-radius: dt('textarea.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('textarea.shadow');\n    }\n\n    .p-textarea:enabled:hover {\n        border-color: dt('textarea.hover.border.color');\n    }\n\n    .p-textarea:enabled:focus {\n        border-color: dt('textarea.focus.border.color');\n        box-shadow: dt('textarea.focus.ring.shadow');\n        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');\n        outline-offset: dt('textarea.focus.ring.offset');\n    }\n\n    .p-textarea.p-invalid {\n        border-color: dt('textarea.invalid.border.color');\n    }\n\n    .p-textarea.p-variant-filled {\n        background: dt('textarea.filled.background');\n    }\n\n    .p-textarea.p-variant-filled:enabled:hover {\n        background: dt('textarea.filled.hover.background');\n    }\n\n    .p-textarea.p-variant-filled:enabled:focus {\n        background: dt('textarea.filled.focus.background');\n    }\n\n    .p-textarea:disabled {\n        opacity: 1;\n        background: dt('textarea.disabled.background');\n        color: dt('textarea.disabled.color');\n    }\n\n    .p-textarea::placeholder {\n        color: dt('textarea.placeholder.color');\n    }\n\n    .p-textarea.p-invalid::placeholder {\n        color: dt('textarea.invalid.placeholder.color');\n    }\n\n    .p-textarea-fluid {\n        width: 100%;\n    }\n\n    .p-textarea-resizable {\n        overflow: hidden;\n        resize: none;\n    }\n\n    .p-textarea-sm {\n        font-size: dt('textarea.sm.font.size');\n        padding-block: dt('textarea.sm.padding.y');\n        padding-inline: dt('textarea.sm.padding.x');\n    }\n\n    .p-textarea-lg {\n        font-size: dt('textarea.lg.font.size');\n        padding-block: dt('textarea.lg.padding.y');\n        padding-inline: dt('textarea.lg.padding.x');\n    }\n";

// node_modules/primeng/fesm2022/primeng-textarea.mjs
var style2 = (
  /*css*/
  `
    ${style}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`
);
var classes = {
  root: ({
    instance
  }) => ["p-textarea p-component", {
    "p-filled": instance.$filled(),
    "p-textarea-resizable ": instance.autoResize,
    "p-variant-filled": instance.$variant() === "filled",
    "p-textarea-fluid": instance.hasFluid,
    "p-inputfield-sm p-textarea-sm": instance.pSize === "small",
    "p-textarea-lg p-inputfield-lg": instance.pSize === "large",
    "p-invalid": instance.invalid()
  }]
};
var TextareaStyle = class _TextareaStyle extends BaseStyle {
  name = "textarea";
  style = style2;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTextareaStyle_BaseFactory;
    return function TextareaStyle_Factory(__ngFactoryType__) {
      return (ɵTextareaStyle_BaseFactory || (ɵTextareaStyle_BaseFactory = ɵɵgetInheritedFactory(_TextareaStyle)))(__ngFactoryType__ || _TextareaStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TextareaStyle,
    factory: _TextareaStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaStyle, [{
    type: Injectable
  }], null, null);
})();
var TextareaClasses;
(function(TextareaClasses2) {
  TextareaClasses2["root"] = "p-textarea";
})(TextareaClasses || (TextareaClasses = {}));
var TEXTAREA_INSTANCE = new InjectionToken("TEXTAREA_INSTANCE");
var Textarea = class _Textarea extends BaseModelHolder {
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcTextarea = inject(TEXTAREA_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  /**
   * Used to pass attributes to DOM elements inside the Textarea component.
   * @defaultValue undefined
   * @group Props
   */
  pTextareaPT = input(...ngDevMode ? [void 0, {
    debugName: "pTextareaPT"
  }] : []);
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  pTextareaUnstyled = input(...ngDevMode ? [void 0, {
    debugName: "pTextareaUnstyled"
  }] : []);
  /**
   * When present, textarea size changes as being typed.
   * @group Props
   */
  autoResize;
  /**
   * Defines the size of the component.
   * @group Props
   */
  pSize;
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
   * When present, it specifies that the component should have invalid state style.
   * @defaultValue false
   * @group Props
   */
  invalid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "invalid"
  } : {}), {
    transform: booleanAttribute
  }));
  $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant(), ...ngDevMode ? [{
    debugName: "$variant"
  }] : []);
  /**
   * Callback to invoke on textarea resize.
   * @param {(Event | {})} event - Custom resize event.
   * @group Emits
   */
  onResize = new EventEmitter();
  ngControlSubscription;
  _componentStyle = inject(TextareaStyle);
  ngControl = inject(NgControl, {
    optional: true,
    self: true
  });
  pcFluid = inject(Fluid, {
    optional: true,
    host: true,
    skipSelf: true
  });
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  constructor() {
    super();
    effect(() => {
      const pt = this.pTextareaPT();
      pt && this.directivePT.set(pt);
    });
    effect(() => {
      this.pTextareaUnstyled() && this.directiveUnstyled.set(this.pTextareaUnstyled());
    });
  }
  onInit() {
    if (this.ngControl) {
      this.ngControlSubscription = this.ngControl.valueChanges.subscribe(() => {
        this.updateState();
      });
    }
  }
  onAfterViewInit() {
    if (this.autoResize) this.resize();
    this.cd.detectChanges();
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
    if (this.autoResize) {
      this.resize();
    }
    this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
  }
  onInput(e) {
    this.writeModelValue(e.target?.value);
    this.updateState();
  }
  resize(event) {
    this.el.nativeElement.style.height = "auto";
    this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + "px";
    if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
      this.el.nativeElement.style.overflowY = "scroll";
      this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
    } else {
      this.el.nativeElement.style.overflow = "hidden";
    }
    this.onResize.emit(event || {});
  }
  updateState() {
    if (this.autoResize) {
      this.resize();
    }
  }
  onDestroy() {
    if (this.ngControlSubscription) {
      this.ngControlSubscription.unsubscribe();
    }
  }
  static ɵfac = function Textarea_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Textarea)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Textarea,
    selectors: [["", "pTextarea", ""], ["", "pInputTextarea", ""]],
    hostVars: 2,
    hostBindings: function Textarea_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function Textarea_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("root"));
      }
    },
    inputs: {
      pTextareaPT: [1, "pTextareaPT"],
      pTextareaUnstyled: [1, "pTextareaUnstyled"],
      autoResize: [2, "autoResize", "autoResize", booleanAttribute],
      pSize: "pSize",
      variant: [1, "variant"],
      fluid: [1, "fluid"],
      invalid: [1, "invalid"]
    },
    outputs: {
      onResize: "onResize"
    },
    features: [ɵɵProvidersFeature([TextareaStyle, {
      provide: TEXTAREA_INSTANCE,
      useExisting: _Textarea
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Textarea
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Textarea, [{
    type: Directive,
    args: [{
      selector: "[pTextarea], [pInputTextarea]",
      standalone: true,
      host: {
        "[class]": "cx('root')"
      },
      providers: [TextareaStyle, {
        provide: TEXTAREA_INSTANCE,
        useExisting: Textarea
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Textarea
      }],
      hostDirectives: [Bind]
    }]
  }], () => [], {
    pTextareaPT: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pTextareaPT",
        required: false
      }]
    }],
    pTextareaUnstyled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pTextareaUnstyled",
        required: false
      }]
    }],
    autoResize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    pSize: [{
      type: Input
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
    invalid: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "invalid",
        required: false
      }]
    }],
    onResize: [{
      type: Output
    }],
    onInput: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }]
  });
})();
var TextareaModule = class _TextareaModule {
  static ɵfac = function TextareaModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TextareaModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TextareaModule,
    imports: [Textarea],
    exports: [Textarea]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaModule, [{
    type: NgModule,
    args: [{
      imports: [Textarea],
      exports: [Textarea]
    }]
  }], null, null);
})();
export {
  Textarea,
  TextareaClasses,
  TextareaModule,
  TextareaStyle
};
//# sourceMappingURL=primeng_textarea.js.map
