const sql = require("../utils/mysql.util.js");

const ProductModel = function(products) {
    this.title = products.title;
    this.author = products.author;
    this.imageUrl = products.imageUrl;
    this.price = products.price;
    this.category = products.category;
    this.page= products.page;
    this.brand=  products.brand;
    this.language = products.language;
    this.releaseDate= products.releaseDate;
    this.description = products.description;
  };
  
ProductModel.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ...newProduct });
    });
};
  
ProductModel.getAll = (title, result) => {
    let query = "SELECT * FROM products";
  
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      // console.log("tutorials: ", res);
      result(null, res);
    });
  };

ProductModel.findById = (id, result) => {
    sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, res) => {
      if (err) {
        // if(res.length==0)
          console.log("error: ", err);
          result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
};

ProductModel.findByFilter = (req, result) => {
  let order = req.body.order ? `ORDER BY price ${req.body.order}` : "";
  let category = req.body.category ? `category = '${req.body.category}' AND` : "";
  let search = req.body.search ? req.body.search : "";
  let min = req.body.min ? req.body.min : 0;
  let max = req.body.max ? req.body.max : 1000000;
  let brands= req.body.brand ? req.body.brand : []
  let brand= req.body.brand && req.body.brand.length!=0 ? `AND `: ""
  brands.map((element,i) => {
    brand += `brand = "${element}" `
    if(i!=brands.length-1)
      brand += " OR "
  })

  
  sql.query(`SELECT * FROM products WHERE ${category} price >= ${min}
  AND price <= ${max} AND title LIKE '%${search}%' ${order} ${brand}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length >= 0) {
      result(null, res);
      return;
    }


    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

ProductModel.getLimit = (id, result) => {
  sql.query(`SELECT * FROM products ORDER BY id DESC LIMIT 5 `, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }
  });
};

ProductModel.updateById = (id, product, result) => {
    sql.query(
      "UPDATE products SET title = ?, author = ?, imageUrl = ?, price = ?, category = ?, page = ?, brand  = ?, language = ?, releaseDate = ?, description = ? WHERE id = ?",
      [product.title, product.author, product.imageUrl, product.price,
         product.category, product.page, product.brand, product.language, product.releaseDate, product.description, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        // console.log("updated tutorial: ", { id: id, ...tutorial });
        result(null, { id: id, ...product });
      }
    );
};

ProductModel.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
    //   console.log("deleted tutorial with id: ", id);
      result(null, res);
    });
  };

ProductModel.removeAll = result => {
    sql.query("DELETE FROM products", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
    //   console.log(`deleted ${res.affectedRows} tutorials`);
      result(null, res);
    });
};
module.exports = ProductModel;

// /{
//   "title" : "Thi??n T??i B??n Tr??i, K??? ??i??n B??n Ph???i",
//   "author" : "Cao Minh",
//   "imageUrl" : "https://salt.tikicdn.com/cache/750x750/ts/product/a8/a7/d1/2ca7ddc54582c66607913a0bcd0c8de2.jpg",
//   "price" : 35000,
//   "category" : "T??m l??",
//   "page": 224,
//   "brand": "NXB Tu???i tr???",
//   "language" : "VietNam",
//   "releaseDate": 2020,
//   "description" :"H???i nh???ng con ng?????i ??ang o???n m??nh trong cu???c s???ng, b???n bi???t g?? v??? th??? gi???i c???a m??nh? L?? v?? v??n th??? l?? thuy???t ???????c c??c b???c v?? nh??n ki???m ch???ng, l?? lu???t l???, l?? c??? ngh??n th??? s??? th???t b???c trong c??i l???t hi???n nhi??n, hay nh???ng tri???t l?? c???ng nh???c c???a cu???c ?????i? L???i ????y, v?????t qua th??? nh???n th???c t??? nh???t b??? ????ng k??n b???ng con m???t tr???n gian, khai m??? to??n b??? suy ngh??, ????? d??ng m??u trong b???n s???c s??i tr?????c nh???ng ??i???u k??? v??, ph?? v??? m???i quy t???c. Th??? gi???i s??? g???i b???n l?? k??? ??i??n, nh??ng v???y th?? c?? sao? Ranh gi???i duy nh???t gi???a k??? ??i??n v?? thi??n t??i ch???ng qua l?? m???t s???i ch??? m???ng manh: Thi??n t??i ch???ng minh ???????c th??? gi???i c???a m??nh, c??n k??? ??i??n ch??a k???p l??m ??i???u ????. Ch???n tr??? th??nh m???t k??? ??i??n ????? v???y v??ng gi???a nh??n gian lo???n th??? hay kh??a h???t ch??ng l???i, s???ng m??i m???t cu???c ?????i b??nh th?????ng khi???n b???n c???m th???y h???nh ph??c h??n?"
// }
