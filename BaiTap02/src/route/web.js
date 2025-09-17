import express from "express"; // gọi Express
import homeController from "../controller/homeController.js"; // gọi controller

let router = express.Router(); // khởi tạo Route

let initWebRoutes = (app) => {
    // cách 1: route đơn giản
    router.get('/', (req, res) => {
        return res.send('Nguyễn Nhật Nguyên');
    });

    // cách 2: gọi hàm trong controller
    router.get('/home', homeController.getHomePage); // url cho trang chủ
    router.get('/about', homeController.getAboutPage); // url cho trang about
    router.get('/create-user', homeController.getCRUD); // url get crud
    router.post('/create-user', homeController.postCRUD); // url post crud
    router.get('/find-all', homeController.getFindAllCrud); // url lấy findAll
    router.get('/edit-user', homeController.getEditCRUD); // url get editcrud
    router.post('/update-user', homeController.putCRUD); // url put crud
    router.get('/delete-user', homeController.deleteCRUD); // url get delete crud

    return app.use("/", router); // url mặc định
}

export default initWebRoutes;
