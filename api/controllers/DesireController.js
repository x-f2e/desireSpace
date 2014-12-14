/**
 * DesireController
 *
 * @description :: Server-side logic for managing desires
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuthController)
   */
  _config: {
    actions: false, // 打开自动生成的CRUD方法
    rest: false    // 关闭自动生成的rest 路由
  },

  create: function(req, res) {
    //测试模型
    DesireService.createDesire({
        user: 3,
        type: 1,
        idEnd: false
      },
      {
        start_text: "我是来脱裤子的",
        start_image: ["这是图片地址"]
      },
      function(err, results){
        if (err){
          return res.json(500, {error: err});
        }
        return res.json(200, {data: results});
      }
    );
  },

};

