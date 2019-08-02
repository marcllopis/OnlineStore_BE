const { forwardTo } = require('prisma-binding');

const Query = {
  pictures: forwardTo('db'),
  albums: forwardTo('db'),
  album: forwardTo('db'),
};

module.exports = Query;
