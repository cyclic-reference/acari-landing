import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Project} from "../model/Project.model";
import {ProjectService} from "../Project.service";
import {LocalReachService} from "./LocalReach.service";
import {LocalProjectFactory} from "../LocalProject.factory";
import {LocalReach} from "../model/LocalReach.model";

export class ProjectManipulationComponent implements OnInit {
    @Output()
    private projectChanged = new EventEmitter<Project>();
    @Output()
    private onUpdate = new EventEmitter<void>();

    constructor(private projectService: ProjectService,
                private localReachService: LocalReachService,
                private localProjectService: LocalProjectFactory) {

    }

    private _project: Project = this.localProjectService.createProject();

    @Input()
    get project(): Project {
        return this._project;
    }

    set project(value: Project) {
        this._project = value;
    }

    get colorOne(): string {
        return this.project.colorOne;
    }

    set colorOne(value: string) {
        this._project.colorOne = value;
        this.emitProject();
    }

    get colorTwo(): string {
        return this._project.colorTwo;
    }

    set colorTwo(value: string) {
        this._project.colorTwo = value;
        this.emitProject();
    }

    get hoverColor(): string {
        return this._project.hoverColor;
    }

    set hoverColor(value: string) {
        this._project.hoverColor = value;
        this.emitProject();
    }

    get descriptionTextColor(): string {
        return this._project.textColor;
    }

    set descriptionTextColor(value: string) {
        this._project.textColor = value;
        this.emitProject();
    }


    get titleColor(): string {
        return this._project.titleColor;
    }

    get hostNameColor(): string {
        return this._project.hostNameColor;
    }

    get pwdColor(): string {
        return this._project.pwdColor;
    }

    set titleColor(value: string) {
        this._project.titleColor = value;
        this.emitProject();
    }

    set hostNameColor(value: string) {
        this._project.hostNameColor = value;
        this.emitProject();
    }

    set pwdColor(value: string) {
        this._project.pwdColor = value;
        this.emitProject();
    }

    get url(): string {
        return this.project.url;
    }

    set url(value: string) {
        this.project.url = value;
        this.emitProject();
    }

    get rank(): number {
        return this.project.projectRank;
    }

    set rank(value: number) {
        this.project.projectRank = value;
        this.emitProject();
    }

    get fileName(): string {
        return this.project.fileName;
    }

    set fileName(value: string) {
        this.project.fileName = value;
    }

    get excerpt(): string {
        return this._project.excerpt;
    }

    set excerpt(value: string) {
        this._project.excerpt = value;
        this.emitProject();
    }

    get description(): string {
        return this._project.preachySpeechy;
    }

    set description(value: string) {
        this._project.preachySpeechy = value;
        this.emitProject();
    }

    get caretSolidColor(): string {
        return this._project.caretSolidColor;
    }

    set caretSolidColor(value: string) {
        this._project.caretSolidColor = value;
        this.emitProject();
    }

    get caretBlurredStyle(): string {
        return this._project.caretBlurredStyle;
    }

    set caretBlurredStyle(value: string) {
        this._project.caretBlurredStyle = value;
        this.emitProject();
    }

    get notUploadable(): boolean {
        return !this._project.isUploadable;
    }

    get backgroundStyle(): string {
        return this._project.backgroundStyle;
    }

    get maxProjectCount(): Observable<number> {
        return this.projectService
            .projectCount();
    }

    newRank(rank: number) {
        this.project.projectRank = rank;
    }

    ngOnInit(): void {

    }

    emitProject(): void {
        this.projectChanged.emit(this.project);
    }


    fileChosen(chosenFile: File): void {
        this._project.setSelectedReach(this.buildLocalReach(Observable.of(chosenFile)));
        this.emitProject();
    }

    fileUploadRequest() {
        this.onUpdate.emit();
    }

    promoteMe(): void {
        this.projectService.promoteProject(this._project);
    }

    demoteMe(): void {
        this.projectService.demoteProject(this._project);
    }

    private buildLocalReach(reachFile: Observable<File>) : LocalReach {
        return this.localReachService.createReach(reachFile);
    }
}