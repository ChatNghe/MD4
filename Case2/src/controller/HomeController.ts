import {Request, Response} from "express";
import postService from "../service/PostService";
import tagService from "../service/TagService";
import postTagService from "../service/PostTagService";


class HomeController {

    private postService
    private tagService
    private postTagService

    constructor() {

        this.postService = postService;
        this.tagService = tagService;
        this.postTagService = postTagService

    }

    showHome = async (req: Request, res: Response) => {
        let posts = await this.postService.getAll()
        let tags = await this.tagService.getAll()
        res.render('home', {posts: posts, tags: tags})
    }
    showFormCreate = async (req: Request, res: Response) => {
        let posts = await this.postService.getAll()
        let tags = await this.tagService.getAll()
        res.render('post/create', {posts: posts, tags: tags})
    }
    showHomeSearch = async (req: Request, res: Response) => {
        let posts = await this.postService.findPostByTag(req.body.search);
        let tags = await this.tagService.getAll()
        res.render('home', {posts: posts, tags: tags})

    }
    create = async (req: Request, res: Response) => {
        if (req.files) {
            let image = req.files.image;
            if ("mv" in image) {
                await image.mv('./public/storage/' + image.name)
                let today = new Date();
                let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                let time = today.getHours()+':'+today.getMinutes();
                let dateTime = time + '-' + date
                let post = req.body;
                post.image = '/storage/' + image.name;
                post.date = date;
                post.user = req.session["User"].username;

                let postCreate = await postService.save(post)
                if (req.body.tagName.length > 1) {
                    req.body.tagName.map(tag => {
                        let tagPost = {tag: tag, post: postCreate.postId}
                        postTagService.save(tagPost)
                    })

                    res.redirect(301, '/home')
                } else {
                    let tagPost = {tag: req.body.tagName, post: postCreate.postId}
                    await postTagService.save(tagPost)
                    res.redirect(301, '/home')
                }

            }
        }
    }

    showFormEdit = async (req: Request, res: Response) => {
        let id = req.params.id;
        let post = await this.postService.findById(id)
        let tags = await this.tagService.getAll()
        res.render('post/edit', {post: post, tags: tags});
    }

    update = async (req: Request, res: Response) => {
        let id = req.params.id;
        console.log(id)
        await postTagService.remove(id)
        if (req.files) {
            let image = req.files.image;
            if ("mv" in image) {
                await image.mv('./public/storage/' + image.name)
                let today = new Date();
                let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                let time = today.getHours()+':'+today.getMinutes();
                let dateTime = time + '-' + date
                let post = {};
                post["title"] = req.body.title
                post["content"] = req.body.content
                post["image"] = '/storage/' + image.name;
                post["date"] = date;
                post["user"] = req.session["User"].username;
                await postService.update(id, post)
                if (req.body.tagName.length > 1) {
                    req.body.tagName.map(tag => {
                        let tagPost = {tag: tag, post: id}
                        postTagService.save(tagPost)
                    })
                    res.redirect(301, '/home')
                } else {
                    let tagPost = {tag: req.body.tagName, post: id}
                    await postTagService.save(tagPost)
                    res.redirect(301, '/home')
                }
            }
        }
    }

    showFormDelete = async (req: Request, res: Response) => {
        let idDelete = req.params.id;
        res.render('post/delete', {idDelete: idDelete});
    }

    remove = async (req: Request, res: Response) => {
        let id = req.params.id;
        await this.postService.remove(id)
        res.redirect(301, '/home')
    }
}

export default new HomeController();