"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const post_tag_1 = require("../model/post-tag");
class PostTagService {
    constructor() {
        this.save = async (postTag) => {
            return this.postTagRepository.save(postTag);
        };
        this.update = async (id, newPostTag) => {
            let post = await this.postTagRepository.findOneBy({ post: id });
            if (!post) {
                return null;
            }
            return this.postTagRepository.update({ post: id }, newPostTag);
        };
        this.remove = async (id) => {
            let post = await this.postTagRepository.findOneBy({ post: id });
            if (!post) {
                return null;
            }
            return this.postTagRepository.delete({ post: id });
        };
        this.postTagRepository = data_source_1.AppDataSource.getRepository(post_tag_1.PostTag);
    }
}
exports.default = new PostTagService();
//# sourceMappingURL=PostTagService.js.map