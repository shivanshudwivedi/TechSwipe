import Foundation

class ProductService {
    func fetchProducts(completion: @escaping (Result<[Product], Error>) -> Void) {
        // Fetch products from the backend API
        // Example implementation:
        let products = [
            Product(id: "1", name: "Product 1", description: "Description 1", price: 9.99),
            Product(id: "2", name: "Product 2", description: "Description 2", price: 19.99),
            Product(id: "3", name: "Product 3", description: "Description 3", price: 29.99)
        ]
        completion(.success(products))
    }
}
