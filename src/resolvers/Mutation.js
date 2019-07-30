const Mutations = {
  async createPicture(parent, args, ctx, info) {
    const picture = await ctx.db.mutation.createPicture({
      data: { ...args }
    }, info)
    return picture;
  }
};

module.exports = Mutations;
