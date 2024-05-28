import SwiftUI

struct CartView: View {
    @StateObject private var cartViewModel = CartViewModel()
    
    var body: some View {
        List(cartViewModel.cartItems) { item in
            Text(item.product.name)
        }
        .onAppear {
            cartViewModel.fetchCartItems()
        }
        .navigationBarTitle("Cart")
    }
}

struct CartView_Previews: PreviewProvider {
    static var previews: some View {
        CartView()
    }
}
