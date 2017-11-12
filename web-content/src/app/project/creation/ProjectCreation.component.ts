import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Project} from "../model/Project.model";
import {Description} from "../model/Description.model";
import {ProjectService} from "../Project.service";
import {Background} from "../model/Background.model";
import {Location} from '../model/Location.model';
import {isNullOrUndefined} from "util";
import {ProjectRank} from "../model/ProjectRank.model";
import {LocalReach} from "../model/LocalReach.model";
import {LocalReachService} from "./LocalReach.service";
import {ReachInterface} from "../model/ReachInterface";

@Component({
    selector: 'project-creation',
    template: require('./ProjectCreation.component.htm')
})
export class ProjectCreationComponent implements OnInit {
    constructor(private projectService: ProjectService,
                private localReachService: LocalReachService) {

    }

    private _project: Project = this.buildProject();

    @Input()
    get project(): Project {
        return this._project;
    }

    @Output()
    private projectChanged = new EventEmitter<Project>();

    private _reachFile: Observable<File> = Observable.empty();

    get reachFile(): Observable<File> {
        return this._reachFile;
    }

    set reachFile(value: Observable<File>) {
        this._reachFile = value;
    }

    private _colorOne: string = '#464646';

    get colorOne(): string {
        return this._colorOne;
    }

    set colorOne(value: string) {
        this._colorOne = value;
        this.rebuildStyle();
    }

    private _colorTwo: string = '#8d85d6';

    get colorTwo(): string {
        return this._colorTwo;
    }

    set colorTwo(value: string) {
        this._colorTwo = value;
        this.rebuildStyle();
    }

    private _descriptionTextColor: string = '#f5f5f5';

    get descriptionTextColor(): string {
        return this._descriptionTextColor;
    }

    set descriptionTextColor(value: string) {
        this._descriptionTextColor = value;
        this.background = this.buildBackground();
        this.rebuildProject();
    }

    get url(): string {
        return this.project.location.url;
    }

    set url(value: string) {
        this.project.location.url = value;
    }

    get rank(): number {
        return this.project.rank.rank;
    }

    set rank(value: number) {
        this.project.rank.rank = value;
    }

    private _location: Location;

    get location(): Location {
        return this._location;
    }

    set location(value: Location) {
        this._location = value;
    }

    private _projectRank: ProjectRank;

    get projectRank(): ProjectRank {
        return this._projectRank;
    }

    set projectRank(value: ProjectRank) {
        this._projectRank = value;
    }

    private _localReach: ReachInterface;

    get localReach(): ReachInterface {
        return this._localReach;
    }

    set localReach(value: ReachInterface) {
        this._localReach = value;
    }

    private _background: Background = this.buildBackground();

    get background(): Background {
        return this._background;
    }

    set background(value: Background) {
        this._background = value;
    }

    get excerpt(): string {
        return this._project.excerpt;
    }

    set excerpt(value: string) {
        this._project.description.excerpt = value;
    }

    private _projectDescription: Description;


    get projectDescription(): Description {
        return this._projectDescription;
    }

    set projectDescription(value: Description) {
        this._projectDescription = value;
    }

    get description(): string {
        return this._project.preachySpeechy;
    }

    set description(value: string) {
        this._project.description.preachySpeechy = value;
    }

    get notUploadable(): Observable<boolean> {
        return this.reachFile
            .defaultIfEmpty(null)
            .map(isNullOrUndefined);
    }

    private _backgroundStyle: string = this.buildStyle();

    get backgroundStyle(): string {
        return this._backgroundStyle;
    }

    set backgroundStyle(value: string) {
        this._backgroundStyle = value;
    }

    get maxProjectCount(): Observable<number> {
        return this.projectService
            .projectCount()
            .map(count => ++count);
    }

    ngOnInit(): void {
        this.maxProjectCount.subscribe(lowestRank => this.rank = lowestRank);
        this.rebuildProject();
    }

    rebuildProject(): void {
        this._project = this.buildProject();
        this.projectChanged.emit(this.project);
    }

    buildProject(): Project {
        return new Project(this._projectDescription,
    this.localReach,
    this._background,
    this._location,
    this._projectRank)

}

    rebuildStyle(): void {
        this.backgroundStyle = this.buildStyle();
        this.background = this.buildBackground();
        this.rebuildProject();
    }

    buildStyle(): string {
        let rgba = this.colorOne;
        let rgba2 = this.colorTwo;
        return "linear-gradient(to right, " + rgba + ", " + rgba2 + ")";
    }

    fileChosen(chosenFile: File): void {
        this.reachFile = Observable.of(chosenFile);
        this.localReach = this.buildReachBlob();
        this.rebuildProject();
    }

    fileUploaded(success: boolean) {

    }

    private buildBackground() {
        return new Background(this.backgroundStyle, this.descriptionTextColor);
    }

    private buildReachBlob() {
        return this.localReachService.createReach(this.reachFile);
    }
}