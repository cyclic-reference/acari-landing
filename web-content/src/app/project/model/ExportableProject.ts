import {Location} from "./Location.model";
import {Description} from "./Description.model";
import {Background} from "./Background.model";
import {ProjectRank} from "./ProjectRank.model";
import {Reach} from "./Reach.model";

export class ExportableProject {
    protected _selectedReach: Reach;
    protected _rank: ProjectRank;
    protected _background: Background;
    protected _description: Description;
    protected _location: Location;


    constructor(description: Description,
                reach: Reach,
                background: Background,
                location: Location,
                rank: ProjectRank) {
        this._description = description;
        this._selectedReach = reach;
        this._background = background;
        this._location = location;
        this._rank = rank;
    }
}