const get = (req, res) => {
    res.status(200).send('Got all review data!');
};

const post = (req, res) => {
    res.status(201).send('Added a new review!');
};

const update = (req, res) => {
    res.status(200).send('Update a review!');
};

module.exports = {
    get,
    post,
    update
}