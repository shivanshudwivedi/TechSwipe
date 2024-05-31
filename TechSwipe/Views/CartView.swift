import SwiftUI

struct CartView: View {
    @StateObject private var cartViewModel = CartViewModel()
    
    var body: some View {
        NavigationView {
            List {
                ForEach(cartViewModel.cartItems) { cartItem in
                    HStack {
                        Text(cartItem.product.name)
                        Spacer()
                        Text("\(cartItem.quantity)")
                    }
                }
                .onDelete(perform: cartViewModel.removeFromCart)
            }
            .onAppear {
                cartViewModel.fetchCartItems()
            }
            .navigationTitle("Cart")
        }
    }
}
