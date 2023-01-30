import {AppDataSource} from "../data-source";
import {PostTag} from "../model/post-tag";

class PostTagService {
    private postTagRepository

    constructor() {
        this.postTagRepository = AppDataSource.getRepository(PostTag)
    }


    save = async (postTag) => {
        return this.postTagRepository.save(postTag);
    }
    update = async (id, newPostTag) => {
        let post = await this.postTagRepository.findOneBy({post: id});
        if (!post) {
            return null;
        }
        return this.postTagRepository.update({post: id}, newPostTag);
    }

    remove = async (id) => {
        let post = await this.postTagRepository.findOneBy({post: id});
        if (!post) {
            return null;
        }
        return this.postTagRepository.delete({post: id});
    }

}


export default new PostTagService();