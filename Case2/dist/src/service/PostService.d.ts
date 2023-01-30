declare class PostService {
    private postRepository;
    private postTagRepository;
    constructor();
    getAll: () => Promise<any>;
    save: (post: any) => Promise<any>;
    findPostByTag: (id: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    remove: (id: any) => Promise<any>;
    update: (id: any, newPost: any) => Promise<any>;
}
declare const _default: PostService;
export default _default;
