import Foundation

class CartViewModel: ObservableObject {
    @Published var cartItems: [CartItem] = []
    
    private let cartService = CartService()
    
    func fetchCartItems() {
        cartService.fetchCartItems { [weak self] result in
            switch result {
            case .success(let cartItems):
                self?.cartItems = cartItems
            case .failure(let error):
                print("Error fetching cart items: \(error)")
            }
        }
    }
    
    func addToCart(_ product: Product) {
        cartService.addToCart(product) { [weak self] result in
            switch result {
            case .success(let cartItems):
                self?.cartItems = cartItems
            case .failure(let error):
                print("Error adding to cart: \(error)")
            }
        }
    }
    
    func removeFromCart(_ cartItem: CartItem) {
        cartService.removeFromCart(cartItem) { [weak self] result in
            switch result {
            case .success(let cartItems):
                self?.cartItems = cartItems
            case .failure(let error):
                print("Error removing from cart: \(error)")
            }
        }
    }
}
