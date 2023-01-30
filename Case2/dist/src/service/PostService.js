"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const post_1 = require("../model/post");
const post_tag_1 = require("../model/post-tag");
class PostService {
    constructor() {
        this.getAll = async () => {
            let sql = `Select *from post`;
            let post = await this.postRepository.query(sql);
            for (let i = 0; i < post.length; i++) {
                let sql2 = `select *
                        from post_tag
                                 join tag on post_tag.tag = tag.tagId
                        where post_tag.post = ${post[i].postId}`;
                let postTag = await this.postTagRepository.query(sql2);
                post[i]['tags'] = postTag;
            }
            return post;
        };
        this.save = async (post) => {
            return this.postRepository.save(post);
        };
        this.findPostByTag = async (id) => {
            let sql = `select * from post left join post_tag on post.postId = post_tag.post where post_tag.tag = ${id}`;
            let post = await this.postRepository.query(sql);
            for (let i = 0; i < post.length; i++) {
                let sql2 = `select *
                        from post_tag
                                 join tag on post_tag.tag = tag.tagId
                        where post_tag.post = ${post[i].postId}`;
                let postTag = await this.postTagRepository.query(sql2);
                post[i]['tags'] = postTag;
            }
            return post;
        };
        this.findById = async (id) => {
            let post = await this.postRepository.findOneBy({ postId: id });
            if (!post) {
                return null;
            }
            return post;
        };
        this.remove = async (id) => {
            let post = await this.postRepository.findOneBy({ postId: id });
            if (!post) {
                return null;
            }
            return this.postRepository.delete({ postId: id });
        };
        this.update = async (id, newPost) => {
            let post = await this.postRepository.findOneBy({ postId: id });
            if (!post) {
                return null;
            }
            return this.postRepository.update({ postId: id }, newPost);
        };
        this.postRepository = data_source_1.AppDataSource.getRepository(post_1.Post);
        this.postTagRepository = data_source_1.AppDataSource.getRepository(post_tag_1.PostTag);
    }
}
exports.default = new PostService();
//# sourceMappingURL=PostService.js.map