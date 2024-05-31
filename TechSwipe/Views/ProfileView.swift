import SwiftUI

struct ProfileView: View {
    @EnvironmentObject private var authViewModel: AuthViewModel
    
    var body: some View {
        VStack {
            if let user = authViewModel.currentUser {
                Text("Name: \(user.name)")
                Text("Email: \(user.email)")
            } else {
                Text("Loading profile...")
            }
            
            Button(action: {
                authViewModel.logout()
            }) {
                Text("Logout")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.red)
                    .cornerRadius(10)
            }
        }
        .onAppear {
            authViewModel.fetchCurrentUser()
        }
        .navigationBarTitle("Profile")
    }
}
