import {Component, HostListener, Input, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {WindowRef} from "../util/window";

@Component({
    selector: 'caret',
    template: require('./Caret.component.htm')
})
export class CaretComponent implements OnInit {
    ngOnInit(): void {
        if(!this.windowRef.nativeWindow.document.hasFocus()){
            this.onBlur({});
        }
    }

    constructor(private windowRef: WindowRef){

    }

    private isBlurred: Subject<boolean> = new BehaviorSubject<boolean>(false);
    private _empty: string = 'rgba(0,0,0,0)';
    @HostListener('window:focus', ['$event'])
    onFocus(event: any): void {
        this.isBlurred.next(false);
        this._currentBackgroundColor.next(this.backgroundColor);
    }

    @HostListener('window:blur', ['$event'])
    onBlur(event: any): void {
        this.isBlurred.next(true);
        this._currentBackgroundColor.next(this._empty);
    }

    get blurred(): Observable<boolean>{
        return this.isBlurred;
    }

    private _typing: Observable<boolean> = Observable.of(false);


    @Input()
    get typing(): Observable<boolean> {
        return this._typing;
    }

    get notTyping(): Observable<boolean> {
        //intellij typscript compiler
        //y u no recognize dis without
        //casting?!?
        return <Observable<boolean>>this._typing.map(b=>!b)
            .withLatestFrom(this.isBlurred,
                (notTyping: boolean, windowNotInFocus: boolean)=>
                    notTyping && !windowNotInFocus);
    }

    set typing(value: Observable<boolean>) {
        this._typing = value;
    }

    private _backgroundColor: string = 'lime';

    private _currentBackgroundColor = new BehaviorSubject(this.backgroundColor);

    get currentBackgroundColor(): Observable<string> {
        return this._currentBackgroundColor;
    }


    @Input()
    get backgroundColor(): string {
        return this._backgroundColor;
    }

    set backgroundColor(value: string) {
        this._backgroundColor = value;
        this._currentBackgroundColor.next(value);
    }

    private _outline: string = '0.05em green solid';

    @Input()
    get outline(): string {
        return this._outline;
    }

    set outline(value: string) {
        this._outline = value;
    }
}
