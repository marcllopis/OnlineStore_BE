const Mutations = {
  async createPicture(parent, args, ctx, info) {
    const picture = await ctx.db.mutation.createPicture({
      data: { ...args }
    }, info)
    return picture;
  },
  async createAlbum(parent, args, ctx, info) {
    const album = await ctx.db.mutation.createAlbum({
      data: {
        ...args
      }
    }, info)
    console.log('album', album);

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
