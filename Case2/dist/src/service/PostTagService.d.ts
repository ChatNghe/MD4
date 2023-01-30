declare class PostTagService {
    private postTagRepository;
    constructor();
    save: (postTag: any) => Promise<any>;
    update: (id: any, newPostTag: any) => Promise<any>;
    remove: (id: any) => Promise<any>;
}
declare const _default: PostTagService;
export default _default;
