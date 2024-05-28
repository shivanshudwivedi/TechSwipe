import SwiftUI

struct ProductListView: View {
    @StateObject private var productViewModel = ProductViewModel()
    
    var body: some View {
        List(productViewModel.products) { product in
            NavigationLink(destination: ProductDetailView(product: product)) {
                Text(product.name)
            }
        }
        .onAppear {
            productViewModel.fetchProducts()
        }
        .navigationBarTitle("Products")
    }
}

struct ProductListView_Previews: PreviewProvider {
    static var previews: some View {
        ProductListView()
    }
}
