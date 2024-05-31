import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var authViewModel: AuthViewModel
    
    var body: some View {
        if authViewModel.isLoggedIn {
            HomeView()
        } else {
            SignInView()
        }
    }
}
