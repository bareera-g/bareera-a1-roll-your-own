// importing local code, code we have written
import {Window, Widget, RoleType, Circle, G, IdleUpWidgetState, Text} from "../core/ui";
// importing code from SVG.js library

class RadioButton extends Widget{
    private _circleOptions: Circle[] = [];
    private _checkedin: Circle[] = [];
    private _labels: Text[] = [];
    private _optionGroups: G[] = [];

    private _options: string[];
    private _selectedIndex: number = 0;

    private defaultWidth: number = 180;
    private optionHeight: number = 30;

    public onChange?: (selectedIndex: number, selectedLabel: string) => void;

    constructor(parent:Window,options: string[] ){
        super(parent);
        // set defaults
        this._options = options;
        this.height = this._options.length * this.optionHeight;
        this.width = this.defaultWidth;
        if (options.length < 2){
            throw new Error("Atleast two options required for RadioButton.")
        }
        // set Aria role
        this.role = RoleType.group;
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
        // this._group.rect(this.width, this.height).opacity(0).attr('id', 0);
        for (let i = 0; i < this._options.length; i++){
            this.createOption(i);
        }
        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.updateVisuals();
        // this.registerEvent(this.outerSvg);
    }

    private createOption(index: number): void {
        let y = index * this.optionHeight;
        let optionGroup = this._group.group();


        let hitArea = optionGroup.rect(this.width, this.optionHeight).move(0,y).fill("white").opacity(0);
        let circle = optionGroup.circle(18).move(4,y+ 5).fill("white").stroke({ color: "black", width:2 });
    

        let label = optionGroup.text(this._options[index]).move(35, y + 3).font({size: 16});

        hitArea.mouseup(() => this.select(index));
        circle.mouseup(() => this.select(index));
        label.mouseup(() => this.select(index));
       
        this._optionGroups.push(optionGroup);
        this._circleOptions.push(circle);
        this._labels.push(label);
    }

    private select(index: number): void{
        this._selectedIndex = index;
        this.updateVisuals();

        if (this.onChange){
            this.onChange(index, this._options[index]);
        }
    }

    private updateVisuals(): void {
        for (let i = 0; i < this._circleOptions.length; i++){
            if (i === this._selectedIndex){
                this._circleOptions[i].fill("#dff7e8");
            } else {
                this._circleOptions[i].fill("white");
            }
        }
    }

    public setLabel(index: number, label: string): void{
        if (index >= 0 && index < this._labels.length){
            this._options[index] = label;
            this._labels[index].text(label);
        }
    }

    public getSelectedIndex(): number{
        return this._selectedIndex;
    }

    public getSelectedLabel(): string {
        return this._options[this._selectedIndex];
    }
    
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this.updateVisuals();
    }

    idledownState(): void {
    }

    pressedState(): void {
    }

    pressReleaseState(): void {
    }

    hoverState(): void {
        for (let circle of this._circleOptions){
            circle.stroke({color: "#2563eb", width: 2});
        }
    }
    hoverPressedState(): void {
       
    }
    pressedoutState(): void {
        for (let circle of this._circleOptions){
            circle.stroke({color: "black", width: 2});
        }
    }
    moveState(): void {
    
    }
    keyupState(): void {

    }
}

export {RadioButton}