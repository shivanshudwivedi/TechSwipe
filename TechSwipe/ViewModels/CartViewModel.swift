import Foundation

class CartViewModel: ObservableObject {
    @Published var cartItems: [CartItem] = []
    
    private let productService = ProductService()
    
    func fetchCartItems() {
        // Fetch cart items from the backend
        // Example implementation:
        let product1 = Product(id: "1", name: "Product 1", description: "Description 1", price: 9.99)
        let product2 = Product(id: "2", name: "Product 2", description: "Description 2", price: 19.99)
        let cartItem1 = CartItem(id: "1", product: product1, quantity: 2)
        let cartItem2 = CartItem(id: "2", product: product2, quantity: 1)
        cartItems = [cartItem1, cartItem2]
    }
    
    func addToCart(_ product: Product) {
        // Add product to the cart
        // Example implementation:
        let cartItem = CartItem(id: UUID().uuidString, product: product, quantity: 1)
        cartItems.append(cartItem)
    }
    
    func removeFromCart(_ cartItem: CartItem) {
        // Remove cart item from the cart
        // Example implementation:
        if let index = cartItems.firstIndex(where: { $0.id == cartItem.id }) {
            cartItems.remove(at: index)
        }
    }
    
    func updateQuantity(for cartItem: CartItem, quantity: Int) {
        // Update the quantity of a cart item
        // Example implementation:
        if let index = cartItems.firstIndex(where: { $0.id == cartItem.id }) {
                cartItems[index].quantity = quantity
        }
    }
}
