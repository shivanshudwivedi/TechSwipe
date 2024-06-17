import SwiftUI

struct ProductListView: View {
    @StateObject private var productViewModel = ProductViewModel()
    @State private var searchQuery = ""
    
    var body: some View {
        NavigationView {
            VStack {
                HStack {
                    TextField("Search", text: $searchQuery)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding(.leading, 10)
                    
                    Button(action: {
                        productViewModel.searchProducts(query: searchQuery)
                    }) {
                        Text("Search")
                            .padding(EdgeInsets(top: 8, leading: 12, bottom: 8, trailing: 12))
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(8)
                            .padding(.trailing, 10)
                    }
                }
                .padding(.top, 10)
                
                ScrollView {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 150))], spacing: 20) {
                        ForEach(productViewModel.products) { product in
                            NavigationLink(destination: ProductDetailView(product: product)) {
                                ProductCard(product: product)
                            }
                        }
                    }
                    .padding()
                }
                .onAppear {
                    productViewModel.fetchProducts()
                }
                .navigationTitle("Products")
            }
        }
    }
}

struct ProductCard: View {
    let product: Product
    
    var body: some View {
        VStack {
            AsyncImage(url: URL(string: product.imageUrl)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(height: 150)
            } placeholder: {
                ProgressView()
            }
            
            Text(product.name)
                .font(.headline)
                .lineLimit(2)
                .multilineTextAlignment(.center)
            
            Text("$\(product.price, specifier: "%.2f")")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            Text(product.description)
                .font(.caption)
                .lineLimit(3)
                .multilineTextAlignment(.center)
                .padding(.top, 4)
        }
        .padding()
        .background(Color.white)
        .cornerRadius(10)
        .shadow(radius: 5)
    }
}
