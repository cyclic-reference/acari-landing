import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocalProject} from "../model/LocalProject.model";

@Component({
    selector: 'project-upload',
    template: require('./ProjectUpload.component.htm')
})
export class ProjectUploadComponent {
    //TODO: THIS SHOULD REALLY BE A BUTTON AND DAT'S IT.
    @Output()
    private uploadRequest = new EventEmitter<boolean>();

    constructor() {
    }

    private _notUploadable: boolean = true;

    @Input()
    get notUploadable(): boolean {
        return this._notUploadable;
    }

    set notUploadable(value: boolean) {
        this._notUploadable = value;
    }

    private _project: LocalProject;

    @Input()
    get project(): LocalProject {
        return this._project;
    }

    set project(value: LocalProject) {
        this._project = value;
    }

    upload(): void {
        this.uploadRequest.emit();
    }
}