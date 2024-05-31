import SwiftUI

struct ProductListView: View {
    @StateObject private var productViewModel = ProductViewModel()
    
    var body: some View {
        NavigationView {
            List(productViewModel.products) { product in
                NavigationLink(destination: ProductDetailView(product: product)) {
                    Text(product.name)
                }
            }
            .onAppear {
                productViewModel.fetchProducts()
            }
            .navigationTitle("Products")
        }
    }
}
