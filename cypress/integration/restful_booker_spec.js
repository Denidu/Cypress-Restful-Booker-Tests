describe('Restful-Booker API Tests', () => {
    let bookingId;
  
    it('Should create a new booking', () => {
      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        body: {
          "firstname": "Denidu",
          "lastname": "Gamage",
          "totalprice": 200,
          "depositpaid": true,
          "bookingdates": {
            "checkin": "2024-01-21",
            "checkout": "2024-01-25"
          },
          "additionalneeds": "Breakfast"
        },
      }).then((response) => {
        // Cypress automatically asserts the status code
        // and response body properties
        bookingId = response.body.bookingid;
      });
    });
  
    it('Should retrieve booking details', () => {
      // Use Cypress assertions directly
      cy.request(`https://restful-booker.herokuapp.com/booking/${bookingId}`).then((response) => {
        cy.wrap(response.body).should('have.property', 'firstname', 'Denidu');
        cy.wrap(response.body).should('have.property', 'lastname', 'Gamage');
      });
    });
  
    it('Should update the booking', () => {
      cy.request({
        method: 'PUT',
        url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        body: {
          "firstname": "UpdatedDenidu",
          "lastname": "UpdatedGamage",
          "totalprice": 250,
          "depositpaid": true,
          "bookingdates": {
            "checkin": "2024-01-24",
            "checkout": "2024-01-31"
          },
          "additionalneeds": "Lunch"
        },
      }).then((response) => {
        // Cypress automatically asserts the status code
        // and you can add additional assertions as needed
        expect(response.status).to.equal(200);
      });
    });
  
    it('Should delete the booking', () => {
      // Use Cypress assertions directly
      cy.request({
        method: 'DELETE',
        url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      }).then((response) => {
        // Cypress automatically asserts the status code
        // and you can add additional assertions as needed
        expect(response.status).to.equal(201);
      });
    });
  });
  