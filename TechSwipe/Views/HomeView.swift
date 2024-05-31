import SwiftUI

struct HomeView: View {
    var body: some View {
        TabView {
            ProductListView()
                .tabItem {
                    Label("Products", systemImage: "list.bullet")
                }
            
            CartView()
                .tabItem {
                    Label("Cart", systemImage: "cart")
                }
            
            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person")
                }
        }
    }
}
