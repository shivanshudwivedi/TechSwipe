import Foundation
import FirebaseAuth

class AuthViewModel: ObservableObject {
    @Published var name = ""
    @Published var email = ""
    @Published var password = ""
    
    private let authService = AuthService()
    
    func login() {
        authService.login(email: email, password: password) { result in
            switch result {
            case .success:
                // Handle successful login
                break
            case .failure(let error):
                // Handle login error
                print("Login error: \(error.localizedDescription)")
            }
        }
    }
    
    func register() {
        authService.register(name: name, email: email, password: password) { result in
            switch result {
            case .success:
                // Handle successful registration
                break
            case .failure(let error):
                // Handle registration error
                print("Registration error: \(error.localizedDescription)")
            }
        }
    }
}
