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
//   "title" : "Thiên Tài Bên Trái, Kẻ Điên Bên Phải",
//   "author" : "Cao Minh",
//   "imageUrl" : "https://salt.tikicdn.com/cache/750x750/ts/product/a8/a7/d1/2ca7ddc54582c66607913a0bcd0c8de2.jpg",
//   "price" : 35000,
//   "category" : "Tâm lý",
//   "page": 224,
//   "brand": "NXB Tuổi trẻ",
//   "language" : "VietNam",
//   "releaseDate": 2020,
//   "description" :"Hỡi những con người đang oằn mình trong cuộc sống, bạn biết gì về thế giới của mình? Là vô vàn thứ lý thuyết được các bậc vĩ nhân kiểm chứng, là luật lệ, là cả nghìn thứ sự thật bọc trong cái lốt hiển nhiên, hay những triết lý cứng nhắc của cuộc đời? Lại đây, vượt qua thứ nhận thức tẻ nhạt bị đóng kín bằng con mắt trần gian, khai mở toàn bộ suy nghĩ, để dòng máu trong bạn sục sôi trước những điều kỳ vĩ, phá vỡ mọi quy tắc. Thế giới sẽ gọi bạn là kẻ điên, nhưng vậy thì có sao? Ranh giới duy nhất giữa kẻ điên và thiên tài chẳng qua là một sợi chỉ mỏng manh: Thiên tài chứng minh được thế giới của mình, còn kẻ điên chưa kịp làm điều đó. Chọn trở thành một kẻ điên để vẫy vùng giữa nhân gian loạn thế hay khóa hết chúng lại, sống mãi một cuộc đời bình thường khiến bạn cảm thấy hạnh phúc hơn?"
// }
