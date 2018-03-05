const { defineSupportCode } = require('cucumber');
const mongoose = require('mongoose');

defineSupportCode(({ Given, When, Then }) => {

    Given(/^there are the following "([^"]*)" records in the database$/, function (collection, dataset) {
        dataset = this.getHashes(dataset);

        if (mongoose.models[collection]) {
            return Promise
                .all(dataset.map((row) => {
                    Object.keys(row).forEach((key) => (row[key] === null || row[key] === '') && delete row[key]);
                    const creation = new mongoose.models[collection](row);
                    return creation.save();
                }))
                .then((records) => this.history[collection] = records);
        } else {
            throw new Error(`No model known for collection ${collection}`);
        }
    });

});
