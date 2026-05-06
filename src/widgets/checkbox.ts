// importing local code, code we have written
import {Window, Widget, RoleType, IdleUpWidgetState, Text} from "../core/ui";
// importing code from SVG.js library
import {Rect} from "../core/ui";

class Checkbox extends Widget{
    private _box: Rect;
    private _check: Text;
    private _label: Text;
    private checked: boolean = false;
    private _labelText: string;
    private defaultWidth: number = 150;
    private defaultHeight: number = 30;

    public onChange?: (checked: boolean) => void;

    constructor(parent:Window, label: string = "Possibility"){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._labelText = label;

        // set Aria role
        this.role = RoleType.button;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this._box = this._group.rect(18,18).move(4,5).fill("white").stroke({ color: "black", width:2}).radius(4);
        this._check = this._group.text("✓").move(4,1).font({ size:12, weight: "bold"}).hide();
        this._label = this._group.text(this._labelText).move(35, 3).font({ size: 16 });
        this.registerEvent(this.outerSvg);
    }

    private toggle(): void{
        this.checked = !this.checked;
        if (this.checked){
            this._check.show();
        } else {
            this._check.hide();
        }

        if (this.onChange){
            this.onChange(this.checked);
        }
    }

    public setLabel(label: string): void{
        this._labelText = label;
        this._label.text(label);
    }

    public isChecked(): boolean{
        return this.checked;
    }

    idleupState(): void {
        this._box.stroke({color: "black", width: 2});
    }
    idledownState(): void {
        this._box.fill("#e5e7eb");
    }
    pressedState(): void {
        this._box.fill("#cbd5e1");
    }
    pressReleaseState(): void {
        this.toggle();
    }
    hoverState(): void {
        this._box.stroke({color: "#2563eb", width: 2});
    }
    hoverPressedState(): void {
        this._box.fill("#cbd5e1");
    }
    pressedoutState(): void {
        this._box.stroke({color: "black", width: 2});
    }
    
    moveState(): void {
    }

    keyupState(): void {
    }


}


export {Checkbox}