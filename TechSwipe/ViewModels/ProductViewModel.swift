import Foundation

class ProductViewModel: ObservableObject {
    @Published var products: [Product] = []
    
    private let productService = ProductService()
    
    func fetchProducts() {
        productService.fetchProducts { [weak self] result in
            switch result {
            case .success(let products):
                self?.products = products
            case .failure(let error):
                print("Error fetching products: \(error)")
            }
        }
    }
    
    func searchProducts(query: String) {
        productService.searchProducts(query: query) { [weak self] result in
            switch result {
            case .success(let products):
                self?.products = products
            case .failure(let error):
                print("Error searching products: \(error)")
            }
        }
    }
}
