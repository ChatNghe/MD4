declare class TagService {
    private tagRepository;
    constructor();
    getAll: () => Promise<any>;
    remove: (id: any) => Promise<any>;
}
declare const _default: TagService;
export default _default;
