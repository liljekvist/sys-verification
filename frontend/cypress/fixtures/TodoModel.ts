export class TodoModel{
    id: string = '';
    description: string = 'test title';

    constructor(id: string, description: string) {
        this.id = id;
        this.description = description;
    }
}