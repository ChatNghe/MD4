"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const tag_1 = require("../model/tag");
class TagService {
    constructor() {
        this.getAll = async () => {
            let tags = await this.tagRepository.find();
            return tags;
        };
        this.remove = async (id) => {
            let post = await this.tagRepository.findOneBy({ post: id });
            if (!post) {
                return null;
            }
            return this.tagRepository.delete({ post: id });
        };
        this.tagRepository = data_source_1.AppDataSource.getRepository(tag_1.Tag);
    }
}
exports.default = new TagService();
//# sourceMappingURL=TagService.js.map