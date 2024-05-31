import Foundation

class CartService {
    func fetchCartItems(completion: @escaping (Result<[CartItem], Error>) -> Void) {
        // Fetch cart items from the backend API
        // Example implementation:
        let product1 = Product(id: "1", name: "Product 1", description: "Description 1", price: 9.99)
        let product2 = Product(id: "2", name: "Product 2", description: "Description 2", price: 19.99)
        let cartItem1 = CartItem(id: "1", product: product1, quantity: 2)
        let cartItem2 = CartItem(id: "2", product: product2, quantity: 1)
        completion(.success([cartItem1, cartItem2]))
    }
    
    func addToCart(_ product: Product, completion: @escaping (Result<[CartItem], Error>) -> Void) {
        // Add product to the cart in the backend
        // Example implementation:
        let cartItem = CartItem(id: UUID().uuidString, product: product, quantity: 1)
        completion(.success([cartItem]))
    }
    
    func removeFromCart(_ cartItem: CartItem, completion: @escaping (Result<[CartItem], Error>) -> Void) {
        // Remove product from the cart in the backend
        // Example implementation:
        completion(.success([]))
    }
}
