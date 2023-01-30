import {AppDataSource} from "../data-source";
import {Tag} from "../model/tag";

class TagService {
    private tagRepository

    constructor() {
        this.tagRepository = AppDataSource.getRepository(Tag)
    }

    getAll = async () => {
        let tags = await this.tagRepository.find();
        return tags;
    }
    remove = async (id) => {
        let post = await this.tagRepository.findOneBy({post: id});
        if (!post) {
            return null;
        }
        return this.tagRepository.delete({post: id});
    }

}

export default new TagService();

