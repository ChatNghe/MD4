"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = __importDefault(require("../service/PostService"));
const TagService_1 = __importDefault(require("../service/TagService"));
const PostTagService_1 = __importDefault(require("../service/PostTagService"));
class HomeController {
    constructor() {
        this.showHome = async (req, res) => {
            let posts = await this.postService.getAll();
            let tags = await this.tagService.getAll();
            res.render('home', { posts: posts, tags: tags });
        };
        this.showFormCreate = async (req, res) => {
            let posts = await this.postService.getAll();
            let tags = await this.tagService.getAll();
            res.render('post/create', { posts: posts, tags: tags });
        };
        this.showHomeSearch = async (req, res) => {
            let posts = await this.postService.findPostByTag(req.body.search);
            let tags = await this.tagService.getAll();
            res.render('home', { posts: posts, tags: tags });
        };
        this.create = async (req, res) => {
            if (req.files) {
                let image = req.files.image;
                if ("mv" in image) {
                    await image.mv('./public/storage/' + image.name);
                    let today = new Date();
                    let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
                    let time = today.getHours() + ':' + today.getMinutes();
                    let dateTime = time + '-' + date;
                    let post = req.body;
                    post.image = '/storage/' + image.name;
                    post.date = date;
                    post.user = req.session["User"].username;
                    let postCreate = await PostService_1.default.save(post);
                    if (req.body.tagName.length > 1) {
                        req.body.tagName.map(tag => {
                            let tagPost = { tag: tag, post: postCreate.postId };
                            PostTagService_1.default.save(tagPost);
                        });
                        res.redirect(301, '/home');
                    }
                    else {
                        let tagPost = { tag: req.body.tagName, post: postCreate.postId };
                        await PostTagService_1.default.save(tagPost);
                        res.redirect(301, '/home');
                    }
                }
            }
        };
        this.showFormEdit = async (req, res) => {
            let id = req.params.id;
            let post = await this.postService.findById(id);
            let tags = await this.tagService.getAll();
            res.render('post/edit', { post: post, tags: tags });
        };
        this.update = async (req, res) => {
            let id = req.params.id;
            console.log(id);
            await PostTagService_1.default.remove(id);
            if (req.files) {
                let image = req.files.image;
                if ("mv" in image) {
                    await image.mv('./public/storage/' + image.name);
                    let today = new Date();
                    let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
                    let time = today.getHours() + ':' + today.getMinutes();
                    let dateTime = time + '-' + date;
                    let post = {};
                    post["title"] = req.body.title;
                    post["content"] = req.body.content;
                    post["image"] = '/storage/' + image.name;
                    post["date"] = date;
                    post["user"] = req.session["User"].username;
                    await PostService_1.default.update(id, post);
                    if (req.body.tagName.length > 1) {
                        req.body.tagName.map(tag => {
                            let tagPost = { tag: tag, post: id };
                            PostTagService_1.default.save(tagPost);
                        });
                        res.redirect(301, '/home');
                    }
                    else {
                        let tagPost = { tag: req.body.tagName, post: id };
                        await PostTagService_1.default.save(tagPost);
                        res.redirect(301, '/home');
                    }
                }
            }
        };
        this.showFormDelete = async (req, res) => {
            let idDelete = req.params.id;
            res.render('post/delete', { idDelete: idDelete });
        };
        this.remove = async (req, res) => {
            let id = req.params.id;
            await this.postService.remove(id);
            res.redirect(301, '/home');
        };
        this.postService = PostService_1.default;
        this.tagService = TagService_1.default;
        this.postTagService = PostTagService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map