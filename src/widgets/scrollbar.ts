// importing local code, code we have written
import {Window, Widget, RoleType} from "../core/ui";
// importing code from SVG.js library
import {Rect,Text, IdleUpWidgetState} from "../core/ui";

class ScrollBar extends Widget{
    private _upButton: Rect;
    private _downButton: Rect;
    private _track: Rect;
    private _thumb: Rect;
    private _upArrow: Text;
    private _downArrow: Text;

    private _scrollHeight: number;
    private _thumbPosition = 0;

    private _widthValue: number = 30;
    private _buttonSize: number = 30;
    private _thumbHeight: number = 40;

    public onScroll?: (position: number, direction: string) => void;


    constructor(parent:Window, height: number = 220){
        super(parent);
        // set defaults
        this._scrollHeight = height;
        this.width = this._widthValue;
        this.height = height;

        // set Aria role
        this.role = RoleType.scrollbar;
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
        this._upButton = this._group.rect(this._widthValue, this._buttonSize).move(0,0).fill("#e5e7eb");
        this._upArrow = this._group.text("↑").move(9,2).font({size: 18});
        this._track = this._group.rect(4, this._scrollHeight - 2 * this._buttonSize).move(13, this._buttonSize).fill("#cbd5e1").radius(2);
        this._thumb = this._group.rect(18, this._thumbHeight).move(6, this._buttonSize).fill("#64748b").radius(8);
        this._downButton = this._group.rect(this._widthValue, this._buttonSize).move(0, this._scrollHeight - this._buttonSize).fill("#e5e7eb");
        this._downArrow = this._group.text("↓").move(9, this._scrollHeight - this._buttonSize + 2).font({size: 18});
        this._upButton.mouseup(() => this.moveThumb(-10));
        this._upArrow.mouseup(() => this.moveThumb(-10));

        this._downButton.mouseup(() => this.moveThumb(10));
        this._downArrow.mouseup(() => this.moveThumb(10));

        this._track.mouseup((event:any) => {
            this.jumpThumb(event.offsetY);
        });

        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        // this.registerEvent(this.outerSvg);
    }

    get thumbPosition(): number {
        return this._thumbPosition;
    }

    set scrollHeight(height: number){
        this._scrollHeight = height;
        this.height = height;
    }

    private setThumbPosition(position: number){
        let max = this._scrollHeight - 2 * this._buttonSize - this._thumbHeight;

        if (position < 0) position = 0;
        if (position > max) position = max;

        let change = position - this._thumbPosition;

        this._thumbPosition = position;
        this._thumb.dy(change);

    }

    private moveThumb(amount: number){
        let old = this._thumbPosition;
        this.setThumbPosition(this._thumbPosition + amount);
        let direction = this._thumbPosition > old ? "down" : "up";
        this.notifyScroll(direction);


    }

    private jumpThumb(mouseY: number): void {
        let old = this._thumbPosition;
        let newPos = mouseY - this._buttonSize - this._thumbHeight / 2;
        this.setThumbPosition(newPos);
        let direction = this._thumbPosition > old ? "down" : "up";
        this.notifyScroll(direction);
    }

    private notifyScroll(direction: string): void {
        if (this.onScroll){
            this.onScroll(this._thumbPosition, direction);
        }
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
    }
    idledownState(): void {
    }
    pressedState(): void {

    }
    pressReleaseState(): void {
    }
    hoverState(): void {
    }
    hoverPressedState(): void {
    }
    pressedoutState(): void {
    }
    moveState(): void {
    }
    keyupState(): void {
    }
}

export {ScrollBar}