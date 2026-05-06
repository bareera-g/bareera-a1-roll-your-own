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

    private _widthValue: number = 50;
    private _buttonSize: number = 20;
    private _thumbHeight: number = 35;

    private _width: number;
    private _height: number;

    public onScroll?: (position: number, direction: string) => void;


    constructor(parent:Window, height: number = 220){
        super(parent);
        // set defaults
        this._scrollHeight = this.height;
        this._width = this._widthValue;
        this._height = height;

        // set Aria role
        this.role = RoleType.scrollbar;
        this.setState(new IdleUpWidgetState());
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
        this._upButton = this._group.rect(this._widthValue, this.buttonSize).move(0,0).fill("#e5e7eb");
        this._upArrow = this._group.text("↑").move(8,5).font({size: 14});
        this._track = this._group.rect(4, this._scrollHeight - 2 * this.buttonSize).move(13, this.buttonSize).fill("#cbd5e1").radius(2);
        this._thumb = this._group.rect(18, this.thumbHeight).move(6, this.buttonSize).fill("#64748b").radius(8);
        this._downButton = this._group.rect(this._widthValue, this.buttonSize), move(0, this._scrollHeight - this.buttonSize).fill("#e5e7eb");
        this._downArrow = this._group.text("↓").move(8, this._scrollHeight - this._buttonSize + 5);
        this._upButton.mouseup(() => this.moveThumb(-10));
        this._upArrow.mouseup(() => this.moveThumb(-10));

        this._downButton.mouseup(() => this.moveThumb(-10));
        this._downArrow.mouseup(() => this.moveThumb(-10));

        this._track.mouseup((event:any) => {
            this.jumpThumb(event.offsetY);
        });

        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    get thumbPosition(): number {
        return this.thumbPosition;
    }

    set scrollHeight(height: number){
        this._scrollHeight = height;
        this.height = height;
        this.render();
    }

    private setThumbPosition(position: number){
        let max = this._scrollHeight - 2 * this._buttonSize - this._thumbHeight;

        if (position < 0) position = 0;
        if (position > max) position = max;

        this._thumbPosition = position;
        this._thumb.move(6, this._buttonSize + this._thumbPosition);

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
        this._thumb.fill("#475569");
    }
    hoverPressedState(): void {
    }
    pressedoutState(): void {
        this._thumb.fill("#64748b");
    }
    moveState(): void {
    }
    keyupState(): void {
    }
}

export {ScrollBar}