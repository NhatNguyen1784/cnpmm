import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

const initWebRoutes = (app) => {
    router.get('/home', homeController.getHomePage); // url cho trang chủ
        router.get('/about', homeController.getAboutPage); // url cho trang about
        router.get('/create-user', homeController.getCRUD); // url get crud
        router.post('/create-user', homeController.postCRUD); // url post crud
        router.get('/find-all', homeController.getFindAllCrud); // url lấy findAll
        router.get('/edit-user', homeController.getEditCRUD); // url get editcrud
        router.post('/update-user', homeController.putCRUD); // url put crud
        router.get('/delete-user', homeController.deleteCRUD); // url get delete crud

    return app.use("/", router);
};

export default initWebRoutes;
