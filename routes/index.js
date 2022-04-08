var express = require('express');
var router = express.Router();
var fs = require('fs');


var db = 'mongodb+srv://toandm:riI41BJjs4p68DaI@cluster0.xifo4.mongodb.net/mydata?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
    console.log("co loi xay ra"+ error)
});

/* GET home page. */
router.get('/', function (req, res, next) {
    fs.readFile('data.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var str = data.toString();
        var array = JSON.parse(str);
        console.log(array[0].url);
        res.render('index', {title: 'Express', name: 'Wallpapers', data: array})
    });
});


// viết câu lệnh thêm vào collection - students - database - mydata

// bước 1 : định nghĩa Schema - tương đương với model bên Java
const studentSchema = new mongoose.Schema({
    name: 'string',
    content: 'string',
    link: 'string'
});
// students : là tên của collection tạo phía trang mongoDB ban nãy
const Student = mongoose.model('students', studentSchema);

router.post('/support', async function (req, res) {
    // lấy tham số ra
    var name = req.body.name;
    var content = req.body.content;
    var link = req.body.link;
    // in ra log để kiểm tra
    console.log(name)
    console.log(content)
    console.log(link)

    // bước 2 : gọi câu lệnh thêm vào database
    const data = new Student({
        name: name,
        content: content,
        link: link
    });

    data.save(function (err) {
        if (err) return handleError(err);
        res.render('about', {
            title: 'About',
            message: 'Chúng tôi đã nhận thông tin'
        })

    });

// câu lệnh cập nhật
//     const filter = {name: name};
//     const update = {content: content,link: link};
//     let ketqua = await Student.findOneAndUpdate(filter, update, {
//         new: true
//     });

// // câu lệnh xóa
//     let xoa = await Student.findOneAndDelete(filter, function (error) {
//         console.log(error)
//         console.log("xoa thành công")
//     })


});
router.post('/upgrade', async function (req, res) {
    // lấy tham số ra
    var name = req.body.uname;
    var content = req.body.ucontent;
    var link = req.body.ulink;
    // in ra log để kiểm tra
    console.log(name)
    console.log(content)
    console.log(link)

// câu lệnh cập nhật
    const filter = {name: name};
    const update = {content: content,link: link};
    let ketqua = await Student.findOneAndUpdate(filter, update, {
        new: true
    });
        Student.find({}, function (err, data) {
        // trả về 1 file ejs.
        res.render('viewmore', {pagename: 'View More', message: '',data: data})
    })
});

router.get('/viewmore', function (req, res) {

    // lấy danh sách students
    Student.find({}, function (err, data) {
        // trả về 1 file ejs.
        res.render('viewmore', {pagename: 'View More', message: '',data: data})
    })

})
router.get('/viewmoreMobile', function (req, res) {

    // lấy danh sách students
    Student.find({}, function (err, data) {
        // trả về 1 file ejs.
        res.send(data)
    })

})


//res.render('index', { title: 'Express' ,data:array});

router.get('/green', function (reg, res) {
    console.log('green');
    res.render('category', {pagename: 'Wallpapers: Green'})
});
router.get('/beautiful', function (reg, res) {
    console.log('beautiful');
    res.render('category', {pagename: 'Beautiful Background'})
});
router.get('/else', function (reg, res) {
    console.log('else');
    res.render('category', {pagename: 'Something else here'})
});
router.get('/home', function (reg, res) {
    console.log('home');
    res.render('index', {pagename: 'Home'})
});
router.get('/about', function (reg, res) {
    console.log('about');
    res.render('about', {pagename: 'About', message: ''})
});
// router.get('/viewmore', function (reg, res) {
//     console.log('viewmore');
//     res.render('viewmore', {pagename: 'View More', message: ''})
// });

// router.post('/support', function (reg, res) {
//     var email = reg.body.email;
//     var phoneNumber = reg.body.phoneNumber;
//     var content = reg.body.content;
//     console.log(email);
//     console.log(content);
//     console.log(phoneNumber);
//     fs.writeFile('uploads/' + 'report từ email ' + email + '.txt', email + '\n' + phoneNumber + '\n' + content, function (err) {
//         var message;
//         if (err) {
//             message = err;
//         } else {
//             message = 'Gửi phản hổi thành công';
//         }
//         res.render('about', {
//             title: 'About',
//             message: message
//         })
//     });
//
// });


// router.post('/delete',function (reg,res){
//   var email = reg.body.email;
//   console.log(email);
//   fs.unlink('file/'+email+'.txt',function (err){
//     var message;
//     if (err){
//       message=err;
//     }
//     else {
//       message='ok';
//     }
//     res.render('about' ,{
//       title:'About',
//       message: message
//     })
//   });
//
// });


module.exports = router;
