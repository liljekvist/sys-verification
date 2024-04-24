import {UserModel} from '../fixtures/UserModel'

describe('Logging into the system', () => {
  // define variables that we need on multiple occasions
  let user: UserModel;

  before((): void => {
    // create a fabricated user from a fixture
    cy.createDefaultUser().then((newUser: UserModel) => {
        cy.log(newUser.email);
        // store the user in a variable that we can access later
        user = newUser;
    });
  })

  beforeEach((): void => {
    // enter the main main page
    cy.visit('http://localhost:3000')
  })

  it('starting out on the landing screen', () => {
    // make sure the landing page contains a header with "login"
    cy.get('h1')
      .should('contain.text', 'Login')
  })

  it('login to the system with an existing account', () => {
    // detect a div which contains "Email Address", find the input and type (in a declarative way)
    cy.contains('div', 'Email Address')
      .find('input[type=text]')
      .type(user.email)
    // alternative, imperative way of detecting that input field
    //cy.get('.inputwrapper #email')
    //    .type(email)

    // submit the form on this page
    cy.get('form')
      .submit()

    // assert that the user is now logged in
    cy.get('h1')
      .should('contain.text', 'Your tasks, ' + name)
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
})