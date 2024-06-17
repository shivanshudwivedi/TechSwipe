import SwiftUI

struct ProductDetailView: View {
    let product: Product
    @StateObject private var cartViewModel = CartViewModel()
    
    var body: some View {
        ScrollView {
            VStack {
                AsyncImage(url: URL(string: product.imageUrl)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(height: 300)
                } placeholder: {
                    ProgressView()
                }
                
                Text(product.name)
                    .font(.largeTitle)
                    .padding()
                
                Text(product.description)
                    .padding()
                
                Text("Price: $\(product.price, specifier: "%.2f")")
                    .font(.headline)
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
                .padding()
            }
        }
        .navigationBarTitle(product.name)
    }
}
