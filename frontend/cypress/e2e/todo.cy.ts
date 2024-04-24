import {UserModel} from "../fixtures/UserModel";
import {TaskModel} from "../fixtures/TaskModel";
import {TodoModel} from "../fixtures/TodoModel";

describe('R8UC1', () => {

    let user: UserModel;
    let task: TaskModel = new TaskModel('1', 'test title', 'dQw4w9WgXcQ');

    before((): void => {
        cy.createDefaultUser().then((newUser: UserModel) => {
            cy.log(newUser.email);
            user = newUser;
            cy.login(user).then(() => {
                cy.createTask(task);
            });
        });
    })

    beforeEach((): void => {
        cy.visit('http://localhost:3000');

        cy.login(user).then(() => {
            cy.openTask(task);
        });
    });

    it('Add todo', () => {
        cy.addTodo(new TodoModel('1', 'test todo'));
    })

    it('Button disabled when input empty', () => {
        cy.get(".inline-form > input:nth-child(2)").should('be.disabled');
    })

    after(function () {
        // clean up by deleting the user from the database
        cy.request({
            method: 'DELETE',
            url: `http://localhost:5000/users/${user.id}`
        }).then((response) => {
            cy.log(response.body)
        })
    })
});

describe('R8UC2', () => {
    let user: UserModel;
    let task: TaskModel = new TaskModel('1', 'test title', 'dQw4w9WgXcQ');
    let todo: TodoModel = new TodoModel('1', 'test todo');

    before((): void => {
        cy.createDefaultUser().then((newUser: UserModel) => {
            cy.log(newUser.email);
            user = newUser;
            cy.login(user).then(() => {
                cy.createTask(task).then(() => {
                    cy.openTask(task).then(() => {
                        cy.addTodo(todo);

                    });
                });
            });
        });
    })

    beforeEach((): void => {
        cy.visit('http://localhost:3000');

        cy.login(user).then(() => {
            cy.openTask(task);
        });
    });

    it('Set todo as done', () => {
        cy.contains('.todo-item', todo.description)
            .find('.checker')
            .click();
        cy.contains('.todo-item', todo.description)
            .find('.checker')
            .should('have.class', 'checked');
    });

    it('Set done todo to active', () => {
        cy.contains('.todo-item', todo.description)
            .find('.checker')
            .should('have.class', 'checked');

        cy.contains('.todo-item', todo.description)
            .find('.checker')
            .click();

        cy.contains('.todo-item', todo.description)
            .find('.checker')
            .should('not.have.class', 'checked');
    })

    after(function () {
        // clean up by deleting the user from the database
        cy.request({
            method: 'DELETE',
            url: `http://localhost:5000/users/${user.id}`
        }).then((response) => {
            cy.log(response.body)
        })
    })
});

describe('R8UC3', () => {
    let user: UserModel;
    let task: TaskModel = new TaskModel('1', 'test title', 'dQw4w9WgXcQ');
    let todo: TodoModel = new TodoModel('1', 'test todo');

    before((): void => {
        cy.createDefaultUser().then((newUser: UserModel) => {
            cy.log(newUser.email);
            user = newUser;
            cy.login(user).then(() => {
                cy.createTask(task).then(() => {
                    cy.openTask(task).then(() => {
                        cy.addTodo(todo);

                    });
                });
            });
        });
    })

    beforeEach((): void => {
        cy.visit('http://localhost:3000');

        cy.login(user).then(() => {
            cy.openTask(task);
        });
    });

    it('Delete todo', () => {
        cy.contains('.todo-item', todo.description)
            .find('.remover')
            .click();
        cy.contains('.todo-item', todo.description)
            .find('.remover') // might be a bug or just a focusing issue,
            .click();
        cy.get(".todo-list").should('not.contain', todo.description);
    });

    after(function () {
        // clean up by deleting the user from the database
        cy.request({
            method: 'DELETE',
            url: `http://localhost:5000/users/${user.id}`
        }).then((response) => {
            cy.log(response.body)
        })
    })
});