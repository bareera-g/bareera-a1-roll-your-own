import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import {Checkbox} from "./widgets/checkbox"
import { RadioButton } from "./widgets/radiobutton";
import { ScrollBar } from "./widgets/scrollbar";
import { Switch } from "./widgets/switch";

let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

let btn = new Button(w);
btn.label = "Click me";
btn.size = {width : 200, height: 50};
btn.tabindex = 2;
btn.fontSize = 14
btn.move(12, 50)
btn.onClick(() => {lbl1.text= "Button Clicked";});

let checkbox = new Checkbox(w, "Checkbox");
checkbox.move(12,100);
checkbox.onChange = (checked: boolean) => {
    if (checked){
        lbl1.text = "Checked";
    } else {
        lbl1.text = "Unchecked";
    }
};


let radiobutton = new RadioButton(w, ["First Option", "Second Option", "Third Option"]);
radiobutton.move(12, 150);
radiobutton.onChange = (index: number, label: string) => {
    console.log("Selected: ", index, label);
    lbl1.text = "Selected: " + label;
};


let scrollbar = new ScrollBar(w, 100);
scrollbar.move(12, 300);
scrollbar.onScroll = (position: number, direction: string ) => {
    console.log("Scrollbar moved:", direction, position);
    lbl1.text = "Scroll" + direction + ":" + position;
}


let toggle = new Switch(w, "Dark mode");
toggle.move(350, 50);

toggle.onChange = (on: boolean) => {
    console.log("Toggle:", on);
    lbl1.text = on ? "Toggle On" : "Toggle Off";
};
