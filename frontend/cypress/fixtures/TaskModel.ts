export class TaskModel {
    id: string = '';
    title: string = 'test title';
    videoUrl: string = '6J3zrP4bX5A';

    constructor(id: string, title: string, videoUrl: string) {
        this.id = id;
        this.title = title;
        this.videoUrl = videoUrl;
    }
}