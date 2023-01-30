import {AppDataSource} from "../data-source";
import {Post} from "../model/post";
import {PostTag} from "../model/post-tag";

class PostService {
    private postRepository
    private postTagRepository

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post)
        this.postTagRepository = AppDataSource.getRepository(PostTag)
    }

    getAll = async () => {
        let sql = `Select *from post`
        let post = await this.postRepository.query(sql)
        for (let i = 0; i < post.length; i++) {
            let sql2 = `select *
                        from post_tag
                                 join tag on post_tag.tag = tag.tagId
                        where post_tag.post = ${post[i].postId}`
            let postTag = await this.postTagRepository.query(sql2)
            post[i]['tags'] = postTag
        }
        return post

    }

    save = async (post) => {
        return this.postRepository.save(post);
    }
    findPostByTag = async (id) => {
        let sql = `select * from post left join post_tag on post.postId = post_tag.post where post_tag.tag = ${id}`
        let post = await this.postRepository.query(sql)
        for (let i = 0; i < post.length; i++) {
            let sql2 = `select *
                        from post_tag
                                 join tag on post_tag.tag = tag.tagId
                        where post_tag.post = ${post[i].postId}`
            let postTag = await this.postTagRepository.query(sql2)
            post[i]['tags'] = postTag
        }
        return post
    }
    findById = async (id) => {
        let post = await this.postRepository.findOneBy({postId: id});
        if (!post) {
            return null;
        }
        return post;
    }
    remove = async (id) => {
        let post = await this.postRepository.findOneBy({postId: id});
        if (!post) {
            return null;
        }

        return this.postRepository.delete({postId: id});
    }
    update = async (id, newPost) => {
        let post = await this.postRepository.findOneBy({postId: id});
        if (!post) {
            return null;
        }
        return this.postRepository.update({postId: id}, newPost);
    }
}


export default new PostService();