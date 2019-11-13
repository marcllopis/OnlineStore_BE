const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async signup(parent, args, ctx, info) {
    // be sure email is lowercased
    args.email = args.email.toLowerCase();
    // hash password
    const password = await bcrypt.hash(args.password, 10);
    //create the user in the db
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['USER'] },
      }
    }, info);
    // create a JWT for the user so he is automatically signed in
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set JWT as a cookie on the response and return the user
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
    return user;
  },
  async createPicture(parent, args, ctx, info) {
    const picture = await ctx.db.mutation.createPicture({
      data: { ...args }
    }, info)
    return picture;
  },
  async createAlbum(parent, args, ctx, info) {
    const picturesIds = [];
    args.pictures.map(picture => picturesIds.push({ id: picture }))

    const album = await ctx.db.mutation.createAlbum({
      data: {
        ...args,
        pictures: {
          connect: picturesIds,
        }
      }
    }, info)
    return album;
  },
  updateAlbum(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateAlbum({
      data: updates,
      where: {
        id: args.id
      }
    }, info)
  }
};

module.exports = Mutations;
