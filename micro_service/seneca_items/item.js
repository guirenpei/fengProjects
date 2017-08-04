'use strict';

module.exports = function(options) {
  const seneca = this;
  /**
   * 获取所有商品列表
   */
  seneca.add({ area: 'product', action: 'fetch' }, function(args, reply) {
    const products = this.make('products');
    products.list$({}, reply);
  });
  /**
   * 根据分类获取商品列表
   */
  seneca.add({ area: 'product', action: 'fetch', criteria: 'byCategory' }, function(args, reply) {
    const products = this.make('products');
    products.list$({}, reply);
  });
  /**
   * 根据id获取商品
   */
  seneca.add({ area: 'product', action: 'fetch', criteria: 'byId' }, function(args, reply) {
    const product = this.make('products');
    product.load$(args.id, reply);
  });
  /**
   * 添加商品
   */
  seneca.add({ area: 'product', action: 'add' }, (args, reply) => {
    let products = this.make('products');
    products.category = args.category;
    products.name = args.name;
    products.description = args.description;
    products.price = args.price;
    products.save$((err, product) => {
      reply(err, products.data$(false));
    });
  });
  /**
   * 根据id删除商品
   */
  seneca.add({ area: 'product', action: 'remove' }, function(args, reply) {
    const product = this.make('products');
    product.remove$(args.id, (err) => {
      reply(err, null);
    });
  });
  /**
   * 根据id获取商品信息并编辑
   */
  seneca.add({ area: 'product', action: 'edit' }, (args, reply) => {
    seneca.act({ area: 'product', action: 'fetch', criteria: 'byId', id: args.id }, (err, result) => {
      result.data$({
        name: args.name,
        category: args.category,
        description: args.description,
        price: args.price,
      });
      result.save$((err, product) => {
        reply(err, product.data$(false));
      });
    });
  });
};