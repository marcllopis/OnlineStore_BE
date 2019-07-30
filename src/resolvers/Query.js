const Query = {
  async pictures(parent, args, ctx, info) {
    const pictures = await ctx.db.query.pictures();
    return pictures;
  }
};

module.exports = Query;
