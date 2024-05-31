import SwiftUI

struct ProductDetailView: View {
    let product: Product
    @StateObject private var cartViewModel = CartViewModel()
    
    var body: some View {
        VStack {
            Text(product.name)
                .font(.largeTitle)
            
            Text(product.description)
                .padding()
            
            Text("Price: $\(product.price, specifier: "%.2f")")
                .padding()
            
            Button(action: {
                cartViewModel.addToCart(product)
            }) {
                Text("Add to Cart")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(10)
            }
        }
        .navigationBarTitle(product.name)
    }
}
