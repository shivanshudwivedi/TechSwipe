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
                .onDelete { indexSet in
                    indexSet.forEach { index in
                        let cartItem = cartViewModel.cartItems[index]
                        cartViewModel.removeFromCart(cartItem)
                    }
                }
            }
            .onAppear {
                cartViewModel.fetchCartItems()
            }
            .navigationTitle("Cart")
            .navigationBarItems(trailing: EditButton())
        }
    }
}
