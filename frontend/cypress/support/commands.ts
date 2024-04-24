// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import {UserModel} from "../fixtures/UserModel";
import {TaskModel} from "../fixtures/TaskModel";
import {TodoModel} from "../fixtures/TodoModel";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            createDefaultUser(): Chainable<UserModel>;
            login(user: UserModel): Chainable<void>;
            openTask(task: TaskModel): Cypress.Chainable<void>;
            createTask(task: { videoUrl: string; title: string }): Cypress.Chainable<void>;
            addTodo(todo: TodoModel): Cypress.Chainable<void>;
        }
    }
}

Cypress.Commands.add('createDefaultUser', createDefaultUser);
Cypress.Commands.add('login', login);
Cypress.Commands.add('createTask', createTask);
Cypress.Commands.add('openTask', openTask);
Cypress.Commands.add('addTodo', addTodo);

export function createDefaultUser() {
    cy.log('Creating a default user');
    return cy.fixture('user.json')
        .then((user) => {
            user.email = 'test' + Math.floor(Math.random() * 100000) + '@example.com';  // make the email unique
            cy.request({
                method: 'POST',
                url: 'http://localhost:5000/users/create',
                form: true,
                body: user
            }).then((response) => {
                cy.wrap(new UserModel(response.body._id.$oid, response.body.firstName + ' ' + response.body.lastName, response.body.email));
            });
        });
}

export function login(user: UserModel) {
    cy.visit('http://localhost:3000');
    cy.contains('div', 'Email Address')
        .find('input[type=text]')
        .type(user.email);

    // submit the form on this page
    cy.get('form')
        .submit();

    // assert that the user is now logged in
    cy.get('h1')
        .should('contain.text', 'Your tasks, ' + name);
}

export function createTask(task: TaskModel) {
    cy.contains('div', 'Title')
        .find('input[type=text]')
        .type(task.title);

    cy.contains('div', 'YouTube URL')
        .find('input[type=text]')
        .type(task.videoUrl);

    cy.get('form')
        .submit();

}

export function openTask(task: TaskModel) {
    cy.contains('div', task.title)
        .click();
}

export function addTodo(todo: TodoModel) {
    cy.get('input[placeholder*="Add a new todo item"]').type(todo.description);
    cy.get(".inline-form > input:nth-child(2)").click();
}
