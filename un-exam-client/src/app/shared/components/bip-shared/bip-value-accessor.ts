import { ControlValueAccessor } from "@angular/forms";

const noop = () => { };

export class ValueAccessor implements ControlValueAccessor {
    //The internal data model
    private innerValue: any = '';

    public changed = new Array<(value: any) => void>();
    public touched = new Array<() => void>();
    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.changed.forEach((f) => f(v));
            // this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    touch() {
        this.touched.forEach((f) => f());
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: (value: any) => void) {
        // this.onChangeCallback = fn;
        this.changed.push(fn);
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: () => void) {
        // this.onTouchedCallback = fn;
        this.touched.push(fn)
    }
}