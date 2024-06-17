import SwiftUI

struct CartView: View {
    @StateObject private var cartViewModel = CartViewModel()
    @StateObject private var productViewModel = ProductViewModel()
    
    var body: some View {
        NavigationView {
            List {
                ForEach(cartViewModel.cartItems) { cartItem in
                    HStack {
                        if let product = productViewModel.products.first(where: { $0.id == cartItem.product_id }) {
                            Text(product.name)
                        } else {
                            Text("Loading...")
                        }
                        Spacer()
                        Text("\(cartItem.quantity)")
                    }
                }
                .onDelete { indexSet in
                    indexSet.forEach { index in
                        let cartItem = cartViewModel.cartItems[index]
                        cartViewModel.removeFromCart(cartItem)
                    }
                }
            }
            .onAppear {
                cartViewModel.fetchCartItems()
                productViewModel.fetchProducts()
            }
            .navigationTitle("Cart")
            .navigationBarItems(trailing: EditButton())
        }
    }
}
