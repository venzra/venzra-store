const { defineSupportCode } = require('cucumber');
const querystring = require('querystring');
const nock = require('nock');
const path = require('path');

const { expect } = require('chai');

defineSupportCode(({ Given, When, Then }) => {

    const prepareMock = (uri, target, type, status, file, body) => {
        let mock = nock(uri).log((message, actual, separator, expected) => {
            message = message.trim();
            switch(message) {
                case 'bodies don\'t match:':
                    expect(expected).to.equal(actual);
                    break;
                default:
                    if(!message.startsWith('matching')) {
                        throw new Error(`Unknown network mocking error occurred: ${message}`);
                    }
            }
        });

        if (!target) {
            mock = mock.filteringPath(/.*/, '*');
        }

        mock = mock[type.toLowerCase()](target ? target : '*', body);

        if (file) {
            mock = mock.replyWithFile(status, path.join(__dirname, '../mocks', file));
        } else {
            mock = mock.reply(status);
        }

        return mock;
    };

    Given(/^there is a (POST|GET) consumer at "([^"]*)"(?: for "([^"]*)")? that will return(?: "([^"]*)" with)? status (200|400|500)$/, function (type, uri, target, file, status) {
        return this.addMock(prepareMock(uri, target, type, status, file));
    });

    Given(/^there is a (POST|GET) consumer at "([^"]*)"(?: for "([^"]*)")? that will return(?: "([^"]*)" with)? status (\d+) when called with:$/, function (type, uri, target, file, status, requestData) {
        requestData = querystring.stringify(this.getHashes(requestData)[0]);
        return this.addMock(prepareMock(uri, target, type, status, file, requestData));
    });

    Given(/^I show the available history$/, function () {
        console.log(this.history);
    })

});
