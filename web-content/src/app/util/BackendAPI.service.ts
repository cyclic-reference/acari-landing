import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {LocalProject} from "../project/model/LocalProject.model";
import {RemoteProject} from "../project/model/RemoteProject.model";
import {RemoteProjectFactory} from "../project/RemoteProject.factory";
import {ExportableLocalProject} from "../project/model/ExportableLocalProject.model";


@Injectable()
export class BackendAPIService {


    constructor(private http: HttpClient
    ,private remoteProjectFactory: RemoteProjectFactory) {
    }


    postImage(formData: FormData): Observable<string> {
        return this.http.post('./api/image/save', formData, {
            responseType: 'text'
        });
    }

    fetchImage(_id: string): Observable<Blob> {
        return this.http.get('./api/image/get' + _id, {
            responseType: 'blob'
        });
    }

    fetchAllImages(): Observable<RemoteProject[]> {
        return this.http.get('./api/projects', {
            responseType: 'json'
        }).map(json=><any[]>json)
            .map(json => json.map(projectJson=>this.remoteProjectFactory.createProject(projectJson)));
    }

    postProject(exportableLocalProject: ExportableLocalProject): Observable<RemoteProject> {
        return this.http.post('./api/project/create', exportableLocalProject, {
            responseType: 'json'
        }).map(json => this.remoteProjectFactory.createProject(json))
    }
}