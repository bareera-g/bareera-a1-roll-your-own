// importing local code, code we have written
import {Window, Widget, RoleType, IdleUpWidgetState} from "../core/ui";
// importing code from SVG.js library
import {Rect, Circle, Text} from "../core/ui";

class Switch extends Widget{
    private _track: Rect;
    private _knob: Circle;
    private _label: Text;

    private _on: boolean = false;
    private _labelText: string;
    
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;

    public onChange?: (on: boolean) => void;

    constructor(parent:Window, label: string = "Toggle"){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._labelText = label;

        // set Aria role
        this.role = RoleType.button;
        this.setState(new IdleUpWidgetState());

        //TODO:
        // set default state!

        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        this._track = this._group.rect(50, 26).move(0,4).fill("#cbd5e1").radius(13);
        this._knob = this._group.circle(20).move(3, 7).fill("white");
        this._label = this._group.text(this._labelText).move(65,5).font({size: 16});


        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }
    private toggle(): void{
        this._on = !this._on;
        this.updateVisuals();

        if (this.onChange){
            this.onChange(this._on);
        }
    }

    private updateVisuals(): void{
        if (this._on){
            this._track.fill("#2563eb");
            this._knob.move(27,7);
        } else {
            this._track.fill("#cbd5e1");
            this._knob.move(3,7);
        }

    }

    public isOn() : boolean{
        return this._on;
    }

    public setLabel(label: string): void{
        this._labelText = label;
        this._label.text(label);
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this.updateVisuals();
    }
    idledownState(): void {
    }
    pressedState(): void {
        this._track.fill("#94a3b8");
    }
    pressReleaseState(): void {
        this.toggle();
    }
    hoverState(): void {
        this._knob.fill("#f8fafc");
    }
    hoverPressedState(): void {
    }
    pressedoutState(): void {
        this.updateVisuals();
    }
    moveState(): void {
    }

    keyupState(): void {
    }
}

export {Switch}