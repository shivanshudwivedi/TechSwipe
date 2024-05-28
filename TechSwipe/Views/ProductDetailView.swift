import SwiftUI

struct ProductDetailView: View {
    let product: Product
    
    var body: some View {
        VStack {
            Text(product.name)
                .font(.title)
            
            Text(product.description)
                .padding()
            
            Text("Price: $\(product.price)")
                .padding()
            
            Button(action: {
                // Add to cart action
            }) {
                Text("Add to Cart")
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(10)
            }
        }
        .navigationBarTitle(product.name)
    }
}

struct ProductDetailView_Previews: PreviewProvider {
    static var previews: some View {
        ProductDetailView(product: Product(id: "1", name: "Sample Product", description: "This is a sample product", price: 9.99))
    }
}
