declare class ProductService {
    private productRepository;
    constructor();
    getAll: () => Promise<any>;
    save: (product: any) => Promise<any>;
    private update;
    private findById;
    private findByName;
    private remove;
}
declare const _default: ProductService;
export default _default;
