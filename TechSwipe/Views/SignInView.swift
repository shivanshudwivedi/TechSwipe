import SwiftUI

struct SignInView: View {
    @EnvironmentObject private var authViewModel: AuthViewModel
    
    var body: some View {
        VStack {
            Text("Welcome to TechSwipe")
                .font(.largeTitle)
            
            Spacer()
            
            Button(action: signInWithGoogle) {
                Text("Sign in with Google")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(10)
            }
            
            Spacer()
        }
    }
    
    private func signInWithGoogle() {
        guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
              let viewController = windowScene.windows.first?.rootViewController else {
            return
        }
        
        authViewModel.loginWithGoogle(presenting: viewController) { result in
            switch result {
            case .success:
                // Sign-in successful, handle navigation or UI updates
                break
            case .failure(let error):
                // Handle sign-in error
                print("Error signing in with Google: \(error)")
            }
        }
    }
}
